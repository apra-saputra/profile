// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";
import { UserDisplay, UserFormEmailPassword } from "../types/user";
import { loginUser, logoutUser, registerUser } from "../services/user";
import GlobalError from "@/libs/globalError";

// Define tipe untuk user dan context

interface AuthContextType {
  user: UserDisplay | undefined;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (userData: UserFormEmailPassword) => void;
  logout: () => void;
}

// Context Default Value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Implementation
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDisplay | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | null>(
    Cookies.get("accessToken") || null
  );

  const login = async (userData: UserFormEmailPassword) => {
    const user = await loginUser(userData);

    setUser({ ...user });
    setAccessToken(user.token);

    // Simpan token di cookies
    Cookies.set("accessToken", user.token, { expires: 7 });
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(undefined);
      setAccessToken(null);
      Cookies.remove("accessToken");
    } catch (error) {
      throw new GlobalError(error);
    }
  };

  const register = async (userData: User) => {
    try {
      const { token, ...user } = await registerUser(userData);

      setUser(user);
      setAccessToken(token);
      Cookies.set("accessToken", token, { expires: 7 });
    } catch (error) {
      throw new GlobalError(error);
    }
  };

  const loginWithProvider = () => {};

  const isAuthenticated = !!accessToken;

  // Sinkronisasi user saat ada token
  useEffect(() => {
    if (accessToken && !user) {
      // Contoh menggunakan Firebase auth
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          console.log(firebaseUser);
          // Ambil data user dari Firebase atau backend
          const userData: Omit<User, "password"> = {
            id: firebaseUser.uid,
            displayName: firebaseUser.displayName || "Unknown",
            email: firebaseUser.email || "",
            photoURL: firebaseUser.photoURL || "",
            createdAt: firebaseUser.metadata.creationTime || new Date(),
            role: "user",
          };
          setUser(userData);
        } else {
          logout();
        }
      });

      // Alternatif: Fetch data user dari backend
      // fetch("/api/user", {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // })
      //   .then((res) => {
      //     if (res.ok) return res.json();
      //     throw new Error("Failed to fetch user");
      //   })
      //   .then((userData: User) => setUser(userData))
      //   .catch(() => logout());
    }
  }, [accessToken, user]);

  const value = useMemo(() => {
    return { user, accessToken, isAuthenticated, login, logout };
  }, [accessToken, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
