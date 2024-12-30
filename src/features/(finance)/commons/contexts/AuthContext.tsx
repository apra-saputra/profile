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
import { auth } from "@/libs/firebase/firebase";
import { UserDisplay, UserFormEmailPassword } from "../types/user";
import {
  loginUser,
  loginWithGoogleAndSaveToFirestore,
  logoutUser,
  registerUser,
} from "../services/user";
import GlobalError from "@/libs/globalError";
import { useNavigate } from "react-router-dom";

// Define tipe untuk user dan context

interface AuthContextType {
  user: UserDisplay | undefined;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (userData: UserFormEmailPassword) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: {
    email: string;
    name: string;
    password: string;
  }) => Promise<void>;
  loginWithProvider: () => Promise<void>;
}

// Context Default Value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Implementation
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDisplay>();
  const [accessToken, setAccessToken] = useState<string | null>(
    Cookies.get("accessToken") || null
  );

  const login = async (userData: UserFormEmailPassword) => {
    const user = await loginUser(userData);

    setUser({ ...user });
    setAccessToken(user.token);

    // Simpan token di cookies
    Cookies.set("accessToken", user.token, { expires: 7 });
    navigate("admin");
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(undefined);
      setAccessToken(null);
      Cookies.remove("accessToken");
      navigate("/finance");
    } catch (error) {
      throw new GlobalError(error);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { token, ...user } = await registerUser(userData);

      setUser(user);
      setAccessToken(token);
      Cookies.set("accessToken", token, { expires: 7 });
      navigate("admin");
    } catch (error) {
      throw new GlobalError(error);
    }
  };

  const loginWithProvider = async () => {
    const { token, ...user } = await loginWithGoogleAndSaveToFirestore();

    setUser({ ...user });
    setAccessToken(token);
    Cookies.set("accessToken", token, { expires: 7 });
  };

  const isAuthenticated = !!accessToken;

  // Sinkronisasi user saat ada token
  useEffect(() => {
    if (accessToken && !user) {
      // Contoh menggunakan Firebase auth
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // console.log(firebaseUser);
          // Ambil data user dari Firebase atau backend
          const userData: UserDisplay = {
            id: firebaseUser.uid,
            displayName: firebaseUser.displayName || "Unknown",
            email: firebaseUser.email || "",
            photoURL: firebaseUser.photoURL || "",
            createdAt: firebaseUser.metadata.creationTime || new Date(),
            role: "user",
          };
          const token = await firebaseUser.getIdToken();
          setUser(userData);
          setAccessToken(token);
          Cookies.set("accessToken", token, { expires: 7 });
        } else {
          logout();
        }
      });
    }
  }, [accessToken, user]);

  const value = useMemo(() => {
    return {
      user,
      accessToken,
      isAuthenticated,
      login,
      logout,
      register,
      loginWithProvider,
    };
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
