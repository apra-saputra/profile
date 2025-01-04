import { getThisMonth } from "../../commons/utils/functions/getMonthList";
import CardCollections from "./components/CardCollections";
import ChartCollections from "./components/ChartCollections/ChartCollections";
import Top10Transaction from "./components/Top10Transaction";

export default () => {
  return (
    <div className="space-y-4">
      <h1>Dashboard - {getThisMonth()}</h1>
      <CardCollections />
      <ChartCollections />
      <Top10Transaction />
    </div>
  );
};
