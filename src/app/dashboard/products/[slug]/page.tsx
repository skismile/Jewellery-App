"use client";

import { useState, useRef, useCallback } from "react";
import { Save, ArrowLeft, MoreHorizontal, AlertCircle } from "lucide-react";

// UI Components (Shadcn)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

// --- Imports ---
import ProductVariantsTab from "@/modules/products/components/ProductVariantsTab";
// Ensure you import the new component we created above
import ProductMediaSidebar from "@/modules/products/components/ProductMediaSidebar";
import ProductHeader from "@/modules/products/components/ProductHeader";
import ProductMainContent from "@/modules/products/components/ProductMainContent";
import { Product } from "@/modules/products/types/product";

// --- Types (PRD Aligned) ---

type ProductStatus = "open" | "closed" | "new";

// --- Mock Data ---

// {
// id: 1,
// name: "Luna Diamond Ring",
// brand: "Nordic Jewels",
// thumbnail_url:
//   "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=987&auto=format&fit=crop",
// designer: "Marco Bellini",
// status: "published",
// furniture_type: "Ring", // (kept key name, semantic change only)
// design_code: "NJ-RG-LUNA-01",
// description:
//   "A contemporary diamond ring with deep setting and customizable gold purity.",
// category: "Rings",

// variants: [
//   {
//     id: 1,
//     variant_code: "Size-7",
//     length: 22, // ring diameter mm
//     depth: 2.2, // band thickness
//     height: 20, // ring height
//     pricing: [
//       {
//         id: 1,
//         upholstery_code: "18K-Gold", // metal grade
//         base_price: 2400,
//         surcharge_s1: 300, // diamond charge
//         surcharge_s2: 120, // making charge
//         total_price: 2820,
//         currency: "EUR",
//       },
//     ],
//   },
// ],

// specs: {
//   base_legs: "18K Yellow Gold", // metal base
//   arms: "Prong Setting", // stone holding
//   back: "Comfort Fit Band", // ring profile
//   upholstery: "Natural Diamond", // stone type
// },
//   },
export const MOCK_PRODUCT: Product = {
  id: 1,
  name: "Luna Diamond Ring",
  brand: "Nordic Jewels",
  thumbnail_url:
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=987&auto=format&fit=crop",
  designer: "Marco Bellini",
  status: "published",
  furniture_type: "Ring", // (kept key name, semantic change only)
  design_code: "NJ-RG-LUNA-01",
  description:
    "A contemporary diamond ring with deep setting and customizable gold purity.",
  category: "Rings",
  variants: [
    {
      id: 1,
      variant_code: "Size-7",
      length: 22, // ring diameter mm
      depth: 2.2, // band thickness
      height: 20, // ring height
      pricing: [
        {
          id: 1,
          upholstery_code: "18K-Gold", // metal grade
          base_price: 2400,
          surcharge_s1: 300, // diamond charge
          surcharge_s2: 120, // making charge
          total_price: 2820,
          currency: "EUR",
        },
      ],
    },
  ],

  specs: {
    base_legs: "18K Yellow Gold", // metal base
    arms: "Prong Setting", // stone holding
    back: "Comfort Fit Band", // ring profile
    upholstery: "Natural Diamond", // stone type
  },
};

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", // ring
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", // necklace
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", // diamond jewellery
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800", // bridal jewellery
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800", // bangle/bracelet
];

export default function ProductEditPage() {
  const [product, setProduct] = useState<Product>(MOCK_PRODUCT);

  // --- Sidebar Resizing Logic ---
  const [sidebarWidth, setSidebarWidth] = useState(450);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const startResizing = useCallback(
    (e: React.MouseEvent) => {
      isResizing.current = true;
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";

      const startX = e.clientX;
      const startWidth = sidebarWidth;

      const onMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        // Mouse moving LEFT increases width (because sidebar is on the right)
        const newWidth = startWidth + (startX - e.clientX);

        // Constraints
        if (newWidth >= 280 && newWidth <= 600) {
          setSidebarWidth(newWidth);
        }
      };

      const onMouseUp = () => {
        isResizing.current = false;
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [sidebarWidth],
  );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      {/* 1. STICKY HEADER */}
      <ProductHeader product={product} />

      {/* 2. MAIN LAYOUT: SPLIT VIEW */}
      <div className="flex-1 overflow-hidden flex">
        {/* LEFT: Main Content (Tabs) */}
        <ProductMainContent product={product} />

        {/* RIGHT: Resizable Media Sidebar */}
        <aside
          ref={sidebarRef}
          className="sticky top-16 h-[calc(100vh-4rem)] z-20 group/sidebar"
          style={{ width: sidebarWidth, minWidth: sidebarWidth }}
        >
          {/* Drag Handle */}
          <div
            onMouseDown={startResizing}
            className="absolute left-0 top-0 bottom-0 w-1.5 cursor-ew-resize hover:bg-blue-500/50 transition-colors z-50 flex items-center justify-center"
          >
            <div className="h-8 w-1 bg-border group-hover:bg-blue-500 rounded-full transition-colors" />
          </div>

          {/* New Media Component */}
          <ProductMediaSidebar images={MOCK_IMAGES} />
        </aside>
      </div>
    </div>
  );
}
