import { Suspense, ComponentType, lazy } from 'react';

/**
 * Component Skeleton Loading Fallback
 */
const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-pulse space-y-8 w-full max-w-4xl px-4">
            <div className="h-12 bg-gray-800 rounded"></div>
            <div className="h-96 bg-gray-800 rounded"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);

/**
 * Create a lazy-loaded component with loading fallback
 * @param importStatement - Dynamic import statement
 * @returns Component with Suspense wrapper
 */
export function createLazyComponent<T extends object>(
    importStatement: () => Promise<{ default: ComponentType<T> }>
) {
    const LazyComponent = lazy(importStatement);

    return function LazyComponentWithSuspense(props: T) {
        return (
            <Suspense fallback={<LoadingFallback />}>
                <LazyComponent {...props} />
            </Suspense>
        );
    };
}

/**
 * Lazy load component with custom fallback
 */
export function createLazyComponentWithCustomFallback<T extends object>(
    importStatement: () => Promise<{ default: ComponentType<T> }>,
    fallback: React.ReactNode
) {
    const LazyComponent = lazy(importStatement);

    return function LazyComponentWithCustomFallback(props: T) {
        return (
            <Suspense fallback={fallback}>
                <LazyComponent {...props} />
            </Suspense>
        );
    };
}
