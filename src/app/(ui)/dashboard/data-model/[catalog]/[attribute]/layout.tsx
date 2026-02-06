import DataModelHeader from "@/modules/products/components/data-model/DataModelHeader";
import { DataModelSidebar } from "@/modules/products/components/data-model/DataModelSidebar";
import { AttributeGroup } from "@/modules/products/types/data-model";
import { Database, Palette, Ruler, Upload,      // Product Info
  Scale,         // Metal
  Gem,           // Stone / Diamond
     // Design
  BadgeCheck,    // Certification
  ShieldCheck,   // Pricing
 } from "lucide-react";
import React from "react";

// --- Mock Data (Moved outside component to serve as initial state) ---
const GROUPS: AttributeGroup[] = [
 {
    id: "core-info",
    name: "Product Info",
    description: "Core jewellery product details",
    count: 10,
    icon: <Database className="w-4 h-4" />,
  },
 {
    id: "product-dimensions",
    name: "Product Dimensions",
    description: "Core jewellery product dimensions",
    count: 10,
    icon: <Ruler className="w-4 h-4" />,
  },
  {
    id: "metal-details",
    name: "Metal Details",
    description: "Gold, silver, purity, weight, wastage",
    count: 8,
    icon: <Scale className="w-4 h-4" />,
  },
  // {
  //   id: "stone-details",
  //   name: "Stone / Diamond",
  //   description: "Diamond & gemstone configuration",
  //   count: 9,
  //   icon: <Gem className="w-4 h-4" />,
  // },
  {
    id: "design",
    name: "Design",
    description: "Style, theme, craft, polish, finish",
    count: 6,
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: "certification",
    name: "Certification",
    description: "Hallmarking & authenticity",
    count: 5,
    icon: <BadgeCheck className="w-4 h-4" />,
  },
  {
    id: "pricing",
    name: "Pricing",
    description: "Metal, stone, tax & charges calculation",
    count: 6,
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    id: "publishing",
    name: "Publishing",
    description: "Visibility, SEO & publishing control",
    count: 4,
    icon: <Upload className="w-4 h-4" />,
  },
];

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ attribute: string; catalog: string }>;
}) => {
  const { attribute, catalog } = await params;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      <DataModelHeader slug={attribute} />

      <div className="flex-1 flex overflow-hidden">
        <DataModelSidebar
          groups={GROUPS}
          activeGroupId={attribute}
          catalog={catalog}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
