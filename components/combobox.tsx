"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn, normalizeText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Options = {
  value: string;
  label: string;
};

interface ComboboxProps {
  value: string;
  handleChange: (value: string) => void;
  options: Options[];
  placeholder?: string;
  modifiWidth: string;
}

export function Combobox({
  handleChange,
  options,
  value,
  placeholder,
  modifiWidth,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${modifiWidth} justify-between py-[0px] px-[12px] ${modifiWidth.includes('h-') ? '' : 'h-[32px]'} ${modifiWidth.includes('w-') ? '' : 'w-[200px]'}`}
        >
          {value
            ? options.find((framework) => framework.value === value)?.label
            : placeholder}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            const option = options.find(opt => opt.value === value)
            if (!option) return 0
            
            const normalizedLabel = normalizeText(option.label)
            const normalizedSearch = normalizeText(search)
            
            return normalizedLabel.includes(normalizedSearch) ? 1 : 0
          }}
        >
          <CommandInput placeholder="Filtrar opções" className="h-8" />
          <CommandList>
            <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
            <CommandGroup>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    handleChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
