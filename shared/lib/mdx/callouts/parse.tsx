import { Children, cloneElement, isValidElement, type ReactNode } from "react";

import { isCalloutVariant, type CalloutVariant } from "./config";

const CALLOUT_MARKER = /^\[!(\w+)\]\s*/;

export type ParsedCallout = {
  variant: CalloutVariant;
  children: ReactNode;
};

export function parseCallout(children: ReactNode): ParsedCallout | null {
  const blocks = Children.toArray(children);
  const [firstBlock, ...restBlocks] = blocks;

  if (!isValidElement<{ children?: ReactNode }>(firstBlock)) return null;

  const firstChildren = Children.toArray(firstBlock.props.children);
  const [firstChild, ...restChildren] = firstChildren;

  if (typeof firstChild !== "string") return null;

  const match = firstChild.match(CALLOUT_MARKER);
  if (!match || !isCalloutVariant(match[1].toLowerCase())) return null;

  const variant = match[1].toLowerCase() as CalloutVariant;
  const remainingFirstText = firstChild.slice(match[0].length);
  const nextFirstChildren = remainingFirstText
    ? [remainingFirstText, ...restChildren]
    : restChildren;
  const nextBlocks = [
    cloneElement(firstBlock, { children: nextFirstChildren }),
    ...restBlocks,
  ].filter((block) => {
    if (!isValidElement<{ children?: ReactNode }>(block)) return true;
    return Children.count(block.props.children) > 0;
  });

  return {
    variant,
    children: nextBlocks,
  };
}

