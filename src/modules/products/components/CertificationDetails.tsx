/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Pencil, Save, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ---------------- COMPONENT ---------------- */
export default function CertificationDetails() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    diamond_certificate: "",
    certificate_no: "",
    hallmark: false,
  });

  const update = (key: string, value: any) => {
    if (!isEditing) return;
    setForm((p) => ({ ...p, [key]: value }));
  };

  const onSave = () => {
    // 🔗 API CALL
    console.log("Saved Certification Details:", form);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BadgeCheck size={18} />
            Certification
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

        {/* Certification Section */}
        <Section title="Hallmark & Authenticity">
          {/* Diamond Certification */}
          <SelectField
            label="Diamond Certification"
            required
            disabled={!isEditing}
            value={form.diamond_certificate}
            onChange={(v: string) => update("diamond_certificate", v)}
            options={[
              "GIA",
              "IGI",
              "HRD",
              "SGL",
              "None",
            ]}
          />

          {/* Certificate Number */}
          <Field
            label="Certificate Number"
            value={form.certificate_no}
            disabled={!isEditing}
            onChange={(v: string) => update("certificate_no", v)}
          />

          {/* Hallmark */}
          <BooleanField
            label="Hallmark"
            required
            disabled={!isEditing}
            value={form.hallmark}
            onChange={(v: boolean) => update("hallmark", v)}
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

const Field = ({
  label,
  value,
  onChange,
  disabled,
  required,
}: any) => (
  <div>
    <Label className="text-xs flex gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
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

const BooleanField = ({
  label,
  value,
  onChange,
  disabled,
  required,
}: any) => (
  <div>
    <Label className="text-xs flex gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>

    <div className="flex gap-4 mt-2">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          disabled={disabled}
          checked={value === true}
          onChange={() => onChange(true)}
        />
        Yes
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          disabled={disabled}
          checked={value === false}
          onChange={() => onChange(false)}
        />
        No
      </label>
    </div>
  </div>
);
