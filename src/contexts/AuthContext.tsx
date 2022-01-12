import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import { api } from "../services/apiClient";
import axios from "axios";

type User = {
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  token: string;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "@sidragons.token");

  authChannel.postMessage("signOut");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string>("");
  const isAuthenticated = !!token;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "@sidragons/token": token } = parseCookies();

    if (token) {
      setToken(token);
    } else {
      signOut();
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const apiFromApiRoutes = axios.create({
        baseURL: "http://localhost:3000/api",
      });

      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token } = response.data;

      setCookie(undefined, "@sidragons/token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setToken(token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
}
