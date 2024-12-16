import { db } from "@/libs/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { TypeTransaction } from "../types/finance/financeLog";
import GlobalError from "@/libs/globalError";

export const fetchTypeTransaction = async (): Promise<TypeTransaction[]> => {
  try {
    const collectionRef = collection(db, "typeTransaction");

    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TypeTransaction[];
  } catch (error) {
    throw new GlobalError(error);
  }
};
