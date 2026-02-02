// src/modules/products/types/data-model.ts
import { ReactNode } from "react";

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "boolean";

export interface AttributeOption {
  label: string;
  value: string;
  isDefault?: boolean; // Optional: Helpful for UI state mapping
}

export interface AttributeValidation {
  format?: string;
  softLimit?: number;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface AttributeConfig {
  placeholder?: string;
  richText?: boolean;

  // ✅ FIX: Added string[] to support Multi-Select/Checkbox defaults
  defaultValue?: string | boolean | string[];

  trueLabel?: string;
  falseLabel?: string;
  options?: AttributeOption[];
}

export interface Attribute {
  id: string;
  name: string;
  key: string;
  type: FieldType | string;
  required: boolean;
  order: number;
  system?: boolean;
  validation?: AttributeValidation;
  config?: AttributeConfig;
}

export interface AttributeGroup {
  id: string;
  name: string;
  description?: string; // Made optional to match dialog logic
  count: number;
  icon: ReactNode;
}
