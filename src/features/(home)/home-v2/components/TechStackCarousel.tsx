import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/features/commons/components/ui/carousel";
import { programings, techstacks } from "@/libs/constants/techstack";
import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";

const TechStackCarousel = () => {
  const techCategoriesMemo = useMemo(() => {
    return [...programings, ...techstacks];

    // return techCategories.flatMap((el) => {
    //   return el.technologies.map((el) => el);
    // });
  }, []);
  return (
    <div className="bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 py-32">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {techCategoriesMemo.map((category, index) => (
            <CarouselItem
              key={index}
              className={`pl-2 basis-1/${(techCategoriesMemo.length || 2) / 4}  mx-8`}
            >
              <div className="bg-gradient-to-r from-accent to-secondary p-4 rounded-2xl shadow-lg h-full px-4 py-2 text-center flex items-center justify-between w-full gap-x-3">
                <img
                  src={category.logo}
                  alt="logo"
                  className="aspect-square h-6"
                />
                <span>{category.title}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TechStackCarousel;
