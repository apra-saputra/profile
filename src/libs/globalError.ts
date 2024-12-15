import { FirebaseError } from "firebase/app";
import { FirebaseServiceError } from "./firebase/errorFirebase";

class GlobalError {
  constructor(error: any) {
    if (error instanceof FirebaseError)
      throw new FirebaseServiceError(error.code);

    throw new Error("Unexpected Error Occurred.");
  }
}

export default GlobalError;
