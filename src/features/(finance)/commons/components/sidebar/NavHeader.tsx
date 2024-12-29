import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/features/commons/components/ui/sidebar";
import { ElementType, FC } from "react";

interface NavHeaderProps {
  header: {
    logo: ElementType;
    title: string;
    shortDescription?: string;
  };
}

const NavHeader: FC<NavHeaderProps> = ({ header }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div
            className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            onClick={toggleSidebar}
          >
            <header.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{header.title}</span>
            <span className="truncate text-xs">
              {header.shortDescription ? header.shortDescription : ""}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavHeader;
