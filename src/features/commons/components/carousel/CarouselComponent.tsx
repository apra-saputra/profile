import React, { memo, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn } from "@/libs/utils";

interface CarouselComponentProps {
  children: React.ReactNode;
  isShowIndex?: boolean;
  className?: string;
  isShowNavigation?: boolean;
}

export const CarouselComponent: React.FC<CarouselComponentProps> = ({
  children,
  isShowIndex,
  className,
  isShowNavigation,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      setApi={setApi}
      className={cn("w-full", className)}
    >
      <CarouselContent>{children}</CarouselContent>
      {isShowNavigation && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
      {isShowIndex && (
        <div className="w-full flex items-center justify-center gap-x-2">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`${
                i + 1 === current
                  ? "bg-accent p-[0.4rem]"
                  : Math.abs(i + 1 - current) === 1
                  ? "bg-muted p-[0.25rem]"
                  : "bg-muted p-[0.1rem]"
              } ${
                (i + 1 >= current - 2 && i + 1 <= current + 2) ||
                (current <= 2 && i < 3) ||
                (current >= count - 2 && i >= count - 3)
                  ? "visible"
                  : "hidden"
              } rounded-full duration-300`}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
};

export const CarouselItemComponent = memo(
  ({
    children,
    index,
    className,
  }: {
    children: React.ReactNode;
    index: string | number;
    className?: string;
  }) => {
    return (
      <CarouselItem className={cn("w-full h-full mx-2", className)} key={index}>
        {children}
      </CarouselItem>
    );
  }
);
