import { apiClient } from "./client";
import type { AnalysisRun, AnalysisRunRequest, ChartData } from "./types";

export async function runAnalysis(payload: AnalysisRunRequest): Promise<AnalysisRun> {
  const { data } = await apiClient.post<AnalysisRun>("/analysis", payload);
  return data;
}

export async function getAnalysis(id: string): Promise<AnalysisRun> {
  const { data } = await apiClient.get<AnalysisRun>(`/analysis/${id}`);
  return data;
}

export async function getCharts(id: string): Promise<ChartData> {
  const { data } = await apiClient.get<ChartData>(`/analysis/${id}/charts`);
  return data;
}
