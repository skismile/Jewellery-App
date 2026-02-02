

"use client";

import { useEffect, useState } from "react";
import { Pencil, Save, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ---------------- COMPONENT ---------------- */
export default function MetalDetails() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    metal_type: "",
    metal_color: "",
    purity: "",
    gross_weight: "",
    metal_rate: "",
    metal_value: 0,
  });

  /* ---------------- AUTO CALC ---------------- */
  useEffect(() => {
    if (!isEditing) return;

    const weight = Number(form.gross_weight) || 0;
    const rate = Number(form.metal_rate) || 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((p) => ({
      ...p,
      metal_value: Math.round(weight * rate),
    }));
  }, [isEditing, form.gross_weight, form.metal_rate]);

  const update = (key: string, value: string) => {
    if (!isEditing) return;
    setForm((p) => ({ ...p, [key]: value }));
  };

  const onSave = () => {
    // 🔗 API CALL
    console.log("Saved Metal Details:", form);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Scale size={18} />
              Metal Details
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

          {/* Select Fields */}
          <Section title="Metal Configuration">
            <SelectField
              label="Metal Type"
              required
              disabled={!isEditing}
              value={form.metal_type}
              onChange={(v: string) => update("metal_type", v)}
              options={["Gold", "Silver", "Platinum"]}
            />

            <SelectField
              label="Metal Color"
              required
              disabled={!isEditing}
              value={form.metal_color}
              onChange={(v: string) => update("metal_color", v)}
              options={["Yellow", "White", "Rose"]}
            />

            <SelectField
              label="Purity"
              required
              disabled={!isEditing}
              value={form.purity}
              onChange={(v: string) => update("purity", v)}
              options={["24K", "22K", "18K", "14K"]}
            />
          </Section>

          {/* Weight & Rate */}
          <Section title="Weight & Rate">
            <Field
              label="Metal Weight (grams)"
              required
              value={form.gross_weight}
              disabled={!isEditing}
              onChange={(v: string) => update("gross_weight", v)}
            />

            <Field
              label="Metal Rate / gram"
              required
              value={form.metal_rate}
              disabled={!isEditing}
              onChange={(v: string) => update("metal_rate", v)}
            />

            <ReadOnly
              label="Metal Value"
              value={`₹ ${form.metal_value}`}
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <div>
    <Label className="text-xs flex gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      type="number"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReadOnly = ({ label, value }: any) => (
  <div>
    <Label className="text-xs">{label}</Label>
    <Input value={value} disabled />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  disabled,
  options,
  required,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
