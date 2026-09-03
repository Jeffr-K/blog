import type { ReactNode } from "react";

import { calloutVariants, type CalloutVariant } from "./config";
import styles from "../prose.module.css";

type Props = {
  variant: CalloutVariant;
  children: ReactNode;
};

export function Callout({ variant, children }: Props) {
  const config = calloutVariants[variant];

  return (
    <aside
      className={styles.callout}
      data-variant={variant}
      style={{ "--callout-accent": config.accent } as React.CSSProperties}
    >
      <p className={styles.calloutTitle}>{config.label}</p>
      <div className={styles.calloutBody}>{children}</div>
    </aside>
  );
}

