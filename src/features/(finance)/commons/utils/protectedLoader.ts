import { auth } from "@/libs/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export const protectedRouteLoader = async () => {
  const accesstoken = Cookies.get("accessToken");

  if (accesstoken) {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.displayName) {
        // Ambil data user dari Firebase atau backend
        // const userData: User = {
        //   displayName: firebaseUser.displayName || "Unknown",
        //   email: firebaseUser.email || "",
        //   photoURL: firebaseUser.photoURL || "",
        // };
        const token = await firebaseUser.getIdToken();
        Cookies.set("accessToken", token, { expires: 7 });
        return null;
      } else {
        return redirect("/finance/sign-in");
      }
    });
  } else {
    return redirect("/finance/sign-in");
  }
  return null;
};

export const hasSignIn = () => {
  const accesstoken = Cookies.get("accessToken");

  if (!accesstoken) return null;

  return redirect("/finance/admin");
};
