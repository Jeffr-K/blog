"use client";

import type { ReactNode } from "react";
import {
  SandpackCodeEditor,
  SandpackConsole,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

import { sandpackOneDarkTheme } from "@/shared/lib/mdx/code/config";
import { resolvePlayground } from "@/shared/lib/mdx/code/playgrounds";
import styles from "../prose.module.css";

type PlaygroundTemplate = "react" | "react-ts" | "vanilla" | "vanilla-ts";

type Props = {
  children?: ReactNode;
  code?: string;
  id?: string;
  files?: Record<string, string>;
  template?: PlaygroundTemplate;
  title?: string;
  mainFile?: string;
  dependencies?: Record<string, string>;
  showConsole?: boolean;
};

export function Playground({
  children,
  code,
  id,
  files,
  template = "react-ts",
  title = "Playground",
  mainFile = "/App.tsx",
  dependencies,
  showConsole = false,
}: Props) {
  const preset = resolvePlayground(id);
  const inlineCode = code ?? getCodeText(children);
  const sourceFiles = files ?? preset?.files ?? {
    [mainFile]: inlineCode,
  };
  const activeFile = preset?.mainFile ?? mainFile;
  const visibleFiles = Object.keys(sourceFiles);
  const activeTemplate = preset?.template ?? template;
  const activeTitle = preset?.title ?? title;
  const activeDependencies = dependencies ?? preset?.dependencies;

  return (
    <section className={styles.playground} aria-label={activeTitle}>
      <div className={styles.playgroundHeader}>
        <span className={styles.playgroundTitle}>{activeTitle}</span>
        <span className={styles.playgroundTemplate}>{activeTemplate}</span>
      </div>
      <SandpackProvider
        files={sourceFiles}
        template={activeTemplate}
        theme={sandpackOneDarkTheme}
        options={{
          activeFile,
          visibleFiles,
        }}
        customSetup={{ dependencies: activeDependencies }}
      >
          <SandpackLayout className={styles.playgroundLayout}>
            <SandpackCodeEditor showLineNumbers showTabs closableTabs={false} />
            <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton />
            {showConsole && <SandpackConsole />}
          </SandpackLayout>
        </SandpackProvider>
    </section>
  );
}

function getCodeText(children: ReactNode): string {
  if (typeof children === "string") return children.trim();
  if (Array.isArray(children)) return children.map(getCodeText).join("").trim();
  if (children && typeof children === "object" && "props" in children) {
    return getCodeText(
      (children as React.ReactElement<{ children?: ReactNode }>).props.children
    ).trim();
  }
  return "";
}
