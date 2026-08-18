import { notFound } from "next/navigation";

import { Gnb } from "@/shared/components/layout/gnb";
import { Footer } from "@/shared/components/layout/footer";
import { AgentProvider } from "@/shared/components/agent/agent-context";
import { AgentPanel } from "@/shared/components/agent/agent-panel";
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
    <AgentProvider>
      <Gnb
        locale={locale}
        navigation={dictionary.navigation}
        language={dictionary.language}
      />
      {children}
      <Footer />
      <AgentPanel />
    </AgentProvider>
  );
}
