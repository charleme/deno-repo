import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form.tsx";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  MultiSelect,
  type MultiSelectProps,
} from "@/components/molecules/form/multi-select.tsx";

export function MultiSelectField<
  TValue,
  TLabel extends string,
  TOption extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  multiSelectProps,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label?: string;
  multiSelectProps: Omit<
    MultiSelectProps<TLabel, TValue, TOption>,
    "onChange" | "onBlur" | "value" | "disabled" | "name" | "ref"
  >;
}) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <MultiSelect
              controlled={true}
              {...multiSelectProps as MultiSelectProps<TLabel, TValue, TOption>}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
