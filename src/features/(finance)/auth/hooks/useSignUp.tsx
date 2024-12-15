import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";

const useSignUp = () => {
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  // await createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //         // Signed in
  //         const user = userCredential.user;
  //         console.log(user);
  //         navigate("/login")
  //         // ...
  //     })
  //     .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         console.log(errorCode, errorMessage);
  //         // ..
  //     });
  return { signUp };
};

export default useSignUp;
