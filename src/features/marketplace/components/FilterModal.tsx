import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ContentFilters } from "../api/types";

export interface FilterSection {
  id: string;
  label: string;
  options: string[];
}

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: ContentFilters;
  sections: FilterSection[];
  onApply: (filters: ContentFilters) => void;
}

export function FilterModal({ open, onClose, filters, sections, onApply }: FilterModalProps) {
  const [local, setLocal] = useState<ContentFilters>(filters);

  // Sync local state when external filters change (e.g. tab switch resets)
  useEffect(() => {
    setLocal(filters);
  }, [filters]);

  const toggle = (key: keyof Omit<ContentFilters, "search">, value: string | number) => {
    setLocal((prev) => {
      const arr = prev[key] as (string | number)[];
      const next = arr.includes(value as never)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  const clearAll = () => setLocal({ search: filters.search, types: [], categories: [], years: [] });

  const activeCount = local.types.length + local.categories.length + local.years.length;

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-sm flex flex-col p-0">
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border">
          <SheetTitle className="font-heading flex items-center gap-2">
            Filters
            {activeCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                {activeCount}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable filter body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <Accordion type="multiple" defaultValue={sections.map((s) => s.id)} className="w-full">
            {sections.map((section, i) => (
              <AccordionItem key={section.id} value={section.id} className={i === 0 ? "border-t-0" : ""}>
                <AccordionTrigger className="font-semibold text-sm py-3 hover:no-underline">
                  {section.label}
                  {(local[section.id as keyof Omit<ContentFilters, "search">] as (string | number)[])?.length > 0 && (
                    <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                      {(local[section.id as keyof Omit<ContentFilters, "search">] as (string | number)[]).length}
                    </Badge>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2.5 pb-2">
                    {section.options.map((opt) => {
                      const key = section.id as keyof Omit<ContentFilters, "search">;
                      const checked = (local[key] as (string | number)[]).includes(opt as never);
                      return (
                        <div key={opt} className="flex items-center gap-2.5">
                          <Checkbox
                            id={`${section.id}-${opt}`}
                            checked={checked}
                            onCheckedChange={() => toggle(key, opt)}
                          />
                          <Label
                            htmlFor={`${section.id}-${opt}`}
                            className="text-sm font-normal cursor-pointer leading-none"
                          >
                            {opt}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <SheetFooter className="px-5 py-4 border-t border-border flex-row justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            disabled={activeCount === 0}
            className="text-muted-foreground"
          >
            Clear all
          </Button>
          <Button onClick={handleApply} className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
            Show results
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
