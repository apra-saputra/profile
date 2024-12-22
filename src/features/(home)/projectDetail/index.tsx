import NotFound from "@/features/NotFound";
import { useParams } from "react-router-dom";
import { Project, projects } from "../home/utils/project";
import { useState } from "react";
import { deobfuscateId } from "@/features/commons/utils/functions/hashing";
import { motion } from "framer-motion";
import RedirectButton from "./components/RedirectButton";

const index = () => {
  const { id } = useParams();

  if (!id) {
    return <NotFound />;
  }

  const idPayload = deobfuscateId(id);

  if (!idPayload) {
    return <NotFound />;
  }

  const [data, _] = useState<Project | undefined>(
    projects.find((project) => project.id === idPayload)
  );

  if (!data) return <NotFound />;

  return (
    <div className="w-full">
      <div className="relative">
        <img
          src={data?.image}
          alt="Image"
          className="absolute -z-10 md:w-full object-cover"
        />
      </div>
      <motion.div
        className="bg-secondary mt-[200px] md:mt-[400px] min-h-screen rounded-tl-3xl rounded-tr-3xl"
        initial={{ opacity: 0, y: 700 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <div className="container mx-auto space-y-5 py-8 px-4 md:px-0">
          <h1>{data?.title}</h1>
          {data?.description && <h5>{data?.description.en}</h5>}
          <div>
            {!!data?.features.length && (
              <>
                <h4 className="underline">Features</h4>
                <ul className="pl-4">
                  {data.features.map((feature, index) => (
                    <li key={index}>- {feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <RedirectButton data={data?.url} />
        </div>
      </motion.div>
    </div>
  );
};

export default index;
