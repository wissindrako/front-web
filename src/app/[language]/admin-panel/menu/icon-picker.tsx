"use client";

import X from "lucide-react/dist/esm/icons/x";
import { iconNames } from "lucide-react/dynamic";
import { useMemo, useState } from "react";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { MenuIcon } from "@/components/menu-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "@/services/i18n/client";

const MAX_RESULTS = 60;

// Searchable grid of lucide.dev icons for a form field (value: icon name)
export default function FormIconPicker<
  TFieldValues extends FieldValues = FieldValues,
>(props: { name: FieldPath<TFieldValues>; label: string }) {
  const { t } = useTranslation("admin-panel-menu");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const term = search.trim().toLowerCase().replace(/\s+/g, "-");
    return (
      term ? iconNames.filter((name) => name.includes(term)) : iconNames
    ).slice(0, MAX_RESULTS);
  }, [search]);

  return (
    <Controller
      name={props.name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`icon-${props.name}`}>{props.label}</Label>
          <div className="flex items-center gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={`icon-${props.name}`}
                  type="button"
                  variant="outline"
                  className="flex-1 justify-start"
                  data-testid="icon-picker"
                >
                  {field.value ? (
                    <>
                      <MenuIcon name={field.value} className="size-4" />
                      <span className="font-mono text-xs">{field.value}</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">
                      {t("admin-panel-menu:form.icon.none")}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <Input
                  autoFocus
                  placeholder={t("admin-panel-menu:form.icon.search")}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  data-testid="icon-search"
                />
                <div className="mt-2 grid max-h-64 grid-cols-6 gap-1 overflow-y-auto">
                  {results.map((name) => (
                    <button
                      key={name}
                      type="button"
                      title={name}
                      aria-label={name}
                      className={`flex aspect-square items-center justify-center rounded-md hover:bg-accent ${
                        field.value === name ? "bg-accent" : ""
                      }`}
                      onClick={() => {
                        field.onChange(name);
                        setIsOpen(false);
                      }}
                    >
                      <MenuIcon name={name} className="size-5" />
                    </button>
                  ))}
                </div>
                {!results.length && (
                  <p className="p-2 text-sm text-muted-foreground">
                    {t("admin-panel-menu:form.icon.noResults")}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  {t("admin-panel-menu:form.icon.hint")}
                </p>
              </PopoverContent>
            </Popover>
            {field.value && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t("admin-panel-menu:form.icon.clear")}
                onClick={() => field.onChange(null)}
              >
                <X />
              </Button>
            )}
          </div>
          {fieldState.error?.message && (
            <p className="text-sm text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
