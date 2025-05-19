import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/atoms/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover.tsx";
import { Button, type ButtonProps } from "@/components/atoms/button.tsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils.ts";
import { Slot } from "@radix-ui/react-slot";
import { FormControl } from "@/components/atoms/form.tsx";

type LabelFnAccessor<Label extends string, Option extends object> = {
  labelFnAccessor: (item: Option) => Label;
};

type ValueFnAccessor<Value, Option extends object> = {
  valueFnAccessor: (item: Option) => Value;
};

export type MultiSelectProps<
  Label extends string,
  Value,
  Option extends object,
> =
  & {
    options: Option[];
    renderOption?: (label: Option) => React.ReactNode;
    renderSelectedOption?: (label: Option) => React.ReactNode;
    controlled?: boolean;
    value: Value[];
    onChange: (value: Value[]) => void;
    onBlur?: () => void;
  }
  & LabelFnAccessor<Label, Option>
  & ValueFnAccessor<Value, Option>
  & Omit<ButtonProps, "onChange" | "value" | "onBlur">;

export function MultiSelect<Label extends string, Value, Option extends object>(
  {
    options,
    value: values,
    onChange: setValues,
    onBlur,
    labelFnAccessor,
    valueFnAccessor,
    className,
    renderOption = (option) => labelFnAccessor(option),
    renderSelectedOption = renderOption,
    controlled = false,
    ...props
  }: MultiSelectProps<Label, Value, Option>,
) {
  const [open, setOpen] = useState(false);

  const ButtonWrapper = controlled ? FormControl : Slot;

  const getOptionLabel = (option: Option): Label => {
    return labelFnAccessor(option);
  };

  const getOptionValue = (option: Option): Value => {
    return valueFnAccessor(option);
  };

  const handleSelectItem = (itemLabel: string) => {
    const option = options.find(
      (option) => getOptionLabel(option) === itemLabel,
    );
    if (option === undefined) {
      throw new Error("Selected option not found");
    }
    const optionValue = getOptionValue(option);
    if (values.includes(optionValue)) {
      setValues(values.filter((v) => v !== optionValue));
    } else {
      setValues([...values, optionValue]);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      if (onBlur) {
        onBlur();
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <ButtonWrapper>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-[200px] justify-between", className)}
            {...props}
          >
            <div className="flex gap-2">
              {values.length > 0
                ? options
                  .filter((option) => values.includes(getOptionValue(option)))
                  .map((option, key) => (
                    <div key={key}>{renderSelectedOption(option)}</div>
                  ))
                : "Select Item..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </ButtonWrapper>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search item..." />
            <CommandEmpty>No Item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={getOptionLabel(option)}
                  value={getOptionLabel(option)}
                  onSelect={handleSelectItem}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.includes(getOptionValue(option))
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {renderOption(option)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
