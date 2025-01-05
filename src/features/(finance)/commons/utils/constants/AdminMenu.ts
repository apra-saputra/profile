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
        title: "Dashboard",
        url: "/finance/admin/dashboard",
        icon: Trello,
        isActive: true,
      },
      {
        title: "Transaction",
        url: "",
        icon: ReceiptText,
        items: [
          {
            title: "Report",
            url: "/finance/admin/transaction",
          },
          {
            title: "Create",
            url: "/finance/admin/transaction/create",
          },
        ],
      },
      {
        title: "Note",
        url: "/finance/admin/note", // => /finance/admin/note
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
