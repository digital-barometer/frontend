import { apiClient } from "./client";
import type { Topic, TopicCreateRequest, TopicUpdateRequest } from "./types";

export async function listTopics(): Promise<Topic[]> {
  const { data } = await apiClient.get<Topic[]>("/topics");
  return data;
}

export async function createTopic(payload: TopicCreateRequest): Promise<Topic> {
  const { data } = await apiClient.post<Topic>("/topics", payload);
  return data;
}

export async function updateTopic(id: string, payload: TopicUpdateRequest): Promise<Topic> {
  const { data } = await apiClient.patch<Topic>(`/topics/${id}`, payload);
  return data;
}
