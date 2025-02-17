import { db } from "@/libs/firebase/firebase";
import { startOfMonth, endOfMonth } from "date-fns";
import GlobalError from "@/libs/globalError";
import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  limit as queryLimit,
  startAfter,
  where,
} from "firebase/firestore";
import { FinanceLog } from "../types/finance/financeLog";
import { CreateFinance } from "../types/finance/create";
import { FirebaseServiceError } from "@/libs/firebase/errorFirebase";

export const fetchFinanceLog = async ({
  userRef,
  limit = 10,
  offset = 0,
  date = new Date(),
  startDate,
  endDate,
  orderByField = null,
  orderDirection = ["asc"],
  categoryRef,
}: {
  userRef: string;
  limit: number;
  offset?: number;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  orderByField?: string | string[] | null;
  orderDirection?: Array<"asc" | "desc">;
  categoryRef?: string;
}) => {
  try {
    // Referensi koleksi Firestore
    const financeRef = collection(db, "financeLog");

    // cari user
    const userDocRef = doc(db, "users", userRef);

    // Calculate the start and end of the current month
    const startQueryDate = startDate ? startDate : startOfMonth(date);
    const endQueryDate = endDate ? endDate : endOfMonth(date);

    const queryConstraints: QueryConstraint[] = [
      where("createdAt", ">=", startQueryDate.toISOString()),
      where("createdAt", "<=", endQueryDate.toISOString()),
      where("userRef", "==", userDocRef),
    ];

    // Tambahkan orderBy ke dalam database jika ditentukan
    if (orderByField) {
      if (Array.isArray(orderByField)) {
        orderByField.forEach((field, index) => {
          const direction = orderDirection[index] || "asc"; // Default ke 'asc' jika tidak ada
          queryConstraints.push(orderBy(field, direction));
        });
      } else {
        const direction = orderDirection[0] || "asc"; // Default ke 'asc' jika tidak ada
        queryConstraints.push(orderBy(orderByField, direction));
      }
    }

    if (categoryRef) {
      const categoryDocRef = doc(db, "categoryCreditFinance", categoryRef);
      queryConstraints.push(where("categoryRef", "==", categoryDocRef));
    }

    let startAfterDoc: DocumentSnapshot | null = null;
    if (offset > 0) {
      const initialQuery = query(
        financeRef,
        ...queryConstraints,
        queryLimit(offset)
      );
      const initialSnapshot = await getDocs(initialQuery);

      // Ambil dokumen terakhir dari hasil sebelumnya
      const docs = initialSnapshot.docs;
      if (docs.length > 0) {
        startAfterDoc = docs[docs.length - 1];
      }
    }

    if (startAfterDoc) {
      queryConstraints.push(startAfter(startAfterDoc));
    }

    // batasan limit
    queryConstraints.push(queryLimit(limit));

    const financeQuery = query(financeRef, ...queryConstraints);

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
    throw new GlobalError(error);
  }
};

export const countFinanceLog = async ({
  userRef,
  date = new Date(),
  startDate,
  endDate,
}: {
  userRef: string;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
}): Promise<number> => {
  try {
    // Referensi koleksi Firestore
    const financeRef = collection(db, "financeLog");

    // cari user
    const userDocRef = doc(db, "users", userRef);

    // Hitung awal dan akhir bulan jika tanggal tidak disediakan
    const startQueryDate = startDate ? startDate : startOfMonth(date);
    const endQueryDate = endDate ? endDate : endOfMonth(date);

    // Query dengan filter yang sama seperti fetchFinanceLog
    const financeQuery = query(
      financeRef,
      where("createdAt", ">=", startQueryDate.toISOString()),
      where("createdAt", "<=", endQueryDate.toISOString()),
      where("userRef", "==", userDocRef)
    );

    // Eksekusi query untuk mendapatkan snapshot dokumen
    const querySnapshot = await getDocs(financeQuery);

    // Hitung total dokumen
    return querySnapshot.size;
  } catch (error: any) {
    throw new GlobalError(error);
  }
};

export const createFinanceLog = async (financeLog: CreateFinance) => {
  try {
    // Validasi input: pastikan financeLog memiliki field yang dibutuhkan
    if (
      !financeLog.name ||
      !financeLog.amount ||
      !financeLog.categoryRef ||
      !financeLog.typeRef
    ) {
      throw new GlobalError(
        "Missing required fields: name, amount, categoryRef, or typeRef"
      );
    }

    // Referensi user
    const userRef = doc(db, "users", financeLog.userRef);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new FirebaseServiceError("firestore/not-found");
    }

    // Referensi kategori
    const categoryRef = doc(
      db,
      "categoryCreditFinance",
      financeLog.categoryRef
    );
    const categoryDoc = await getDoc(categoryRef);
    if (!categoryDoc.exists()) {
      throw new FirebaseServiceError("firestore/not-found");
    }

    // Referensi tipe transaksi
    const typeRef = doc(db, "typeTransaction", financeLog.typeRef);
    const typeDoc = await getDoc(typeRef);
    if (!typeDoc.exists()) {
      throw new FirebaseServiceError("firestore/not-found");
    }

    // Referensi koleksi `financeLog`
    const financeLogRef = collection(db, "financeLog");

    // Tambahkan dokumen baru ke Firestore
    const newFinanceLog = {
      ...financeLog,
      createdAt: new Date().toISOString(), // Tambahkan timestamp
      categoryRef, // Simpan referensi kategori
      typeRef, // Simpan referensi tipe transaksi
      userRef,
    };

    const docRef = await addDoc(financeLogRef, newFinanceLog);

    // Kembalikan dokumen yang baru dibuat dengan ID-nya
    return { id: docRef.id, ...newFinanceLog };
  } catch (error: any) {
    // Tangani error menggunakan GlobalError
    throw new GlobalError(error);
  }
};
