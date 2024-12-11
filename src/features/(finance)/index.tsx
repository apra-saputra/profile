import { Link } from "react-router-dom";
import { Button } from "../commons/components/ui/button";

const FinanceHome = () => {
  return (
    <section className="container mx-auto min-h-screen space-y-4">
      <h1>Welcome to finance home</h1>
      <Button>
        <Link to={"/finance/admin"}> Go To Admin</Link>
      </Button>
    </section>
  );
};

export default FinanceHome;
