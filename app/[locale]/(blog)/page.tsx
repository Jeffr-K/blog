import { notFound } from "next/navigation";

import { isLocale } from "@/shared/i18n/config";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <main className="site-main">
      <div className="site-container" />
    </main>
  );
}
