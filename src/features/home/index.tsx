// import React from 'react'

import useDocumentTitle from "../commons/hooks/useDocumentTitle";
import Profile from "./Profile";
import Projects from "./Projects";
import TabNavigation from "./TabNavigation";
import Techstacks from "./Techstacks";

const Home = () => {
  const menu = [
    { title: "Profile", component: <Profile /> },
    { title: "Projects", component: <Projects /> },
    { title: "Tech Stack", component: <Techstacks /> },
  ];

  useDocumentTitle()
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-6 lg:h-[75dvh] h-full lg:mt-32 mt-4 xl:px-0 lg:px-6 px-2">
      <div className="container flex flex-col lg:flex-row lg:gap-y-0 gap-y-[4rem] h-full">
        <TabNavigation menu={menu} />
      </div>
    </div>
  );
};

export default Home;