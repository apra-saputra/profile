import { Button } from "@/features/commons/components/ui/button";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectButtonProps {
  data?: { [t: string]: string };
}

const RedirectButton: FC<RedirectButtonProps> = memo(({ data }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    if (path.includes("http")) {
      window.open(path, "blank");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex items-center justify-end gap-x-4">
      {data &&
        Object.keys(data).map((el) => (
          <Button
            variant={"outline"}
            className="tracking-[0.2rem] uppercase text-sm hover:underline underline-offset-2"
            onClick={() => handleNavigate(data[el])}
            key={el}
          >
            Go To {el}
          </Button>
        ))}
    </div>
  );
});

export default RedirectButton;
