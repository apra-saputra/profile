import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectSection";
import { TechStackSection } from "./components/TechStackSection";
import { ExperienceSection } from "./components/ExperienceSection";
import Footer from "@/features/commons/components/Footer";
import ButtonChangeTheme from "@/features/commons/components/ButtonChangeTheme";
import TechStackCarousel from "./components/TechStackCarousel";
import IntroAnimation from "@/features/commons/components/IntroAnimation";

const HomeV2 = () => {
  return (
    <main className="min-h-screen relative h-full select-none">
      <Navigation />

      <div className="max-w-7xl mx-auto">
        <IntroAnimation>
          <HeroSection />
        </IntroAnimation>
      </div>
      <div className="py-6">
        <TechStackCarousel />
      </div>
      <div className="max-w-7xl mx-auto">
        <ExperienceSection />
        <ProjectsSection />
        <TechStackSection />
      </div>

      <Footer />
      <div className="fixed bottom-4 left-4">
        <ButtonChangeTheme />
      </div>
    </main>
  );
};

export default HomeV2;
