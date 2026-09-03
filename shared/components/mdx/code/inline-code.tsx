import type { ReactNode } from "react";

import styles from "../prose.module.css";

type Props = {
  children: ReactNode;
};

export function InlineCode({ children }: Props) {
  return <code className={styles.inlineCode}>{children}</code>;
}

