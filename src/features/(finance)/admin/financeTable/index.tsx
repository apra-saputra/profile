import { Button } from "@/features/commons/components/ui/button";
import TableSection from "./components/tableSection";
import { Download } from "lucide-react";
import { useState } from "react";
import { FinanceLog } from "../../commons/types/finance/financeLog";
import { downloadCsv, jsonToCsv } from "../../commons/services/download";
import { Outlet } from "react-router-dom";

export default () => {
  const [data, setData] = useState<FinanceLog[]>([]);

  const handleDownload = () => {
    const csvContent = jsonToCsv(data);
    downloadCsv(csvContent);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Transaction Report</h1>
        <Button onClick={handleDownload}>
          <Download />
          <span>Download</span>
        </Button>
      </div>
      {/* <TableExample /> */}
      <TableSection data={data} setData={setData} />

      <Outlet />
    </section>
  );
};
