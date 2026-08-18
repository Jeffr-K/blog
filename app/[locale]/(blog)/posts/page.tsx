import { notFound } from "next/navigation";

import { isLocale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/get-dictionary";

export default async function PostsPage({
  params,
}: PageProps<"/[locale]/posts">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <main className="site-main">
      <div className="content-container page-heading">
        <h1>{dictionary.navigation.posts}</h1>
      </div>
    </main>
  );
}
