"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Type,
  AlignLeft,
  CheckSquare,
  ListFilter,
  ToggleRight,
  ChevronDownSquare,
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Attribute } from "@/modules/products/types/data-model";

// --- 1. Zod Schema Definitions ---

const baseSchema = z.object({
  label: z.string().min(1, "Label is required"),
  key: z.string().min(1, "Key is required"),
  order: z.coerce.number().default(0), // Add this line
  required: z.boolean(),
});

const textSchema = baseSchema.extend({
  type: z.literal("text"),
  config: z.object({
    format: z.enum(["string", "integer", "decimal", "url", "email"]),
    placeholder: z.string().optional(),
  }),
});

const textareaSchema = baseSchema.extend({
  type: z.literal("textarea"),
  config: z.object({
    richText: z.boolean(),
    // FIX: strict preprocessing to ensure type is number | undefined
    softLimit: z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number().min(1).optional(),
    ),
  }),
});

const booleanSchema = baseSchema.extend({
  type: z.literal("boolean"),
  config: z.object({
    defaultState: z.boolean(),
    trueLabel: z.string(),
    falseLabel: z.string(),
  }),
});

const optionSchema = z.object({
  label: z.string().min(1, "Label needed"),
  value: z.string().min(1, "Value needed"),
});

const selectionSchema = baseSchema.extend({
  type: z.enum(["select", "radio", "checkbox"]),
  config: z.object({
    options: z.array(optionSchema).min(1, "At least one option is required"),
  }),
});

// Discriminated Union
const attributeFormSchema = z.discriminatedUnion("type", [
  textSchema,
  textareaSchema,
  booleanSchema,
  selectionSchema,
]);

export type AttributeFormValues = z.infer<typeof attributeFormSchema>;

// --- 2. Component Logic ---

interface AttributeDrawerProps {
  trigger?: React.ReactNode;
  groupName: string;
  onSave: (attribute: Attribute) => void;
}

const TYPE_ICONS = {
  text: <Type className="w-6 h-6" />,
  textarea: <AlignLeft className="w-6 h-6" />,
  select: <ChevronDownSquare className="w-6 h-6" />,
  checkbox: <CheckSquare className="w-6 h-6" />,
  radio: <ListFilter className="w-6 h-6" />,
  boolean: <ToggleRight className="w-6 h-6" />,
};

export function AttributeDrawer({
  trigger,
  groupName,
  onSave,
}: AttributeDrawerProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"select" | "config">("select");

  const form = useForm<AttributeFormValues>({
    resolver: zodResolver(attributeFormSchema) as any,
    defaultValues: {
      type: "text",
      label: "",
      key: "",
      required: false,
      config: {
        format: "string",
        placeholder: "",
      },
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;

  // Cast name to 'any' to bypass strict path checking for discriminated unions in RHF
  const { fields, append, remove } = useFieldArray({
    control,
    name: "config.options" as any,
  });

  const selectedType = watch("type");
  const labelValue = watch("label");

  // Auto-Generate Key Logic
  useEffect(() => {
    if (labelValue) {
      const generatedKey = labelValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
      setValue("key", generatedKey, { shouldValidate: true });
    }
  }, [labelValue, setValue]);

  const handleTypeSelect = (type: AttributeFormValues["type"]) => {
    // Reset config to valid initial state for each type to avoid schema mismatch
    if (type === "select" || type === "radio" || type === "checkbox") {
      setValue("config", { options: [{ label: "", value: "" }] } as any);
    } else if (type === "boolean") {
      setValue("config", {
        defaultState: false,
        trueLabel: "Yes",
        falseLabel: "No",
      } as any);
    } else if (type === "text") {
      setValue("config", { format: "string", placeholder: "" } as any);
    } else if (type === "textarea") {
      setValue("config", { richText: false, softLimit: undefined } as any);
    }

    setValue("type", type);
    setStep("config");
  };

  const onSubmit = (data: AttributeFormValues) => {
    const newAttribute: Attribute = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.label,
      key: data.key,
      type: data.type,
      required: data.required,
      order: 99,
      system: false,
      ...mapConfigToDomain(data),
    };

    onSave(newAttribute);
    setOpen(false);
    reset();
    setStep("select");
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          reset();
          setStep("select");
        }
      }}
    >
      <SheetTrigger asChild>
        {trigger || (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm h-9">
            <Plus className="w-4 h-4" /> Add Attribute
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col p-0 gap-0">
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center gap-2">
            {step === "config" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -ml-2 mr-1"
                onClick={() => setStep("select")}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <SheetTitle>
                {step === "select"
                  ? "Select Attribute Type"
                  : `Configure ${selectedType} Attribute`}
              </SheetTitle>
              <SheetDescription>
                Adding to group:{" "}
                <span className="font-medium text-foreground">{groupName}</span>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-6">
          {step === "select" && (
            <div className="grid grid-cols-2 gap-4">
              <TypeCard
                icon={TYPE_ICONS.text}
                label="Text Input"
                desc="Single line names, titles"
                onClick={() => handleTypeSelect("text")}
              />
              <TypeCard
                icon={TYPE_ICONS.textarea}
                label="Text Area"
                desc="Descriptions, rich text"
                onClick={() => handleTypeSelect("textarea")}
              />
              <TypeCard
                icon={TYPE_ICONS.select}
                label="Dropdown"
                desc="Select one from list"
                onClick={() => handleTypeSelect("select")}
              />
              <TypeCard
                icon={TYPE_ICONS.boolean}
                label="Toggle"
                desc="On/Off, True/False"
                onClick={() => handleTypeSelect("boolean")}
              />
              <TypeCard
                icon={TYPE_ICONS.checkbox}
                label="Checkboxes"
                desc="Select multiple options"
                onClick={() => handleTypeSelect("checkbox")}
              />
              <TypeCard
                icon={TYPE_ICONS.radio}
                label="Radio Group"
                desc="Select one (visible)"
                onClick={() => handleTypeSelect("radio")}
              />
            </div>
          )}

          {step === "config" && (
            <form
              id="attribute-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* CORE SETTINGS */}
              <div className="space-y-4 p-4 border rounded-lg bg-muted/10">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600" /> Core
                  Settings
                </h4>

                {/* Row 1: Label (Full Width) */}
                <div className="grid gap-2">
                  <Label>
                    Attribute Label <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...form.register("label")}
                    placeholder="e.g. Sleeve Length"
                    autoFocus
                  />
                  {errors.label && (
                    <p className="text-xs text-red-500">
                      {errors.label.message}
                    </p>
                  )}
                </div>

                {/* Row 2: Database Key (Full Width) */}
                <div className="grid gap-2">
                  <Label>Database Key</Label>
                  <Input
                    {...form.register("key")}
                    readOnly
                    className="font-mono text-xs bg-muted text-muted-foreground"
                  />
                  {errors.key && (
                    <p className="text-xs text-red-500">{errors.key.message}</p>
                  )}
                </div>

                {/* Row 3: Order & Requirement (Split Columns) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      {...form.register("order", { valueAsNumber: true })}
                      placeholder="e.g. 1"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Requirement</Label>
                    <Controller
                      control={control}
                      name="required"
                      render={({ field }) => (
                        <div className="flex items-center justify-between border rounded-md px-3 h-10 bg-background">
                          <span className="text-sm text-muted-foreground">
                            Required?
                          </span>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* TYPE SPECIFIC CONFIGURATION */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">Type Configuration</h4>

                {/* A. TEXT INPUT */}
                {selectedType === "text" && (
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Data Format</Label>
                      <Controller
                        control={control}
                        name="config.format"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="string">Any Text</SelectItem>
                              <SelectItem value="integer">
                                Integer Number
                              </SelectItem>
                              <SelectItem value="decimal">
                                Decimal Number
                              </SelectItem>
                              <SelectItem value="url">URL / Link</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Placeholder</Label>
                      <Input
                        {...form.register("config.placeholder")}
                        placeholder="e.g. Enter value..."
                      />
                    </div>
                  </div>
                )}

                {/* B. TEXTAREA */}
                {selectedType === "textarea" && (
                  <div className="grid gap-4">
                    <Controller
                      control={control}
                      name="config.richText"
                      render={({ field }) => (
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <div className="space-y-0.5">
                            <Label>Rich Text Editor</Label>
                            <p className="text-xs text-muted-foreground">
                              Enable formatting?
                            </p>
                          </div>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      )}
                    />
                    <div className="grid gap-2">
                      <Label>Character Limit</Label>
                      <Input
                        type="number"
                        {...form.register("config.softLimit")}
                        placeholder="e.g. 500"
                      />
                    </div>
                  </div>
                )}

                {/* C. OPTIONS (Select/Radio/Checkbox) */}
                {(selectedType === "select" ||
                  selectedType === "radio" ||
                  selectedType === "checkbox") && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Options List</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => append({ label: "", value: "" })}
                        className="h-6 text-xs text-blue-600"
                      >
                        + Add Option
                      </Button>
                    </div>

                    <div className="border rounded-md divide-y overflow-hidden">
                      <div className="bg-muted/50 grid grid-cols-[1fr_1fr_32px] gap-2 px-3 py-2 text-[10px] font-medium uppercase text-muted-foreground">
                        <span>Label</span>
                        <span>Value</span>
                        <span></span>
                      </div>
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="grid grid-cols-[1fr_1fr_32px] gap-2 p-2 items-center bg-background"
                        >
                          <Input
                            {...form.register(
                              `config.options.${index}.label` as any,
                            )}
                            className="h-8 text-xs"
                            placeholder="Label"
                            onChange={(e) => {
                              setValue(
                                `config.options.${index}.label` as any,
                                e.target.value,
                              );
                              // Auto-gen value
                              const val = e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "_");
                              setValue(
                                `config.options.${index}.value` as any,
                                val,
                              );
                            }}
                          />
                          <Input
                            {...form.register(
                              `config.options.${index}.value` as any,
                            )}
                            className="h-8 text-xs font-mono"
                            placeholder="value"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-rose-600"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {(errors as any)?.config?.options && (
                      <p className="text-xs text-red-500">
                        At least one option is required.
                      </p>
                    )}
                  </div>
                )}

                {/* D. BOOLEAN */}
                {selectedType === "boolean" && (
                  <div className="grid gap-4">
                    <Controller
                      control={control}
                      name="config.defaultState"
                      render={({ field }) => (
                        <div className="flex items-center justify-between border p-3 rounded-md">
                          <Label>Default State</Label>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>True Label</Label>
                        <Input {...form.register("config.trueLabel")} />
                      </div>
                      <div className="grid gap-2">
                        <Label>False Label</Label>
                        <Input {...form.register("config.falseLabel")} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </ScrollArea>

        <SheetFooter className="px-6 py-4 border-t bg-muted/5 sm:justify-between shrink-0">
          {step === "config" ? (
            <>
              <Button variant="outline" onClick={() => setStep("select")}>
                Back
              </Button>
              <Button
                type="submit"
                form="attribute-form"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Attribute
              </Button>
            </>
          ) : (
            <SheetClose asChild>
              <Button variant="ghost" className="w-full">
                Cancel
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Map RHF data back to your Domain Type
function mapConfigToDomain(data: AttributeFormValues): Partial<Attribute> {
  const config: any = {};
  let validation: any = {};

  if (data.type === "text") {
    config.placeholder = data.config.placeholder;
    validation.format = data.config.format;
  } else if (data.type === "textarea") {
    config.richText = data.config.richText;
    validation.softLimit = data.config.softLimit;
  } else if (
    data.type === "select" ||
    data.type === "radio" ||
    data.type === "checkbox"
  ) {
    config.options = data.config.options;
  } else if (data.type === "boolean") {
    config.trueLabel = data.config.trueLabel;
    config.falseLabel = data.config.falseLabel;
    config.defaultValue = data.config.defaultState;
  }

  return { config, validation };
}

function TypeCard({
  icon,
  label,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group space-y-2 h-full"
    >
      <div className="p-2 rounded-md bg-muted group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
        {icon}
      </div>
      <div>
        <span className="text-sm font-semibold block">{label}</span>
        <span className="text-[10px] text-muted-foreground leading-tight block mt-1">
          {desc}
        </span>
      </div>
    </button>
  );
}
