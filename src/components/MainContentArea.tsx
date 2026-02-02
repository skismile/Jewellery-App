"use client";

import { Product } from "@/modules/products/types/product";
import React from "react";

export const SelectedProductContext = React.createContext<{
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}>({
  selectedProduct: null,
  setSelectedProduct: () => {},
});

const MainContentArea = ({ children }: { children: React.ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = React.useState<null | Product>(
    null,
  );

  return (
    <SelectedProductContext.Provider
      value={{ selectedProduct, setSelectedProduct }}
    >
      <main
        className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ${
          selectedProduct ? "mr-[600px]" : ""
        }`}
      >
        <div className="flex-1 h-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </SelectedProductContext.Provider>
  );
};

export default MainContentArea;
