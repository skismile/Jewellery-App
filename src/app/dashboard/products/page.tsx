"use client";

import ProductList from "@/modules/products/components/ProductList";
import PricingDrawer from "@/modules/products/components/PricingDrawer";
import { Product } from "@/modules/products/types/product";
import { useContext } from "react";
import { SelectedProductContext } from "@/components/MainContentArea";
import { CreateProductDialog } from "@/modules/products/components/CreateProductDialog";
import { useRouter } from "next/navigation";
import Header from "@/modules/products/components/Header";

export const MOCK_PRODUCTS: Product[] = [
  {
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
  },

  {
    id: 2,
    name: "Arco Gold Pendant",
    brand: "Linea Italia Jewels",
    thumbnail_url:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    designer: "Giulio Romano",
    status: "needs_review",
    furniture_type: "Pendant",
    design_code: "LI-PD-ARCO-02",
    description:
      "Elegant gold pendant with curved design and premium diamond setting.",
    category: "Necklaces",

    variants: [
      {
        id: 2,
        variant_code: "Standard",
        length: 45, // chain length cm
        depth: 3,
        height: 25,
        pricing: [
          {
            id: 2,
            upholstery_code: "22K-Gold",
            base_price: 950,
            surcharge_s1: 180,
            surcharge_s2: 90,
            total_price: 1220,
            currency: "EUR",
          },
        ],
      },
    ],

    specs: {
      base_legs: "22K Gold Chain",
      arms: "Integrated Loop",
      back: "Flat Back Finish",
      upholstery: "Diamond Accent",
    },
  },

  {
    id: 3,
    name: "Verona Diamond Necklace",
    brand: "CasaForma Jewels",
    thumbnail_url:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    designer: "Alessandro Neri",
    status: "published",
    furniture_type: "Necklace",
    design_code: "CF-NK-VERONA-04",
    description: "Minimalist diamond necklace with platinum chain.",
    category: "Necklaces",

    variants: [
      {
        id: 3,
        variant_code: "Standard-Length",
        length: 50,
        depth: 4,
        height: 30,
        pricing: [
          {
            id: 3,
            upholstery_code: "Platinum",
            base_price: 3200,
            surcharge_s1: 600,
            surcharge_s2: 200,
            total_price: 4000,
            currency: "EUR",
          },
        ],
      },
    ],

    specs: {
      base_legs: "Platinum Chain",
      arms: "Diamond Links",
      back: "Flat Polished Finish",
      upholstery: "Brilliant Cut Diamonds",
    },
  },

  {
    id: 4,
    name: "Nova Bridal Necklace Set",
    brand: "Atelier Bridal Jewels",
    thumbnail_url:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    designer: "Sofia Laurent",
    status: "draft",
    furniture_type: "Bridal Set",
    design_code: "AB-BS-NOVA-01",
    description:
      "Bridal jewellery set with heavy gold work and premium stone setting.",
    category: "Bridal",

    variants: [
      {
        id: 4,
        variant_code: "Full-Set",
        length: 55,
        depth: 6,
        height: 35,
        pricing: [
          {
            id: 4,
            upholstery_code: "22K-Gold",
            base_price: 2800,
            surcharge_s1: 900,
            surcharge_s2: 300,
            total_price: 4000,
            currency: "EUR",
          },
        ],
      },
    ],

    specs: {
      base_legs: "22K Gold Base",
      arms: "Stone Embedded Links",
      back: "Traditional Pattern",
      upholstery: "Kundan & Diamonds",
    },
  },

  {
    id: 5,
    name: "Linea Gold Bangle",
    brand: "Forma Studio Jewels",
    thumbnail_url:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    designer: "Henrik Olsen",
    status: "archived",
    furniture_type: "Bangle",
    design_code: "FS-BG-LINEA-07",
    description:
      "Minimal gold bangle with engraved detailing and premium polish.",
    category: "Bangles",

    variants: [
      {
        id: 5,
        variant_code: "Medium",
        length: 65, // diameter mm
        depth: 4,
        height: 60,
        pricing: [
          {
            id: 5,
            upholstery_code: "18K-Gold",
            base_price: 2100,
            surcharge_s1: 150,
            surcharge_s2: 100,
            total_price: 2350,
            currency: "EUR",
          },
        ],
      },
    ],

    specs: {
      base_legs: "18K Gold Base",
      arms: "Solid Circular Form",
      back: "Engraved Inner Finish",
      upholstery: "High Polish Gold Finish",
    },
  },
];

export default function ProductDashboard() {
  const { selectedProduct, setSelectedProduct } = useContext(
    SelectedProductContext,
  );
  const router = useRouter();

  const handleEdit = (productId: number) => {
    router.push(`/dashboard/products/${productId}`);
  };

  const handleProductSelect = (product: Product) => {
    // setSelectedProduct(product);
  };

  return (
    <>
      <Header />
      {/* Action Bar (Between Header and List) */}
      <div className="h-16 px-8 flex items-center justify-between border-b bg-background">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Sofas</span>
          <span>/</span>
          <span>All Products</span>
          <span className="ml-2 bg-muted px-2 py-0.5 rounded text-xs">
            1,240 items
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Input could go here */}

          {/* THE NEW CREATE BUTTON */}
          <CreateProductDialog />
        </div>
      </div>

      {/* Scrollable List Area */}
      <div className="flex-1 overflow-auto p-6">
        <ProductList
          products={MOCK_PRODUCTS}
          onSelect={handleProductSelect}
          activeId={selectedProduct?.id}
          onEdit={handleEdit}
        />
      </div>

      {/* 3. The "Drawer" for Nested Pricing Management */}
      <PricingDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
