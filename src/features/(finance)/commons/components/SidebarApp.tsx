import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  //   SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/features/commons/components/ui/sidebar";
import { items } from "../utils/constants/AdminMenu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/features/commons/components/ui/avatar";
import { Button } from "@/features/commons/components/ui/button";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";

export const SidebarApp = () => {
  const { user, logout } = useAuth();
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Logo</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="px-6 py-4 rounded-md border border-foreground/30 flex items-center justify-between gap-x-4">
          <Avatar>
            <AvatarImage src={user?.photoURL} alt="Avatar" loading="lazy" />
            <AvatarFallback>{user?.displayName[0]}</AvatarFallback>
          </Avatar>
          <span>{user?.displayName.split(" ")[0]}</span>
          <Button onClick={logout}>
            <RiLogoutBoxRLine />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarFooter />
    </Sidebar>
  );
};
