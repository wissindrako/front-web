"use client";

import FormDateTimePickerInput from "@/components/form/date-pickers/date-time-picker";

import FormTextInput from "@/components/form/text-input/form-text-input";
import FormRadioInput from "@/components/form/radio-group/form-radio-group";
import { ESTADO_OPTIONS, EstadoOption, PUBLICACION_ESTADOS } from "../estados";

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
import { useRouter } from "next/navigation";
import { useCreatePublicacionService } from "@/services/api/services/publicaciones";

type CreateFormData = {
  publicadaEn: Date | null;

  estado: EstadoOption;

  contenido: string;

  resumen: string;

  titulo: string;

  // types here
};

const defaultValues: CreateFormData = {
  publicadaEn: null,

  estado: ESTADO_OPTIONS[0],

  contenido: "",

  resumen: "",

  titulo: "",

  // default values here
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-publicaciones-create");

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

    // Do not remove this comment. <create-form-validation-schema />
  });
};

// Do not remove this comment. <create-component-reference-field />

function CreateFormActions() {
  const { t } = useTranslation("admin-panel-publicaciones-create");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button type="submit" disabled={isSubmitting} data-testid="submit-button">
      {t("actions.submit")}
    </Button>
  );
}

function FormCreate() {
  const router = useRouter();
  const fetchCreatePublicacion = useCreatePublicacionService();
  const { t } = useTranslation("admin-panel-publicaciones-create");
  const { t: tEstados } = useTranslation("admin-panel-publicaciones");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<CreateFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchCreatePublicacion({
      titulo: formData.titulo,

      resumen: formData.resumen || null,

      contenido: formData.contenido,

      estado: formData.estado.id,

      publicadaEn: formData.publicadaEn
        ? formData.publicadaEn.toISOString()
        : null,

      // Do not remove this comment. <create-form-submit-property />
    });

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof CreateFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(`inputs.${key}.validation.server.${data.errors[key]}`),
          });
        }
      );

      return;
    }

    if (status === HTTP_CODES_ENUM.CREATED) {
      enqueueSnackbar(t("alerts.success"), {
        variant: "success",
      });
      router.push("/admin-panel/publicaciones");
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-3xl px-4">
        <form onSubmit={onSubmit}>
          <div className="mt-6 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h1 className="text-xl font-semibold">{t("title")}</h1>
            </div>

            <div className="col-span-12">
              <FormTextInput<CreateFormData>
                name="titulo"
                testId="titulo"
                label={t("inputs.titulo.label")}
              />
            </div>

            <div className="col-span-12">
              <FormTextInput<CreateFormData>
                name="resumen"
                testId="resumen"
                label={t("inputs.resumen.label")}
              />
            </div>

            <div className="col-span-12">
              <FormTextInput<CreateFormData>
                name="contenido"
                testId="contenido"
                label={t("inputs.contenido.label")}
                multiline
                minRows={8}
              />
            </div>

            <div className="col-span-12">
              <FormRadioInput<CreateFormData, EstadoOption>
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
              <FormDateTimePickerInput<CreateFormData>
                name="publicadaEn"
                testId="publicadaEn"
                label={t("inputs.publicadaEn.label")}
              />
            </div>

            {/* Do not remove this comment. <create-component-field />  */}

            <div className="col-span-12">
              <CreateFormActions />
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

function Create() {
  return <FormCreate />;
}

export default withPageRequiredAuth(Create, {
  permissions: ["publicaciones.create"],
});
