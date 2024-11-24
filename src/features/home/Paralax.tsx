import { useRef } from "react";
import { Parallax } from "react-scroll-parallax";

const url = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

const Paralax = () => {
  return (
    <div className="w-full h-[100dvh] flex items-end text-center hidden md:block">
      <Parallax
        scale={[0, 5, "easeInOut"]}
        // translateY={[100, 10, "easeInOut"]}
        opacity={[10, 0]}
        speed={-10}
        
      >
        <h1 className="text-accent">Welcome</h1>
      </Parallax>
    </div>
  );
};

export default Paralax;
