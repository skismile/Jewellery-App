"use client";

import React from "react";
import { Tag, Pencil, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Attribute } from "@/modules/products/types/data-model";

interface AttributeTableProps {
  attributes: Attribute[];
}

export function AttributeTable({ attributes }: AttributeTableProps) {
  return (
    <div className="rounded-md border shadow-sm bg-white dark:bg-black">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-[250px] pl-4">Attribute Name</TableHead>
            <TableHead className="w-[150px]">Key</TableHead>
            <TableHead>Data Type</TableHead>
            <TableHead>Validation</TableHead>
            <TableHead className="text-right pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attributes.map((attr) => (
            <TableRow
              key={attr.id}
              className="group hover:bg-muted/30 transition-colors"
            >
              <TableCell className="pl-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-foreground">
                    {attr.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {attr.key}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal bg-background">
                  {attr.type}
                </Badge>
              </TableCell>
              <TableCell>
                {attr.required ? (
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100 border-amber-200"
                  >
                    Required
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Optional
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right pr-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Validations</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
