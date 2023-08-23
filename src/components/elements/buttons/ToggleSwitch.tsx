import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToggleSwitchProps {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  width: string;
  size?: "sm" | "lg" | "md";
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  setIsOn,
  size,
  width,
}) => {
  const toggleSwitch = () => setIsOn((state) => !state);

  const spring = {
    type: "spring",
    stiffness: 800,
    damping: 20,
  };

  let classSize: string, childSize: string;
  switch (size) {
    case "sm":
      classSize = "py-3 h-4";
      childSize = "w-4 h-4";
      break;
    case "lg":
      classSize = "py-5 h-8";
      childSize = "w-8 h-8";
      break;
    default:
      classSize = "py-4 h-6";
      childSize = "w-6 h-6";
      break;
  }

  return (
    <AnimatePresence initial={false}>
      <div
        onClick={toggleSwitch}
        className={`${classSize} px-2 flex ${
          isOn ? "justify-end" : "justify-start"
        } items-center bg-white rounded-3xl`}
        style={{ width: width }}
      >
        <motion.div
          className={`rounded-full bg-accent-2 ${childSize}`}
          layout
          transition={spring}
        />
      </div>
    </AnimatePresence>
  );
};

export default ToggleSwitch;
