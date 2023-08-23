import React, { memo } from "react";
import { Variants, motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onMouseLeave?: () => void;
  menus: MenuDropdown[];
  children: React.ReactNode;
  className?: string;
}

export type MenuDropdown = {
  name: string;
  isDisable?: boolean;
  action?: (param?: any) => void;
};

const Dropdown: React.FC<DropdownProps> = memo(
  ({ isOpen, setIsOpen, menus, children, className, onMouseLeave }) => {
    const variant: Variants = {
      hidden: { opacity: 0, y: -100, scale: 0.2 },
      show: { opacity: 1, y: 0, scale: 1 },
    };

    return (
      <div
        className={`relative ${className ?? ""}`}
        onMouseLeave={() => onMouseLeave?.()}
      >
        {children}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className={`px-2 py-1 absolute border bg-secondary rounded-lg flex flex-col`}
              variants={variant}
              initial={"hidden"}
              animate={isOpen ? "show" : "hidden"}
              exit={"hidden"}
            >
              {menus.map((menu) => (
                <div
                  key={menu.name}
                  className={`px-4 py-2 flex flex-row items-center justify-start w-full rounded-lg ${
                    menu.isDisable
                      ? "text-disable cursor-not-allowed"
                      : "hover:text-accent active:bg-accent active:text-background focus:text-background cursor-pointer"
                  }`}
                  onClick={() => menu.action && (menu.action, setIsOpen(false))}
                >
                  {menu.name}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default Dropdown;
