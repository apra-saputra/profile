import React from "react";

interface ButtonGroupProps {
  children: React.ReactNode;
}

interface ButtonComponentProps extends ButtonGroupProps {
  onClick?: (params?: any) => void;
  isDisabled?: boolean;
  size?: "sm" | "lg" | "md";
  active?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  return (
    <div className="flex rounded-md overflow-hidden bg-accent select-none">
      {children}
    </div>
  );
};

export default ButtonGroup;

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  isDisabled,
  size,
  active,
  onClick,
}) => {
  let classSize: string;
  switch (size) {
    case "sm":
      classSize = "py-1 px-2 text-base font-normal";
      break;
    case "lg":
      classSize = "py-4 px-6 text-xl font-semibold";
      break;
    default:
      classSize = "py-2 px-4 text-lg font-medium";
      break;
  }
  return (
    <div
      className={`text-center ${
        active ? "text-text" : "text-background"
      } ${classSize} ${
        isDisabled
          ? "cursor-not-allowed"
          : "cursor-pointer hover:brightness-90 active:brightness-[.8]"
      } `}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  );
};
