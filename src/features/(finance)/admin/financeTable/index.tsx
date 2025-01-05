import { Button } from "@/features/commons/components/ui/button";
import TableSection from "./components/tableSection";
import { Download } from "lucide-react";

export default () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Transaction Report</h1>
        <Button >
          <Download/>
          <span>Download</span>
        </Button>
      </div>
      {/* <TableExample /> */}
      <TableSection />
    </section>
  );
};
