import React from "react";
import { motion, Variants } from "framer-motion";

interface IntroAnimationProps {
  children: React.ReactNode;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ children }) => {
  const childrenVariant: Variants = {
    offscreen: {
      y: 500,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: "all" }}
    >
      <motion.div variants={childrenVariant}>{children}</motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
