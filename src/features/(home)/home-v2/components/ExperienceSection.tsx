import SpanCapsul from "@/features/commons/components/SpanCapsul";
import { experiences } from "@/libs/constants/experinces";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="bg-muted/80 py-4 px-6 rounded-xl shadow-md">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-12">
          Experiences
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group grid md:grid-cols-[200px_1fr] gap-4 md:gap-8"
            >
              <div className="text-sm text-muted-foreground font-mono">
                {exp.period}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {exp.title} ·{" "}
                    {exp.link ? (
                      <Link
                        to={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline underline-offset-4"
                      >
                        {exp.company}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span>{exp.company}</span>
                    )}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <SpanCapsul text={tech} key={tech} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
