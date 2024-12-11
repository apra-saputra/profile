import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminFinance = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/finance/admin/dashboard");
    return () => {};
  }, []);

  return <div>AdminFinance</div>;
};

export default AdminFinance;
