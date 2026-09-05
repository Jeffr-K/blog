export const calloutVariants = {
  note: {
    label: "Note",
    accent: "#8b5cf6",
  },
  info: {
    label: "Info",
    accent: "#0ea5e9",
  },
  tip: {
    label: "Tip",
    accent: "#10b981",
  },
  warning: {
    label: "Warning",
    accent: "#f59e0b",
  },
  danger: {
    label: "Danger",
    accent: "#ef4444",
  },
} as const;

export type CalloutVariant = keyof typeof calloutVariants;

export function isCalloutVariant(value: string): value is CalloutVariant {
  return value in calloutVariants;
}

