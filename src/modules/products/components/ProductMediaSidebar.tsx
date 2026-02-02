"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Upload,
  Trash2,
  Maximize2,
  CheckCircle2,
  MoreHorizontal,
  MousePointer2,
  X,
} from "lucide-react";

interface ProductMediaSidebarProps {
  images: string[];
}

export default function ProductMediaSidebar({
  images: initialImages,
}: ProductMediaSidebarProps) {
  // --- State ---
  const [images, setImages] = useState<string[]>(initialImages);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Selection Mode State
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // --- Carousel Sync Logic ---
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // --- Handlers ---

  const handleThumbnailClick = (index: number) => {
    if (isSelectionMode) {
      // Toggle Selection
      if (selectedIndices.includes(index)) {
        setSelectedIndices((prev) => prev.filter((i) => i !== index));
      } else {
        setSelectedIndices((prev) => [...prev, index]);
      }
    } else {
      // Navigate Carousel
      if (api) api.scrollTo(index);
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedIndices([]); // Reset selection when toggling off
  };

  const handleDeleteSelected = () => {
    if (selectedIndices.length === 0) return;

    // Logic to remove images
    const newImages = images.filter((_, idx) => !selectedIndices.includes(idx));
    setImages(newImages);
    setSelectedIndices([]);
    setIsSelectionMode(false);

    // Reset carousel to 0 to avoid index errors
    if (api) api.scrollTo(0);
  };

  const handleUpload = () => {
    // Mock Upload
    const newMockImage =
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800";
    setImages([...images, newMockImage]);
  };

  return (
    <div className="flex flex-col h-full bg-background border-l shadow-xl">
      {/* 1. Header */}
      <div className="p-4 border-b bg-muted/5 flex items-center justify-between shrink-0">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-muted-foreground" />
          Media Gallery
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">
            {images.length} Assets
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal size={14} />
          </Button>
        </div>
      </div>

      {/* 2. Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* A. BIG PREVIEW (Main Carousel) */}
          {images.length > 0 ? (
            <div className="relative rounded-xl border bg-zinc-100 dark:bg-zinc-900 overflow-hidden shadow-sm group">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index}>
                      {/* Using Aspect Ratio 1/1 (Square) for a Bigger Preview */}
                      <AspectRatio
                        ratio={1 / 1}
                        className="flex items-center justify-center p-2"
                      >
                        <img
                          src={src}
                          alt={`View ${index}`}
                          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal cursor-zoom-in"
                          onClick={() => setIsLightboxOpen(true)}
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Floating Navigation Controls */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CarouselPrevious className="pointer-events-auto relative left-0 h-8 w-8 bg-white/80 hover:bg-white text-black border-0 shadow-sm" />
                  <CarouselNext className="pointer-events-auto relative right-0 h-8 w-8 bg-white/80 hover:bg-white text-black border-0 shadow-sm" />
                </div>
              </Carousel>

              {/* Expand/Lightbox Button */}
              <div className="absolute top-2 right-2 z-10">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-md bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm shadow-sm"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <Maximize2 size={14} />
                </Button>
              </div>

              {/* Index Badge */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm font-medium">
                {current + 1} / {images.length}
              </div>
            </div>
          ) : (
            <div className="h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground gap-3 bg-muted/10">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <ImageIcon size={24} className="opacity-50" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">No images uploaded</p>
                <p className="text-xs text-muted-foreground">
                  Upload or sync to view
                </p>
              </div>
            </div>
          )}

          {/* B. Thumbnails & Actions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                Gallery Grid
                {isSelectionMode && (
                  <Badge
                    variant="secondary"
                    className="h-5 text-[10px] px-1.5 bg-blue-100 text-blue-700 hover:bg-blue-100"
                  >
                    {selectedIndices.length} Selected
                  </Badge>
                )}
              </label>

              <Button
                variant={isSelectionMode ? "secondary" : "ghost"}
                size="sm"
                onClick={toggleSelectionMode}
                className={cn(
                  "h-6 text-[10px] px-2",
                  isSelectionMode &&
                    "bg-blue-100 text-blue-700 hover:bg-blue-200",
                )}
              >
                {isSelectionMode ? (
                  <>Done</>
                ) : (
                  <>
                    <MousePointer2 size={12} className="mr-1.5" /> Select
                  </>
                )}
              </Button>
            </div>

            {/* C. The Grid (Compact 4 Columns) */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((src, index) => {
                const isSelected = selectedIndices.includes(index);
                const isActive = current === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      "relative rounded-md overflow-hidden border transition-all aspect-square focus:outline-none group bg-muted/20",
                      // Selection Mode Styles
                      isSelectionMode &&
                        isSelected &&
                        "ring-2 ring-blue-500 ring-offset-1 border-blue-500",
                      isSelectionMode &&
                        !isSelected &&
                        "opacity-50 grayscale hover:grayscale-0 hover:opacity-100",
                      // Normal Mode Styles
                      !isSelectionMode &&
                        isActive &&
                        "ring-2 ring-zinc-900 dark:ring-zinc-100 ring-offset-1 border-transparent",
                      !isSelectionMode &&
                        !isActive &&
                        "border-transparent hover:border-zinc-300 opacity-80 hover:opacity-100",
                    )}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Checkmark Overlay (Selection Mode) */}
                    {isSelectionMode && (
                      <div
                        className={cn(
                          "absolute inset-0 flex items-center justify-center transition-colors",
                          isSelected
                            ? "bg-blue-500/30"
                            : "bg-transparent group-hover:bg-black/10",
                        )}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Add New Placeholder */}
              <button
                onClick={handleUpload}
                className="flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-muted-foreground/30 aspect-square hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors text-muted-foreground"
              >
                <Upload size={14} />
                <span className="text-[9px] font-medium">Add</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* 3. Footer Actions */}
      <div className="p-4 border-t bg-muted/5 space-y-2 shrink-0">
        {isSelectionMode ? (
          <Button
            variant="destructive"
            className="w-full gap-2"
            disabled={selectedIndices.length === 0}
            onClick={handleDeleteSelected}
          >
            <Trash2 size={14} /> Delete {selectedIndices.length} Items
          </Button>
        ) : (
          <Button
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleUpload}
          >
            <Upload size={14} /> Upload New Images
          </Button>
        )}
      </div>

      {/* 4. Lightbox Dialog (The TRUE Big Preview) */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden bg-black border-zinc-800 flex flex-col">
          <div className="absolute right-4 top-4 z-50">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            {images[current] && (
              <img
                src={images[current]}
                alt="Full Preview"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
          <div className="h-20 bg-black/50 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto p-2">
            {images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "h-14 w-14 rounded-md overflow-hidden border-2 shrink-0 transition-all opacity-60 hover:opacity-100",
                  current === idx
                    ? "border-blue-500 opacity-100"
                    : "border-transparent",
                )}
              >
                <img src={src} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
