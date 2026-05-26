import { apiClient } from "./client";
import type { Source } from "./types";

export async function listSources(): Promise<Source[]> {
  const { data } = await apiClient.get<Source[]>("/sources");
  return data;
}
