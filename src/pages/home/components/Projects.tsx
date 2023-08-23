import { Button } from "@/components/elements/buttons";
import { PROJECTS } from "@/utils/constants/projects";
import {
  faAngleLeft,
  faAngleRight,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeRandon, setActiveRandom] = useState<boolean>(true);
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [showLabel, setShowLabel] = useState<boolean>(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? PROJECTS.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === PROJECTS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePage = (index: number) => {
    setActiveRandom(false);
    setCurrentIndex(index);
  };

  const handleLink = (link: string) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (activeRandon) {
      const handleRandom = setTimeout(() => {
        handleNext();
      }, 5000);

      return () => {
        clearTimeout(handleRandom);
      };
    }
  }, [currentIndex]);

  const variantDetail = {
    show: {
      y: 0,
      opacity: 1,
    },
    hidden: {
      y: 100,
      opacity: 0,
    },
  };

  return (
    <section>
      <div
        className={`flex items-center justify-center w-full md:max-w-screen-2xl mx-auto h-[70dvh] overflow-hidden relative rounded-md md:px-0`}
        id="project"
      >
        <motion.img
          key={currentIndex}
          src={PROJECTS[currentIndex].image}
          alt={`Image ${PROJECTS[currentIndex].title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute z-10 w-full aspect-auto md:aspect-video md:object-center md:object-contain object-cover object-left-top rounded-md"
        />

        <div className="z-30 absolute bg-transparent flex items-center left-[1%]">
          <Button onClick={handlePrev} background="none text-accent">
            <FontAwesomeIcon icon={faAngleLeft} size="3x" />
          </Button>
        </div>
        <div className="z-30 absolute bg-transparent right-[1%] flex items-center">
          <Button onClick={handleNext} background="none text-accent">
            <FontAwesomeIcon icon={faAngleRight} size="3x" />
          </Button>
        </div>
        <div className="absolute top-2 z-20 flex gap-2 bg-transparent">
          {PROJECTS.map((project, idx) => {
            return (
              <Button
                key={project.id}
                size={idx === currentIndex ? "md" : "sm"}
                background={idx === currentIndex ? "bg-primary" : "bg-text"}
                onClick={() => handlePage(idx)}
              >
                {" "}
              </Button>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute md:block hidden z-20 w-full rounded-t-xl h-fit py-2 bottom-0 bg-primary"
        >
          <div className="text-center relative">
            <Button
              onClick={() => setShowDetail((prev) => !prev)}
              background="none"
              onMouseEnter={() => setShowLabel(true)}
              onMouseLeave={() => setShowLabel(false)}
            >
              {showDetail ? (
                <FontAwesomeIcon
                  icon={faArrowAltCircleDown}
                  size="2x"
                  color="inherit"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowAltCircleUp}
                  size="2x"
                  color="inherit"
                />
              )}
            </Button>
            {showLabel && (
              <motion.div
                className="absolute bg-disable px-4 py-2 rounded-lg -top-10 left-[45%] md:left-[45%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span>show detail</span>
              </motion.div>
            )}
          </div>
          <AnimatePresence>
            {showDetail && (
              <motion.article
                className="px-4 py-2 flex flex-col justify-between"
                variants={variantDetail}
                initial={"hidden"}
                animate={showDetail ? "show" : "hidden"}
                exit={"hidden"}
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-4xl font-semibold capitalize">
                    {PROJECTS[currentIndex].title}
                  </h2>
                  <p className="line-clamp-4 md:line-clamp-none">
                    {PROJECTS[currentIndex].description}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {PROJECTS[currentIndex].tags.map((tag) => {
                      return (
                        <div
                          key={tag}
                          className="px-2 py-1 rounded-md bg-secondary"
                        >
                          <span>{tag}</span>
                        </div>
                      );
                    })}
                  </div>
                  {PROJECTS[currentIndex].url && (
                    <div className="text-end">
                      <Button
                        onClick={() => handleLink(PROJECTS[currentIndex].url)}
                      >
                        link
                      </Button>
                    </div>
                  )}
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="bg-primary py-2 px-4 max-w-screen-2xl w-full flex mx-auto justify-center md:hidden">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold capitalize">
            {PROJECTS[currentIndex].title}
          </h2>
          <p className="">
            {PROJECTS[currentIndex].description}
          </p>
          <div className="flex gap-1 flex-wrap">
            {PROJECTS[currentIndex].tags.map((tag) => {
              return (
                <div key={tag} className="px-2 py-1 rounded-md bg-secondary">
                  <span>{tag}</span>
                </div>
              );
            })}
          </div>
          {PROJECTS[currentIndex].url && (
            <div className="text-end">
              <Button onClick={() => handleLink(PROJECTS[currentIndex].url)}>
                link
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
