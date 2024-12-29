import {
  BookOpen,
  Command,
  ReceiptText,
  Settings2,
  Trello,
} from "lucide-react";
import { ElementType } from "react";

type Header = { title: string; logo: ElementType; shortDescription?: string };

type ItemNavigationMenu = {
  title: string;
  url: string;
};

type NavigationMenu = {
  title: string;
  url: string;
  icon: ElementType;
  isActive?: boolean;
  items?: ItemNavigationMenu[];
};

export type NavType = { lable: string; menu: NavigationMenu[] };

export type NavigationType = { header: Header; nav: NavType };

export const navigation: NavigationType = {
  header: {
    title: "Finance",
    logo: Command,
    shortDescription: "Financial statements",
  },
  nav: {
    lable: "Navigation",
    menu: [
      {
        title: "Main",
        url: "/finance/admin",
        icon: Trello,
        isActive: true,
        items: [
          {
            title: "Dashboard",
            url: "/finance/admin/dashboard",
          },
          // {
          //   title: "Starred",
          //   url: "#",
          // },
          // {
          //   title: "Settings",
          //   url: "#",
          // },
        ],
      },
      {
        title: "Report Finance",
        url: "#report-finance", // => /finance/admin/report
        icon: ReceiptText,
        items: [
          {
            title: "Table",
            url: "#",
          },
          {
            title: "Create",
            url: "#",
          },
        ],
      },
      {
        title: "Note",
        url: "#Note", // => /finance/admin/note
        icon: BookOpen,
      },
      {
        title: "Settings",
        url: "/finance/admin/setting",
        icon: Settings2,
      },
    ],
  },
};
