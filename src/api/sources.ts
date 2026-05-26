import { apiClient, ApiError } from "./client";
import type { Source } from "./types";

export async function listSources(): Promise<Source[]> {
  const { data } = await apiClient.get<Source[]>("/sources");
  if (!Array.isArray(data)) throw new ApiError("Неверный ответ API /sources — ожидался массив");
  return data;
}
