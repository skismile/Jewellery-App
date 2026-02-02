"use client";

import { useState } from "react";
import { Plus, Save, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserRole, WorkGroup } from "@/modules/users/types/user";

interface UserDialogProps {
  existingUser?: User;
  trigger?: React.ReactNode;
}

export function UserDialog({ existingUser, trigger }: UserDialogProps) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<UserRole>(existingUser?.role || "editor");

  // If role is admin, group is usually 'none'
  const [group, setGroup] = useState<WorkGroup>(
    existingUser?.work_group || "group1",
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2 bg-primary text-primary-foreground">
            <Plus size={16} /> Add User
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {existingUser ? "Edit User" : "Create New User"}
          </DialogTitle>
          <DialogDescription>
            Configure access levels and workflow allotment.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* 1. Identity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue={existingUser?.first_name} />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue={existingUser?.last_name} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input defaultValue={existingUser?.email} type="email" />
          </div>

          {/* 2. Role Selection (PRD Logic) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>System Role</Label>
              <Select
                value={role}
                onValueChange={(v) => setRole(v as UserRole)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Content Editor</SelectItem>
                  <SelectItem value="publisher">Publisher / QC Lead</SelectItem>
                  <SelectItem value="admin">System Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[11px] text-muted-foreground">
                {role === "editor" && "Can edit data. Cannot publish."}
                {role === "publisher" && "Can publish & review QC."}
                {role === "admin" && "Full system access."}
              </p>
            </div>

            {/* 3. Workflow Allotment [cite: 374] */}
            <div className="space-y-2">
              <Label>Work Group (Allotment)</Label>
              <Select
                value={group}
                onValueChange={(v) => setGroup(v as WorkGroup)}
                disabled={role === "admin"} // Admins usually don't have allotments
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None / Management</SelectItem>
                  <SelectItem value="group1">Group 1 (Design)</SelectItem>
                  <SelectItem value="group2">Group 2 (Pricing)</SelectItem>
                  <SelectItem value="group3">Group 3</SelectItem>
                  <SelectItem value="group4">Group 4</SelectItem>
                  <SelectItem value="group10">Group 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="gap-2">
            <Save size={16} /> Save User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
