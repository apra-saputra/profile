import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Menu = {
  title: string;
  component: React.ReactNode;
};

interface TabNavigationProps {
  menu: Menu[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ menu }) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleTabClick = (index: number) => {
    setIndexActive(index);
  };

  return (
    <>
      <nav className="h-full w-[250px] rounded drop-shadow-lg">
        <ul className="flex flex-col items-center justify-evenly h-full">
          {menu.map((item, index) => (
            <LiComponent
              key={index}
              isActive={indexActive === index}
              onClick={() => handleTabClick(index)}
            >
              {item.title}
            </LiComponent>
          ))}
        </ul>
      </nav>
      <AnimatePresence initial={false} mode="wait">
        {menu.map((item, idx) => {
          const isShow = idx === indexActive;
          return isShow ? (
            <motion.section
              key={idx}
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded bg-primary/90 pt-6 relative mx-24 drop-shadow-lg w-full h-[626px]"
            >
              <div className="absolute z-10 left-10 -top-10">
                <h1 className="text-6xl custom-gradient-linier-1">
                  {item.title}
                </h1>
              </div>

              {/* <div className="overflow-y-hidden h-full relative w-full"></div> */}
              {item.component}
            </motion.section>
          ) : null;
        })}
      </AnimatePresence>
    </>
  );
};

export default TabNavigation;

interface LiComponentProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const LiComponent: React.FC<LiComponentProps> = ({
  children,
  isActive,
  onClick,
}) => {
  return (
    <li
      className={`cursor-pointer h-full w-full flex items-center justify-center transition-all duration-200 ${
        isActive
          ? "text-background transfrom scale-110 bg-gradient-to-br from-40% from-primary to-accent"
          : "text-foreground bg-secondary"
      }`}
      onClick={onClick}
    >
      <h4 className={"text-inherit"}>{children}</h4>
    </li>
  );
};
