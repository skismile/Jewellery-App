"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/modules/products/types/product";

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const router = useRouter();

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-background sticky top-0 z-50 shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.replace("/dashboard/products")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight">
              {product.name}
            </h1>
            <Badge variant="outline" className="font-mono text-xs">
              ID: {product.id}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.brand} • {product.furniture_type}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 mr-4 border-r pr-4">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Status
          </Label>
          <Select defaultValue={product.status}>
            <SelectTrigger className="w-[120px] h-8 text-xs font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="new">New</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Discard
        </Button>
        <Button
          size="sm"
          className="gap-2 bg-blue-600 hover:bg-blue-500 text-white"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
