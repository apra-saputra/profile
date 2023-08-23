import {
  faHome,
  // faBook,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import gmail from "@/assets/images/gmail.png";
import github from "@/assets/images/github.png";
import linkedin from "@/assets/images/linkedin.png";

export const MENUS = [
  {
    icon: faHome,
    name: "Home",
    path: "/",
    child: [
      {
        name: "Service",
        path: "#service",
      },
      {
        name: "Project",
        path: "#project",
      },
      {
        name: "Tech Stack",
        path: "#tech_stack",
      },
      {
        name: "Contact",
        path: "#contact",
      },
    ],
  },
  {
    icon: faStar,
    name: "Component",
    path: "/component",
  },
  // {
  //   icon: faBook,
  //   name: "Admin",
  //   path: "/admin/dashboard",
  // },
  // {
  //   icon: faArrowRightFromBracket,
  //   name: "Logout",
  //   path: "/auth/login",
  // },
];

export const OPTIONSTATUS = [
  { value: "PENDING", name: "PENDING" },
  { value: "ONPROGRESS", name: "ONPROGRESS" },
  { value: "DONE", name: "DONE" },
];

export const CONTACT = [
  { name: "Gmail", logo: gmail, url: "mailto:suport.aps123@gmail.com" },
  { name: "Github", logo: github, url: "https://github.com/apra-saputra" },
  {
    name: "LinkedIn",
    logo: linkedin,
    url: "https://www.linkedin.com/in/adhitya-pratama-saputra/",
  },
];
