"use client";

import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const experiences = [
  {
    period: "2023 — Present",
    title: "Front End Developer | Back End Developer",
    company: "Full Time Contract",
    description: "",
    technologies: [
      "React",
      "React Native",
      "Node.js",
      "Nest js",
      "Laravel",
      "Gin",
      "Redis",
      "SqLite",
      "MySql",
      "PostgreSQL",
      "Firebase",
      "TypeScript",
    ],
    link: null,
  },
  {
    period: "2023 — Present",
    title: "Full Stack Developer",
    company: "Freelance",
    description:
      "Building custom web applications for various clients. Developing end-to-end solutions using modern tech stacks including React, Next.js.",
    technologies: ["React", "Next.js", 'SqLite'],
    link: null,
  },
  {
    period: "2022",
    title: "Graduated Full Stack Developer",
    company: "Hacktiv8",
    description:
      "Completed intensive Full Stack JavaScript bootcamp. Built multiple projects including e-commerce platforms, content management systems, and real-time applications.",
    technologies: [
      "JavaScript",
      "React",
      "React Native",
      "Vue.js",
      "Express",
      "Redis",
      "MongoDB",
      "PostgreSQL",
    ],
    link: "https://drive.google.com/file/d/1ZyWhv4TbtBNPcHKwaX0mMUoinIuGqOgy/view",
  },
  {
    period: "2016 - 2021",
    title: "Graduated Information Engineering",
    company: "IIB DARMAJAYA BANDAR LAMPUNG",
    description:
      "",
    technologies: [
      
    ],
    link: "https://drive.google.com/file/d/1-SeLHT-tYDr4Y0aFuG7QyQMozsdt4d5X/view",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-4xl">
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
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
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
