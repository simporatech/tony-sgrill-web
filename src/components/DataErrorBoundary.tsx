import React, { Component, ErrorInfo, ReactNode } from 'react';
import { SupabaseDataErrorFallback } from './SupabaseDataErrorFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class DataErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DataErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] w-full flex items-center justify-center p-6 bg-[#080809]">
          <SupabaseDataErrorFallback
            onRetry={this.handleReset}
            errorMessage={this.state.error?.message}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

