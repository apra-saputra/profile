import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/features/commons/components/ui/sidebar";
import { useAuth } from "../../contexts/AuthContext";
// import { TeamSwitcher } from "./TeamSwitcher";
import { NavMain } from "./NavMain";
import { NavProjects } from "./NavProjects";
import { NavUser } from "./NavUser";
import NavHeader from "./NavHeader";
import { menu } from "../../utils/constants/AdminMenu";

export const SidebarApp = ({ ...props }) => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader header={menu.header} />
        {/* <TeamSwitcher teams={menu.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu.navMain} />
        <NavProjects projects={menu.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.displayName || "",
            email: user?.email || "",
            avatar: user?.photoURL || "",
          }}
          onClick={logout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>

    // <Sidebar>
    //   <SidebarHeader>
    //     <h1>Logo</h1>
    //   </SidebarHeader>
    //   <SidebarContent>
    //     <SidebarMenu>
    //       {items.map((item) => (
    //         <SidebarGroup key={item.title}>
    //           <SidebarGroupContent>
    //             <SidebarMenuItem>
    //               <SidebarMenuButton asChild>
    //                 <Link to={item.url}>
    //                   <item.icon />
    //                   <span>{item.title}</span>
    //                 </Link>
    //               </SidebarMenuButton>
    //             </SidebarMenuItem>
    //           </SidebarGroupContent>
    //         </SidebarGroup>
    //       ))}
    //     </SidebarMenu>
    //     <SidebarGroup />
    //   </SidebarContent>
    //   <SidebarFooter>
    //     <div className="px-6 py-4 rounded-md border border-foreground/30 flex items-center justify-between gap-x-4">
    //       <Avatar>
    //         <AvatarImage src={user?.photoURL} alt="Avatar" loading="lazy" />
    //         <AvatarFallback>{user?.displayName[0]}</AvatarFallback>
    //       </Avatar>
    //       <span>{user?.displayName.split(" ")[0]}</span>
    //       <Button onClick={logout}>
    //         <RiLogoutBoxRLine />
    //       </Button>
    //     </div>
    //   </SidebarFooter>
    //   <SidebarFooter />
    // </Sidebar>
  );
};
