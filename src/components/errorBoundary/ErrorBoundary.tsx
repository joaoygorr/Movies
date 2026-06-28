'use client';

import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error details
        console.error('Error caught by boundary:', error);
        console.error('Error info:', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-900">
                    <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="text-4xl">⚠️</div>
                        </div>
                        <h1 className="text-2xl font-bold text-white text-center mb-4">
                            Oops! Algo deu errado
                        </h1>
                        <p className="text-gray-400 text-center mb-6">
                            Desculpe, ocorreu um erro inesperado. Por favor, tente recarregar a página.
                        </p>
                        <div className="bg-gray-700 rounded p-4 mb-6 max-h-40 overflow-y-auto">
                            <p className="text-sm text-gray-300 font-mono break-words">
                                {this.state.error?.message || 'Erro desconhecido'}
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                        >
                            Recarregar Página
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
