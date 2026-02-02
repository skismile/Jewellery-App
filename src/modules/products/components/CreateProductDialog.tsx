"use client";

import React, { useState } from "react";
import { Plus, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateProductDialog() {

  const catalogs = [
  {
    id: "rings",
    name: "Rings",

  },
  {
    id: "necklaces",
    name: "Necklaces",

  },
  {
    id: "earrings",
    name: "Earrings",

  },
  {
    id: "bangles",
    name: "Bangles & Bracelets",

  },
];
  const brands = [
  {
    id: "nordicjewels",
    name: "Nordic Jewels",

  },
  {
    id: "lineaitaliajewels",
    name: "Linea Italia Jewels",

  },
  {
    id: "casaFormajewels",
    name: "CasaForma Jewels",

  },
 
  {
    id: "atelierbridaljewels",
    name: "Atelier Bridal Jewels",

  },
  {
    id: "formastudiojewels",
    name: "Forma Studio Jewels",

  },
];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [jewelleryType, setJewelleryType] = useState("");
  const [step, setStep] = useState(1); // 1 = Type Selection, 2 = MVP Details

  const handleCreate = async () => {
    setLoading(true);

    // Simulate API Call to create ID in correct collection
    // e.g. POST /items/sofas or POST /items/armchairs
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setOpen(false);

    // In real app: router.push(`/admin/products/${furnitureType.toLowerCase()}/${newId}`);
    console.log("Redirecting to Edit Page...");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary text-primary-foreground shadow-sm">
          <Plus size={16} />
          Create Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] gap-0 p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-muted/10">
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription className="mt-1">
            {step === 1
              ? "Select the product category to begin."
              : "Enter basic identification details."}
          </DialogDescription>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1: Collection Routing [cite: 263-281] */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
              <div className="space-y-2">
                <Label>Jewellery Type (Collection)</Label>
                <Select value={jewelleryType} onValueChange={setJewelleryType}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select Category..." />
                  </SelectTrigger>
                  <SelectContent>

                    {catalogs.map((catalog) => (
                      <SelectItem key={catalog.id} value={catalog.name}>
                        {catalog.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="Ring">Rings</SelectItem>
                    <SelectItem value="Armchair">Armchairs</SelectItem>
                    <SelectItem value="Table">Tables</SelectItem>
                    <SelectItem value="Console">Consoles</SelectItem>
                    <SelectItem value="Bench">Benches</SelectItem> */}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground">
                  This determines which database table the product is saved to.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: MVP Fields [cite: 317-323] */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Brand Name</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b)=><SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>)}
                      {/* <SelectItem value="Gyform">Gyform</SelectItem>
                      <SelectItem value="Minotti">Minotti</SelectItem>
                      <SelectItem value="B&B Italia">B&B Italia</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Design Code</Label>
                  <Input placeholder="e.g. D1" className="font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input placeholder="e.g. Domino" />
              </div>

              <div className="space-y-2">
                <Label>Initial Assignment [cite: 374]</Label>
                <Select defaultValue="group1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group1">
                      Group 1 (Design Team)
                    </SelectItem>
                    <SelectItem value="group2">Group 2 (Pricing)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-muted/10 border-t flex justify-between items-center">
          {step === 2 ? (
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              Back
            </Button>
          ) : (
            <div /> /* Spacer */
          )}

          {step === 1 ? (
            <Button
              onClick={() => setStep(2)}
              disabled={!jewelleryType}
              className="gap-2"
            >
              Next Step <ArrowRight size={14} />
            </Button>
          ) : (
            <Button onClick={handleCreate} disabled={loading} className="gap-2">
              {loading && <Loader2 size={14} className="animate-spin" />}
              Create Draft
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
