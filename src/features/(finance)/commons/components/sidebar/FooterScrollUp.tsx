import { SidebarMenuButton } from "@/features/commons/components/ui/sidebar";
import { CornerLeftUp } from "lucide-react";
import { memo, useEffect, useState } from "react";

const FooterScrollUp = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <SidebarMenuButton
      variant={"outline"}
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground px-2 py-6"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      {/* <ScrollToTopButton /> */}
      <div className="rounded-lg bg-primary p-1">
        <CornerLeftUp className="text-background" />
      </div>
      <div className="flex-1 text-left text-sm leading-tight">
        <span className="truncate">Scroll to up</span>
      </div>
    </SidebarMenuButton>
  );
});

export default FooterScrollUp;
