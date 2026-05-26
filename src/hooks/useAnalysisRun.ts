import { useCallback, useState } from "react";
import { getCharts, runAnalysis } from "@/api";
import type { AnalysisRun, AnalysisRunRequest, ChartData } from "@/api";

interface State {
  loading: boolean;
  error: string | null;
  run: AnalysisRun | null;
  charts: ChartData | null;
}

const INITIAL: State = { loading: false, error: null, run: null, charts: null };

export function useAnalysisRun() {
  const [state, setState] = useState<State>(INITIAL);

  const start = useCallback(async (payload: AnalysisRunRequest) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const run = await runAnalysis(payload);
      let charts: ChartData | null = null;
      try {
        charts = await getCharts(run.id);
      } catch {
        charts = null;
      }
      setState({ loading: false, error: null, run, charts });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Ошибка анализа",
      }));
    }
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return { ...state, start, reset };
}
