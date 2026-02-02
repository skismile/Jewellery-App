import MainContentArea from "@/components/MainContentArea";
import Sidebar from "@/components/Sidebar";
import SidebarSkeleton from "@/components/SidebarSkeleton";
import React, { Suspense } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-white dark:bg-[#0f0f10] text-zinc-100 font-sans selection:bg-zinc-700">
      {/* 1. Sidebar Component */}
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      {/* 2. Main Content Area */}
      <MainContentArea>{children}</MainContentArea>
    </div>
  );
};

export default DashboardLayout;
