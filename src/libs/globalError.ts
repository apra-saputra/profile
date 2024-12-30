import { FirebaseError } from "firebase/app";
import { FirebaseServiceError } from "./firebase/errorFirebase";

class GlobalError {
  constructor(error: any) {
    console.log(error);
    if (error instanceof FirebaseError)
      throw new FirebaseServiceError(error.code);

    if (error instanceof FirebaseServiceError) throw new Error(error.message);

    throw new Error("Unexpected Error Occurred.");
  }
}

export default GlobalError;
