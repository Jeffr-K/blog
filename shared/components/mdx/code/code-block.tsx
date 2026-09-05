import type { HTMLAttributes, ReactNode } from "react";

import { CopyButton } from "./copy-button";
import styles from "../prose.module.css";

type Props = HTMLAttributes<HTMLPreElement> & {
  children: ReactNode;
};

export function CodeBlock({ children, ...props }: Props) {
  const rawCode = extractCodeText(children);
  const language = extractLanguage(children, props);

  return (
    <div className={styles.codeWrapper}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLanguage}>{language}</span>
        <CopyButton code={rawCode} />
      </div>
      <pre className={styles.pre} {...props}>
        {children}
      </pre>
    </div>
  );
}

function extractCodeText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractCodeText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractCodeText(
      (children as React.ReactElement<{ children?: ReactNode }>).props.children
    );
  }
  return "";
}

function extractLanguage(
  children: ReactNode,
  props: HTMLAttributes<HTMLPreElement>
): string {
  const dataLanguage = props["data-language" as keyof typeof props];
  if (typeof dataLanguage === "string" && dataLanguage) {
    return dataLanguage;
  }

  if (children && typeof children === "object" && "props" in children) {
    const className = (
      children as React.ReactElement<{ className?: string }>
    ).props.className;
    const match = className?.match(/language-([\w-]+)/);
    if (match?.[1]) {
      return match[1];
    }
  }

  return "text";
}
