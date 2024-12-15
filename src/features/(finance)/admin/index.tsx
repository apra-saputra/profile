import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminFinance = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // this only for forcing url 'finance/admin' to 'finance/admin/dashboard'
    navigate("/finance/admin/dashboard");
    return () => {};
  }, []);

  return <div>AdminFinance</div>;
};

export default AdminFinance;
