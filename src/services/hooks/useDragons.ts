import { useQuery } from "react-query";
import { api } from "../apiClient";

export type Dragon = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
};

export async function getDragons(): Promise<Dragon[] | null> {
  try {
    const { data } = await api.get("?sortBy=name");
    return data as Dragon[];
  } catch (err) {
    return null;
  }
}

export async function getDragon(id: string): Promise<Dragon | null> {
  try {
    const { data } = await api.get(`/${id}`);
    return data as Dragon;
  } catch (e) {
    return null;
  }
}

export function useDragons(dragons?: Dragon[]) {
  return useQuery(["dragons"], () => getDragons(), {
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: true,
    initialData: dragons,
  });
}
