import React, { createContext, useContext, useState, useEffect } from "react";
import { errorHandler } from "@/utils/helpers";

//
import { DUMMY_USER } from "@/utils/dummyData";
//

interface UserInfo {
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  userInfo: UserInfo | null;
  isLogin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  isLogin: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  async function login(email: string, password: string) {
    try {
      /**
       * Axios action
       */
      // const response = await axios.post("/api/auth/login", {
      //   email,
      //   password,
      // });

      const userData = DUMMY_USER.find(
        (dummyUser) =>
          dummyUser.email === email && dummyUser.password === password
      );

      if (!userData) throw new Error("Invalid Login");

      store(userData);
      setUserInfo(userData);
      setIsLogin(true);
    } catch (error) {
      let errorMessage: string = errorHandler(error);
      throw errorMessage;
    }
  }

  async function logout() {
    try {
      // await axios.delete("/api/auth/logout");
      store(null);

      setUserInfo(null);
      setIsLogin(false);
    } catch (error) {
      let errorMessage: string = errorHandler(error);
      throw errorMessage;
    }
  }

  /* Store user into session */
  function store(params: UserInfo | null) {
    sessionStorage.setItem("auth", JSON.stringify(params));
  }

  function get() {
    const auth = sessionStorage.getItem("auth");
    if (auth !== null)
      setUserInfo(JSON.parse(auth) as UserInfo), setIsLogin(true);
  }

  /* Initiate get user from sessionStorage */
  useEffect(() => {
    get();
  }, []);

  return (
    <AuthContext.Provider value={{ userInfo, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
