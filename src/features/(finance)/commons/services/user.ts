import { auth, db } from "@/libs/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, UserFormEmailPassword } from "../types/user";
import { FirebaseServiceError } from "@/libs/firebase/errorFirebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import GlobalError from "@/libs/globalError";

export const registerUser = async (user: User) => {
  try {
    // Mendaftarkan pengguna menggunakan Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const firebaseUser = userCredential.user;

    // Menambahkan nama tampilan pengguna ke Firebase Authentication
    if (user.displayName) {
      await updateProfile(firebaseUser, { displayName: user.displayName });
    }

    // Menyimpan data tambahan ke Firestore
    const userRef = doc(db, "users", firebaseUser.uid);
    const userPayload = {
      displayName: user.displayName,
      email: user.email,
      role: user.role || "user", // Set default role
      createdAt: new Date(),
    };
    await setDoc(userRef, userPayload);

    const token = await firebaseUser.getIdToken();

    return {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName || "",
      email: firebaseUser.email || "",
      photoURL: firebaseUser.photoURL || "",
      createdAt: new Date(), // Menggunakan createdAt dari Firestore
      role: userPayload.role as "user" | "admin", // Validasi role yang diterima
      token,
    } as Omit<User, "password"> & { token: string };
  } catch (error) {
    throw new GlobalError(error);
  }
};

export const loginUser = async ({ email, password }: UserFormEmailPassword) => {
  try {
    // Login pengguna menggunakan Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // Mengambil data pengguna dari Firestore
    const userRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new FirebaseServiceError("auth/invalid-email");
    }

    const userData = userDoc.data();

    const token = await firebaseUser.getIdToken();

    return {
      id: firebaseUser.uid, // Menggunakan id yang sesuai dengan tipe User
      displayName: firebaseUser.displayName || "", // Jika tidak ada displayName
      email: firebaseUser.email || "", // Jika tidak ada email
      photoURL: firebaseUser.photoURL || "", // Jika tidak ada photoURL
      createdAt: userData.createdAt.toDate() || new Date(), // Pastikan formatnya sesuai
      password: password, // Tidak menyarankan menyimpan password di output, gunakan untuk validasi login
      role: userData.role as "user" | "admin", // Role harus valid
      token: token,
    } as User & { token: string };
  } catch (error) {
    throw new GlobalError(error);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { message: "User logged out successfully" };
  } catch (error) {
    throw new GlobalError(error);
  }
};

export const loginWithGoogleAndSaveToFirestore = async () => {
  try {
    // Step 1: Login menggunakan Google
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Step 2: Mendapatkan token pengguna
    const token = await user.getIdToken();
    console.log("Token:", token);

    // Step 3: Menyimpan atau memperbarui data pengguna di Firestore
    const userRef = doc(db, "users", user.uid); // Simpan dengan UID pengguna
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      // Jika pengguna belum ada di Firestore, buat data baru
      const userPayload = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      await setDoc(userRef, userPayload);
      console.log("New user data saved to Firestore:", userPayload);
    } else {
      // Jika pengguna sudah ada, perbarui `lastLoginAt`
      await setDoc(
        userRef,
        {
          lastLoginAt: new Date().toISOString(),
        },
        { merge: true } // Gabungkan dengan data lama
      );
      console.log("User login timestamp updated in Firestore.");
    }

    // Step 4: Return user and token
    return { user, token };
  } catch (error) {
    throw new GlobalError(error);
  }
};
