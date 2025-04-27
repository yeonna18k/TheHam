import React from 'react';
import { BudgetTip } from './BudgetTip';

interface BudgetStatusProps {
  totalBudget: number;
  usedBudget: number;
  month: string;
}

export const BudgetStatus: React.FC<BudgetStatusProps> = ({ 
  totalBudget = 1000000, 
  usedBudget = 700000, 
  month = '4월' 
}) => {
  const percentage = Math.round((usedBudget / totalBudget) * 100);
  
  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-bold">{month} 소비 현황</h2>
      <p className="text-gray-500 text-sm my-1">
        {month} 목표 예산 {totalBudget.toLocaleString()}원 중 {usedBudget.toLocaleString()}원을 사용했어요
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