import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/features/commons/components/ui/sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import NavHeader from "./NavHeader";
import { navigation } from "../../utils/constants/AdminMenu";
import ButtonCollection from "./ButtonCollection";

export const SidebarApp = ({ ...props }) => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader header={navigation.header} />
        {/* <TeamSwitcher teams={menu.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigation.nav} />
      </SidebarContent>
      <SidebarFooter>
        <ButtonCollection />

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
  );
};
