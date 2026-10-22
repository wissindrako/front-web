"use client";

import { DynamicIcon, IconName, iconNames } from "lucide-react/dynamic";

const KNOWN_ICONS = new Set<string>(iconNames);

export const isMenuIconName = (name: string | null | undefined) =>
  !!name && KNOWN_ICONS.has(name);

// Icon of a menu entry by its lucide.dev name; nothing if unknown
export function MenuIcon(props: { name: string | null; className?: string }) {
  if (!isMenuIconName(props.name)) return null;
  return (
    <DynamicIcon name={props.name as IconName} className={props.className} />
  );
}
