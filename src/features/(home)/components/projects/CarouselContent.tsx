import { Project } from "@/features/(home)/utils/project";
import React, { memo } from "react";

interface CarauselContentProps {
  project: Project;
}

const CarauselContent: React.FC<CarauselContentProps> = memo(({ project }) => {
  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden rounded-xl">
      <div className="w-full w-5/6 relative h-full">
      <img
        src={project.image}
        alt="Banner"
        className="w-full h-full object-contain object-top" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent via-10% to-black/50" />

      </div>

      <div className="absolute top-0 z-10 bg-destructive ">
        <h2>{project.title}</h2>
      </div>
    </div>
  );
});

export default CarauselContent;
