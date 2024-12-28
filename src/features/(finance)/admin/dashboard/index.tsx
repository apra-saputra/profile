import CardCollections from "./components/CardCollections";
import Top10Transaction from "./components/Top10Transaction";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <h1>Dashboard</h1>
      <CardCollections />
      <Top10Transaction />
    </div>
  );
};

export default Dashboard;
