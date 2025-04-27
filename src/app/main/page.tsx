"use client";

import BottomNavigation from '@/components/main/BottomNavigation';
import BudgetSummary from '@/components/main/BudgetSummary';
import FloatingActionButton from '@/components/main/FloatingActionButton';
import TipBox from '@/components/main/TipBox';
import TransactionItem from '@/components/main/TransactionItem';
import { useFcmToken } from '@/hooks/useFcmController'; // useFcmToken 훅을 임포트
import '@/lib/firebase/settingFCM';
import { messaging } from '@/lib/firebase/settingFCM';
import { getToken } from 'firebase/messaging';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const vapidKey = 'BEp5OHU0tBKWYoWoNmoxLPYUFdukvdzdjWEc6-fxTRNkK7JJOs0XcUF1_xgtcNqxLynSm45l53_zuuKBmd7bRrg'; // 🔥 꼭 실제 키로 바꿔야 함

  const tipMessage = '가끔은 대중교통도 좋아요~';

  const transactions = [
    {
      id: 1,
      category: '식',
      categoryIcon: '식',
      title: '점심식사',
      time: '오늘 12:10',
      amount: -9000,
    },
    {
      id: 2,
      category: '카',
      categoryIcon: '카',
      title: '카카오페이',
      time: '오늘 12:30',
      amount: -7000,
    },
  ];

  const [currentDate] = useState(new Date());
  const [currentMonth] = useState(currentDate.getMonth());
  const [currentYear] = useState(currentDate.getFullYear());
  const [dailyBudget] = useState(30000);
  const [calendarData] = useState(generateCalendarData());

  // FCM 토큰을 보내는 함수
  const { mutate: createFcmToken } = useFcmToken(); // useFcmToken 훅에서 mutate 함수를 추출

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
      let currentToken = null;
      if (messaging) {
        currentToken = await getToken(messaging, { vapidKey });
        if (currentToken) {
          console.log('FCM 토큰:', currentToken);
          // alert('FCM 토큰: ' + currentToken);

          createFcmToken(currentToken);
        } else {
          console.log('토큰을 가져오지 못했습니다.');
        }
      } else {
        console.error('Messaging 객체가 null입니다.');
        return;
      }
      const currentToken = await getToken(messaging, { vapidKey });
      if (currentToken) {
        console.log('FCM 토큰:', currentToken);
        // alert('FCM 토큰: ' + currentToken);
      } else {
        console.log('토큰을 가져오지 못했습니다.');
      }
    } catch (err) {
      console.error('토큰 요청 중 오류:', err);
      // alert(err);
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
  function generateCalendarData() {
    const today = currentDate.getDate();

    return Array.from({ length: today }, (_, i) => {
      const date = i + 1;
      const randomSpending = Math.floor(Math.random() * 40000);
      const saving = dailyBudget - randomSpending;

      const transactionCount = Math.floor(Math.random() * 3);
      const transactions = Array.from({ length: transactionCount }, (_, j) => {
        const isExpense = Math.random() > 0.2;
        return {
          id: date * 100 + j,
          title: isExpense
            ? ['점심', '커피', '택시', '간식', '쇼핑'][
                Math.floor(Math.random() * 5)
              ]
            : '용돈',
          amount: isExpense
            ? -Math.floor(Math.random() * 15000) - 1000
            : Math.floor(Math.random() * 20000) + 5000,
          category: isExpense
            ? ['식비', '교통', '쇼핑', '여가'][Math.floor(Math.random() * 4)]
            : '수입',
        };
      });

      return {
        date,
        spending: randomSpending,
        saving,
        transactions,
      };
    });
  }

  const handleDayClick = (day: {
    date: number;
    spending: number;
    saving: number;
    transactions: {
      id: number;
      title: string;
      amount: number;
      category: string;
    }[];
  }) => {
    console.log(
      `Selected day: ${day.date}, transactions: ${day.transactions.length}`
    );
  };

  const handleAddTransaction = () => {
    console.log('Add new transaction');
  };

  return (
    <main>
      <BudgetDashboard />
    </main>
  );
};

export default Home;
