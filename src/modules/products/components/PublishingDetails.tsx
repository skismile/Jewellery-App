/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { Pencil, Save, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/* ---------------- COMPONENT ---------------- */
export default function PublishingDetails() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    publish_status: false,
    visibility: "",
    seo_title: "",
    seo_description: "",
  });

  const update = (key: string, value: any) => {
    if (!isEditing) return;
    setForm((p) => ({ ...p, [key]: value }));
  };

  const onSave = () => {
    // 🔗 API CALL
    console.log("Saved Publishing Details:", form);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Globe size={18} />
            Publishing
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

        {/* Publishing Section */}
        <Section title="Visibility & SEO">
          {/* Publish Status */}
          <BooleanField
            label="Publish Status"
            required
            disabled={!isEditing}
            value={form.publish_status}
            onChange={(v: boolean) => update("publish_status", v)}
          />

          {/* Visibility */}
          <SelectField
            label="Visibility"
            required
            disabled={!isEditing}
            value={form.visibility}
            onChange={(v: string) => update("visibility", v)}
            options={["Public", "Private", "Draft"]}
          />

          {/* SEO Title */}
          <Field
            label="SEO Title"
            value={form.seo_title}
            disabled={!isEditing}
            onChange={(v: string) => update("seo_title", v)}
          />

          {/* SEO Description */}
          <TextAreaField
            label="SEO Description"
            value={form.seo_description}
            disabled={!isEditing}
            onChange={(v: string) => update("seo_description", v)}
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

const Field = ({ label, value, onChange, disabled, required }: any) => (
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

const TextAreaField = ({ label, value, onChange, disabled, required }: any) => (
  <div className="md:col-span-2">
    <Label className="text-xs flex gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <Textarea
      rows={4}
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

const BooleanField = ({ label, value, onChange, disabled, required }: any) => (
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
