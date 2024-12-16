import { FaCalendar, FaGear, FaHouse, FaInbox } from "react-icons/fa6";

const items = [
  {
    title: "Dashboard",
    url: "/finance/admin/dashboard",
    icon: FaHouse,
  },
  {
    title: "Inbox",
    url: "#",
    icon: FaInbox,
  },
  {
    title: "Finance Log",
    url: "#",
    icon: FaCalendar,
  },
  {
    title: "Settings",
    url: "/finance/admin/setting",
    icon: FaGear,
  },
];

export { items };
