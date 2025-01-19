import NotFound from "@/features/NotFound";
import { useParams } from "react-router-dom";
import { Project, projects } from "../home/utils/project";
import { useMemo, useState } from "react";
import { deobfuscateId } from "@/features/commons/utils/functions/hashing";
import { motion } from "framer-motion";
import RedirectButton from "./components/RedirectButton";
import { useIsMobile } from "@/features/commons/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/commons/components/ui/card";

const index = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();

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

  // state
  const [animatedDescription] = useState({
    opacity: 1,
    y: isMobile ? 400 : 200,
  });

  const linkData = useMemo(() => {
    return { back: -1, ...data.url };
  }, [Object.keys(data.url)]);

  if (isMobile) {
    return (
      <section className="w-full">
        <div className="relative">
          <motion.img
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            src={data?.image}
            alt="Image"
            className="fixed -z-10 w-full object-cover md:object-fit md:w-1/2 md:mx-auto md:right-0 md:left-0"
          />
        </div>
        <motion.div
          className="bg-secondary mt-[200px] md:mt-[400px] min-h-screen rounded-tl-3xl rounded-tr-3xl"
          initial={{ opacity: 0, y: 700 }}
          animate={animatedDescription}
          transition={{
            duration: 0.5,
            delay: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <div className="container mx-auto space-y-5 py-8 px-4 md:px-0">
            <h1>{data.title}</h1>
            {JSON.stringify({ isMobile })}
            {data.description && <h5>{data.description.en}</h5>}
            <div>
              {!!data.features.length && (
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
            <RedirectButton data={linkData} />
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <Card className="flex items-center w-full min-w-[400px] md:max-w-[800px] lg:max-w-[1200px] xl:max-w-[1600px] px-2 py-4">
        <img
          src={data.image}
          alt="Project Image"
          className="object-contain w-1/4 aspect-square"
        />
        <div className="flex-1">
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>{data.description?.en}</CardDescription>
          </CardHeader>
          <CardContent>
            {!!data.features.length && (
              <>
                <h4 className="underline">Features</h4>
                <ul className="pl-4">
                  {data.features.map((feature, index) => (
                    <li key={index}>- {feature}</li>
                  ))}
                </ul>
              </>
            )}
            <div className="flex justify-end">
              <RedirectButton data={linkData} />
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
};

export default index;
