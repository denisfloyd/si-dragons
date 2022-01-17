import axios from "axios";
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

export function setupAPIClient(ctx = undefined) {
  const api = axios.create({
    baseURL: "https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon",
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        if (process.browser) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}