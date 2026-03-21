import SelectComponent from "@/features/(finance)/commons/components/SelectComponent";
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
      <div className="max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {selectedViewProject === "top"
              ? "Selected Projects"
              : "All Projects"}
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
            <div
              key={index}
              className="group grid md:grid-cols-2 gap-6 md:gap-10"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.url?.demo && (
                    <Link
                      to={project.url.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
                      aria-label="View live project"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  )}
                  {project.url?.code && (
                    <Link
                      to={project.url?.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-foreground text-background rounded-full hover:scale-110 transition-transform"
                      aria-label="View source code"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4">
                {/* <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    {project.type}
                  </span>
                </div> */}

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
                      {project.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.tags.length > 0 && (
                  <div className="flex flex-col">
                    <span>Tags: </span>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-muted text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
