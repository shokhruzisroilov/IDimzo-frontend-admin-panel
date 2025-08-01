import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { useState } from "react";
import Modal from "../components/ui/Modal";

export default function DashboardLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 items-center border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div
            className="group flex items-center cursor-pointer   transition rounded-md px-2 py-1 hover:bg-mainColor"
            onClick={() => setIsModalOpen(true)}
            role="button"
            aria-label="User profile options"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
          >
            <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://i.pravatar.cc/40?u=1"
                alt="Avatar"
              />
            </div>
            <div className="flex flex-col mr-3">
              <span className="group-hover:text-white">Amelia Rosewood</span>
              <span className="text-sm text-gray-500 group-hover:text-white">
                Admin
              </span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 bg-slate-100">
          <Outlet />
        </div>

        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}></Modal>}
      </SidebarInset>
    </SidebarProvider>
  );
}
