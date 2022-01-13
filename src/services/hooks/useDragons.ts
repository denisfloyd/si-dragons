import { useQuery } from "react-query";
import { api } from "../apiClient";

export type Dragon = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
};

export async function getDragons(): Promise<Dragon[]> {
  const { data } = await api.get("?sortBy=name");

  return data as Dragon[];
}

export function useDragons() {
  return useQuery(["dragons"], () => getDragons(), {
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: true,
  });
}
