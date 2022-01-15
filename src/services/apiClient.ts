import axios from "axios";
import { setupAPIClient } from "./api";

export const api = setupAPIClient();

export const apiLogin = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROUTES_URL}`,
});
