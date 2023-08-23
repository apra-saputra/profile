import React from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  children?: React.ReactNode;
  size?: "sm" | "lg" | "md" | "sm-icon";
  isDisabled?: boolean;
  width?: string;
  isDanger?: boolean;
  rounded?: string;
  background?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  href?: string;
  onClick?: (params?: any) => void;
} & (Link | Button);

type Link = {
  type?: "link";
};

type Button = {
  type?: "submit" | "button" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  size,
  onClick,
  href,
  isDisabled,
  isDanger,
  width,
  rounded,
  background,
  onMouseEnter,
  onMouseLeave,
}) => {
  let classSize: string;
  switch (size) {
    case "sm-icon":
      classSize = "py-2 px-2 text-sm font-normal";
      break;
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

  const handleStyle = () => {
    const styleDefault: string =
      "hover:brightness-110 active:brightness-90 active:shadow-main-box";
    if (!isDisabled) {
      if (!isDanger) return background ?? "bg-accent " + styleDefault;
      return "bg-danger active:shadow-danger-box " + styleDefault;
    }
    return "text-gray-400 bg-disable";
  };

  return (
    <>
      {type === "link" ? (
        <motion.a
          className={`${classSize} ${width} uppercase ${handleStyle()} ${
            rounded ?? "rounded-md"
          } transition-colors duration-300`}
          href={href ?? ""}
          whileHover={{ scale: isDisabled ? 1 : 1.1 }}
          whileTap={{ scale: isDisabled ? 1 : 0.95 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </motion.a>
      ) : (
        <motion.button
          className={`${classSize} ${width} uppercase ${handleStyle()} ${
            rounded ?? "rounded-md"
          } transition-colors duration-300`}
          type={type}
          onClick={() => onClick?.()}
          whileHover={{ scale: isDisabled ? 1 : 1.1 }}
          whileTap={{ scale: isDisabled ? 1 : 0.95 }}
          disabled={isDisabled}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </motion.button>
      )}
    </>
  );
};

export default Button;
