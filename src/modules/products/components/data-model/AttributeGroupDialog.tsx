"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Plus,
  LayoutGrid,
  Database,
  Info,
  Search,
  FileJson,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface AttributeGroupDialogProps {
  children?: React.ReactNode;
  onAddNewGroup: (g: IFormInput) => void;
}

interface IFormInput {
  name: string;
  sequence: number;
  icon: string;
  description: string;
  iconKey: string;
}

export function AttributeGroupDialog({
  children,
  onAddNewGroup,
}: AttributeGroupDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, control, reset } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      sequence: 1,
      icon: "",
      description: "",
    },
  });

  const handleAddNewGroup = (data: IFormInput) => {
    onAddNewGroup(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="w-3 h-3" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Attribute Group</DialogTitle>
          <DialogDescription>
            Create a new group to organize product attributes.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleAddNewGroup)}
          className="grid gap-6 py-4"
        >
          {/* Row 1: Name & Sequence */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g. Technical Specs"
                {...register("name")}
              />
            </div>

            <div className="col-span-1 space-y-2">
              <Label
                htmlFor="sequence"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Sequence
              </Label>
              <Input
                id="sequence"
                type="number"
                min={1}
                {...register("sequence")}
              />
            </div>
          </div>

          {/* Row 2: Short Description (NEW) */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Short Description
            </Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what this group contains..."
              className="min-h-[60px] resize-none text-sm"
              {...register("description")}
            />
          </div>

          {/* Row 3: Icon Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Icon
            </Label>
            <Controller
              name="iconKey"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="database">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4" /> Database (Core)
                      </div>
                    </SelectItem>
                    <SelectItem value="info">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4" /> Info (General)
                      </div>
                    </SelectItem>
                    <SelectItem value="grid">
                      <div className="flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4" /> Specs (Technical)
                      </div>
                    </SelectItem>
                    <SelectItem value="seo">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4" /> SEO (Marketing)
                      </div>
                    </SelectItem>
                    <SelectItem value="code">
                      <div className="flex items-center gap-2">
                        <FileJson className="w-4 h-4" /> Schema (Dev)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              // disabled={isSubmitting}
            >
              Save Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
