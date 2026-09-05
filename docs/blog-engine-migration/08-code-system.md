# 08. Code System

## Goal

Make static code blocks, inline code, and executable examples feel like one intentional MDX system.

## Scope

- Keep normal fenced code blocks as lightweight static code blocks.
- Use `rehype-pretty-code` with the One Dark Pro Shiki theme for syntax highlighting.
- Keep code block UI in `shared/components/mdx/code`.
- Support executable examples through an explicit `<Playground />` MDX component.
- Keep inline code visually quiet and stable inside paragraphs.

## Authoring

Static code:

````markdown
```rust
fn main() {
    println!("hello");
}
```
````

Executable code:

```mdx
<Playground id="rust-counter" />
```

## Constraints

- Do not make every code block executable.
- Do not depend on Gist for normal article rendering.
- Keep executable example files in `shared/lib/mdx/code/playgrounds.ts`.
- Keep theme colors centralized in `shared/lib/mdx/code/config.ts`.

## Verification

- Static fenced code renders with One Dark Pro.
- Inline code does not disturb paragraph line height.
- `<Playground />` renders a code editor and preview.
- `npm run lint`
- `npm run build`
