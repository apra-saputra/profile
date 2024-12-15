import { FaGoogle } from "react-icons/fa6";
import { useAuth } from "../../commons/contexts/AuthContext";
import { useToast } from "@/features/commons/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const { loginWithProvider } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithProvider();
      navigate("/finance/admin");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      const errorName = JSON.stringify(error);
      toast({
        variant: "destructive",
        title: "Oops! Something wrong!",
        description: errorName,
      });
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-x-4"
    >
      <FaGoogle />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
