// src/components/GoogleSignIn.jsx
import { auth, provider, signInWithPopup } from "@/libs/firebase/firebase";
import { FaGoogle } from "react-icons/fa6";
import { useAuth } from "../../commons/contexts/AuthContext";
import { useToast } from "@/features/commons/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { User } from "../../commons/types/user";

const GoogleSignIn = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      console.log(user);

      const userData = {
        displayName: result.user.displayName || "",
        email: result.user.email || "",
        photoURL: result.user.photoURL || "",
        createdAt: new Date(),
        role: "user",
      };

      login(userData, token);
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
