import { notFound } from "next/navigation";

import { isLocale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/get-dictionary";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <main className="site-main">
      <div className="content-container page-heading">
        <h1>{dictionary.navigation.about}</h1>
      </div>
    </main>
  );
}
