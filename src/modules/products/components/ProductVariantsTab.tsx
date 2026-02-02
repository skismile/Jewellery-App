// "use client";

// import React, { useState, useCallback, useRef } from "react";
// import {
//   Home,
//   Trash2,
//   PlusCircle,
//   ArrowUpDown,
//   Undo2,
//   Redo2,
//   Database,
//   Eye,
//   Copy,
//   Download,
//   Upload,
//   Sparkles,
//   Save,
//   Check,
//   X,
//   Calculator,
//   Image as ImageIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";

// // --- Types ---
// type GridVariant = {
//   id: string;
//   selected: boolean;
//   active: boolean;
//   variant_code: string;
//   length: number | "";
//   breadth: number | "";
//   height: number | "";
//   seat_height: number | "";
//   diameter: number | "";
//   weight: number | "";
//   cbm: number | "";
//   price_cat_a: number | "";
//   price_cat_b: number | "";
// };

// type ColumnWidths = { [key: string]: number };

// // --- Mock Data ---
// const INITIAL_DATA: GridVariant[] = [
//   {
//     id: "v1",
//     selected: false,
//     active: true,
//     variant_code: "BB009",
//     length: 240,
//     breadth: 90,
//     height: 75,
//     seat_height: 42,
//     diameter: 0,
//     weight: 85,
//     cbm: 1.2,
//     price_cat_a: 2400,
//     price_cat_b: 2800,
//   },
//   {
//     id: "v2",
//     selected: false,
//     active: true,
//     variant_code: "BB009",
//     length: 180,
//     breadth: 90,
//     height: 75,
//     seat_height: 42,
//     diameter: 0,
//     weight: 65,
//     cbm: 0.9,
//     price_cat_a: 1900,
//     price_cat_b: 2200,
//   },
//   {
//     id: "v3",
//     selected: false,
//     active: true,
//     variant_code: "BB009",
//     length: 180,
//     breadth: 90,
//     height: 75,
//     seat_height: 42,
//     diameter: 0,
//     weight: 65,
//     cbm: 0.9,
//     price_cat_a: 1900,
//     price_cat_b: 2200,
//   },
// ];

// const DEFAULT_WIDTHS: ColumnWidths = {
//   selection: 40,
//   active: 60,
//   variant_code: 140,
//   length: 80,
//   breadth: 80,
//   height: 80,
//   seat_height: 80,
//   diameter: 80,
//   weight: 80,
//   cbm: 80,
//   price_cat_a: 100,
//   price_cat_b: 100,
// };

// const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

// export default function ProductVariantsTab() {
//   const [data, setData] = useState<GridVariant[]>(INITIAL_DATA);
//   const [colWidths, setColWidths] = useState<ColumnWidths>(DEFAULT_WIDTHS);
//   const [activeCell, setActiveCell] = useState<string | null>(null);

//   // --- Resizing Logic ---
//   const resizingRef = useRef<{
//     key: string;
//     startX: number;
//     startWidth: number;
//   } | null>(null);

//   const startResize = (e: React.MouseEvent, key: string) => {
//     e.preventDefault();
//     e.stopPropagation();
//     resizingRef.current = { key, startX: e.pageX, startWidth: colWidths[key] };
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   const handleMouseMove = useCallback((e: MouseEvent) => {
//     if (!resizingRef.current) return;
//     const { key, startX, startWidth } = resizingRef.current;
//     setColWidths((prev) => ({
//       ...prev,
//       [key]: Math.max(50, startWidth + (e.pageX - startX)),
//     }));
//   }, []);

//   const handleMouseUp = useCallback(() => {
//     resizingRef.current = null;
//     document.removeEventListener("mousemove", handleMouseMove);
//     document.removeEventListener("mouseup", handleMouseUp);
//   }, [handleMouseMove]);

//   const updateCell = useCallback(
//     (id: string, field: keyof GridVariant, value: any) => {
//       setData((prev) =>
//         prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
//       );
//     },
//     [],
//   );

//   const columnHeaders = [
//     { key: "active", label: "Active", width: colWidths.active },
//     {
//       key: "variant_code",
//       label: "Product Code",
//       width: colWidths.variant_code,
//     },
//     { key: "length", label: "Length", width: colWidths.length },
//     { key: "breadth", label: "Breadth", width: colWidths.breadth },
//     { key: "height", label: "Height", width: colWidths.height },
//     { key: "seat_height", label: "Seat Ht", width: colWidths.seat_height },
//     { key: "diameter", label: "DIA", width: colWidths.diameter },
//     { key: "weight", label: "Weight", width: colWidths.weight },
//     { key: "cbm", label: "CBM", width: colWidths.cbm },
//     { key: "price_cat_a", label: "Cat A", width: colWidths.price_cat_a },
//     { key: "price_cat_b", label: "Cat B", width: colWidths.price_cat_b },
//   ];

//   return (
//     // FIX: Logic explained below
//     // w-full: Try to fill space
//     // max-w-[calc...]: This is the safety net. It subtracts the sidebar (20rem) + left nav (approx 5rem) from the viewport.
//     // This forces the container to shrink, enabling the internal scroll.
//     <div
//       className="flex flex-col w-full bg-white rounded-lg border shadow-sm select-none overflow-hidden h-[600px]"
//       style={{ maxWidth: "calc(100vw - 25rem)" }}
//     >
//       {/* 1. TOP TOOLBAR */}
//       <div className="flex flex-wrap items-center justify-between p-2 border-b bg-white gap-2 shrink-0">
//         <div className="flex items-center gap-1.5 flex-wrap">
//           <ToolbarBtn icon={<Home size={16} />} />
//           <ToolbarBtn
//             icon={<Trash2 size={16} />}
//             className="bg-rose-100 text-rose-500 hover:bg-rose-200 border-rose-200"
//           />
//           <div className="w-px h-6 bg-gray-200 mx-1" />
//           <ToolbarBtn icon={<PlusCircle size={16} />} />
//           <ToolbarBtn icon={<ArrowUpDown size={16} />} />
//           <div className="w-px h-6 bg-gray-200 mx-1" />
//           <ToolbarBtn icon={<Undo2 size={16} />} />
//           <ToolbarBtn icon={<Redo2 size={16} />} />
//           <ToolbarBtn icon={<Database size={16} />} />

//           <div className="ml-2 flex items-center rounded-md overflow-hidden border border-emerald-600">
//             <Button
//               size="icon"
//               className="h-8 w-8 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white"
//             >
//               <Copy size={14} />
//             </Button>
//             <Button
//               size="icon"
//               className="h-8 w-8 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white border-l border-emerald-700"
//             >
//               <Download size={14} />
//             </Button>
//           </div>

//           <div className="ml-2 flex items-center gap-1">
//             <ToolbarBtn icon={<Save size={16} />} />
//           </div>
//         </div>
//       </div>

//       {/* 2. FORMULA BAR */}
//       <div className="flex items-center gap-0 border-b bg-gray-50/50 p-1.5 shrink-0">
//         <div className="px-3 py-1 bg-white border rounded-sm text-xs text-gray-500 font-mono w-10 text-center shadow-sm">
//           {activeCell || "A1"}
//         </div>
//         <div className="flex items-center px-2 gap-2 text-gray-400">
//           <Check size={14} className="hover:text-green-600 cursor-pointer" />
//           <X size={14} className="hover:text-red-600 cursor-pointer" />
//           <span className="text-xs font-serif italic font-bold text-gray-500">
//             fx
//           </span>
//         </div>
//         <div className="flex-1">
//           <Input
//             className="h-7 border-none shadow-none bg-transparent focus-visible:ring-0 text-xs"
//             placeholder="Select a cell"
//           />
//         </div>
//       </div>

//       {/* 3. SPREADSHEET GRID */}
//       <div className="flex-1 overflow-hidden relative bg-white">
//         <ScrollArea className="h-full w-full">
//           {/* w-max here is fine because the parent now has a rigid constraints */}
//           <Table
//             className="w-max border-collapse"
//             style={{ tableLayout: "fixed" }}
//           >
//             <TableHeader>
//               {/* Row 1: Letters */}
//               <TableRow className="h-8 bg-gray-50 border-b border-gray-200">
//                 <TableHead className="w-[50px] p-0 text-center border-r bg-gray-100 text-blue-600 font-bold text-xs sticky left-0 z-20 shadow-[1px_0_0_rgba(0,0,0,0.1)]">
//                   #
//                 </TableHead>
//                 <TableHead
//                   className="w-[40px] p-0 text-center border-r bg-gray-50 sticky left-[50px] z-20"
//                   style={{ width: colWidths.selection }}
//                 >
//                   <div className="w-full h-full flex items-center justify-center">
//                     <div className="w-2.5 h-2.5 bg-gray-300 rounded-[1px]" />
//                   </div>
//                 </TableHead>
//                 {columnHeaders.map((col, index) => (
//                   <TableHead
//                     key={col.key}
//                     className="p-0 text-center border-r bg-gray-50 text-blue-600 font-semibold text-xs select-none relative group"
//                     style={{ width: col.width }}
//                   >
//                     {getColumnLabel(index)}
//                     <ResizeHandle
//                       onMouseDown={(e) => startResize(e, col.key)}
//                     />
//                   </TableHead>
//                 ))}
//               </TableRow>

//               {/* Row 2: Labels */}
//               <TableRow className="h-9 bg-white border-b border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
//                 <TableHead className="p-0 text-center border-r bg-gray-50/50 text-blue-600 font-bold text-xs sticky left-0 z-20">
//                   #
//                 </TableHead>
//                 <TableHead
//                   className="p-0 text-center border-r sticky left-[50px] z-20 bg-white"
//                   style={{ width: colWidths.selection }}
//                 >
//                   <div className="flex justify-center">
//                     <Checkbox className="h-3.5 w-3.5" />
//                   </div>
//                 </TableHead>
//                 {columnHeaders.map((col) => (
//                   <TableHead
//                     key={col.key}
//                     className="px-2 text-left border-r text-gray-900 font-bold text-xs"
//                     style={{ width: col.width }}
//                   >
//                     {col.label}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {data.map((row, index) => (
//                 <TableRow
//                   key={row.id}
//                   className="h-9 border-b hover:bg-blue-50/30 group"
//                 >
//                   {/* Sticky Index */}
//                   <TableCell className="p-0 text-center border-r bg-gray-50 group-hover:bg-blue-50 text-blue-600 font-semibold text-xs select-none sticky left-0 z-10 shadow-[1px_0_0_rgba(0,0,0,0.1)]">
//                     {index + 1}
//                   </TableCell>

//                   {/* Sticky Selection */}
//                   <TableCell className="p-0 text-center border-r bg-white group-hover:bg-blue-50/10 sticky left-[50px] z-10">
//                     <div className="flex justify-center">
//                       <Checkbox
//                         checked={row.selected}
//                         className="h-3.5 w-3.5 data-[state=checked]:bg-blue-600"
//                       />
//                     </div>
//                   </TableCell>

//                   {/* Data Cells */}
//                   <TableCell className="p-0 border-r bg-white group-hover:bg-blue-50/10">
//                     <div className="flex justify-center items-center h-full">
//                       <Switch
//                         checked={row.active}
//                         className="scale-75 data-[state=checked]:bg-blue-600"
//                         onCheckedChange={(c) => updateCell(row.id, "active", c)}
//                       />
//                     </div>
//                   </TableCell>
//                   <ExcelCell
//                     value={row.variant_code}
//                     onChange={(v: string) =>
//                       updateCell(row.id, "variant_code", v)
//                     }
//                     onFocus={() => setActiveCell(`A${index + 1}`)}
//                   />
//                   <ExcelCell
//                     value={row.length}
//                     onChange={(v: string) => updateCell(row.id, "length", v)}
//                   />
//                   <ExcelCell
//                     value={row.breadth}
//                     onChange={(v: string) => updateCell(row.id, "breadth", v)}
//                   />
//                   <ExcelCell
//                     value={row.height}
//                     onChange={(v: string) => updateCell(row.id, "height", v)}
//                   />
//                   <ExcelCell
//                     value={row.seat_height}
//                     onChange={(v: string) =>
//                       updateCell(row.id, "seat_height", v)
//                     }
//                   />
//                   <ExcelCell
//                     value={row.diameter}
//                     onChange={(v: string) => updateCell(row.id, "diameter", v)}
//                   />
//                   <ExcelCell
//                     value={row.weight}
//                     onChange={(v: string) => updateCell(row.id, "weight", v)}
//                   />
//                   <ExcelCell
//                     value={row.cbm}
//                     onChange={(v: string) => updateCell(row.id, "cbm", v)}
//                   />
//                   <ExcelCell
//                     value={row.price_cat_a}
//                     onChange={(v: string) =>
//                       updateCell(row.id, "price_cat_a", v)
//                     }
//                   />
//                   <ExcelCell
//                     value={row.price_cat_b}
//                     onChange={(v: string) =>
//                       updateCell(row.id, "price_cat_b", v)
//                     }
//                   />
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>
//       </div>

//       {/* 4. FOOTER */}
//       <div className="h-10 border-t bg-white flex items-center justify-between px-4 shrink-0">
//         <div className="flex items-center gap-4 w-48">
//           <span className="text-xs font-medium text-gray-600">Zoom</span>
//           <Slider defaultValue={[100]} max={200} step={10} className="w-24" />
//         </div>
//         <div className="absolute bottom-4 right-4 z-50">
//           <Button
//             size="icon"
//             className="h-10 w-10 rounded-full bg-gray-900 text-white shadow-lg hover:bg-black"
//           >
//             <Calculator size={18} />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Helper Components ---
// function ToolbarBtn({ icon, className }: { icon: any; className?: string }) {
//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       className={cn(
//         "h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-md transition-all",
//         className,
//       )}
//     >
//       {icon}
//     </Button>
//   );
// }

// const ExcelCell = ({ value, onChange, onFocus }: any) => (
//   <TableCell className="p-0 border-r bg-white relative group-hover:bg-blue-50/10 focus-within:ring-2 focus-within:ring-blue-500 focus-within:z-10">
//     <input
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       onFocus={onFocus}
//       className="w-full h-full px-2 py-1.5 bg-transparent border-none outline-none text-xs text-gray-700 font-medium"
//     />
//   </TableCell>
// );

// const ResizeHandle = ({
//   onMouseDown,
// }: {
//   onMouseDown: (e: React.MouseEvent) => void;
// }) => (
//   <div
//     className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 z-10"
//     onMouseDown={onMouseDown}
//   />
// );

// "use client";

// import React, { useState, useCallback, useRef } from "react";
// import {
//   Home,
//   Trash2,
//   PlusCircle,
//   ArrowUpDown,
//   Undo2,
//   Redo2,
//   Database,
//   Copy,
//   Download,
//   Save,
//   Check,
//   X,
//   Calculator,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";

// /* ---------------- TYPES ---------------- */
// type JewelleryVariant = {
//   id: string;
//   selected: boolean;
//   active: boolean;
//   variant_code: string;
//   metal: string;
//   purity: string;
//   metal_weight: number | "";
//   stone_type: string;
//   carat: number | "";
//   clarity: string;
//   color: string;
//   ring_size: number | "";
//   metal_value: number | "";
//   stone_value: number | "";
//   making_charges: number | "";
//   gst_amount: number | "";
//   total_price: number | "";
// };

// type ColumnWidths = { [key: string]: number };

// /* ---------------- MOCK DATA ---------------- */
// const INITIAL_DATA: JewelleryVariant[] = [
//   {
//     id: "v1",
//     selected: false,
//     active: true,
//     variant_code: "JR-18KW-075-7",
//     metal: "18K White Gold",
//     purity: "18K",
//     metal_weight: 4.2,
//     stone_type: "Natural Diamond",
//     carat: 0.75,
//     clarity: "VVS1",
//     color: "D",
//     ring_size: 7,
//     metal_value: 58800,
//     stone_value: 45000,
//     making_charges: 8500,
//     gst_amount: 3524,
//     total_price: 123364,
//   },
//   {
//     id: "v2",
//     selected: false,
//     active: true,
//     variant_code: "JR-18KW-075-8",
//     metal: "18K White Gold",
//     purity: "18K",
//     metal_weight: 4.35,
//     stone_type: "Natural Diamond",
//     carat: 0.75,
//     clarity: "VVS1",
//     color: "D",
//     ring_size: 8,
//     metal_value: 60900,
//     stone_value: 45000,
//     making_charges: 8700,
//     gst_amount: 3608,
//     total_price: 126903,
//   },
// ];

// const DEFAULT_WIDTHS: ColumnWidths = {
//   active: 60,
//   variant_code: 160,
//   metal: 160,
//   purity: 80,
//   metal_weight: 110,
//   stone_type: 150,
//   carat: 90,
//   clarity: 90,
//   color: 80,
//   ring_size: 90,
//   metal_value: 120,
//   stone_value: 120,
//   making_charges: 120,
//   gst_amount: 110,
//   total_price: 130,
// };

// const getColumnLabel = (i: number) => String.fromCharCode(65 + i);

// /* ---------------- COMPONENT ---------------- */
// export default function ProductVariantsTab() {
//   const [data, setData] = useState(INITIAL_DATA);
//   const [colWidths, setColWidths] = useState(DEFAULT_WIDTHS);
//   const [activeCell, setActiveCell] = useState<string | null>(null);

//   const resizingRef = useRef<any>(null);

//   const startResize = (e: React.MouseEvent, key: string) => {
//     resizingRef.current = { key, startX: e.pageX, startWidth: colWidths[key] };
//     document.addEventListener("mousemove", onResize);
//     document.addEventListener("mouseup", stopResize);
//   };

//   const onResize = useCallback((e: MouseEvent) => {
//     if (!resizingRef.current) return;
//     const { key, startX, startWidth } = resizingRef.current;
//     setColWidths((p) => ({
//       ...p,
//       [key]: Math.max(80, startWidth + (e.pageX - startX)),
//     }));
//   }, []);

//   const stopResize = useCallback(() => {
//     resizingRef.current = null;
//     document.removeEventListener("mousemove", onResize);
//     document.removeEventListener("mouseup", stopResize);
//   }, [onResize]);

//   const updateCell = (
//     id: string,
//     field: keyof JewelleryVariant,
//     value: any,
//   ) => {
//     setData((p) => p.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
//   };

//   const columns = [
//     { key: "active", label: "Active" },
//     { key: "variant_code", label: "Variant Code" },
//     { key: "metal", label: "Metal" },
//     { key: "purity", label: "Purity" },
//     { key: "metal_weight", label: "Metal Wt (g)" },
//     { key: "stone_type", label: "Stone" },
//     { key: "carat", label: "Carat" },
//     { key: "clarity", label: "Clarity" },
//     { key: "color", label: "Color" },
//     { key: "ring_size", label: "Size" },
//     { key: "metal_value", label: "Metal ₹" },
//     { key: "stone_value", label: "Stone ₹" },
//     { key: "making_charges", label: "Making ₹" },
//     { key: "gst_amount", label: "GST ₹" },
//     { key: "total_price", label: "Total ₹" },
//   ];

//   return (
//     <div className="flex flex-col bg-white border rounded-lg h-[600px] overflow-hidden">
//       {/* Toolbar */}
//       <div className="flex gap-1 p-2 border-b">
//         <ToolbarBtn icon={<Home size={16} />} />
//         <ToolbarBtn icon={<Trash2 size={16} />} />
//         <ToolbarBtn icon={<PlusCircle size={16} />} />
//         <ToolbarBtn icon={<ArrowUpDown size={16} />} />
//         <ToolbarBtn icon={<Undo2 size={16} />} />
//         <ToolbarBtn icon={<Redo2 size={16} />} />
//         <ToolbarBtn icon={<Database size={16} />} />
//         <ToolbarBtn icon={<Save size={16} />} />
//         <ToolbarBtn icon={<Copy size={16} />} />
//         <ToolbarBtn icon={<Download size={16} />} />
//       </div>

//       {/* Formula Bar */}
//       <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
//         <div className="w-12 text-xs text-center border rounded">
//           {activeCell || "A1"}
//         </div>
//         <Check size={14} />
//         <X size={14} />
//         <Input className="h-7 text-xs" placeholder="Formula / Value" />
//       </div>

//       {/* Grid */}
//       <ScrollArea className="flex-1">
//         <Table className="w-max">
//           <TableHeader>
//             <TableRow>
//               <TableHead>#</TableHead>
//               {columns.map((c, i) => (
//                 <TableHead
//                   key={c.key}
//                   style={{ width: colWidths[c.key] }}
//                   className="relative"
//                 >
//                   {getColumnLabel(i)}
//                   <ResizeHandle
//                     onMouseDown={(e: React.MouseEvent<Element, MouseEvent>) =>
//                       startResize(e, c.key)
//                     }
//                   />
//                 </TableHead>
//               ))}
//             </TableRow>
//             <TableRow>
//               <TableHead>#</TableHead>
//               {columns.map((c) => (
//                 <TableHead key={c.key}>{c.label}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {data.map((row, i) => (
//               <TableRow key={row.id}>
//                 <TableCell>{i + 1}</TableCell>

//                 <TableCell>
//                   <Switch
//                     checked={row.active}
//                     onCheckedChange={(v) => updateCell(row.id, "active", v)}
//                   />
//                 </TableCell>

//                 {Object.entries(row)
//                   .filter(([k]) => !["id", "selected", "active"].includes(k))
//                   .map(([k, v]) => (
//                     <ExcelCell
//                       key={k}
//                       value={v}
//                       onChange={(val: any) =>
//                         updateCell(row.id, k as keyof JewelleryVariant, val)
//                       }
//                     />
//                   ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       {/* Footer */}
//       <div className="h-10 border-t flex items-center justify-between px-4">
//         <div className="flex gap-2 items-center text-xs">
//           Zoom{" "}
//           <Slider defaultValue={[100]} max={200} step={10} className="w-24" />
//         </div>
//         <Button size="icon">
//           <Calculator size={16} />
//         </Button>
//       </div>
//     </div>
//   );
// }

// /* ---------------- HELPERS ---------------- */
// function ToolbarBtn({ icon, className }: any) {
//   return (
//     <Button variant="ghost" size="icon" className={cn("h-8 w-8", className)}>
//       {icon}
//     </Button>
//   );
// }

// const ExcelCell = ({ value, onChange }: any) => (
//   <TableCell className="p-0 border-r">
//     <input
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full h-full px-2 py-1 text-xs outline-none"
//     />
//   </TableCell>
// );

// const ResizeHandle = ({ onMouseDown }: any) => (
//   <div
//     className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize"
//     onMouseDown={onMouseDown}
//   />
// );

// "use client";

// import { useEffect, useState } from "react";
// import { Calculator } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";

// /* ---------------- TYPES ---------------- */
// type PricingForm = {
//   metal_karat: string;
//   metal_weight: number | "";
//   metal_value: number | "";

//   stone_carat: number | "";
//   stone_value: number | "";

//   wastage_percentage: number | "";
//   wastage_amount: number;

//   making_charges: number | "";
//   platform_fee: number | "";

//   gst_percentage: number | "";
//   gst_amount: number;

//   total_price: number;
// };

// /* ---------------- COMPONENT ---------------- */
// export default function PricingFormPage() {
//   const [form, setForm] = useState<PricingForm>({
//     metal_karat: "18K",
//     metal_weight: "",
//     metal_value: "",

//     stone_carat: "",
//     stone_value: "",

//     wastage_percentage: "",
//     wastage_amount: 0,

//     making_charges: "",
//     platform_fee: "",

//     gst_percentage: 3,
//     gst_amount: 0,

//     total_price: 0,
//   });

//   /* ---------------- AUTO CALC ---------------- */
//   useEffect(() => {
//     const metalValue = Number(form.metal_value) || 0;
//     const stoneValue = Number(form.stone_value) || 0;
//     const making = Number(form.making_charges) || 0;
//     const platform = Number(form.platform_fee) || 0;

//     const wastagePct = Number(form.wastage_percentage) || 0;
//     const wastageAmount = (metalValue * wastagePct) / 100;

//     const subTotal =
//       metalValue + wastageAmount + stoneValue + making + platform;

//     const gstPct = Number(form.gst_percentage) || 0;
//     const gstAmount = (subTotal * gstPct) / 100;

//     setForm((p) => ({
//       ...p,
//       wastage_amount: Math.round(wastageAmount),
//       gst_amount: Math.round(gstAmount),
//       total_price: Math.round(subTotal + gstAmount),
//     }));
//   }, [
//     form.metal_value,
//     form.stone_value,
//     form.wastage_percentage,
//     form.making_charges,
//     form.platform_fee,
//     form.gst_percentage,
//   ]);

//   const update = (key: keyof PricingForm, value: any) => {
//     setForm((p) => ({ ...p, [key]: value }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <Card>
//         <CardContent className="space-y-6 pt-6">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <Calculator size={18} /> Pricing & Tax Calculation
//           </h2>

//           {/* Metal */}
//           <Section title="Metal">
//             <Field
//               label="Metal Karat"
//               value={form.metal_karat}
//               onChange={(v) => update("metal_karat", v)}
//             />
//             <Field
//               label="Metal Weight (g)"
//               type="number"
//               value={form.metal_weight}
//               onChange={(v) => update("metal_weight", v)}
//             />
//             <Field
//               label="Metal Value (₹)"
//               type="number"
//               value={form.metal_value}
//               onChange={(v) => update("metal_value", v)}
//             />
//           </Section>

//           {/* Stone */}
//           <Section title="Stone">
//             <Field
//               label="Stone Carat"
//               type="number"
//               value={form.stone_carat}
//               onChange={(v) => update("stone_carat", v)}
//             />
//             <Field
//               label="Stone Value (₹)"
//               type="number"
//               value={form.stone_value}
//               onChange={(v) => update("stone_value", v)}
//             />
//           </Section>

//           {/* Charges */}
//           <Section title="Charges">
//             <Field
//               label="Wastage %"
//               type="number"
//               value={form.wastage_percentage}
//               onChange={(v) => update("wastage_percentage", v)}
//             />
//             <ReadOnly label="Wastage Amount (₹)" value={form.wastage_amount} />
//             <Field
//               label="Making Charges (₹)"
//               type="number"
//               value={form.making_charges}
//               onChange={(v) => update("making_charges", v)}
//             />
//             <Field
//               label="Platform Fee (₹)"
//               type="number"
//               value={form.platform_fee}
//               onChange={(v) => update("platform_fee", v)}
//             />
//           </Section>

//           {/* Tax */}
//           <Section title="Tax">
//             <Field
//               label="GST %"
//               type="number"
//               value={form.gst_percentage}
//               onChange={(v) => update("gst_percentage", v)}
//             />
//             <ReadOnly label="GST Amount (₹)" value={form.gst_amount} />
//           </Section>

//           {/* Total */}
//           <div className="p-4 bg-green-50 rounded-md flex justify-between items-center">
//             <span className="text-sm font-semibold">Total Price</span>
//             <span className="text-2xl font-bold text-green-700">
//               ₹ {form.total_price}
//             </span>
//           </div>

//           <div className="flex justify-end">
//             <Button>Save Pricing</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* ---------------- UI HELPERS ---------------- */
// const Section = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <div>
//     <h3 className="text-sm font-semibold mb-3 text-gray-600">{title}</h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
//   </div>
// );

// const Field = ({ label, value, onChange, type = "text" }: any) => (
//   <div>
//     <Label className="text-xs">{label}</Label>
//     <Input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   </div>
// );

// const ReadOnly = ({ label, value }: any) => (
//   <div>
//     <Label className="text-xs">{label}</Label>
//     <Input value={value} disabled />
//   </div>
// );

"use client";

import { useEffect, useState } from "react";
import { Calculator, Pencil, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

/* ---------------- TYPES ---------------- */
type PricingForm = {
  metal_karat: string;
  metal_weight: number | "";
  metal_value: number | "";

  stone_carat: number | "";
  stone_value: number | "";

  wastage_percentage: number | "";
  wastage_amount: number;

  making_charges: number | "";
  platform_fee: number | "";

  gst_percentage: number | "";
  gst_amount: number;

  total_price: number;
};

/* ---------------- COMPONENT ---------------- */
export default function PricingFormPage() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<PricingForm>({
    metal_karat: "18K",
    metal_weight: "",
    metal_value: "",

    stone_carat: "",
    stone_value: "",

    wastage_percentage: "",
    wastage_amount: 0,

    making_charges: "",
    platform_fee: "",

    gst_percentage: 3,
    gst_amount: 0,

    total_price: 0,
  });

  /* ---------------- AUTO CALC ---------------- */
  useEffect(() => {
    if (!isEditing) return;

    const metalValue = Number(form.metal_value) || 0;
    const stoneValue = Number(form.stone_value) || 0;
    const making = Number(form.making_charges) || 0;
    const platform = Number(form.platform_fee) || 0;

    const wastagePct = Number(form.wastage_percentage) || 0;
    const wastageAmount = (metalValue * wastagePct) / 100;

    const subTotal =
      metalValue + wastageAmount + stoneValue + making + platform;

    const gstPct = Number(form.gst_percentage) || 0;
    const gstAmount = (subTotal * gstPct) / 100;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((p) => ({
      ...p,
      wastage_amount: Math.round(wastageAmount),
      gst_amount: Math.round(gstAmount),
      total_price: Math.round(subTotal + gstAmount),
    }));
  }, [
    isEditing,
    form.metal_value,
    form.stone_value,
    form.wastage_percentage,
    form.making_charges,
    form.platform_fee,
    form.gst_percentage,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (key: keyof PricingForm, value: any) => {
    if (!isEditing) return;
    setForm((p) => ({ ...p, [key]: value }));
  };

  const onSave = () => {
    // 👉 API CALL HERE
    console.log("Saved pricing:", form);
    setIsEditing(false);
  };

  return (
    
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calculator size={18} /> Pricing & Tax Calculation
            </h2>

            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Pencil size={14} className="mr-2" />
                Edit
              </Button>
            ) : (
              <Button onClick={onSave}>
                <Save size={14} className="mr-2" />
                Save
              </Button>
            )}
          </div>

          {/* Metal */}
          <Section title="Metal">
            <Field
              label="Metal Karat"
              value={form.metal_karat}
              disabled={!isEditing}
              onChange={(v: string) => update("metal_karat", v)}
            />
            <Field
              label="Metal Weight (g)"
              type="number"
              value={form.metal_weight}
              disabled={!isEditing}
              onChange={(v: string) => update("metal_weight", v)}
            />
            <Field
              label="Metal Value (₹)"
              type="number"
              value={form.metal_value}
              disabled={!isEditing}
              onChange={(v: string) => update("metal_value", v)}
            />
          </Section>

          {/* Stone */}
          <Section title="Stone">
            <Field
              label="Stone Carat"
              type="number"
              value={form.stone_carat}
              disabled={!isEditing}
              onChange={(v: string) => update("stone_carat", v)}
            />
            <Field
              label="Stone Value (₹)"
              type="number"
              value={form.stone_value}
              disabled={!isEditing}
              onChange={(v: string) => update("stone_value", v)}
            />
          </Section>

          {/* Charges */}
          <Section title="Charges">
            <Field
              label="Wastage %"
              type="number"
              value={form.wastage_percentage}
              disabled={!isEditing}
              onChange={(v: string) => update("wastage_percentage", v)}
            />
            <ReadOnly label="Wastage Amount (₹)" value={form.wastage_amount} />
            <Field
              label="Making Charges (₹)"
              type="number"
              value={form.making_charges}
              disabled={!isEditing}
              onChange={(v: string) => update("making_charges", v)}
            />
            <Field
              label="Platform Fee (₹)"
              type="number"
              value={form.platform_fee}
              disabled={!isEditing}
              onChange={(v: string) => update("platform_fee", v)}
            />
          </Section>

          {/* Tax */}
          <Section title="Tax">
            <Field
              label="GST %"
              type="number"
              value={form.gst_percentage}
              disabled={!isEditing}
              onChange={(v: string) => update("gst_percentage", v)}
            />
            <ReadOnly label="GST Amount (₹)" value={form.gst_amount} />
          </Section>

          {/* Total */}
          <div className="p-4 bg-green-50 rounded-md flex justify-between items-center">
            <span className="text-sm font-semibold">Total Price</span>
            <span className="text-2xl font-bold text-green-700">
              ₹ {form.total_price}
            </span>
          </div>
        </CardContent>
      </Card>
  
  );
}

/* ---------------- UI HELPERS ---------------- */
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm font-semibold mb-3 text-gray-600">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Field = ({ label, value, onChange, type = "text", disabled }: any) => (
  <div>
    <Label className="text-xs">{label}</Label>
    <Input
      type={type}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReadOnly = ({ label, value }: any) => (
  <div>
    <Label className="text-xs">{label}</Label>
    <Input value={value} disabled />
  </div>
);
