import { cn } from "@/libs/utils";
import { useEffect, useRef, FC, memo, useId } from "react";

interface TypingAnimationProps {
  text: string;
  className?: string;
  isActive?: boolean;
  onComplete?: () => void;
}

const TypingAnimation: FC<TypingAnimationProps> = memo(
  ({ text, className, isActive, onComplete }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
      if (isActive && textRef.current) {
        let i = 0,
          isReverse = false;
        const speed = 150;
        const reverseDelay = 3000;

        const typing = () => {
          if (textRef.current) {
            textRef.current.innerHTML = text.slice(0, i);

            if (!isReverse) {
              if (i < text.length) {
                i++;
                setTimeout(typing, speed);
              } else {
                setTimeout(() => {
                  isReverse = true;
                  typing();
                }, reverseDelay);
              }
            } else {
              if (i > 0) {
                i--;
                setTimeout(typing, speed);
              } else {
                if (onComplete) onComplete();
              }
            }
          }
        };

        typing(); // call the function directly to avoid setTimeout here
      }
    }, [isActive, text, onComplete]);

    return (
      <span
        className={cn("select-none font-semibold", className)}
        ref={textRef}
        id="textAnimation"
        key={id}
      ></span>
    );
  }
);

export default TypingAnimation;
