import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "profile");

  return {
    title: t("title1"),
  };
}

export default function Page() {
  // Accounts are managed in the identity center
  return redirect(process.env.NEXT_PUBLIC_OIDC_ACCOUNT_URL ?? "/");
}
