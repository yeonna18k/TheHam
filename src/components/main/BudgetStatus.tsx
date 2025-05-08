'use client';
import { useGetBudget } from '@/hooks/useBudget';
import React, { useEffect, useState } from 'react';
import { BudgetTip } from './BudgetTip';
import { format } from 'date-fns';

export const BudgetStatus: React.FC = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const budgetRequestDate = format(new Date(), 'yyyy-MM-01');

  const { data, isLoading, isError } = useGetBudget(budgetRequestDate);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [usedBudget, setUsedBudget] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setTotalBudget(data.budget);
      setUsedBudget(data.total);
    }
  }, [data]);

  const percentage = Math.round((usedBudget / totalBudget) * 100);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 가져오는 데 오류가 발생했습니다.</p>;

  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-bold">{currentMonth} 소비 현황</h2>
      <p className="text-gray-500 text-sm my-1">
        {currentMonth} 목표 예산 {totalBudget.toLocaleString()}원 중{' '}
        {usedBudget.toLocaleString()}원을 사용했어요
      </p>
      <div className="mt-2 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-400 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right text-green-500 mt-1">{percentage}%</div>

      <BudgetTip />
    </div>
  );
};
