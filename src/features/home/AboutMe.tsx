// import React from "react";
import logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";

const AboutMe = () => {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center flex-wrap px-24">
        <div className="indent-10 px-4">
          <p>
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
      </div>
      <img
        src={logo}
        alt="logo"
        className="absolute -bottom-20 -right-24 transform -rotate-3"
      />
    </>
  );
};

export default AboutMe;
