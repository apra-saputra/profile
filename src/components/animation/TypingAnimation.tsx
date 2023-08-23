import { useEffect, useRef, FC, memo } from "react";
import styles from "./typing.module.css";

interface TypingAnimationProps {
  text: string;
}

const TypingAnimation: FC<TypingAnimationProps> = memo(({ text }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      let i = 0,
        isReverse = false;
      const speed = 150;

      const typing = () => {
        if (textRef.current) {
          textRef.current.innerHTML = text.slice(0, i);

          if (i <= text.length && !isReverse) {
            i++;
            setTimeout(typing, speed);
            if (i === text.length) {
              setTimeout(() => {
                isReverse = true;
                typing();
              }, 3000);
            }
          }

          if (isReverse && i !== 0) {
            i--;
            setTimeout(typing, speed);
            if (i === 0)
              setTimeout(() => {
                isReverse = false;
                typing();
              }, 3000);
          }
        }
      };

      typing();
    }
    return () => {};
  }, [text]);

  return (
    <p
      className={`${styles["typing-animation"]}`}
      ref={textRef}
      id="textAnimation"
    ></p>
  );
});

export default TypingAnimation;
