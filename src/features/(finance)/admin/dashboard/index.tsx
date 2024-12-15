import { useCategories } from "../../commons/hooks/useCategories";

const Dashboard = () => {
  const { categories, loading, error } = useCategories();
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>{JSON.stringify(categories)}</div>
    </div>
  );
};

export default Dashboard;
