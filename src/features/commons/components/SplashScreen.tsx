import React from "react";
import { Progress } from "./ui/progress";

const SplashScreen = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10)); // Reset ke 0 jika mencapai 100
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container flex justify-center h-screen w-full mx-auto items-center">
      <Progress value={progress} className="w-5/6" />
    </div>
  );
};

export default SplashScreen;
