import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getMessaging, Messaging } from "firebase/messaging"; // ✅ 추가
import { FirebaseApp } from "firebase/app";

// Firebase 설정 객체
const firebaseConfig = {
  apiKey: "AIzaSyDcILNThbkPunY3nj51itKVCtYCTwTSpYI",
  authDomain: "growith-1f6fb.firebaseapp.com",
  projectId: "growith-1f6fb",
  storageBucket: "growith-1f6fb.appspot.com",
  messagingSenderId: "436634626359",
  appId: "1:436634626359:web:72cf265956660f47fd12b2",
  measurementId: "G-BMY5860D7K"
};

// Firebase 초기화
const app: FirebaseApp = initializeApp(firebaseConfig);

// Analytics 초기화 (브라우저 환경에서만 실행)
let analytics: Analytics | null = null;
let messaging: Messaging | null = null;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
  messaging = getMessaging(app); // ✅ 추가
}

export { app, analytics, messaging };
