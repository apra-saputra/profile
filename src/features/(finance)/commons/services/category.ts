import {
  collection,
  doc,
  getDoc,
  getDocs,
  //   addDoc,
  //   doc,
  //   deleteDoc,
} from "firebase/firestore";
import { CategoryCredit } from "../types/category";
import { db } from "@/libs/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { FirebaseServiceError } from "@/libs/firebase/errorFirebase";

export const fetchCategories = async (): Promise<CategoryCredit[]> => {
  try {
    const collectionRef = collection(db, "categoryCreditFinance");

    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CategoryCredit[];
  } catch (error) {
    if (error instanceof FirebaseError)
      throw new FirebaseServiceError(error.code);
    throw new Error("Unexpected Error Occurred.");
  }
};

export const fetchCategoryById = async (
  id: string
): Promise<CategoryCredit | null> => {
  try {
    const docRef = doc(db, "categoryCreditFinance", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new FirebaseServiceError("firestore/not-found");
    }

    return { id: docSnap.id, ...docSnap.data() } as CategoryCredit;
  } catch (error) {
    if (error instanceof FirebaseError)
      throw new FirebaseServiceError(error.code);
    throw new Error("Unexpected Error Occurred.");
  }
};
