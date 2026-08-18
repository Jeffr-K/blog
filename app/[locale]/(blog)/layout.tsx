import { notFound } from "next/navigation";

import { Gnb } from "@/shared/components/layout/gnb";
import { isLocale } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/get-dictionary";

export default async function BlogLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <>
      <Gnb
        locale={locale}
        navigation={dictionary.navigation}
        language={dictionary.language}
      />
      {children}
    </>
  );
}
