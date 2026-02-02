import { Save } from "lucide-react";
import { Product } from "@/modules/products/types/product";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PricingDrawer({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!product} onOpenChange={(open) => !open && onClose()}>
      {/* sm:max-w-[600px] sets the width you requested */}
      <SheetContent className="sm:max-w-[600px] w-full p-0 flex flex-col gap-0 border-l">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b bg-background">
          <SheetTitle>Pricing Configuration</SheetTitle>
          <SheetDescription>
            Editing:{" "}
            <span className="font-medium text-foreground">{product?.name}</span>
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 px-6 py-6 bg-muted/10">
          <div className="space-y-6">
            {/* Variant Card */}
            <Card className="overflow-hidden border shadow-sm">
              <CardHeader className="px-4 py-3 bg-muted/40 border-b flex flex-row items-center justify-between space-y-0">
                <span className="font-mono text-sm font-medium text-primary">
                  VAR-001 (3-Seater)
                </span>
                <span className="text-xs text-muted-foreground">
                  240cm x 90cm
                </span>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/20">
                    <TableRow>
                      <TableHead className="h-9 px-4">Grade</TableHead>
                      <TableHead className="h-9 px-4">Base (€)</TableHead>
                      <TableHead className="h-9 px-4">Surcharge</TableHead>
                      <TableHead className="h-9 px-4 text-right">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-b-0 hover:bg-transparent">
                      <TableCell className="px-4 py-2 font-medium">
                        Cat A
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground">
                        2,400
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground">
                        -
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        2,400
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-b-0 hover:bg-transparent">
                      <TableCell className="px-4 py-2 font-medium">
                        Cat B
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground">
                        2,800
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground">
                        -
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        2,800
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 border-b-0">
                      <TableCell className="px-4 py-2 font-medium text-amber-600 dark:text-amber-400">
                        COM
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground">
                        2,100
                      </TableCell>
                      <TableCell className="px-4 py-2 text-muted-foreground">
                        +150
                      </TableCell>
                      <TableCell className="px-4 py-2 text-right">
                        2,250
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Iframe Placeholder */}
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                Advanced Grid Editor
              </h3>
              <div className="h-64 rounded-md border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
                [Advanced Pricing Iframe]
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <SheetFooter className="px-6 py-4 border-t bg-background">
          <Button className="w-full gap-2">
            <Save size={16} />
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
