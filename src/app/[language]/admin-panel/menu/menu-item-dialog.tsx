"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  FormProvider,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import * as yup from "yup";
import FormCheckboxBooleanInput from "@/components/form/checkbox-boolean/form-checkbox-boolean";
import FormTextInput from "@/components/form/text-input/form-text-input";
import { isMenuIconName } from "@/components/menu-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MenuItemRequest,
  usePatchMenuItemService,
  usePostMenuItemService,
} from "@/services/api/services/menu";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { MenuItemTree, MenuPermission } from "@/services/api/types/menu-item";
import { useTranslation } from "@/services/i18n/client";
import { useMenuLabel } from "@/services/menu/use-menu-label";
import FormIconPicker from "./icon-picker";

const NONE = "none";

type FormData = {
  kind: "link" | "group";
  label: string;
  labelKey: string;
  url: string;
  icon: string | null;
  permission: string;
  parentId: string;
  isActive: boolean;
};

// Same rules as the API, so most mistakes are caught before sending
const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-menu");

  return yup.object({
    kind: yup.mixed<FormData["kind"]>().oneOf(["link", "group"]).required(),
    label: yup
      .string()
      .trim()
      .max(100)
      .required(t("admin-panel-menu:form.label.required")),
    labelKey: yup
      .string()
      .matches(/^([\w-]+:[\w.-]+)?$/, t("admin-panel-menu:errors.labelKey"))
      .defined(),
    url: yup
      .string()
      .defined()
      .when("kind", {
        is: "link",
        then: (schema) =>
          schema
            .required(t("admin-panel-menu:form.url.required"))
            .matches(
              /^(\/(?!\/)|https?:\/\/)\S*$/,
              t("admin-panel-menu:errors.url")
            ),
      }),
    icon: yup
      .string()
      .nullable()
      .defined()
      .test(
        "known-icon",
        t("admin-panel-menu:errors.icon"),
        (value) => !value || isMenuIconName(value)
      ),
    permission: yup.string().defined(),
    parentId: yup.string().defined(),
    isActive: yup.boolean().defined(),
  });
};

function FormStringSelect<TFieldValues extends FieldValues>(props: {
  name: FieldPath<TFieldValues>;
  label: string;
  options: { value: string; label: string }[];
  testId?: string;
  disabled?: boolean;
}) {
  return (
    <Controller
      name={props.name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`select-${props.name}`}>{props.label}</Label>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={props.disabled}
          >
            <SelectTrigger
              id={`select-${props.name}`}
              className="w-full"
              data-testid={props.testId}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}

// Errors the API answers with (422 { errors: { field: code } })
const API_ERROR_FIELDS: Record<string, keyof FormData> = {
  label: "label",
  labelKey: "labelKey",
  url: "url",
  icon: "icon",
  permission: "permission",
  parentId: "parentId",
};

export default function MenuItemDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Editing this entry, or creating one (optionally inside a group)
  item?: MenuItemTree;
  defaultParentId?: string | null;
  tree: MenuItemTree[];
  permissions: MenuPermission[];
  onSaved: () => void;
}) {
  const { t } = useTranslation("admin-panel-menu");
  const label = useMenuLabel();
  const fetchPost = usePostMenuItemService();
  const fetchPatch = usePatchMenuItemService();
  const validationSchema = useValidationSchema();

  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, reset, setError, control } = methods;
  const kind = useWatch({ control, name: "kind" });
  const { isSubmitting } = useFormState({ control });

  useEffect(() => {
    if (!props.open) return;
    const item = props.item;
    reset({
      kind: item && !item.url ? "group" : "link",
      label: item?.label ?? "",
      labelKey: item?.labelKey ?? "",
      url: item?.url ?? "",
      icon: item?.icon ?? null,
      permission: item?.permission ?? NONE,
      parentId: item?.parentId ?? props.defaultParentId ?? NONE,
      isActive: item?.isActive ?? true,
    });
  }, [props.open, props.item, props.defaultParentId, reset]);

  // A group can only be top level, and can't become a link inside another
  // group while it has entries
  const hasChildren = !!props.item?.children.length;
  const groups = props.tree.filter(
    (entry) => !entry.url && entry.id !== props.item?.id
  );

  const onSubmit = handleSubmit(async (values) => {
    const data: MenuItemRequest = {
      label: values.label.trim(),
      labelKey: values.labelKey || null,
      url: values.kind === "link" ? values.url : null,
      icon: values.icon || null,
      permission: values.permission === NONE ? null : values.permission,
      parentId:
        values.kind === "link" && values.parentId !== NONE
          ? values.parentId
          : null,
      isActive: values.isActive,
    };

    const { status, data: response } = props.item
      ? await fetchPatch({ id: props.item.id, data })
      : await fetchPost(data);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      const errors = (response as unknown as { errors: Record<string, string> })
        .errors;
      for (const [field, code] of Object.entries(errors ?? {})) {
        setError(API_ERROR_FIELDS[field] ?? "label", {
          message: t(`admin-panel-menu:errors.${code}`, { defaultValue: code }),
        });
      }
      return;
    }

    if (status === HTTP_CODES_ENUM.OK || status === HTTP_CODES_ENUM.CREATED) {
      props.onSaved();
      props.onOpenChange(false);
    }
  });

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {props.item
              ? t("admin-panel-menu:form.editTitle")
              : t("admin-panel-menu:form.createTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("admin-panel-menu:form.description")}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
            data-testid="menu-item-form"
          >
            <FormStringSelect<FormData>
              name="kind"
              label={t("admin-panel-menu:form.kind.label")}
              testId="menu-item-kind"
              disabled={hasChildren}
              options={[
                { value: "link", label: t("admin-panel-menu:form.kind.link") },
                {
                  value: "group",
                  label: t("admin-panel-menu:form.kind.group"),
                },
              ]}
            />
            <FormTextInput<FormData>
              name="label"
              label={t("admin-panel-menu:form.label.label")}
              testId="menu-item-label"
              autoFocus
            />
            <FormTextInput<FormData>
              name="labelKey"
              label={t("admin-panel-menu:form.labelKey.label")}
              testId="menu-item-label-key"
            />
            {kind === "link" && (
              <>
                <FormTextInput<FormData>
                  name="url"
                  label={t("admin-panel-menu:form.url.label")}
                  testId="menu-item-url"
                />
                <FormStringSelect<FormData>
                  name="parentId"
                  label={t("admin-panel-menu:form.parent.label")}
                  testId="menu-item-parent"
                  disabled={hasChildren}
                  options={[
                    {
                      value: NONE,
                      label: t("admin-panel-menu:form.parent.none"),
                    },
                    ...groups.map((group) => ({
                      value: group.id,
                      label: label(group),
                    })),
                  ]}
                />
              </>
            )}
            <FormIconPicker<FormData>
              name="icon"
              label={t("admin-panel-menu:form.icon.label")}
            />
            <FormStringSelect<FormData>
              name="permission"
              label={t("admin-panel-menu:form.permission.label")}
              testId="menu-item-permission"
              options={[
                {
                  value: NONE,
                  label: t("admin-panel-menu:form.permission.anyone"),
                },
                ...props.permissions.map((permission) => ({
                  value: permission.code,
                  label: `${permission.code} · ${permission.description}`,
                })),
              ]}
            />
            <FormCheckboxBooleanInput<FormData>
              name="isActive"
              label={t("admin-panel-menu:form.isActive.label")}
              testId="menu-item-active"
            />
            <p className="text-xs text-muted-foreground">
              {kind === "group"
                ? t("admin-panel-menu:form.groupHint")
                : t("admin-panel-menu:form.linkHint")}
            </p>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => props.onOpenChange(false)}
              >
                {t("admin-panel-menu:actions.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="menu-item-save"
              >
                {t("admin-panel-menu:actions.save")}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
