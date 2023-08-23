import React from "react";
import { TypingAnimation, IntroAnimation } from "@/components/animation";
import { Button } from "@/components/elements/buttons";
import { TECH_STACK, PROGRAMINGS } from "@/utils/constants/techstack";
import web from "@/assets/web.svg";
import Projects from "./components/Projects";
import Services from "./components/Services";

const Home: React.FC = () => {
  return (
    <>
      <section className="h-screen flex justify-center flex-col md:flex-row items-center px-4 max-w-screen-2xl mx-auto">
        <article className="flex flex-col gap-4">
          <h1 className="font-bold text-6xl">Welcome to Apra Saputra!</h1>
          <h4 className="text-primary">
            <TypingAnimation text="Front End Developer | Back End Developer | Full Stack Developer" />
          </h4>
          <p className="w-3/5">
            This is my website that showcases all the projects I have completed,
            the tech stack I have used, and some information about myself. If
            you are interested, feel free to contact me to discuss what I can
            do!
          </p>
          <div>
            <Button size="lg" type="link" href="/#contact">
              Contact Me!
            </Button>
          </div>
        </article>
        <img
          src={web}
          alt="image web"
          className="h-[600px] aspect-square md:block hidden"
          loading="lazy"
        />
      </section>
      <Services />
      <Projects />

      <section
        className="flex items-center justify-center w-full mt-2 md:h-[80dvh] h-[200dvh] md:px-0 px-2"
        id="tech_stack"
      >
        <div className="flex flex-col justify-between items-center w-full gap-10 relative">
          <div className="w-screen bg-primary my-2 py-24">
            <h1 className="text-6xl font-semibold text-center">Tech Stack</h1>
          </div>
          <div className="flex flex-col gap-2 absolute bg-transparent md:-bottom-24 top-48  overflow-hidden">
            <ul className="flex flex-wrap justify-center items-center gap-2">
              {PROGRAMINGS.map((item) => {
                return <ItemChild item={item} key={item.title} />;
              })}
            </ul>
            <ul className="flex flex-wrap max-w-[860px] gap-2 justify-center items-center">
              {TECH_STACK.map((item) => {
                return <ItemChild item={item} key={item.title} />;
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

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
      <li className="flex justify-center items-center gap-2 px-4 py-1 bg-disable rounded-md">
        <img
          src={item.logo}
          alt="logo"
          height={25}
          width={25}
          className="img-logo"
        />
        <span className="cursor-default capitalize">{item.title}</span>
      </li>
    </IntroAnimation>
  );
};

export default Home;
