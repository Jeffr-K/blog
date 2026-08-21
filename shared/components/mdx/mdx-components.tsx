import type { MDXComponents } from "mdx/types";

import { CopyButton } from "./copy-button";
import styles from "./prose.module.css";

export const mdxComponents: MDXComponents = {
  /* ── Headings ───────────────────────────────────────────────── */
  h1: ({ children, id }) => <h1 id={id} className={styles.h1}>{children}</h1>,
  h2: ({ children, id }) => <h2 id={id} className={styles.h2}>{children}</h2>,
  h3: ({ children, id }) => <h3 id={id} className={styles.h3}>{children}</h3>,
  h4: ({ children, id }) => <h4 id={id} className={styles.h4}>{children}</h4>,

  /* ── Text ───────────────────────────────────────────────────── */
  p:          ({ children }) => <p className={styles.p}>{children}</p>,
  strong:     ({ children }) => <strong className={styles.strong}>{children}</strong>,
  em:         ({ children }) => <em className={styles.em}>{children}</em>,
  del:        ({ children }) => <del className={styles.del}>{children}</del>,
  a:          ({ href, children }) => <a href={href} className={styles.a} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}>{children}</a>,
  hr:         () => <hr className={styles.hr} />,

  /* ── Lists ──────────────────────────────────────────────────── */
  ul:         ({ children }) => <ul className={styles.ul}>{children}</ul>,
  ol:         ({ children }) => <ol className={styles.ol}>{children}</ol>,
  li:         ({ children }) => <li className={styles.li}>{children}</li>,

  /* ── Blockquote ─────────────────────────────────────────────── */
  blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,

  /* ── Code ───────────────────────────────────────────────────── */
  code: ({ children, className }) => {
    // inline code (no className)
    if (!className) {
      return <code className={styles.inlineCode}>{children}</code>;
    }
    // code block (className = "language-xxx", handled by pre below)
    return <code className={className}>{children}</code>;
  },
  pre: ({ children, ...props }) => {
    // Extract raw text for copy button
    const rawCode = extractCodeText(children);
    return (
      <div className={styles.codeWrapper}>
        <pre className={styles.pre} {...props}>
          {children}
        </pre>
        <CopyButton code={rawCode} />
      </div>
    );
  },

  /* ── Table ──────────────────────────────────────────────────── */
  table:   ({ children }) => <div className={styles.tableWrapper}><table className={styles.table}>{children}</table></div>,
  thead:   ({ children }) => <thead>{children}</thead>,
  tbody:   ({ children }) => <tbody>{children}</tbody>,
  tr:      ({ children }) => <tr className={styles.tr}>{children}</tr>,
  th:      ({ children }) => <th className={styles.th}>{children}</th>,
  td:      ({ children }) => <td className={styles.td}>{children}</td>,

  /* ── Image ──────────────────────────────────────────────────── */
  img: ({ src, alt }) => (
    <figure className={styles.figure}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src ?? ""} alt={alt ?? ""} className={styles.img} loading="lazy" />
      {alt && <figcaption className={styles.figcaption}>{alt}</figcaption>}
    </figure>
  ),
};

function extractCodeText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractCodeText).join("");
  if (children && typeof children === "object" && "props" in (children as object)) {
    return extractCodeText((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}
