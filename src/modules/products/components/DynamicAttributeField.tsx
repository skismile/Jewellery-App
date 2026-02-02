import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Attribute } from "@/modules/products/types/data-model"; // Ensure path matches your project

interface DynamicFieldProps {
  attribute: Attribute;
  value: any;
  onChange: (value: any) => void;
}

export const DynamicAttributeField = ({
  attribute,
  value,
  onChange,
}: DynamicFieldProps) => {
  const { type, config, validation } = attribute;

  // 1. Text Input
  if (type === "text") {
    return (
      <div className="space-y-2">
        <Label>
          {attribute.name}{" "}
          {attribute.required && <span className="text-red-500">*</span>}
        </Label>
        <Input
          placeholder={config?.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          type={
            validation?.format === "integer" || validation?.format === "decimal"
              ? "number"
              : "text"
          }
        />
      </div>
    );
  }

  // 2. Textarea
  if (type === "textarea") {
    return (
      <div className="space-y-2 col-span-2">
        {" "}
        {/* Span 2 columns for textarea */}
        <Label>
          {attribute.name}{" "}
          {attribute.required && <span className="text-red-500">*</span>}
        </Label>
        <Textarea
          placeholder={config?.placeholder}
          className="min-h-[100px]"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        {validation?.softLimit && (
          <p className="text-[10px] text-muted-foreground text-right">
            Max {validation.softLimit} chars
          </p>
        )}
      </div>
    );
  }

  // 3. Select / Dropdown
  if (type === "select") {
    return (
      <div className="space-y-2">
        <Label>
          {attribute.name}{" "}
          {attribute.required && <span className="text-red-500">*</span>}
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {config?.options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // 4. Radio Group
  if (type === "radio") {
    return (
      <div className="space-y-3">
        <Label>
          {attribute.name}{" "}
          {attribute.required && <span className="text-red-500">*</span>}
        </Label>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="flex flex-col space-y-1"
        >
          {config?.options?.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={opt.value}
                id={`${attribute.key}-${opt.value}`}
              />
              <Label
                htmlFor={`${attribute.key}-${opt.value}`}
                className="font-normal cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  // 5. Boolean / Toggle
  if (type === "boolean") {
    return (
      <div className="flex items-center justify-between border p-3 rounded-md bg-background">
        <Label htmlFor={attribute.key} className="cursor-pointer flex flex-col">
          <span>{attribute.name}</span>
          <span className="text-[10px] text-muted-foreground font-normal">
            {value ? config?.trueLabel || "Yes" : config?.falseLabel || "No"}
          </span>
        </Label>
        <Switch
          id={attribute.key}
          checked={!!value}
          onCheckedChange={onChange}
        />
      </div>
    );
  }

  // 6. Checkbox (Multi-select)
  if (type === "checkbox") {
    const currentValues = Array.isArray(value) ? value : [];

    const handleCheck = (checked: boolean, itemValue: string) => {
      if (checked) {
        onChange([...currentValues, itemValue]);
      } else {
        onChange(currentValues.filter((v: string) => v !== itemValue));
      }
    };

    return (
      <div className="space-y-3">
        <Label>{attribute.name}</Label>
        <div className="grid grid-cols-2 gap-2">
          {config?.options?.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${attribute.key}-${opt.value}`}
                checked={currentValues.includes(opt.value)}
                onCheckedChange={(checked) =>
                  handleCheck(checked as boolean, opt.value)
                }
              />
              <Label
                htmlFor={`${attribute.key}-${opt.value}`}
                className="font-normal cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
