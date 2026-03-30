import { useMemo, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { HierarchicalCategory } from "../api/blogCms";

interface HierarchicalFilterSelectProps {
  readonly value: string | undefined;
  readonly onValueChange: (value: string) => void;
  readonly placeholder?: string;
  readonly items: readonly HierarchicalCategory[];
  readonly disabled?: boolean;
}

interface FlatItem {
  id: string;
  name: string;
  level: number;
  hasChildren: boolean;
}

function flattenHierarchy(
  items: readonly HierarchicalCategory[],
  level: number = 0,
): FlatItem[] {
  const result: FlatItem[] = [];

  for (const item of items) {
    result.push({
      id: item.id,
      name: item.name,
      level,
      hasChildren: (item.children || []).length > 0,
    });

    if (item.children && item.children.length > 0) {
      result.push(...flattenHierarchy(item.children, level + 1));
    }
  }

  return result;
}

function getSelectedItemLabel(
  value: string | undefined,
  items: readonly HierarchicalCategory[],
): string {
  if (!value) return "";

  const findInHierarchy = (
    items: readonly HierarchicalCategory[],
  ): HierarchicalCategory | undefined => {
    for (const item of items) {
      if (item.id === value) return item;
      if (item.children) {
        const found = findInHierarchy(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  const item = findInHierarchy(items);
  return item?.name || "";
}

export default function HierarchicalFilterSelect({
  value,
  onValueChange,
  placeholder = "Select option",
  items,
  disabled = false,
}: HierarchicalFilterSelectProps) {
  const [open, setOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const flatItems = useMemo(() => flattenHierarchy(items), [items]);

  const selectedLabel = useMemo(
    () => getSelectedItemLabel(value, items),
    [value, items],
  );

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          <span className="truncate text-left">
            {selectedLabel || placeholder}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandList className="max-h-64">
            {flatItems.map((item) => {
              const isParent = item.hasChildren;
              const isExpanded = expandedIds.has(item.id);
              const isSelected = value === item.id;
              const indentClass = `pl-${Math.min(item.level * 4, 12)}`;

              return (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => {
                    if (isParent) {
                      // Toggle expansion for parent items
                      toggleExpanded(item.id);
                    } else {
                      // Select leaf items
                      onValueChange(item.id);
                      setOpen(false);
                    }
                  }}
                  className={cn(
                    "cursor-pointer flex items-center gap-2",
                    indentClass,
                  )}
                >
                  {isParent ? (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform",
                        isExpanded ? "" : "-rotate-90",
                      )}
                    />
                  ) : (
                    <div className="w-4" />
                  )}

                  {isSelected && !isParent && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                  {(!isSelected || isParent) && <div className="w-4" />}

                  <span className="flex-1 truncate">{item.name}</span>
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
