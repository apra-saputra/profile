import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../commons/components/ui/sidebar";
import { SidebarApp } from "./commons/components/SidebarApp";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <SidebarApp />
      <div className="flex flex-col">
        <SidebarTrigger />
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
