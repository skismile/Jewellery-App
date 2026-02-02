export type PricingDetail = {
  id: number;
  upholstery_code: string; // e.g., "Cat A", "COM"
  base_price: number;
  surcharge_s1: number;
  surcharge_s2: number;
  total_price: number;
  currency: string;
};

export type ProductVariant = {
  id: number;
  variant_code: string; // e.g., "3-Seater"
  length: number;
  depth: number;
  height: number;
  pricing: PricingDetail[]; // Nested One-to-Many
};

export type ProductStatus =
  | "open"
  | "closed"
  | "new"
  | "published"
  | "needs_review"
  | "draft"
  | "archived";

export interface Product {
  id: number;
  name: string;
  brand: string;
  thumbnail_url?: string;
  designer: string;
  status: ProductStatus;
  furniture_type: string;
  design_code: string;
  description: string;
  category: string;
  variants: any;
  specs: {
    base_legs: string;
    arms: string;
    back: string;
    upholstery: string;
  };
}
