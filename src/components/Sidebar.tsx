"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sofa,
  Armchair,
  Table as TableIcon,
  AlertCircle,
  Database,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  BarChart3,
  LogOut,
  Gem,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative border-r flex flex-col transition-all duration-300 ease-in-out h-screen z-20",
          // THEME COLORS: White for Light Mode, Matte Charcoal for Dark Mode
          "bg-white dark:bg-[#141415] border-zinc-200 dark:border-zinc-800",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* 1. Toggle Button (Floating) */}
        <div className="absolute -right-3 top-6 z-50">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full shadow-sm bg-white dark:bg-[#141415] border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight size={12} />
            ) : (
              <ChevronLeft size={12} />
            )}
          </Button>
        </div>

        {/* 2. Header / Logo */}
        <div
          className={cn(
            "h-16 flex items-center border-b transition-all overflow-hidden border-zinc-200 dark:border-zinc-800",
            isCollapsed ? "justify-center px-0" : "px-6",
          )}
        >
          <div className="relative flex items-center gap-3">
            {/* Logo Icon - 'B' for Jewellery */}
            <div className="h-8 w-8 bg-indigo-600 text-white rounded flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              B
            </div>

            {/* Logo Text */}
            <div
              className={cn(
                "transition-opacity duration-200 whitespace-nowrap",
                isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto",
              )}
            >
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
                Jewellery
              </span>
            </div>
          </div>
        </div>

        {/* 3. Navigation Content */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 gap-6 flex flex-col">
          {/* ZONE A: WORKSPACE (Daily Ops) */}
          <div className="px-3 space-y-1">
            <GroupLabel label="Catalog" collapsed={isCollapsed} />
            {/* <NavItem
              href="/dashboard/products?t=sofas"
              icon={<Sofa size={20} />}
              label="Sofas"
              collapsed={isCollapsed}
              active={searchParams.get("t") === "sofas"}
            /> */}
            <NavItem
              href="/dashboard/products?t=rings"
              icon={<Gem className="h-4 w-4" />}
              label="Rings"
              collapsed={isCollapsed}
              active={searchParams.get("t") === "rings"}
            />
            <NavItem
              href="/dashboard/products?t=tables"
              icon={<TableIcon size={20} />}
              label="Tables"
              collapsed={isCollapsed}
              active={searchParams.get("t") === "tables"}
            />
          </div>

          <div className="px-3 space-y-1">
            <GroupLabel label="Operations" collapsed={isCollapsed} />
            {/* <NavItem
              href="/dashboard/ops/qc"
              icon={
                <AlertCircle
                  size={20}
                  className="text-rose-500 dark:text-rose-400"
                />
              }
              label="QC Issues"
              collapsed={isCollapsed}
              badge="12"
            /> */}
            <NavItem
              href="/dashboard/data-model"
              icon={<Database size={20} />}
              label="Data Model"
              collapsed={isCollapsed}
            />
          </div>

          <div className="px-3">
            <Separator className="bg-zinc-100 dark:bg-zinc-800" />
          </div>

          {/* ZONE B: ADMIN DECK (Management) */}
          <div className="px-3 space-y-1">
            <GroupLabel label="System" collapsed={isCollapsed} />

            <NavItem
              href="/dashboard/user-directory"
              icon={<Users size={20} />}
              label="User Directory"
              collapsed={isCollapsed}
              active={pathname === "/dashboard/user-directory"}
            />
            <NavItem
              href="/dashboard/insights"
              icon={<BarChart3 size={20} />}
              label="Insights & Logs"
              collapsed={isCollapsed}
            />
            <NavItem
              href="/dashboard/dictionary"
              icon={<BookOpen size={20} />}
              label="Dictionary"
              collapsed={isCollapsed}
            />
            <NavItem
              href="/dashboard/settings"
              icon={<Settings size={20} />}
              label="Configuration"
              collapsed={isCollapsed}
            />
          </div>
        </nav>

        {/* 4. Footer: User Profile */}
        <div
          className={cn(
            "border-t p-3 flex items-center gap-3 transition-all",
            "bg-zinc-50/50 dark:bg-[#0f0f10] border-zinc-200 dark:border-zinc-800",
            isCollapsed ? "justify-center" : "",
          )}
        >
          {/* Avatar */}
          <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 shrink-0 font-medium text-xs">
            JD
          </div>

          <div
            className={cn(
              "flex flex-col overflow-hidden transition-all duration-300",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
            )}
          >
            <span className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">
              Jane Doe
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              System Admin
            </span>
          </div>

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <LogOut size={16} />
            </Button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}

// --- Sub-Components ---

function GroupLabel({
  label,
  collapsed,
}: {
  label: string;
  collapsed: boolean;
}) {
  if (collapsed) return <div className="h-4" />;
  return (
    <h3 className="px-3 mb-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest animate-in fade-in duration-300">
      {label}
    </h3>
  );
}

interface NavItemProps {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  collapsed: boolean;
  badge?: string;
}

function NavItem({
  href,
  icon,
  label,
  active,
  collapsed,
  badge,
}: NavItemProps) {
  const content = (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full flex items-center transition-all duration-200 h-10 cursor-pointer",
          collapsed
            ? "justify-center px-0 w-10 mx-auto"
            : "justify-start gap-3 px-3",
          // ACTIVE STATE: Light grey in light mode, Dark grey in dark mode
          active
            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
        )}
      >
        {icon}

        {!collapsed && (
          <div className="flex-1 flex items-center justify-between overflow-hidden">
            <span className="truncate">{label}</span>
            {badge && (
              <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-2 border border-rose-200 dark:border-rose-800">
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Collapsed Badge Dot */}
        {collapsed && badge && (
          <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-[#141415]" />
        )}
      </Button>
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side="right"
          className="font-medium text-xs ml-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          {label} {badge && `(${badge})`}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
