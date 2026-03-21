import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export function HeroSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20"
    >
      <div className="max-w-4xl">
        <img
          src={logo}
          alt="logo"
          className="md:-bottom-20 -bottom-10 md:-right-24 -right-8 transform -rotate-3 mb-3"
        />

        <div className="mb-8">
          {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
            Apra Saputra
          </h1> */}
          <p className="text-xl md:text-2xl text-primary font-medium mb-6">
            Full Stack Developer
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            I build accessible, pixel-perfect digital experiences for the web.
            Specializing in Front End and Back End development with a passion
            for creating scalable solutions.
          </p>
        </div>

        <div className="space-y-8">
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            A professional programmer with a degree in Informatics Engineering
            from <span className="text-foreground font-medium">Hacktiv8</span>.
            My experience in audio engineering and graphic design makes me a
            creative problem solver. I am eager to learn and implement new
            technologies in software development.
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Frontend | Backend Dev</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Indonesia</span>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <Link
              to="https://github.com/apra-saputra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              to="https://linkedin.com/in/apra-saputra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              to="mailto:apra.saputra@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <Link
            to="#experience"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
