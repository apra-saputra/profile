import React from "react";
import api from "@/assets/images/API.png";
import frontEnd from "@/assets/images/front-end.png";
import mobile from "@/assets/images/mobile.png";
import { IntroAnimation } from "@/components/animation";

const Services: React.FC = () => {
  const apiStack = ["nodejs", "express", "go gin", "lumen"];
  const apiDb = ["postgres", "mysql", "mongodb"];
  const frontStack = ["react", "next", "vue", "html", "ejs"];
  const mobileStack = ["react-native"];

  return (
    <section
      className="flex justify-center w-full mt-2 md:h-[80dvh] min-h-[80dvh] mb-32"
      id="service"
    >
      <div className="flex flex-col justify-start items-center w-full md:absolute">
        <div className="w-screen flex flex-col gap-4 bg-primary my-2 py-24">
          <h1 className="text-4xl font-semibold text-center">
            Type of Service
          </h1>
          <p className="text-center">this is the service that i can do!</p>
        </div>
        <ul className="flex items-center md:flex-row flex-col gap-4 md:bg-transparent md:-top-12 md:relative">
          <IntroAnimation>
            <li className="bg-secondary py-4 px-2 rounded-md w-[300px] h-[500px] flex flex-col gap-2 justify-evenly items-center">
              <h3 className="uppercase text-2xl font-bold">API</h3>
              <img
                src={api}
                alt="logo service"
                width={"200"}
                className={"aspect-square"}
              />
              <div className="flex flex-col items-center">
                <h4 className="capitalize text-accent font-semibold">
                  tech that i used
                </h4>
                <div className="flex justify-center gap-2 flex-wrap">
                  {apiStack.map((tech) => {
                    return (
                      <span
                        key={tech}
                        className="px-2 bg-primary rounded-lg capitalize"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="capitalize text-accent font-semibold">
                  database
                </h4>
                <div className="flex justify-center gap-2">
                  {apiDb.map((db) => {
                    return (
                      <span
                        key={db}
                        className="px-2 bg-primary rounded-lg capitalize"
                      >
                        {db}
                      </span>
                    );
                  })}
                </div>
              </div>
            </li>
          </IntroAnimation>
          <IntroAnimation>
            <li className="bg-secondary py-4 px-2 rounded-md w-[300px] h-[500px] flex flex-col gap-2 justify-evenly items-center">
              <h3 className="uppercase text-2xl font-bold">Front End - web</h3>
              <img
                src={frontEnd}
                alt="logo service"
                width={"200"}
                className="aspect-square"
              />
              <div className="flex flex-col items-center">
                <h4 className="capitalize text-accent font-semibold">
                  tech that i used
                </h4>
                <div className="flex justify-center gap-2">
                  {frontStack.map((tech) => {
                    return (
                      <span
                        key={tech}
                        className="px-2 bg-primary rounded-lg capitalize"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </li>
          </IntroAnimation>
          <IntroAnimation>
            <li className="bg-secondary py-4 px-2 rounded-md w-[300px] h-[500px] flex flex-col gap-2 justify-evenly items-center">
              <h3 className="uppercase text-2xl font-bold">Mobile</h3>
              <img
                src={mobile}
                alt="logo service"
                width={"200"}
                className="aspect-square"
              />
              <div className="flex flex-col items-center">
                <h4 className="capitalize text-accent font-semibold">
                  tech that i used
                </h4>
                <div className="flex justify-center gap-2">
                  {mobileStack.map((tech) => {
                    return (
                      <span
                        key={tech}
                        className="px-2 bg-primary rounded-lg capitalize"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </li>
          </IntroAnimation>
        </ul>
      </div>
    </section>
  );
};

export default Services;
