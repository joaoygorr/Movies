'use client';

import { useEffect } from 'react';

/**
 * Service Worker registration and initialization
 */
export const ServiceWorkerInit = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered successfully:', registration);

                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60000); // Check every minute
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });

            // Listen for controller change (new SW activated)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('Service Worker controller changed - new version available');
                // Notify user that app has been updated
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('CineScope Updated', {
                        body: 'A nova versão está disponível!',
                        icon: '/logo-192.png',
                    });
                }
            });
        }
    }, []);

    return null;
};

export default ServiceWorkerInit;
