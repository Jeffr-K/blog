import type { SandpackTheme } from "@codesandbox/sandpack-react";

export const codeTheme = {
  name: "one-dark-pro",
  light: "one-dark-pro",
  dark: "one-dark-pro",
} as const;

export const sandpackOneDarkTheme: SandpackTheme = {
  colors: {
    surface1: "#282c34",
    surface2: "#21252b",
    surface3: "#2c313a",
    disabled: "#5c6370",
    base: "#abb2bf",
    clickable: "#d7dae0",
    hover: "#ffffff",
    accent: "#61afef",
    error: "#e06c75",
    errorSurface: "#3a1f24",
    warning: "#d19a66",
    warningSurface: "#3a2b1d",
  },
  syntax: {
    plain: "#abb2bf",
    comment: { color: "#7f848e", fontStyle: "italic" },
    keyword: "#c678dd",
    definition: "#61afef",
    punctuation: "#abb2bf",
    property: "#e06c75",
    tag: "#e06c75",
    static: "#d19a66",
    string: "#98c379",
  },
  font: {
    body: "var(--font-line-seed-sans), -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "var(--font-geist-mono), SFMono-Regular, Consolas, monospace",
    size: "13px",
    lineHeight: "1.65",
  },
};

export const codeLabels = {
  copy: "코드 복사",
  copied: "복사됨",
  preview: "Preview",
  editor: "Code",
} as const;
