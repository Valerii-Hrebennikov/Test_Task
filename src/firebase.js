import firebase from 'firebase/app';
import 'firebase/firestore'; // Імпорт модулю Firestore, який буде використовуватися для зберігання даних

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};

// Ініціалізуємо Firebase з використанням конфігурації
firebase.initializeApp(firebaseConfig);

// Експортуємо Firestore для використання в інших частинах додатку
export const firestore = firebase.firestore();

export default firebase;
