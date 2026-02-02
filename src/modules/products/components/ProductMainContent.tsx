/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Product } from "../types/product";
import { AttributeGroup, Attribute } from "@/modules/products/types/data-model";
import {
  AlertCircle,
  Database,
  Info,
  LayoutGrid,
  LayoutTemplate,
  List,
  Image as ImageIcon, // Added distinct icon for media
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DynamicAttributeField } from "./DynamicAttributeField";
import ProductVariantsTab from "./ProductVariantsTab";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProductDimensions from "./ProductDimensions";
import MetalDetails from "./ProductMetalDetails";
import CertificationDetails from "./CertificationDetails";
import PublishingDetails from "./PublishingDetails";
import DesignDetails from "./DesignDetails";

// --- MOCK SCHEMA DATA ---
const SCHEMA_GROUPS: AttributeGroup[] = [
  {
    id: "product-info",
    name: "Product Info",
    description: "Basic product information",
    count: 4,
    icon: <Info className="w-4 h-4" />,
  },
  {
    id: "product-dimensions",
    name: "Product Dimensions",
    description: "Basic product information",
    count: 4,
    icon: <Info className="w-4 h-4" />,
  },
  {
    id: "metal-details",
    name: "Metal Details",
    description: "Metal Configuration",
    count: 4,
    icon: <Info className="w-4 h-4" />,
  },
  {
    id: "specs",
    name: "Design Specs",
    description: "Technical specifications",
    count: 6,
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    id: "certification",
    name: "Certification",
    description: "Hallmark & authenticity",
    count: 6,
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    id: "pricing",
    name: "Pricing",
    description: "Price & tax calculation",
    count: 6,
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    id: "publishing",
    name: "Publishing",
    description: "Visibility & SEO",
    count: 6,
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  // {
  //   id: "logistics",
  //   name: "Logistics",
  //   description: "Shipping and handling",
  //   count: 2,
  //   icon: <Database className="w-4 h-4" />,
  // },
];

const SCHEMA_ATTRIBUTES: Attribute[] = [
  // Core Group
  {
    id: "1",
    name: "Product Name",
    key: "name",
    type: "text",
    required: true,
    order: 1,
    config: { placeholder: "e.g. Domino Sofa" },
  },
  {
    id: "2",
    name: "Seller",
    key: "Seller",
    type: "select",
    required: true,
    order: 2,
    config: {
      options: [
        { label: "Nordic Jewels", value: "nordic_jewels" },
        { label: "Linea Italia Jewels", value: "linea_italia_jewels" },
      ],
    },
  },
  {
    id: "3",
    name: "SKU",
    key: "sku",
    type: "text",
    required: true,
    order: 3,
    config: { placeholder: "Enter SKU..." },
  },
  {
    id: "4",
    name: "Description",
    key: "description",
    type: "textarea",
    required: false,
    order: 4,
    config: { placeholder: "Detailed product description..." },
  },
  {
    id: "5",
    name: "Status",
    key: "is_active",
    type: "boolean",
    required: false,
    order: 5,
    config: { trueLabel: "Active", falseLabel: "Inactive" },
  },
  // Specs Group
  {
    id: "6",
    name: "Base Material",
    key: "base_material",
    type: "select",
    required: true,
    order: 1,
    config: {
      options: [
        // --- Gold ---
        { label: "22K Gold", value: "22k_gold" },
        { label: "18K Gold", value: "18k_gold" },
        { label: "14K Gold", value: "14k_gold" },

        // --- Silver / Platinum ---
        { label: "925 Silver", value: "925_silver" },
        { label: "Platinum", value: "platinum" },

        // --- Gold Variants ---
        { label: "White Gold", value: "white_gold" },
        { label: "Rose Gold", value: "rose_gold" },

        // --- Stones ---
        { label: "Diamond", value: "diamond" },
        { label: "Lab Grown Diamond", value: "lab_grown_diamond" },
        //   { label: "Ruby", value: "ruby" },
        //   { label: "Emerald", value: "emerald" },
        //   { label: "Sapphire", value: "sapphire" },
        //   { label: "Blue Sapphire", value: "blue_sapphire" },
        //   { label: "Yellow Sapphire", value: "yellow_sapphire" },
        //   { label: "Pearl", value: "pearl" },
        //   { label: "Moissanite", value: "moissanite" },
        //   { label: "Topaz", value: "topaz" },
        //   { label: "Amethyst", value: "amethyst" },
        //   { label: "Garnet", value: "garnet" },
        //   { label: "Opal", value: "opal" },
        //   { label: "Turquoise", value: "turquoise" },
        //   { label: "Coral", value: "coral" },
        //   { label: "Zircon", value: "zircon" },
      ],
    },
  },
  {
    id: "7",
    name: "Leg Finish",
    key: "leg_finish",
    type: "radio",
    required: true,
    order: 2,
    config: {
      options: [
        { label: "Matte", value: "matte" },
        { label: "Gloss", value: "gloss" },
        { label: "Brushed", value: "brushed" },
      ],
    },
  },
  {
    id: "6",
    name: "Outdoor Use",
    key: "is_outdoor",
    type: "boolean",
    required: false,
    order: 3,
    config: { trueLabel: "Yes", falseLabel: "No" },
  },
  {
    id: "7",
    name: "Features",
    key: "features",
    type: "checkbox",
    required: false,
    order: 4,
    config: {
      options: [
        { label: "Reclining", value: "reclining" },
        { label: "Modular", value: "modular" },
        { label: "Stain Resistant", value: "stain_resistant" },
      ],
    },
  },

  // Logistics Group
  {
    id: "8",
    name: "Weight (kg)",
    key: "weight",
    type: "text",
    required: true,
    order: 1,
    validation: { format: "decimal" },
  },
  {
    id: "9",
    name: "Fragile",
    key: "is_fragile",
    type: "boolean",
    required: false,
    order: 2,
  },
];

type ViewMode = "tabs" | "accordion";

const ProductMainContent = ({ product }: { product: Product }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("tabs");
  const [activeTab, setActiveTab] = useState(SCHEMA_GROUPS[0].id);

  // Form State (Shared between views)
  const [formData, setFormData] = useState<Record<string, any>>({
    name: product.name,
    Seller: product.Seller.toLowerCase(),
    description: product.description,
  });

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Helper to filter attributes per group (Memoized logic)
  const getGroupAttributes = (groupId: string) => {
    return SCHEMA_ATTRIBUTES.filter((attr) => {
      if (groupId === "product-info")
        return ["1", "2", "3", "4", "5"].includes(attr.id);
      if (groupId === "specs") return [, "6", "7"].includes(attr.id);
      if (groupId === "logistics") return ["8", "9"].includes(attr.id);
      return false;
    }).sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto bg-muted/10 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Area: QC Alert & View Switcher */}
        <div className="flex flex-col gap-4">
          {/* Alert */}
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 px-4 py-3 rounded-md flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div className="text-sm">
              <span className="font-semibold">QC Alert:</span> Image
              unavailable.
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto bg-transparent border-rose-300 hover:bg-rose-100 text-rose-800 h-7 text-xs"
            >
              Fix Now
            </Button>
          </div>

          {/* View Switcher */}
          <div className="flex justify-end">
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(val) => {
                val && setViewMode(val as ViewMode);
              }}
            >
              <ToggleGroupItem
                value="tabs"
                aria-label="Tabs View"
                className="h-8 w-8 p-0"
              >
                <LayoutTemplate className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="accordion"
                aria-label="Accordion View"
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* --- VIEW 1: TABS LAYOUT --- */}
        {viewMode === "tabs" && (
          <Tabs
            defaultValue={SCHEMA_GROUPS[0].id}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="mb-6 overflow-x-auto pb-1">
              <TabsList className="w-full justify-start h-auto p-1 bg-transparent gap-2">
                {SCHEMA_GROUPS.map((group) => (
                  <TabsTrigger
                    key={group.id}
                    value={group.id}
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border px-4 py-2"
                  >
                    <div className="flex items-center gap-2">
                      {group.icon} <span>{group.name}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Dynamic Groups */}
            {SCHEMA_GROUPS.map(
              (group) =>
                ["product-info"].includes(activeTab) && (
                  <TabsContent
                    key={group.id}
                    value={group.id}
                    className="space-y-6 mt-0"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {getGroupAttributes(group.id).map((attr) => (
                            <DynamicAttributeField
                              key={attr.id}
                              attribute={attr}
                              value={formData[attr.key]}
                              onChange={(val) =>
                                handleFieldChange(attr.key, val)
                              }
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ),
            )}

            <TabsContent value="pricing" className="mt-0">
              <ProductVariantsTab />
            </TabsContent>
            <TabsContent value="product-dimensions" className="mt-0">
              <ProductDimensions />
            </TabsContent>
            <TabsContent value="metal-details" className="mt-0">
              <MetalDetails />
            </TabsContent>
            <TabsContent value="certification" className="mt-0">
              <CertificationDetails />
            </TabsContent>
            <TabsContent value="publishing" className="mt-0">
              <PublishingDetails />
            </TabsContent>
            <TabsContent value="specs" className="mt-0">
              <DesignDetails />
            </TabsContent>
          </Tabs>
        )}

        {/* --- VIEW 2: ACCORDION LAYOUT (Updated Logic) --- */}
        {viewMode === "accordion" && (
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue={SCHEMA_GROUPS[0].id}
          >
            {/* Dynamic Groups */}
            {SCHEMA_GROUPS.map((group) => (
              <AccordionItem
                key={group.id}
                value={group.id}
                className="border rounded-lg bg-card px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-muted/50 rounded-md text-blue-600">
                      {group.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {group.name}
                      </div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {group.description}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
                    {getGroupAttributes(group.id).map((attr) => (
                      <DynamicAttributeField
                        key={attr.id}
                        attribute={attr}
                        value={formData[attr.key]}
                        onChange={(val) => handleFieldChange(attr.key, val)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}

            {/* Fixed Pricing Group */}
            <AccordionItem
              value="pricing"
              className="border rounded-lg bg-card px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-muted/50 rounded-md text-blue-600">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-foreground">
                    Pricing & Variants
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <ProductVariantsTab />
              </AccordionContent>
            </AccordionItem>
            {/* <TabsTrigger
                  value="pricing"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border px-4 py-2"
                >
                  Pricing & Variants
                </TabsTrigger>
                <TabsTrigger
                  value="media"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border px-4 py-2"
                >
                  Product Dimensions
                </TabsTrigger>
                <TabsTrigger
                  value="metal-details"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border px-4 py-2"
                >
                  Metal Details
                </TabsTrigger> */}
            {/* Fixed Media Group */}
            <AccordionItem
              value="media"
              className="border rounded-lg bg-card px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-muted/50 rounded-md text-blue-600">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-foreground">
                    Product Dimensions
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <ProductDimensions />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="metal-details"
              className="border rounded-lg bg-card px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-muted/50 rounded-md text-blue-600">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-foreground">
                    Metal Details
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <MetalDetails />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </main>
  );
};

// Helper for empty media state
const MediaPlaceholder = () => (
  <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg p-12 text-muted-foreground bg-muted/5">
    <div className="text-center">
      <p>Detailed Media Settings</p>
      <p className="text-xs">Use the sidebar for quick viewing</p>
    </div>
  </div>
);

export default ProductMainContent;
