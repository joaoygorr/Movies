'use client';
import { useEffect } from 'react';

export const ServiceWorkerInit = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered successfully:', registration);
                    setInterval(() => {
                        registration.update();
                    }, 60000);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('Service Worker controller changed - new version available');
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('CineScope Updated', {
                        body: 'A nova versão está disponível!',
                    });
                }
            });
        }
    }, []);

    return null;
};

export default ServiceWorkerInit;
