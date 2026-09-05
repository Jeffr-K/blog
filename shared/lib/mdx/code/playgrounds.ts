type PlaygroundTemplate = "react" | "react-ts" | "vanilla" | "vanilla-ts";

export type PlaygroundDefinition = {
  title: string;
  template: PlaygroundTemplate;
  mainFile: string;
  files: Record<string, string>;
  dependencies?: Record<string, string>;
};

export const playgrounds = {
  "rust-counter": {
    title: "Interactive Counter",
    template: "react-ts",
    mainFile: "/App.tsx",
    files: {
      "/App.tsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeContent: "center",
      gap: 12,
      background: "#f8fafc",
      color: "#111827",
      fontFamily: "system-ui, sans-serif"
    }}>
      <p>Rust 글 안에 들어간 실행형 UI 예제</p>
      <button
        onClick={() => setCount((value) => value + 1)}
        style={{
          border: 0,
          borderRadius: 6,
          background: "#8b5cf6",
          color: "white",
          cursor: "pointer",
          fontWeight: 700,
          padding: "10px 14px"
        }}
      >
        Count: {count}
      </button>
    </main>
  );
}`,
    },
  },
} satisfies Record<string, PlaygroundDefinition>;

export type PlaygroundId = keyof typeof playgrounds;

export function resolvePlayground(id?: string): PlaygroundDefinition | null {
  if (!id) return null;
  return playgrounds[id as PlaygroundId] ?? null;
}
