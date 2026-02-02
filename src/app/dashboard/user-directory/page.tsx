"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Shield,
  Award,
  Edit3,
  MoreHorizontal,
  Lock,
  CheckCircle2,
  XCircle,
  Mail,
} from "lucide-react";

import Sidebar from "@/components/Sidebar"; // Re-using existing sidebar
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDialog } from "@/modules/users/components/UserDialog";
import { User } from "@/modules/users/types/user";
import { ThemeToggle } from "@/components/ThemeToggle";

// Mock Data based on current team + PRD roles
const MOCK_USERS: User[] = [
  {
    id: "1",
    first_name: "Alok",
    last_name: "Admin",
    email: "alok@beyondnmore.com",
    role: "admin",
    work_group: "none",
    active: true,
    last_active: "Just now",
  },
  {
    id: "2",
    first_name: "Anushka",
    last_name: "Bansal",
    email: "anushka@beyondnmore.com",
    role: "publisher",
    work_group: "group1", // [cite: 374]
    active: true,
    stats: { assigned_products: 450, pending_qc: 12 },
    last_active: "2 mins ago",
  },
  {
    id: "3",
    first_name: "Snehal",
    last_name: "Editor",
    email: "snehal@example.com",
    role: "editor",
    work_group: "group2",
    active: true,
    stats: { assigned_products: 210, pending_qc: 0 },
    last_active: "1 hour ago",
  },
  {
    id: "4",
    first_name: "Intern",
    last_name: "User",
    email: "intern@example.com",
    role: "editor",
    work_group: "group1",
    active: false,
    stats: { assigned_products: 50, pending_qc: 0 },
    last_active: "2 days ago",
  },
];

export default function UserManagementPage() {
  const [filterRole, setFilterRole] = useState<string>("all");

  // Simple filter logic
  const filteredUsers = MOCK_USERS.filter((u) =>
    filterRole === "all" ? true : u.role === filterRole,
  );

  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      {/* <Sidebar /> */}

      <main className="flex-1 flex flex-col min-w-0 bg-muted/5">
        {/* Page Header */}
        <header className="h-16 px-8 flex items-center justify-between border-b bg-background">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              User Directory
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage access roles and workflow allotments.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <UserDialog />
            <ThemeToggle />
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Inner Sidebar (Filters) */}
          <aside className="w-64 border-r bg-background hidden md:block p-4 space-y-6">
            <div className="space-y-1">
              <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Filter by Role
              </h3>
              <FilterButton
                active={filterRole === "all"}
                onClick={() => setFilterRole("all")}
                label="All Users"
                count={MOCK_USERS.length}
              />
              <FilterButton
                active={filterRole === "admin"}
                onClick={() => setFilterRole("admin")}
                label="Admins"
                icon={<Shield size={14} />}
              />
              <FilterButton
                active={filterRole === "publisher"}
                onClick={() => setFilterRole("publisher")}
                label="Publishers"
                icon={<Award size={14} />}
              />
              <FilterButton
                active={filterRole === "editor"}
                onClick={() => setFilterRole("editor")}
                label="Content Editors"
                icon={<Edit3 size={14} />}
              />
            </div>

            {/* PRD Group filtering could go here */}
            <div className="space-y-1">
              <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Work Groups
              </h3>
              <FilterButton label="Group 1 (Design)" />
              <FilterButton label="Group 2 (Pricing)" />
              <FilterButton label="Group 10 (Misc)" />
            </div>
          </aside>

          {/* User Table */}
          <div className="flex-1 overflow-auto p-6">
            <div className="rounded-md border bg-card shadow-sm">
              {/* Toolbar */}
              <div className="p-4 border-b flex items-center justify-between gap-4">
                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-9 bg-muted/50 border-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-2">
                    <Filter size={14} /> Filter
                  </Button>
                </div>
              </div>

              {/* Table */}
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/5">
                    <TableHead className="w-[300px]">User</TableHead>
                    <TableHead>System Role</TableHead>
                    <TableHead>Work Group</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      {/* 1. User Identity */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {user.first_name[0]}
                              {user.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm text-foreground">
                              {user.first_name} {user.last_name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* 2. Role Badge */}
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`
                          font-normal capitalize
                          ${user.role === "admin" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : ""}
                          ${user.role === "publisher" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                          ${user.role === "editor" ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" : ""}
                        `}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      {/* 3. Work Group (Crucial for Allotment) */}
                      <TableCell>
                        {user.work_group !== "none" ? (
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {user.work_group}
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            -
                          </span>
                        )}
                      </TableCell>

                      {/* 4. Stats (Helpful for Lead) */}
                      <TableCell>
                        {user.stats ? (
                          <div className="flex flex-col text-xs gap-1">
                            <span className="text-muted-foreground">
                              Assigned:{" "}
                              <span className="font-medium text-foreground">
                                {user.stats.assigned_products}
                              </span>
                            </span>
                            {user.stats.pending_qc > 0 && (
                              <span className="text-amber-600 font-medium">
                                {user.stats.pending_qc} Pending Review
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            -
                          </span>
                        )}
                      </TableCell>

                      {/* 5. Active Status */}
                      <TableCell>
                        {user.active ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                            <CheckCircle2 size={14} /> Active
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                            <XCircle size={14} /> Inactive
                          </div>
                        )}
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          {user.last_active}
                        </span>
                      </TableCell>

                      {/* 6. Actions */}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                            <UserDialog
                              existingUser={user}
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Edit3 className="mr-2 h-4 w-4" /> Edit
                                  Details
                                </DropdownMenuItem>
                              }
                            />
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" /> Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Send Invite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-rose-600 focus:text-rose-600">
                              <XCircle className="mr-2 h-4 w-4" /> Deactivate
                              Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper for Sidebar Filters
function FilterButton({ label, count, active, icon, onClick }: any) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      onClick={onClick}
      className={`w-full justify-start h-9 px-2 text-sm ${active ? "font-medium" : "text-muted-foreground font-normal"}`}
    >
      {icon && <span className="mr-2 opacity-70">{icon}</span>}
      {label}
      {count !== undefined && (
        <span className="ml-auto text-xs bg-background/50 px-1.5 py-0.5 rounded-sm">
          {count}
        </span>
      )}
    </Button>
  );
}
