"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sofa,
  Armchair,
  Table as TableIcon,
  Box,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  Settings,
  Layers,
  Tag,
  Check,
  X,
  Gem,
  CircleDot,
  Sparkles,
  Link,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CATALOGS = [
  {
    id: "rings",
    name: "Rings",
    groupCount: 28,
    totalAttributes: 180,
    icon: <CircleDot className="h-4 w-4" />, // ring-like
    status: "Active",
    lastUpdated: "5 mins ago",
    author: "Shibu",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    groupCount: 22,
    totalAttributes: 160,
    icon: <Link className="h-4 w-4" />, // chain/necklace feel
    status: "Active",
    lastUpdated: "45 mins ago",
    author: "Dipak",
  },
  {
    id: "earrings",
    name: "Earrings",
    groupCount: 26,
    totalAttributes: 175,
    icon: <Sparkles className="h-4 w-4" />, // sparkle/jewel
    status: "Draft",
    lastUpdated: "2 days ago",
    author: "Sys Admin",
  },
  {
    id: "bangles",
    name: "Bangles & Bracelets",
    groupCount: 15,
    totalAttributes: 120,
    icon: <Gem className="h-4 w-4" />, // jewellery/gem feel
    status: "Active",
    lastUpdated: "6 days ago",
    author: "Jane Doe",
  },
];

export default function CatalogListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      {/* 1. Sticky Header */}
      <header className="h-16 border-b flex items-center justify-between px-6 bg-background sticky top-0 z-50 shadow-sm shrink-0">
        <div>
          <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-muted-foreground" />
            Catalog Schemas
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage data models and attribute sets for each product category.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm"
            size="sm"
          >
            <Plus className="w-4 h-4" />
            Add Catalog
          </Button>
        </div>
      </header>

      {/* 2. Main Content */}
      <div className="flex-1 overflow-auto bg-muted/10 p-8">
        <div className="mx-auto space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 bg-background p-4 rounded-lg border shadow-sm">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search catalogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/30 border-muted"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-dashed gap-2"
              >
                <Filter className="w-3.5 h-3.5" /> Status
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-dashed gap-2"
              >
                <ArrowUpDown className="w-3.5 h-3.5" /> Updated
              </Button>
            </div>
          </div>

          {/* Table View */}
          <div className="rounded-lg border bg-background shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[280px] pl-6">Catalog Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attribute Groups</TableHead>
                  <TableHead>Total Attributes</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Is Default</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CATALOGS.map((cat) => (
                  <TableRow
                    key={cat.id}
                    className="group cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() =>
                      router.push(`/dashboard/data-model/${cat.id}/core-info`)
                    }
                  >
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                          {cat.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-foreground group-hover:text-blue-600 transition-colors">
                            {cat.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Created by {cat.author}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`font-normal ${
                          cat.status === "Draft"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {cat.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Layers className="w-3.5 h-3.5 opacity-70" />
                        <span className="font-mono font-medium text-foreground">
                          {cat.groupCount}
                        </span>
                        <span>groups</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Tag className="w-3.5 h-3.5 opacity-70" />
                        <span className="font-mono font-medium text-foreground">
                          {cat.totalAttributes}
                        </span>
                        <span>attributes</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Box className="w-3.5 h-3.5 opacity-70" />
                        <span className="font-mono font-medium text-foreground">
                          {/* {cat.totalProducts??0} */}
                          10
                        </span>
                        <span>products</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {true ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <X className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <div
                        className="flex justify-end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/dashboard/data-model/${cat.id}/default`,
                                )
                              }
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            {/* <DropdownMenuItem className="text-rose-600 focus:text-rose-600">
                              Delete Catalog
                            </DropdownMenuItem> */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="text-center text-xs text-muted-foreground mt-4">
            Showing {CATALOGS.length} catalogs
          </div>
        </div>
      </div>
    </div>
  );
}
