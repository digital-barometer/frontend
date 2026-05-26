import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg text-text p-6">
          <div className="max-w-md w-full rounded-2xl border border-negative/30 bg-surface p-6 flex flex-col gap-3">
            <h2 className="text-base font-semibold text-negative">Ошибка приложения</h2>
            <p className="text-sm text-muted">{error.message}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="self-start mt-2 px-4 py-2 rounded-xl text-sm bg-brand/15 text-brand hover:bg-brand/25 transition"
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}