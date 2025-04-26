import React from 'react';

export type TransactionType = 'expense' | 'income';

export interface TransactionItemProps {
  type: TransactionType;
  category: string;
  date: string;
  amount: string | number;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ type, category, date, amount }) => {
  const isExpense = type === 'expense';
  const formattedAmount = typeof amount === 'number' ? amount.toLocaleString() : amount;
  
  return (
    <div className="mb-3 bg-white rounded-lg p-3.5 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <div className={`w-8 h-8 ${isExpense ? 'bg-red-100' : 'bg-green-100'} rounded-full flex items-center justify-center mr-3`}>
          <span className={isExpense ? 'text-red-500' : 'text-green-500'}>
            {isExpense ? '−' : '+'}
          </span>
        </div>
        <div>
          <p className="font-medium">{category}</p>
          <p className="text-gray-400 text-xs">{date}</p>
        </div>
      </div>
      <span className={isExpense ? 'text-red-500 font-medium' : 'text-green-500 font-medium'}>
        {isExpense ? `-${formattedAmount}` : `+${formattedAmount}`}
      </span>
    </div>
  );
};