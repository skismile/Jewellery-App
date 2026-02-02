"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const DataModelHeader = ({ slug }: { slug: string }) => {
  const router = useRouter();
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-background sticky top-0 z-50 shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="hover:underline cursor-pointer">Catalogs</span>
            <span>/</span>
            <span className="font-semibold text-blue-600 capitalize">
              {slug}
            </span>
          </div>
          <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
            Data Model Configuration
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2 shadow-sm">
          Export Schema
        </Button>
      </div>
    </header>
  );
};

export default DataModelHeader;
