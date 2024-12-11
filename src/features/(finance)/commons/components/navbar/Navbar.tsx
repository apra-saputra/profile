import { Link, useNavigate } from "react-router-dom";
import ChangeThemeButton from "./ChangeThemeButton";
import MenuNavbar from "./MenuNavbar";
import { useAuth } from "../../contexts/AuthContext";

const FinanceNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/finance");
  };

  return (
    <nav className="w-full flex justify-between items-center px-4 py-4 overflow-hidden h-full bg-accent">
      <Link to={"/finance"}>
        <h1>Logo</h1>
      </Link>

      <div className="space-x-2">
        <ChangeThemeButton />
        <MenuNavbar user={user} logoutFn={handleLogout} />
      </div>
    </nav>
  );
};

export default FinanceNavbar;
