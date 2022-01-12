import { useQuery } from "react-query";
import { api } from "../apiClient";

type Dragon = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
};

type GetDragonsResponse = {
  dragons: Dragon[];
};

export async function getDragons(): Promise<GetDragonsResponse> {
  const { data } = await api.get("/");

  return data;
}

export function useDragons() {
  return useQuery(["dragons"], () => getDragons(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
