import comingSoon from "@/assets/coming-soon.webp";
import { Button } from "./commons/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { Card, CardContent } from "./commons/components/ui/card";

const ComingSoonPage = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-full relative">
      <div className="relative w-full h-screen shadow">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-12">
          <Card className="dark:bg-white/100 bg-secondary/50">
            <CardContent>
              <img src={comingSoon} alt="Text" className="mix-blend-darken" />
              {/* <p className="text-2xl font-semibold capitalize">coming soon</p> */}
              <div className="text-center text-accent">
                <Button
                  variant={"outline"}
                  className="bg-transparent duration-300 space-x-2 font-semibold uppercase"
                  onClick={() => navigate(-1)}
                >
                  <FaHouse />
                  <span className="tracking-[0.25rem] text-sm">
                    Back to home
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonPage;
