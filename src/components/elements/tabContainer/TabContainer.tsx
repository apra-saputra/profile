import React from "react";

export type TabContainerType = {
  id: number;
  name: string;
};

interface TabContainerProps {
  children: React.ReactNode;
}

export const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
  return (
    <div className="bg-secondary rounded-b-xl md:rounded-tr-xl p-2">
      {children}
    </div>
  );
};

interface TapHeadContainerProps {
  tabMenu: TabContainerType[];
  setValue: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}

export const TapsHead: React.FC<TapHeadContainerProps> = ({
  tabMenu,
  setValue,
  value,
}) => {
  return (
    <div
      className={`flex justify-start items-center py-2 md:px-2 md:gap-x-4 gap-x-2 bg-secondary rounded-t-xl md:w-fit relative md:after:absolute md:after:bg-background md:after:p-2 md:after:w-5 md:after:h-full md:after:right-[-1.2rem] md:after:rounded-bl-xl md:before:w-5 md:before:h-5 md:before:right-[-1.2rem] md:before:bottom-0 md:before:absolute before:bg-secondary`}
    >
      {tabMenu.map((item, index) => (
        <span
          key={item.id}
          className={`text-xl cursor-pointer capitalize rounded-lg px-2 py-1 transition-all duration-300 ${
            index === value ? "text-accent bg-text font-semibold" : "font-thin"
          }`}
          onClick={() => setValue(index)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};
