import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(
    params.language,
    "confirm-new-email"
  );

  return {
    title: t("title"),
  };
}

export default function Page() {
  // Accounts are managed in the identity center
  return redirect("/");
}
