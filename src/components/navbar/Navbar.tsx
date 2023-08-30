import React, { memo, useCallback, useState } from "react";
import { MENUS } from "@/utils/constants/menu";
import titleLogo from '@/assets/Logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faBars,
  faXmark,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/elements/buttons";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigate = useCallback((path: string) => {
    setNavbar(false);
    navigate(path);
  }, []);

  return (
    <nav className="w-full shadow transition-all duration-500 bg-secondary">
      <div className="justify-between mx-auto md:items-center md:flex max-w-screen-2xl px-0 md:px-2">
        <div className="flex justify-between items-center w-full h-full px-2 pl-0 md:px-0 py-4 md:py-0">
          <img src={titleLogo} alt="title logo" width={200} className="aspect-[16/4] " />
          <div className="md:hidden">
            <Button type="button" onClick={() => setNavbar((state) => !state)}>
              {navbar ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </Button>
          </div>
        </div>
        <ul
          className={`w-full flex-1 md:flex ${
            navbar ? "flex" : "hidden"
          } flex-col md:flex-row items-center gap-4 md:gap-x-6 py-6`}
        >
          {MENUS.map((menu) => (
            <ChildNavbarMenu
              menu={menu}
              key={menu.path}
              fc={handleNavigate}
              setOpenNavbar={setNavbar}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

interface ChildNavbarMenuProps {
  menu: {
    icon: IconDefinition;
    name: string;
    path: string;
    child?: { name: string; path: string }[];
  };
  fc: (t: string) => void;
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChildNavbarMenu: React.FC<ChildNavbarMenuProps> = memo(
  ({ menu, fc, setOpenNavbar }) => {
    const pathFromNext = useLocation().pathname;

    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    let menuDropDown;

    if (menu.child?.length) {
      menuDropDown = menu.child.map((innerMenu) => ({
        ...innerMenu,
      }));
    }

    const handleNavigate = () => {
      if (menu.child?.length) {
        fc(menu.path);
      }
      setOpenNavbar(false);
      setOpenDropdown(false);
    };

    const variants = {
      close: { opacity: 0, y: -100, display: "none" },
      open: { opacity: 1, y: 0, display: "flex" },
    };

    return (
      <>
        {menuDropDown ? (
          <li className="flex md:flex-row flex-col gap-2 items-center">
            <div className="flex gap-4 items-center">
              <div
                onClick={() => fc(menu.path)}
                className={`flex gap-2 items-center cursor-pointer hover:text-accent transition-all duration-300 pb-1 focus-within:text-accent ${
                  pathFromNext === menu.path ? "border-b-2 border-accent" : ""
                }`}
              >
                <FontAwesomeIcon icon={menu.icon} color="inherit" />
                <p>{" " + menu.name}</p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                <FontAwesomeIcon
                  icon={openDropdown ? faCaretUp : faCaretDown}
                  color="inherit"
                />
              </Button>
            </div>
            <div className="mt-2 md:relative">
              <AnimatePresence initial={false}>
                {openDropdown && (
                  <motion.ul
                    className="flex-col gap-4 md:absolute md:py-2 md:px-4 md:top-10 md:right-0 md:rounded-md"
                    initial={"close"}
                    animate={"open"}
                    exit={"close"}
                    variants={variants}
                    onClick={() => handleNavigate()}
                  >
                    {menuDropDown.map((innerMenu) => {
                      return (
                        <li
                          key={innerMenu.name}
                          onClick={() => setOpenDropdown(false)}
                        >
                          <a
                            href={innerMenu.path}
                            className="hover:text-accent transition-all duration-300"
                          >
                            {innerMenu.name}
                          </a>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </li>
        ) : (
          <li
            className={`flex gap-2 items-center cursor-pointer hover:text-accent transition-all duration-300 pb-1 focus-within:text-accent ${
              pathFromNext === menu.path ? "border-b-2 border-accent" : ""
            }`}
            onClick={() => fc(menu.path)}
          >
            <FontAwesomeIcon icon={menu.icon} color="inherit" />
            {" " + menu.name}
          </li>
        )}
      </>
    );
  }
);

export default Navbar;
