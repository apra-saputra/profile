import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";

const useSignIn = () => {
  const login = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      throw error;
    }
  };

  return { login };
};

export default useSignIn;
