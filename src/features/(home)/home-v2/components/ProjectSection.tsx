import SelectComponent from "@/features/(finance)/commons/components/SelectComponent";
import SpanCapsul from "@/features/commons/components/SpanCapsul";
import { Separator } from "@/features/commons/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/features/commons/components/ui/tooltip";
import { generateUID } from "@/features/commons/utils/functions/generateUID";
import { projects } from "@/libs/constants/project";
import { ExternalLink, Github } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export function ProjectsSection() {
  const [selectedViewProject, setSelectedViewProject] = useState<"top" | "all">(
    "top",
  );

  const projectSelected = useMemo(() => {
    switch (selectedViewProject) {
      case "all":
        return projects;
      case "top":
      default:
        return projects.slice(0, 5);
      // break;
    }
  }, [selectedViewProject]);
  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="bg-muted/80 py-4 px-6 rounded-xl shadow-md">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {selectedViewProject === "top" ? "Top 5 Projects" : "All Projects"}
          </h2>
          <SelectComponent
            options={[
              { name: "Top 5 Projects", value: "top" },
              { name: "All Projects", value: "all" },
            ]}
            state={selectedViewProject}
            setState={(value) => setSelectedViewProject(value as "top" | "all")}
          />
        </div>

        <div className="grid gap-16">
          {projectSelected.map((project, index) => (
            <div key={index}>
              <div className="group grid md:grid-cols-2 gap-6 md:gap-10 mb-6">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105 w-full"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.url?.demo && (
                      <Link
                        to={project.url.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-full hover:scale-110 transition-all duration-300"
                        aria-label="View live project"
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <ExternalLink className="w-5 h-5" />
                          </TooltipTrigger>
                          <TooltipContent>Demo Project</TooltipContent>
                        </Tooltip>
                      </Link>
                    )}
                    {project.url?.code && (
                      <Link
                        to={project.url?.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-full hover:scale-110 transition-all duration-300"
                        aria-label="View source code"
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <Github className="w-5 h-5" />
                          </TooltipTrigger>
                          <TooltipContent>Source Code</TooltipContent>
                        </Tooltip>
                      </Link>
                    )}
                    {!project.url.code && !project.url.demo && (
                      <span className="text-muted-foreground">No Action</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-start space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description.en || ""}
                  </p>

                  {project.features?.length > 0 && (
                    <div className="flex flex-col">
                      <span>Features: </span>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.features.map((feat, idx) => (
                          <SpanCapsul
                            text={feat}
                            key={`${project.obfuscatedId}-${feat}-${idx}-${generateUID(4)}-feat`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {project.tags.length > 0 && (
                    <div className="flex flex-col">
                      <span>Tags: </span>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, idx) => (
                          <SpanCapsul
                            text={tag}
                            key={`${project.obfuscatedId}-${tag}-${idx}-${generateUID(4)}-tags`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Separator className="mt-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
