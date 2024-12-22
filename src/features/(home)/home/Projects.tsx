import { projects } from "@/features/(home)/home/utils/project";
import {
  CarouselComponent,
  CarouselItemComponent,
} from "../../commons/components/carousel/CarouselComponent";
import { Link } from "react-router-dom";
import { obfuscateId } from "@/features/commons/utils/functions/hashing";

const Projects = () => {
  return (
    <div className="w-full h-full flex items-center">
      <CarouselComponent isShowIndex>
        {projects.map((project, index) => (
          <CarouselItemComponent
            className="flex flex-col py-6 gap-y-4 md:basis-1/3 lg:basis-1/3"
            index={`${index}+${project.id}`}
          >
            <Link
              to={`/projects/${obfuscateId(project.id)}`}
              className="relative rounded overflow-hidden hover:-translate-y-3 duration-300 ease-in-out"
            >
              <img
                src={project.image}
                loading="lazy"
                alt="Project Image"
                className="aspect-square object-cover object-top w-full"
              />
              <div className="absolute w-full inset-0 bg-gradient-to-b from-black/0 via-transparent via-10% to-primary" />
            </Link>

            <div className="px-2 text-center">
              <h4 className="font-bold capitalize">{project.title}</h4>
              <p className="line-clamp-3">{project.description.en}</p>
            </div>
          </CarouselItemComponent>
        ))}
      </CarouselComponent>
    </div>
  );
};

export default Projects;
