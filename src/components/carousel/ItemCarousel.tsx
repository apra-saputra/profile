import React, { Key, useState } from "react";
import Button from "../elements/Button";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import Tag from "../elements/Tag";

export type typeData = {
  id: Key;
  title: string;
  description: string;
  image?: StaticImageData | string;
  tags: string[];
  url?: string;
};

interface ItemCarouselProps {
  data: typeData;
}

const ItemCarousel: React.FC<ItemCarouselProps> = ({ data }) => {
  const backgroundImageUrl: string = "https://placehold.co/1200x800";
  const [showDetail, setShowDetail] = useState(true);
  const [showLabel, setShowLabel] = useState(false);

  const handleLinkUrl = () => {
    window.open(data.url, "_blank");
  };

  const variants = {
    close: { opacity: 0.5, y: 200 },
    open: { opacity: 1, y: 0 },
  };

  const cardDetailVariant = {
    close: {
      height: 90,
    },
    open: {
      height: 260,
    },
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start bg-secondary rounded-lg overflow-hidden min-h-[760px] md:bg-slate-700 relative">
      {data.image ? (
        <Image
          src={data.image}
          alt="image products"
          className="object-top object-cover bg-black w-full max-h-[800px]"
        />
      ) : (
        <img
          src={backgroundImageUrl}
          alt="image product"
          className="object-contain bg-black max-h-[800px]"
        />
      )}

      <article className="md:hidden block">
        <div className="w-full h-full flex flex-col gap-4 bg-base-primary px-2 py-4">
          <h1 className="font-semibold text-2xl lg:text-4xl mb-2">
            {data.title}
          </h1>
          <p>{data.description}</p>
          <div className="gap-1 flex flex-wrap">
            {data.tags.map((tag, index) => (
              <div className="w-fit px-3 py-1 rounded-xl bg-gray-500 select-none">
                <span className="text-sm">{tag}</span>
              </div>
            ))}
          </div>
          <Button size="sm" type="button" onclick={handleLinkUrl}>
            Go To Link
          </Button>
        </div>
      </article>
      <article className="md:block hidden md:absolute md:bottom-0 w-full shadow-lg">
        <motion.div
          className="text-slate-900 bg-blue-200 rounded-tr-xl rounded-tl-xl p-2 z-10 shadow-lg"
          animate={showDetail ? "open" : "close"}
          variants={cardDetailVariant}
        >
          <div className="flex flex-col justify-between ">
            <div className="text-center relative">
              <FontAwesomeIcon
                icon={showDetail ? faArrowCircleDown : faArrowCircleUp}
                size="2x"
                onMouseEnter={() => setShowLabel(true)}
                onMouseLeave={() => setShowLabel(false)}
                className="text-tertiary hover:text-yellow-400 transition-colors  cursor-pointer"
                onClick={() => setShowDetail((state) => !state)}
              />
              <AnimatePresence>
                {showLabel && !showDetail && (
                  <motion.div
                    className="absolute top-[-50px] right-0 left-0"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                  >
                    <div className="w-full flex justify-center">
                      <Tag>
                        <span>Show Detail</span>
                      </Tag>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
            className="flex flex-col justify-between h-full"
              animate={showDetail ? "open" : "close"}
              variants={variants}
            >
              <div className="w-full">
                <h1 className="font-semibold text-2xl lg:text-4xl mb-2">
                  {data.title}
                </h1>
                <p>{data.description}</p>
              </div>
              <div className="gap-1 flex flex-wrap">
                {data.tags.map((tag, index) => (
                  <div className="w-fit px-3 py-1 rounded-xl bg-gray-400 select-none">
                    <span className="text-sm">{tag}</span>
                  </div>
                ))}
              </div>
              {data.url && (
                <div className="text-end my-2" onClick={() => handleLinkUrl()}>
                  <Button size="sm" type="button">
                    Go To Link
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default ItemCarousel;
