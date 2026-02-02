/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash,
  Copy,
  Coins,
  Plus,
  Search,
} from "lucide-react";
import { Product } from "@/modules/products/types/product";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnResizeMode,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// --- Props Interface ---
interface ProductListProps {
  products: Product[];
  onSelect: (product: Product) => void;
  activeId?: number;
  onEdit: (productId: number) => void;
  onDuplicate?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export default function ProductList({
  products,
  onSelect,
  activeId,
  onEdit,
  onDuplicate,
  onDelete,
}: ProductListProps) {
  // --- Table State ---
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    description: false,
    specs_base_legs: false,
    specs_arms: false,
    specs_back: false,
  });
  // const [rowSelection, setRowSelection] = useState({});
  const [columnResizeMode] = useState<ColumnResizeMode>("onChange");

  // --- Column Definitions ---
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      // 1. Checkbox (Fixed Width)
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={table.getIsAllPageRowsSelected()}
      //       onCheckedChange={(value) =>
      //         table.toggleAllPageRowsSelected(!!value)
      //       }
      //       aria-label="Select all"
      //       className="translate-y-[2px] border-muted-foreground/50"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => row.toggleSelected(!!value)}
      //       aria-label="Select row"
      //       className="translate-y-[2px] border-muted-foreground/50"
      //     />
      //   ),
      //   size: 40,
      //   enableResizing: false,
      // },

      // 2. Seller
      {
        accessorKey: "Seller",
        header: "Seller Name",
        cell: ({ row }) => (
          <span className="font-medium text-foreground">
            {row.getValue("Seller")}
          </span>
        ),
        size: 140,
      },

      // 3. Product Name (Combined ID + Thumb)
      {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center gap-3 py-1">
              {/* Thumbnail Container */}
              <div className="h-9 w-9 rounded-md bg-muted overflow-hidden shrink-0 border border-border">
                {p.thumbnail_url ? (
                  <img
                    src={p.thumbnail_url}
                    alt={p.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-[10px] text-muted-foreground">
                    N/A
                  </div>
                )}
              </div>
              {/* Text Info */}
              <div className="flex flex-col min-w-0">
                <span
                  className="font-medium text-sm truncate max-w-[180px] text-foreground"
                  title={p.name}
                >
                  {p.name}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  #{p.id}
                </span>
              </div>
            </div>
          );
        },
        size: 280,
      },

      // 4. Category
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.getValue("category")}
          </span>
        ),
        size: 130,
      },

      // 5. Furniture Type
      {
        accessorKey: "furniture_type",
        header: "Type",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.getValue("furniture_type")}
          </span>
        ),
        size: 130,
      },

      // 6. Design Code
      {
        accessorKey: "design_code",
        header: "Code",
        cell: ({ row }) => (
          <span className="text-xs font-mono bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground border border-border">
            {row.getValue("design_code")}
          </span>
        ),
        size: 100,
      },

      // 7. Designer
      {
        accessorKey: "designer",
        header: "Designer",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.getValue("designer")}
          </span>
        ),
        size: 140,
      },

      // 8. Description
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <div
            // ADDED: "w-full" (fills the cell) + "truncate" (handles overflow)
            // "table-fixed" on the parent table prevents this from breaking resizing
            className="text-xs text-muted-foreground truncate w-full"
            title={row.getValue("description")}
          >
            {row.getValue("description")}
          </div>
        ),
        size: 200,
      },
      // 9. Status
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge
              variant="outline"
              className={cn(
                "font-normal capitalize h-5 px-1.5 text-[10px]",
                // Light/Dark mode compatible colors using Tailwind opacity modifiers
                status === "published" &&
                  "border-emerald-500/50 text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20",
                status === "needs_review" &&
                  "border-amber-500/50 text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20",
                status === "draft" &&
                  "border-zinc-500/50 text-zinc-700 bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-900/20",
                status === "new" &&
                  "border-blue-500/50 text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20",
                status === "archived" &&
                  "border-rose-500/50 text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/20",
              )}
            >
              {status.replace("_", " ")}
            </Badge>
          );
        },
        size: 120,
      },

      // 10. Actions (Sticky Right)
      {
        id: "actions",
        size: 50,
        enableResizing: false,
        header: ({ table }) => (
          <div className="flex items-center justify-center w-full h-full">
            <ColumnToggleDropdown table={table} />
          </div>
        ),
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Manage
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(p.id);
                    }}
                  >
                    <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    Edit
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                    <Coins className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    Pricing
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate?.(p);
                    }}
                  >
                    <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(p);
                    }}
                  >
                    <Trash className="mr-2 h-3.5 w-3.5 opacity-70" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [onEdit, onDuplicate, onDelete],
  );

  const table = useReactTable({
    data: products,
    columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      // rowSelection,
    },
  });

  return (
    <div className="rounded-md border border-border bg-card w-full flex flex-col">
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <Table
          style={{ width: table.getTotalSize(), minWidth: "100%" }}
          className="border-separate border-spacing-0 table-fixed"
        >
          <TableHeader className="bg-muted/40 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-none"
              >
                {headerGroup.headers.map((header) => {
                  const isStickyRight = header.id === "actions";
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "relative h-10 border-b border-r border-border last:border-r-0 select-none px-4 text-muted-foreground",
                        // STICKY HEADER FIX: Needs solid background to hide scrolling content
                        isStickyRight &&
                          "sticky right-0 z-20 border-l border-border bg-background shadow-[-1px_0_0_rgba(0,0,0,0.05)] dark:bg-muted/10 dark:backdrop-blur-md",
                      )}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            isStickyRight && "justify-center",
                          )}
                        >
                          <span className="text-xs font-medium truncate">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>
                        </div>
                      )}

                      {/* Resizer */}
                      {header.column.getCanResize() && !isStickyRight && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            "absolute top-0 right-0 h-full w-[4px] cursor-col-resize bg-border opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-primary hover:opacity-100",
                            header.column.getIsResizing() &&
                              "bg-primary opacity-100 w-[2px]",
                          )}
                        />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onSelect(row.original)}
                  className={cn(
                    "cursor-pointer transition-colors border-none group",
                    // Use standard muted hover
                    "hover:bg-muted/40",
                    activeId === row.original.id && "bg-muted/60",
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isStickyRight = cell.column.id === "actions";
                    return (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className={cn(
                          "p-3 border-b border-r border-border last:border-r-0 text-sm overflow-hidden",
                          // STICKY CELL FIX:
                          // 1. Base bg-card (hides content behind)
                          // 2. group-hover:bg-muted/40 (matches the ROW hover exactly)
                          isStickyRight &&
                            cn(
                              "sticky right-0 z-10 border-l border-border shadow-[-1px_0_0_rgba(0,0,0,0.05)]",
                              "bg-card group-hover:bg-muted/40 transition-colors",
                              activeId === row.original.id && "bg-muted/60",
                            ),
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// --- Column Toggle Dropdown ---

function ColumnToggleDropdown({ table }: { table: any }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColumns = table
    .getAllColumns()
    .filter(
      (column: any) =>
        typeof column.accessorFn !== "undefined" &&
        column.getCanHide() &&
        (column.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof column.columnDef.header === "string" &&
            column.columnDef.header
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))),
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full hover:bg-muted"
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Find columns..."
              className="h-8 pl-8 text-xs bg-muted/50 border-none focus-visible:ring-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[240px] p-1">
          <DropdownMenuLabel className="text-[10px] text-muted-foreground font-normal uppercase px-2 py-1.5">
            Available Columns
          </DropdownMenuLabel>
          {filteredColumns.map((column: any) => {
            const header =
              typeof column.columnDef.header === "string"
                ? column.columnDef.header
                : column.id;

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="text-xs py-1.5 cursor-pointer"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                onSelect={(e) => e.preventDefault()}
              >
                {header}
              </DropdownMenuCheckboxItem>
            );
          })}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
