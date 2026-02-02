import React from "react";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="h-16 border-b flex items-center px-8 justify-between bg-background transition-colors duration-300">
      <h1 className="text-xl font-medium tracking-tight text-foreground">
        Rings Collection
      </h1>

      <div className="flex items-center gap-4">
        {/* QC Summary Badge */}
        {/* <Badge
          variant="secondary"
          className="font-mono text-xs font-normal px-2.5 py-1"
        >
          QC ISSUES: 12
        </Badge> */}

        <Separator orientation="vertical" className="h-6" />

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
