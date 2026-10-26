"use client";

import { useCallback } from "react";
import { MenuItem } from "@/services/api/types/menu-item";
import { useTranslation } from "@/services/i18n/client";

// Translated label when the entry has a translation key, its label otherwise
export function useMenuLabel() {
  const { t } = useTranslation("common");

  return useCallback(
    (item: Pick<MenuItem, "label" | "labelKey">) =>
      item.labelKey
        ? t(item.labelKey, { defaultValue: item.label })
        : item.label,
    [t]
  );
}
