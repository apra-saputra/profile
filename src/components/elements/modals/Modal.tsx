import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "../buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useUnscroll from "@/hooks/useUnscroll";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalVariants: Variants = {
    hidden: { opacity: 0, y: -200 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -200 },
  };

  useUnscroll({ isTrue: isOpen });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed top-0 left-0 w-full h-screen bg-transparent z-50"
        >
          <div className="w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
            <div className="min-w-[320px] sm:min-w-600px rounded-lg bg-secondary border-2 border-text flex flex-col gap-2 overflow-hidden">
              <div className="flex justify-between w-full items-center px-2 py-2 border-b-2 border-b-text">
                <header className="uppercase font-semibold text-lg ">
                  {title ?? "Title"}
                </header>
                <div>
                  <Button size="sm" onClick={onClose} type="button" isDanger>
                    <FontAwesomeIcon icon={faXmark} />
                  </Button>
                </div>
              </div>

              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
