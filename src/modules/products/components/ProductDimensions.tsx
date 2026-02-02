"use client";

import { useState } from "react";
import { Pencil, Save, Ruler } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ---------------- COMPONENT ---------------- */
export default function ProductDimensions() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    size: "",
    length: "",
    breadth: "",
    width: "",
    height: "",
    diameter: "",
    band_thickness: "",
    crown_height: "",
    table_size: "",
    depth: "",
    girdle: "",
  });

  const update = (key: string, value: string) => {
    if (!isEditing) return;
    setForm((p) => ({ ...p, [key]: value }));
  };

  const onSave = () => {
    // 🔗 API call here
    console.log("Saved Product Dimensions:", form);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Ruler size={18} />
              Product Dimensions
            </h2>

            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Pencil size={14} className="mr-2" />
                Edit
              </Button>
            ) : (
              <Button onClick={onSave}>
                <Save size={14} className="mr-2" />
                Save
              </Button>
            )}
          </div>

          {/* Required */}
          <Section title="Required Dimensions">
            <Field
              label="Size"
              required
              value={form.size}
              disabled={!isEditing}
              onChange={(v) => update("size", v)}
            />
            <Field
              label="Length (mm)"
              required
              value={form.length}
              disabled={!isEditing}
              onChange={(v) => update("length", v)}
            />
            <Field
              label="Breadth (mm)"
              required
              value={form.breadth}
              disabled={!isEditing}
              onChange={(v) => update("breadth", v)}
            />
            <Field
              label="Width (mm)"
              required
              value={form.width}
              disabled={!isEditing}
              onChange={(v) => update("width", v)}
            />
            <Field
              label="Height (mm)"
              required
              value={form.height}
              disabled={!isEditing}
              onChange={(v) => update("height", v)}
            />
          </Section>

          {/* Optional */}
          <Section title="Optional Dimensions">
            <Field
              label="Diameter (mm)"
              value={form.diameter}
              disabled={!isEditing}
              onChange={(v) => update("diameter", v)}
            />
            <Field
              label="Band Thickness (mm)"
              value={form.band_thickness}
              disabled={!isEditing}
              onChange={(v) => update("band_thickness", v)}
            />
            <Field
              label="Crown Height (mm)"
              value={form.crown_height}
              disabled={!isEditing}
              onChange={(v) => update("crown_height", v)}
            />
            <Field
              label="Table Size (%)"
              value={form.table_size}
              disabled={!isEditing}
              onChange={(v) => update("table_size", v)}
            />
            <Field
              label="Depth (%)"
              value={form.depth}
              disabled={!isEditing}
              onChange={(v) => update("depth", v)}
            />
            <Field
              label="Girdle"
              value={form.girdle}
              disabled={!isEditing}
              onChange={(v) => update("girdle", v)}
            />
          </Section>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm font-semibold mb-3 text-gray-600">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Field = ({
  label,
  value,
  onChange,
  disabled,
  required,
}: {
  label: string;
  value: string;
  disabled: boolean;
  required?: boolean;
  onChange: (v: string) => void;
}) => (
  <div>
    <Label className="text-xs flex gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
