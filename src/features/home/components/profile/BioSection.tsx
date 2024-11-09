import { Label } from "@/features/commons/components/ui/label";
import React, { useCallback, useState } from "react";
import TypingAnimation from "../TypingAnimation";

interface BioSectionProps {}

const BioSection: React.FC<BioSectionProps> = ({}) => {
  const data = [
    { section: "Name", text: "Apra Saputra", delayTime: 150 },
    { section: "Job", text: "Frontend | Backend Developer", delayTime: 7000 },
    { section: "Location", text: "Jakarta, Indonesia", delayTime: 15000 },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleComplete = useCallback(() => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === data.length - 1) return 0;
      if (prevIndex - activeIndex === 0) return prevIndex + 1;
      // if (prevIndex - activeIndex > 0) return prevIndex;
      return prevIndex;
    });
  }, [activeIndex]);

  return (
    <div className="space-y-12 flex flex-col justify-center">
      {data.map((bio, index) => (
        <div
          className="w-[300px] flex flex-col justify-start items-start gap-y-2"
          key={bio.section}
        >
          <Label>{bio.section}:</Label>
          <div
            className={`px-4 py-1 rounded-md border w-full min-h-[2.5rem] overflow-hidden flex items-center bg-background ${
              index === activeIndex
                ? "ring-2 outline-background ring-accent ring-offset-2 ring-offset-primary border-0"
                : ""
            }`}
          >
            <TypingAnimation
              text={bio.text}
              onComplete={handleComplete}
              isActive={index === activeIndex}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BioSection;
