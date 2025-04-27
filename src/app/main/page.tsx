"use client";

import { useEffect } from 'react';
import type { NextPage } from 'next';
import { BudgetDashboard } from '@/components/main/BudgetDashboard';
import { useFcmToken } from '@/hooks/useFcmController';
import { messaging } from '@/lib/firebase/settingFCM'; // ✅ firebase 설정에서 import
import { getToken } from 'firebase/messaging'; // ✅ firebase-messaging에서 import

const vapidKey = 'BEp5OHU0tBKWYoWoNmoxLPYUFdukvdzdjWEc6-fxTRNkK7JJOs0XcUF1_xgtcNqxLynSm45l53_zuuKBmd7bRrg'; // 🔥 꼭 실제 키로 바꿔야 함

const Home: NextPage = () => {
  const { mutate: createFcmToken } = useFcmToken();

  useEffect(() => {
    handleAllowNotification();
  }, []);

  async function handleAllowNotification() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('알림 권한 허용됨');
      registerServiceWorker();
      await getDeviceToken();
    } else {
      console.log('알림 권한 거부:', permission);
    }
  }

  async function getDeviceToken() {
    try {
      if (!messaging) {
        console.error('Messaging 객체가 null입니다.');
        return;
      }
      const currentToken = await getToken(messaging, { vapidKey });
      if (currentToken) {
        console.log('FCM 토큰:', currentToken);
        createFcmToken(currentToken); // 서버에 FCM 토큰 전송
      } else {
        console.log('토큰을 가져오지 못했습니다.');
      }
    } catch (err) {
      console.error('토큰 요청 오류:', err);
    }
  }

  function registerServiceWorker() {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker 등록 성공:', registration);
      })
      .catch((error) => {
        console.error('Service Worker 등록 실패:', error);
      });
  }

  return (
    <main>
      <BudgetDashboard />
    </main>
  );
};

export default Home;
