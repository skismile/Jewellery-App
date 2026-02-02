// "use client";

// import { use, useState } from "react";
// import {
//   Database,
//   Search as SearchIcon,
//   Filter,
//   ArrowUpDown,
//   Palette,
//   Ruler,
//   Upload,
//   // Product Info
//   Scale, // Metal
//   Gem, // Stone / Diamond
//   // Design
//   BadgeCheck, // Certification
//   ShieldCheck, // Pricing
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Attribute, AttributeGroup } from "@/modules/products/types/data-model";
// import { AttributeTable } from "@/modules/products/components/data-model/AttributeTable";
// import { AttributeDrawer } from "@/modules/products/components/data-model/AttributeDrawer";

// // --- Mock Data (Moved outside component to serve as initial state) ---
// const GROUPS: AttributeGroup[] = [
//   {
//     id: "core-info",
//     name: "Product Info",
//     description: "Core jewellery product details",
//     count: 10,
//     icon: <Database className="w-4 h-4" />,
//   },
//   {
//     id: "metal-details",
//     name: "Metal Details",
//     description: "Gold, silver, purity, weight, wastage",
//     count: 8,
//     icon: <Scale className="w-4 h-4" />,
//   },
//   {
//     id: "stone-details",
//     name: "Stone / Diamond",
//     description: "Diamond & gemstone configuration",
//     count: 9,
//     icon: <Gem className="w-4 h-4" />,
//   },
//   {
//     id: "design",
//     name: "Design",
//     description: "Style, theme, craft, polish, finish",
//     count: 6,
//     icon: <Palette className="w-4 h-4" />,
//   },
//   {
//     id: "certification",
//     name: "Certification",
//     description: "Hallmarking & authenticity",
//     count: 5,
//     icon: <BadgeCheck className="w-4 h-4" />,
//   },
//   {
//     id: "pricing",
//     name: "Pricing",
//     description: "Metal, stone, tax & charges calculation",
//     count: 6,
//     icon: <ShieldCheck className="w-4 h-4" />,
//   },
//   {
//     id: "publishing",
//     name: "Publishing",
//     description: "Visibility, SEO & publishing control",
//     count: 4,
//     icon: <Upload className="w-4 h-4" />,
//   },
// ];

// const INITIAL_ATTRIBUTES: Attribute[] = [
//   {
//     id: "1",
//     name: "Product Name",
//     key: "name",
//     type: "text",
//     required: true,
//     order: 1,
//   },
//   {
//     id: "2",
//     name: "Description",
//     key: "description",
//     type: "textarea",
//     required: false,
//     order: 2,
//   },
//   { id: "3", name: "SKU", key: "sku", type: "text", required: true, order: 3 },
//   {
//     id: "4",
//     name: "Base Price",
//     key: "price",
//     type: "text",
//     required: true,
//     order: 4,
//     validation: { format: "decimal" },
//   }, // Changed type to match 'text' w/ validation
//   {
//     id: "5",
//     name: "Brand",
//     key: "brand",
//     type: "select",
//     required: true,
//     order: 5,
//   },
//   {
//     id: "6",
//     name: "Active Status",
//     key: "status",
//     type: "boolean",
//     required: true,
//     order: 6,
//   },
// ];

// export default function DataModelPage({
//   params,
// }: {
//   params: Promise<{ attribute: string }>;
// }) {
//   const { attribute: slug } = use(params);

//   // --- State Management ---
//   const [searchQuery, setSearchQuery] = useState("");
//   // 1. Initialize State with Mock Data
//   const [attributes, setAttributes] = useState<Attribute[]>(INITIAL_ATTRIBUTES);

//   // 2. Logic: Add Attribute Handler
//   const handleAddAttribute = (newAttribute: Attribute) => {
//     // In a real app, you would determine the 'order' based on the list length
//     const attributeWithOrder = {
//       ...newAttribute,
//       order: attributes.length + 1,
//     };

//     setAttributes((prev) => [...prev, attributeWithOrder]);

//     // Optional: Show success toast here
//     // toast.success(`${newAttribute.name} added!`);
//   };

//   // 3. Logic: Filter Attributes based on Search
//   const filteredAttributes = attributes.filter((attr) => {
//     const term = searchQuery.toLowerCase();
//     return (
//       attr.name.toLowerCase().includes(term) ||
//       attr.key.toLowerCase().includes(term)
//     );
//   });

//   const activeGroupData = GROUPS.find((group) => group.id === slug);

//   if (!activeGroupData) {
//     return <div>Group not found</div>;
//   }

//   return (
//     <main className="flex-1 flex flex-col min-w-0 bg-background">
//       <div className="px-8 py-6 pb-2">
//         <div className="flex items-end justify-between mb-6">
//           <div>
//             <h2 className="text-2xl font-semibold tracking-tight">
//               {activeGroupData.name}
//             </h2>
//             <p className="text-sm text-muted-foreground mt-1">
//               {activeGroupData.description}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center justify-between gap-4">
//           <div className="relative max-w-sm w-full">
//             <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search attributes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9 bg-muted/30 border-muted"
//             />
//           </div>
//           <div className="flex items-center gap-4">
//             <Button
//               variant="outline"
//               size="sm"
//               className="h-9 border-dashed gap-2"
//             >
//               <Filter className="w-3.5 h-3.5" /> Type
//             </Button>
//             <AttributeDrawer
//               groupName={activeGroupData.name}
//               onSave={handleAddAttribute}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 overflow-auto px-8 pb-8">
//         {/* 5. Pass filtered state to Table */}
//         <AttributeTable attributes={filteredAttributes} />

//         <div className="mt-4 text-xs text-center text-muted-foreground">
//           Showing {filteredAttributes.length} attributes in{" "}
//           <strong>{activeGroupData.name}</strong>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { use, useState, useMemo } from "react";
import {
  Database,
  Search as SearchIcon,
  Filter,
  Palette,
  Upload,
  Scale,
  Gem,
  BadgeCheck,
  ShieldCheck,
  Ruler,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Attribute, AttributeGroup } from "@/modules/products/types/data-model";
import { AttributeTable } from "@/modules/products/components/data-model/AttributeTable";
import { AttributeDrawer } from "@/modules/products/components/data-model/AttributeDrawer";

/* ------------------ GROUPS ------------------ */
const GROUPS: AttributeGroup[] = [
  {
    id: "core-info",
    name: "Product Info",
    description: "Core jewellery product details",
    count: 6,
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
    description: "Gold, silver, purity, weight",
    count: 4,
    icon: <Scale className="w-4 h-4" />,
  },
  {
    id: "stone-details",
    name: "Stone / Diamond",
    description: "Diamond & gemstone configuration",
    count: 4,
    icon: <Gem className="w-4 h-4" />,
  },
  {
    id: "design",
    name: "Design",
    description: "Style, theme, polish",
    count: 3,
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: "certification",
    name: "Certification",
    description: "Hallmark & authenticity",
    count: 2,
    icon: <BadgeCheck className="w-4 h-4" />,
  },
  {
    id: "pricing",
    name: "Pricing",
    description: "Price & tax calculation",
    count: 3,
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    id: "publishing",
    name: "Publishing",
    description: "Visibility & SEO",
    count: 2,
    icon: <Upload className="w-4 h-4" />,
  },
];

/* ------------------ ATTRIBUTES PER GROUP ------------------ */
const INITIAL_ATTRIBUTES: Record<string, Attribute[]> = {
  /* ---------------- CORE INFO ---------------- */
  "core-info": [
    {
      id: "1",
      name: "Product Name",
      key: "name",
      type: "text",
      required: true,
      order: 1,
    },
    {
      id: "2",
      name: "Description",
      key: "description",
      type: "textarea",
      required: false,
      order: 2,
    },
    {
      id: "3",
      name: "SKU",
      key: "sku",
      type: "text",
      required: true,
      order: 3,
    },
    {
      id: "4",
      name: "Brand",
      key: "brand",
      type: "select",
      required: true,
      order: 4,
    },
    {
      id: "5",
      name: "Status",
      key: "status",
      type: "boolean",
      required: true,
      order: 5,
    },
  ],

  /* ---------------- PRODUCT DIMENSIONS ---------------- */
  "product-dimensions": [
    {
      id: "28",
      name: "Size",
      key: "size",
      type: "text",
      required: true,
      order: 1,
    },
    {
      id: "29",
      name: "Length (mm)",
      key: "length",
      type: "text",
      required: true,
      order: 1,
    },
    {
      id: "30",
      name: "Breadth (mm)",
      key: "breadth",
      type: "text",
      required: true,
      order: 2,
    },
    {
      id: "31",
      name: "Width (mm)",
      key: "width",
      type: "text",
      required: true,
      order: 3,
    },
    {
      id: "32",
      name: "Height (mm)",
      key: "height",
      type: "text",
      required: true,
      order: 4,
    },
    {
      id: "33",
      name: "Diameter (mm)",
      key: "diameter",
      type: "text",
      required: false,
      order: 5,
    },
    {
      id: "35",
      name: "band Thickness (mm)",
      key: "band_thickness",
      type: "text",
      required: false,
      order: 7,
    },
    {
      id: "36",
      name: "crown Height (mm)",
      key: "crown_height",
      type: "text",
      required: false,
      order: 8,
    },
    {
      id: "34",
      name: "Table Size (%)",
      key: "table_size",
      type: "text",
      required: false,
      order: 6,
    },
    {
      id: "37",
      name: "Depth (%)",
      key: "depth",
      type: "text",
      required: false,
      order: 9,
    },
    {
      id: "38",
      name: "Girdle",
      key: "girdle",
      type: "text",
      required: false,
      order: 10,
    },
  ],

  /* ---------------- METAL DETAILS ---------------- */
  "metal-details": [
    {
      id: "6",
      name: "Metal Type",
      key: "metal_type",
      type: "select",
      required: true,
      order: 1,
    }, // Gold, Platinum, Silver
    {
      id: "7",
      name: "Metal Color",
      key: "metal_color",
      type: "select",
      required: true,
      order: 2,
    }, // White, Yellow, Rose
    {
      id: "8",
      name: "Purity",
      key: "purity",
      type: "select",
      required: true,
      order: 3,
    }, // 14K, 18K, 22K
    {
      id: "9",
      name: "Metal Weight (grams)",
      key: "gross_weight",
      type: "text",
      required: true,
      order: 4,
    },
    {
      id: "10",
      name: "Metal Rate / gram",
      key: "metal_rate",
      type: "text",
      required: true,
      order: 5,
    },
    {
      id: "11",
      name: "Metal Value",
      key: "metal_value",
      type: "text",
      required: true,
      order: 6,
    },
  ],

  /* ---------------- STONE / DIAMOND DETAILS ---------------- */
  "stone-details": [
    {
      id: "12",
      name: "Stone Type",
      key: "stone_type",
      type: "select",
      required: true,
      order: 1,
    }, // Natural Diamond
    {
      id: "13",
      name: "Stone Shape",
      key: "stone_shape",
      type: "select",
      required: false,
      order: 2,
    },
    {
      id: "14",
      name: "Total Carat Weight",
      key: "stone_weight",
      type: "text",
      required: true,
      order: 3,
    },
    {
      id: "15",
      name: "Stone Count",
      key: "stone_count",
      type: "number",
      required: true,
      order: 4,
    },
    {
      id: "16",
      name: "Color",
      key: "color",
      type: "select",
      required: true,
      order: 5,
    },
    {
      id: "17",
      name: "Clarity",
      key: "clarity",
      type: "select",
      required: true,
      order: 6,
    },
    {
      id: "18",
      name: "Cut",
      key: "cut",
      type: "select",
      required: true,
      order: 7,
    },
    {
      id: "19",
      name: "Fluorescence",
      key: "fluorescence",
      type: "select",
      required: false,
      order: 8,
    },
    {
      id: "20",
      name: "Stone Rate / Carat",
      key: "stone_rate",
      type: "text",
      required: true,
      order: 9,
    },
    {
      id: "21",
      name: "Stone Value",
      key: "stone_value",
      type: "text",
      required: true,
      order: 10,
    },
  ],

  /* ---------------- DESIGN ---------------- */
  design: [
    {
      id: "22",
      name: "Setting Type",
      key: "setting_type",
      type: "select",
      required: true,
      order: 1,
    }, // Prong, Bezel
    {
      id: "23",
      name: "Design Style",
      key: "design_style",
      type: "select",
      required: false,
      order: 2,
    },
    {
      id: "24",
      name: "Polish",
      key: "polish",
      type: "select",
      required: true,
      order: 3,
    },
    {
      id: "25",
      name: "Finish",
      key: "finish",
      type: "select",
      required: false,
      order: 4,
    },
    {
      id: "26",
      name: "Symmetry",
      key: "symmetry",
      type: "select",
      required: false,
      order: 5,
    },
  ],

  /* ---------------- CERTIFICATION ---------------- */
  certification: [
    {
      id: "27",
      name: "Diamond Certification",
      key: "diamond_certificate",
      type: "select",
      required: true,
      order: 1,
    }, // GIA / IGI
    {
      id: "28",
      name: "Certificate Number",
      key: "certificate_no",
      type: "text",
      required: false,
      order: 2,
    },
    {
      id: "29",
      name: "Hallmark",
      key: "hallmark",
      type: "boolean",
      required: true,
      order: 3,
    },
  ],

  /* ---------------- PRICING ---------------- */
  pricing: [
    {
      id: "30",
      name: "Metal Karat",
      key: "metal_karat",
      type: "text",
      required: true,
      order: 1,
    },
    {
      id: "31",
      name: "Metal Weight",
      key: "metal_weight",
      type: "text",
      required: true,
      order: 2,
    },
    {
      id: "32",
      name: "Metal Value",
      key: "metal_value",
      type: "text",
      required: true,
      order: 3,
    },
    {
      id: "33",
      name: "Stone Carat",
      key: "stone_carat",
      type: "text",
      required: true,
      order: 4,
    },
    {
      id: "34",
      name: "Stone Value",
      key: "stone_value",
      type: "text",
      required: true,
      order: 5,
    },
    {
      id: "35",
      name: "Wastage %",
      key: "wastage_percentage",
      type: "number",
      required: true,
      order: 6,
    },

    {
      id: "36",
      name: "Wastage Amount",
      key: "wastage_amount",
      type: "text",
      required: true,
      order: 7,
    },
    {
      id: "37",
      name: "Making Charges",
      key: "making_charges",
      type: "text",
      required: true,
      order: 8,
    },
    {
      id: "38",
      name: "Platform Fee",
      key: "platform_fee",
      type: "text",
      required: false,
      order: 9,
    },
    {
      id: "39",
      name: "GST %",
      key: "gst",
      type: "number",
      required: true,
      order: 10,
    },
    {
      id: "40",
      name: "GST Amount",
      key: "gst_amount",
      type: "text",
      required: true,
      order: 11,
    },
    {
      id: "41",
      name: "Total Price",
      key: "total_price",
      type: "text",
      required: true,
      order: 12,
    },
  ],

  /* ---------------- PUBLISHING ---------------- */
  publishing: [
    {
      id: "39",
      name: "Publish Status",
      key: "publish_status",
      type: "boolean",
      required: true,
      order: 1,
    },
    {
      id: "40",
      name: "Visibility",
      key: "visibility",
      type: "select",
      required: true,
      order: 2,
    },
    {
      id: "41",
      name: "SEO Title",
      key: "seo_title",
      type: "text",
      required: false,
      order: 3,
    },
    {
      id: "42",
      name: "SEO Description",
      key: "seo_description",
      type: "textarea",
      required: false,
      order: 4,
    },
  ],
};

/* ------------------ PAGE ------------------ */
export default function DataModelPage({
  params,
}: {
  params: Promise<{ attribute: string }>;
}) {
  const { attribute: slug } = use(params);

  const [searchQuery, setSearchQuery] = useState("");
  const [attributesByGroup, setAttributesByGroup] =
    useState<Record<string, Attribute[]>>(INITIAL_ATTRIBUTES);

  const activeGroup = GROUPS.find((g) => g.id === slug);
  const attributes = attributesByGroup[slug] || [];

  /* ---------- Add Attribute ---------- */
  const handleAddAttribute = (newAttribute: Attribute) => {
    setAttributesByGroup((prev) => {
      const current = prev[slug] || [];
      return {
        ...prev,
        [slug]: [...current, { ...newAttribute, order: current.length + 1 }],
      };
    });
  };

  /* ---------- Search ---------- */
  const filteredAttributes = useMemo(() => {
    const term = searchQuery.toLowerCase();
    return attributes.filter(
      (a) =>
        a.name.toLowerCase().includes(term) ||
        a.key.toLowerCase().includes(term),
    );
  }, [attributes, searchQuery]);

  if (!activeGroup) return <div>Group not found</div>;

  return (
    <main className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-8 py-6">
        <h2 className="text-2xl font-semibold">{activeGroup.name}</h2>
        <p className="text-sm text-muted-foreground">
          {activeGroup.description}
        </p>

        <div className="flex items-center justify-between mt-6 gap-4">
          <div className="relative max-w-sm w-full">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search attributes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>

            <AttributeDrawer
              groupName={activeGroup.name}
              onSave={handleAddAttribute}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 pb-8">
        <AttributeTable attributes={filteredAttributes} />

        <p className="mt-4 text-xs text-center text-muted-foreground">
          Showing {filteredAttributes.length} attributes in{" "}
          <strong>{activeGroup.name}</strong>
        </p>
      </div>
    </main>
  );
}

