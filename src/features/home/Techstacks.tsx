import React from "react";
import { programings, techstacks } from "./utils/techstack";
import IntroAnimation from "./components/IntroAnimation";

const Techstacks = () => {
  return (
    <section
      className="flex items-center justify-center w-full mt-2 md:px-0 px-2"
      id="tech_stack"
    >
      <div className="flex flex-col justify-center h-full items-center w-full gap-10 relative">
        <div className="w-full bg-secondary drop-shadow-lg my-2 py-24"/>
          {/* <h1 className="font-semibold text-center">Tech Stack</h1> */}
        
        <div className="flex flex-col gap-2 absolute bg-transparent md:-bottom-24 top-24 ">
          <ul className="flex flex-wrap justify-center items-center gap-2">
            {programings.map((item) => {
              return <ItemChild item={item} key={item.title} />;
            })}
          </ul>
          <ul className="flex flex-wrap max-w-[860px] gap-2 justify-center items-center">
            {techstacks.map((item) => {
              return <ItemChild item={item} key={item.title} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Techstacks;

interface TechType {
  logo: string;
  title: string;
}

interface ItemProps {
  item: TechType;
}

const ItemChild: React.FC<ItemProps> = ({ item }) => {
  return (
    <IntroAnimation>
      <li className="flex justify-center items-center gap-2 px-4 py-1 bg-muted rounded-md">
        <img
          src={item.logo}
          alt="logo"
          className="img-logo object-scale-down w-[25px] aspect-square"
        />
        <span className="cursor-default capitalize">{item.title}</span>
      </li>
    </IntroAnimation>
  );
};
