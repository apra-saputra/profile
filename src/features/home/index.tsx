// import React from 'react'

import useDocumentTitle from "../commons/hooks/useDocumentTitle";
import AboutMe from "./AboutMe";
import Profile from "./Profile";
import Projects from "./Projects";
import TabNavigation from "./TabNavigation";
import Techstacks from "./Techstacks";

const Home = () => {
  const menu = [
    { title: "Profile", component: <Profile /> },
    { title: "Short Introduction", component: <AboutMe /> },
    { title: "Projects", component: <Projects /> },
    { title: "Tech Stack", component: <Techstacks /> },
  ];

  useDocumentTitle()
  return (
    <div className="mx-auto w-full flex flex-col items-center justify-center gap-y-6 h-[75dvh] mt-32">
      <div className="container flex min-h-[500px]">
        <TabNavigation menu={menu} />
      </div>
    </div>
  );
};

export default Home;
