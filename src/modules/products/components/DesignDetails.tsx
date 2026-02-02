/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Pencil, Save, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/* ---------------- COMPONENT ---------------- */
export default function DesignDetails() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    setting_type: "",
    design_style: "",
    polish: "",
    finish: "",
    symmetry: "",
  });

  const update = (key: string, value: any) => {
    if (!isEditing) return;
    setForm((p) => ({ ...p, [key]: value }));
  };

  const onSave = () => {
    // 🔗 API CALL
    console.log("Saved Design Details:", form);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Palette size={18} />
            Design
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

        {/* Design Section */}
        <Section title="Style, Theme & Polish">
          {/* Setting Type */}
          <SelectField
            label="Setting Type"
            required
            disabled={!isEditing}
            value={form.setting_type}
            onChange={(v: string) => update("setting_type", v)}
            options={[
              "Prong",
              "Bezel",
              "Pave",
              "Channel",
              "Halo",
              "Invisible",
            ]}
          />

          {/* Design Style */}
          <SelectField
            label="Design Style"
            disabled={!isEditing}
            value={form.design_style}
            onChange={(v: string) => update("design_style", v)}
            options={[
              "Classic",
              "Modern",
              "Vintage",
              "Minimal",
              "Luxury",
              "Traditional",
            ]}
          />

          {/* Polish */}
          <SelectField
            label="Polish"
            required
            disabled={!isEditing}
            value={form.polish}
            onChange={(v: string) => update("polish", v)}
            options={[
              "High Polish",
              "Matte",
              "Satin",
              "Brushed",
              "Glossy",
            ]}
          />

          {/* Finish */}
          <SelectField
            label="Finish"
            disabled={!isEditing}
            value={form.finish}
            onChange={(v: string) => update("finish", v)}
            options={[
              "Smooth",
              "Textured",
              "Hammered",
              "Engraved",
            ]}
          />

          {/* Symmetry */}
          <SelectField
            label="Symmetry"
            disabled={!isEditing}
            value={form.symmetry}
            onChange={(v: string) => update("symmetry", v)}
            options={[
              "Symmetrical",
              "Asymmetrical",
              "Radial",
              "Organic",
            ]}
          />
        </Section>
      </CardContent>
    </Card>
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
    <h3 className="text-sm font-semibold mb-3 text-gray-600">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  disabled,
  options,
  required,
}: any) => (
  <div>
    <Label className="text-xs flex gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <select
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-muted"
    >
      <option value="">Select</option>
      {options.map((o: string) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);
