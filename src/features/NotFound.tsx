import { FaHouse } from "react-icons/fa6";
import { Button } from "@/features/commons/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "./commons/components/ui/separator";

export default () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-screen">
      <div className="container mx-auto w-full flex flex-col items-start justify-center gap-y-12 min-h-screen p-6 z-10 relative">
        <h1 className="text-6xl font-bold">Page Not Found</h1>
        <div className="space-y-2 px-6">
          <p className="text-xl font-medium">
            The page you are looking for was not found or is currently under
            maintenance. Please visit another page.
          </p>
          <Separator />
          <p className="text-xl font-medium">
            Halaman yang Anda cari tidak ditemukan atau sedang dalam perbaikan,
            silahkan kunjungi halaman lain.
          </p>
        </div>
        <Button
          variant={"outline"}
          className="bg-transparent duration-300 space-x-2 font-semibold uppercase"
          onClick={() => navigate("/")}
        >
          <FaHouse />
          <span className="tracking-[0.25rem] text-sm">Back to home</span>
        </Button>
      </div>
    </section>
  );
};
