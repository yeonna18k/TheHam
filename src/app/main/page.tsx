'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import BudgetSummary from '@/components/main/BudgetSummary';
import TipBox from '@/components/main/TipBox';
import TransactionItem from '@/components/main/TransactionItem';
import FloatingActionButton from '@/components/main/FloatingActionButton';
import BottomNavigation from '@/components/main/BottomNavigation';

const SpendingCalendar = dynamic(() => import('@/components/main/SpendingCalendar'), {
  ssr: false
});

export default function Home() {
  const budgetData = {
    title: '이번 달 예산',
    percentage: 62,
    currentAmount: 620000,
    totalAmount: 1000000
  };

  const tipMessage = '가끔은 대중교통도 좋아요~';

  const transactions = [
    {
      id: 1,
      category: '식',
      categoryIcon: '식',
      title: '점심식사',
      time: '오늘 12:10',
      amount: -9000
    },
    {
      id: 2,
      category: '카',
      categoryIcon: '카',
      title: '카카오페이',
      time: '오늘 12:30',
      amount: -7000
    }
  ];

  const [currentDate] = useState(new Date());
  const [currentMonth] = useState(currentDate.getMonth());
  const [currentYear] = useState(currentDate.getFullYear());
  const [dailyBudget] = useState(30000);
  
  const generateCalendarData = () => {
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
          title: isExpense ? 
            ['점심', '커피', '택시', '간식', '쇼핑'][Math.floor(Math.random() * 5)] : 
            '용돈',
          amount: isExpense ? 
            -Math.floor(Math.random() * 15000) - 1000 : 
            Math.floor(Math.random() * 20000) + 5000,
          category: isExpense ? 
            ['식비', '교통', '쇼핑', '여가'][Math.floor(Math.random() * 4)] : 
            '수입'
        };
      });
      
      return {
        date,
        spending: randomSpending,
        saving,
        transactions
      };
    });
  };
  
  const [calendarData] = useState(generateCalendarData());
  const [selectedDayTransactions, setSelectedDayTransactions] = useState<any[]>([]);
  
  const handleDayClick = (day: any) => {
    setSelectedDayTransactions(day.transactions);
    console.log(`Selected day: ${day.date}, with ${day.transactions.length} transactions`);
  };

  const handleAddTransaction = () => {
    console.log('Add new transaction');
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-20 max-w-md mx-auto">
      <div className="bg-green-500 p-5 text-white">
        <h1 className="font-medium text-lg">안녕하세요, 지영님!</h1>
        <p>오늘도 알찬 소비를 함께 해보아요!</p>
      </div>

      <div className="p-4">
        <BudgetSummary 
          title={budgetData.title}
          percentage={budgetData.percentage}
          currentAmount={budgetData.currentAmount}
          totalAmount={budgetData.totalAmount}
        />

        <TipBox message={tipMessage} />

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">오늘 거래 내역</h2>
          {transactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              category={transaction.category}
              categoryIcon={transaction.categoryIcon}
              title={transaction.title}
              time={transaction.time}
              amount={transaction.amount}
            />
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">캘린더</h2>
          <SpendingCalendar
            month={currentMonth}
            year={currentYear}
            dailyBudget={dailyBudget}
            days={calendarData}
            onDayClick={handleDayClick}
          />
        </div>
      </div>

      <FloatingActionButton onClick={handleAddTransaction} />

      <BottomNavigation activeTab="home" />
    </main>
  );
}