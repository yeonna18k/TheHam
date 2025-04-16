import React from 'react';
import ProgressBar from './ProgressBar';

interface BudgetSummaryProps {
  title: string;
  percentage: number;
  currentAmount: number;
  totalAmount: number;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  title,
  percentage,
  currentAmount,
  totalAmount
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600">{title}</p>
        <p className="text-gray-600">{percentage}%</p>
      </div>
      <ProgressBar percentage={percentage} />
      <div className="mt-2">
        <p className="text-gray-600">사용 금액 : {currentAmount.toLocaleString()}원</p>
        <p className="text-gray-600">총 예산 : {totalAmount.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default BudgetSummary;