"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SidebarSkeletonProps {
  collapsed?: boolean;
}

export default function SidebarSkeleton({
  collapsed = true,
}: SidebarSkeletonProps) {
  return (
    <aside
      className={cn(
        "relative border-r flex flex-col h-screen transition-all duration-300",
        "bg-white dark:bg-[#141415] border-zinc-200 dark:border-zinc-800",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Toggle button placeholder */}
      <div className="absolute -right-3 top-6 z-50">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* Header */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-zinc-200 dark:border-zinc-800",
          collapsed ? "justify-center" : "px-6",
        )}
      >
        <div className="flex items-center gap-3">
          {/* Logo box */}
          <Skeleton className="h-8 w-8 rounded" />

          {/* Logo text */}
          {!collapsed && <Skeleton className="h-4 w-32 rounded" />}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 flex flex-col gap-6 overflow-hidden">
        {/* Catalog */}
        <Section collapsed={collapsed} items={3} />

        {/* Operations */}
        <Section collapsed={collapsed} items={1} />

        <div className="px-3">
          <Skeleton className="h-px w-full" />
        </div>

        {/* System */}
        <Section collapsed={collapsed} items={4} />
      </nav>

      {/* Footer */}
      <div
        className={cn(
          "border-t p-3 flex items-center gap-3",
          "bg-zinc-50/50 dark:bg-[#0f0f10] border-zinc-200 dark:border-zinc-800",
          collapsed ? "justify-center" : "",
        )}
      >
        {/* Avatar */}
        <Skeleton className="h-9 w-9 rounded-full" />

        {!collapsed && (
          <>
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-8 w-8 rounded" />
          </>
        )}
      </div>
    </aside>
  );
}

/* ---------- Helpers ---------- */

function Section({ collapsed, items }: { collapsed: boolean; items: number }) {
  return (
    <div className="px-3 space-y-2">
      {!collapsed && <Skeleton className="h-3 w-20 mb-2 ml-3" />}

      {Array.from({ length: items }).map((_, i) => (
        <NavItemSkeleton key={i} collapsed={collapsed} />
      ))}
    </div>
  );
}

function NavItemSkeleton({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "h-10 flex items-center rounded-md",
        collapsed ? "justify-center" : "px-3 gap-3",
      )}
    >
      <Skeleton className="h-5 w-5 rounded" />

      {!collapsed && <Skeleton className="h-4 w-28" />}
    </div>
  );
}
