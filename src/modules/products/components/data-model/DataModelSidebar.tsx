"use client";

import { Search, Plus, MoreHorizontal, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { AttributeGroupDialog } from "./AttributeGroupDialog";
import { AttributeGroup } from "../../types/data-model";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DataModelSidebarProps {
  groups: AttributeGroup[];
  activeGroupId: string;
  catalog: string;
}

export function DataModelSidebar({
  groups,
  activeGroupId,
  catalog,
}: DataModelSidebarProps) {
  const router = useRouter();
  const [filteredGroups, setFilteredGroups] =
    useState<AttributeGroup[]>(groups);

  const handleAddNewGroup = (newGroup: {
    name: string;
    description: string;
    sequence: number;
    iconKey: string;
  }) => {
    setFilteredGroups((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        name: newGroup.name,
        description: newGroup.description,
        count: 8,
        icon: <Database className="w-4 h-4" />,
      },
    ]);
  };

  return (
    <aside className="w-72 border-r bg-muted/10 flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b bg-background/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
            Attribute Groups
          </h3>

          {/* WRAPPED PLUS BUTTON WITH DIALOG */}
          <AttributeGroupDialog onAddNewGroup={handleAddNewGroup}>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="w-3 h-3" />
            </Button>
          </AttributeGroupDialog>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Find a group..."
            className="h-8 pl-8 bg-background text-xs"
          />
        </div>
      </div>

      {/* Group List (Unchanged) */}
      <ScrollArea className="flex-1 p-3">
        <nav className="space-y-1">
          {filteredGroups.map((group) => (
            <button
              key={group.id}
              onClick={() =>
                router.replace(`/dashboard/data-model/${catalog}/${group.id}`)
              }
              className={cn(
                "w-full flex items-start text-left gap-3 px-3 py-2.5 rounded-md transition-all group",
                activeGroupId === group.id
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 shadow-sm ring-1 ring-blue-200 dark:ring-blue-800"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 p-1.5 rounded-md",
                  activeGroupId === group.id
                    ? "bg-white dark:bg-blue-950/50"
                    : "bg-muted",
                )}
              >
                {group.icon}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate capitalize">
                    {group.name}
                  </span>
                  {activeGroupId === group.id && (
                    <MoreHorizontal className="w-3.5 h-3.5 opacity-50" />
                  )}
                </div>
                <p className="text-[11px] opacity-70 truncate pr-2 capitalize">
                  {group.description}
                </p>
              </div>
              {activeGroupId !== group.id && (
                <Badge
                  variant="secondary"
                  className="text-[10px] h-5 px-1.5 text-muted-foreground"
                >
                  {group.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
