import type { Metadata } from "next";
import Link from "@/components/link";
import { getServerTranslation } from "@/services/i18n";
import HomeContent from "./page-content";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home(props: Props) {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return (
    <div className="mx-auto flex min-h-[85vh] w-full max-w-4xl flex-col justify-between gap-6 px-4 pt-6">
      {/* Depends on the session, so it is rendered in the browser */}
      <HomeContent />
      <div className="mx-auto pb-4">
        <Link
          href="/privacy-policy"
          className="text-sm text-primary underline-offset-4 underline"
        >
          {t("privacyPolicy")}
        </Link>
      </div>
    </div>
  );
}
