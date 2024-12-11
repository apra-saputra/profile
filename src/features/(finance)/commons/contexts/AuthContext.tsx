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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";

// Define tipe untuk user dan context
export interface User {
  displayName: string;
  email: string;
  photoURL: string;
}

interface AuthContextType {
  user: User | undefined;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
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
  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | null>(
    Cookies.get("accessToken") || null
  );

  const login = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);

    // Simpan token di cookies
    Cookies.set("accessToken", token, { expires: 7 });
  };

  const logout = () => {
    setUser(undefined);
    setAccessToken(null);
    Cookies.remove("accessToken");
  };

  const isAuthenticated = !!accessToken;

  // Sinkronisasi user saat ada token
  useEffect(() => {
    if (accessToken && !user) {
      // Contoh menggunakan Firebase auth
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          // Ambil data user dari Firebase atau backend
          const userData: User = {
            displayName: firebaseUser.displayName || "Unknown",
            email: firebaseUser.email || "",
            photoURL: firebaseUser.photoURL || "",
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
