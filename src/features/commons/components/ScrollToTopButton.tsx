import { CornerLeftUp } from "lucide-react";
import { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/libs/utils";

const ScrollToTopButton = memo(({ classname }: { classname?: string }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Button
      className={cn("h-8 w-8 rounded-lg", classname)}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <CornerLeftUp />
    </Button>
  );
});

export default ScrollToTopButton;
