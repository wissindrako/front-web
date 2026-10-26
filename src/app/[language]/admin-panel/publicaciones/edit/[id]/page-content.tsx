"use client";

import FormDateTimePickerInput from "@/components/form/date-pickers/date-time-picker";

import FormTextInput from "@/components/form/text-input/form-text-input";
import FormRadioInput from "@/components/form/radio-group/form-radio-group";
import {
  ESTADO_OPTIONS,
  EstadoOption,
  PUBLICACION_ESTADOS,
  toEstadoOption,
} from "../../estados";

import {
  // React dependencies here
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import useLeavePage from "@/services/leave-page/use-leave-page";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useParams, useRouter } from "next/navigation";
import { useEditPublicacionService } from "@/services/api/services/publicaciones";
import { useGetPublicacionQuery } from "../../queries/queries";

type EditFormData = {
  publicadaEn: Date | null;

  estado: EstadoOption;

  contenido: string;

  resumen: string;

  titulo: string;

  // types here
};

const defaultValues: EditFormData = {
  publicadaEn: null,

  estado: ESTADO_OPTIONS[0],

  contenido: "",

  resumen: "",

  titulo: "",

  // default values here
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-publicaciones-edit");

  return yup.object().shape({
    titulo: yup
      .string()
      .max(200, t("inputs.titulo.validation.max"))
      .required(t("inputs.titulo.validation.required")),
    resumen: yup
      .string()
      .max(300, t("inputs.resumen.validation.max"))
      .defined(),
    contenido: yup.string().required(t("inputs.contenido.validation.required")),
    estado: yup
      .mixed<EstadoOption>()
      .test((value) => !!value && PUBLICACION_ESTADOS.includes(value.id))
      .required(),
    publicadaEn: yup.date().nullable().defined(),

    // Do not remove this comment. <edit-form-validation-schema />
  });
};

// Do not remove this comment. <edit-component-reference-field />

function EditFormActions() {
  const { t } = useTranslation("admin-panel-publicaciones-edit");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button type="submit" disabled={isSubmitting} data-testid="submit-button">
      {t("actions.submit")}
    </Button>
  );
}

function FormEdit() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const entityId = params.id;
  const fetchEditPublicacion = useEditPublicacionService();
  const { t } = useTranslation("admin-panel-publicaciones-edit");
  const { t: tEstados } = useTranslation("admin-panel-publicaciones");
  const validationSchema = useValidationSchema();
  const { data: initialData } = useGetPublicacionQuery({ id: entityId });

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchEditPublicacion({
      id: entityId,
      data: {
        titulo: formData.titulo,

        resumen: formData.resumen || null,

        contenido: formData.contenido,

        estado: formData.estado.id,

        publicadaEn: formData.publicadaEn
          ? formData.publicadaEn.toISOString()
          : null,

        // Do not remove this comment. <edit-form-submit-property />
      },
    });

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof EditFormData>).forEach((key) => {
        setError(key, {
          type: "manual",
          message: t(`inputs.${key}.validation.server.${data.errors[key]}`),
        });
      });
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar(t("alerts.success"), {
        variant: "success",
      });
      router.push("/admin-panel/publicaciones");
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        titulo: initialData.data.titulo ?? "",

        resumen: initialData.data.resumen ?? "",

        contenido: initialData.data.contenido ?? "",

        estado: toEstadoOption(initialData.data.estado),

        publicadaEn: initialData.data.publicadaEn
          ? new Date(initialData.data.publicadaEn)
          : null,

        // Do not remove this comment. <edit-form-reset-property />
      });
    }
  }, [initialData, reset]);

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-3xl px-4">
        <form onSubmit={onSubmit}>
          <div className="mt-6 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h1 className="text-xl font-semibold">{t("title")}</h1>
            </div>

            <div className="col-span-12">
              <FormTextInput<EditFormData>
                name="titulo"
                testId="titulo"
                label={t("inputs.titulo.label")}
              />
            </div>

            <div className="col-span-12">
              <FormTextInput<EditFormData>
                name="resumen"
                testId="resumen"
                label={t("inputs.resumen.label")}
              />
            </div>

            <div className="col-span-12">
              <FormTextInput<EditFormData>
                name="contenido"
                testId="contenido"
                label={t("inputs.contenido.label")}
                multiline
                minRows={8}
              />
            </div>

            <div className="col-span-12">
              <FormRadioInput<EditFormData, EstadoOption>
                name="estado"
                testId="estado"
                label={t("inputs.estado.label")}
                options={ESTADO_OPTIONS}
                keyValue="id"
                keyExtractor={(option) => option.id}
                renderOption={(option) => tEstados(`estados.${option.id}`)}
              />
            </div>

            <div className="col-span-12">
              <FormDateTimePickerInput<EditFormData>
                name="publicadaEn"
                testId="publicadaEn"
                label={t("inputs.publicadaEn.label")}
              />
            </div>

            {/* Do not remove this comment. <edit-component-field />  */}

            <div className="col-span-12">
              <EditFormActions />
              <span className="ml-2">
                <Button asChild variant="secondary">
                  <Link href="/admin-panel/publicaciones">
                    {t("actions.cancel")}
                  </Link>
                </Button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function Edit() {
  return <FormEdit />;
}

export default withPageRequiredAuth(Edit, {
  permissions: ["publicaciones.update"],
});
