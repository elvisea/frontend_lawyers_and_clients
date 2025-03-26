// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics, isSupported, logEvent } from "firebase/analytics";

import Logger from '@/utils/logger';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  // Apenas inicializa no cliente
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      Logger.info('Firebase Analytics inicializado com sucesso', { prefix: 'Firebase' });
    }
  }).catch(err => {
    Logger.error(`Erro ao verificar suporte do Analytics: ${err instanceof Error ? err.message : 'Erro desconhecido'}`, { prefix: 'Firebase' });
  });
}

type EventParams = {
  [key: string]: string | number | boolean
}

// Função para log de eventos
export const logAnalyticsEvent = (eventName: string, eventParams?: EventParams) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
      Logger.info(`Evento registrado: ${eventName} - Parâmetros: ${JSON.stringify(eventParams)}`, { prefix: 'Firebase' });
    } catch (error) {
      Logger.error(`Erro ao registrar evento ${eventName}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, { prefix: 'Firebase' });
    }
  } else {
    Logger.warn(`Analytics não disponível para registrar evento: ${eventName}`, { prefix: 'Firebase' });
  }
};

export { app, analytics };