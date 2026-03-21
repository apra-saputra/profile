import { techCategories } from "@/libs/constants/techstack";

export function TechStackSection() {
  return (
    <section id="tech-stack" className="px-6 md:px-12 lg:px-24 pt-32 pb-64">
      <div className="bg-muted/80 py-4 px-6 rounded-xl shadow-md">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-12">
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
