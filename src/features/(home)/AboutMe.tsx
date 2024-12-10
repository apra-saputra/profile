// import React from "react";
import logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";

const AboutMe = () => {
  return (
    <>
      <div
        className="h-full w-full flex justify-center items-center flex-wrap md:px-24 px-4 md:py-0 py-24"
        id="about-me"
      >
        <p className="indent-10 px-4">
          A professional programmer, specializing in Front End and Back End
          development, ready to apply knowledge from Hacktiv8 and a degree in
          informatics engineering. My experience in audio engineering and
          graphic design makes me a creative problem solver. I am creative,
          eager to learn, and able to implement new technologies in technology
          development. Fell free to{" "}
          <Link to="/#contact" className="hover:text-accent underline italic">
            <span>contact me</span>
          </Link>
          !
        </p>
      </div>
      <img
        src={logo}
        alt="logo"
        className="absolute md:-bottom-20 -bottom-10 md:-right-24 -right-8 transform -rotate-3"
      />
    </>
  );
};

export default AboutMe;
