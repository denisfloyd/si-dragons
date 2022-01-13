import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import decode from "jwt-decode";

import { api } from "../services/apiClient";
import axios from "axios";
import { ToastContext } from "./ToastContext";

type SignInCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: string;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

// let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "@sidragons.token");

  // authChannel.postMessage("signOut");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string>("");
  const isAuthenticated = !!user;

  const { addToast } = useContext(ToastContext);

  useEffect(() => {
    // authChannel = new BroadcastChannel("auth");
    // authChannel.onmessage = (message) => {
    //   switch (message.data) {
    //     case "signOut":
    //       signOut();
    //       break;
    //     default:
    //       break;
    //   }
    // };
  }, []);

  useEffect(() => {
    const { "@sidragons.token": token } = parseCookies();

    if (token) {
      const user = decode<{ username: string }>(token);

      setUser(user.username);
    } else {
      signOut();
    }
  }, []);

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const apiFromApiRoutes = axios.create({
        baseURL: "http://localhost:3000/api",
      });

      const response = await apiFromApiRoutes.post("users/sessions", {
        username,
        password,
      });

      const { token } = response.data;

      const user = decode<{ username: string }>(token);

      setCookie(undefined, "@sidragons.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser(user.username);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro na autenticação",
        description:
          "Ocorreu um erro ao tentar realizar a autenticação. Verifique o usuário e/ou senha!",
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
