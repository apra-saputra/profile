import { db } from "@/libs/firebase/firebase";
import GlobalError from "@/libs/globalError";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  limit as queryLimit,
} from "firebase/firestore";
import { FinanceLog } from "../types/financeLog";

export const fetchFinanceLog = async (limit: number = 10) => {
  try {
    // Referensi koleksi Firestore
    const financeRef = collection(db, "financeLog");

    // Buat query dengan batasan limit
    const financeQuery = query(financeRef, queryLimit(limit));

    // Eksekusi query untuk mendapatkan dokumen
    const querySnapshot = await getDocs(financeQuery);

    // Proses data financeLog dengan memuat kategori referensi
    const financeLogs = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const categoryRef = data.categoryRef;
        const typeRef = data.typeRef;

        let categoryData = null;
        if (categoryRef) {
          const categoryDoc = await getDoc(doc(db, categoryRef.path));
          if (categoryDoc.exists()) {
            categoryData = { id: categoryDoc.id, ...categoryDoc.data() };
          }
        }

        let typeData = null;
        if (typeRef) {
          const typeDoc = await getDoc(doc(db, typeRef.path));
          if (typeDoc.exists())
            typeData = { id: typeDoc.id, ...typeDoc.data() };
        }

        return {
          id: docSnapshot.id,
          ...data,
          typeTransaction: typeData,
          category: categoryData,
        };
      })
    );

    return financeLogs as FinanceLog[];
  } catch (error: any) {
    // Tangani error menggunakan GlobalError
    throw new GlobalError(error.message || "Failed to fetch finance logs");
  }
};
