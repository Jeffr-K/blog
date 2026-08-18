import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  size?: "site" | "content";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  size = "site",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  const containerClassName =
    size === "content" ? "content-container" : "site-container";
  const classes = [containerClassName, className].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
