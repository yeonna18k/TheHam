import React from 'react';

interface TransactionItemProps {
  category: string;
  categoryIcon: string;
  title: string;
  time: string;
  amount: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  category,
  categoryIcon,
  title,
  time,
  amount
}) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-3 shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
          <span className="text-green-600">{categoryIcon}</span>
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-gray-500 text-sm">{time}</p>
        </div>
      </div>
      <p className="text-red-500 font-medium">{amount < 0 ? amount.toLocaleString() : `+${amount.toLocaleString()}`}원</p>
    </div>
  );
};

export default TransactionItem;