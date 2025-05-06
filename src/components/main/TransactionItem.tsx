import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export type TransactionType = 'SPEND' | 'INCOME';

export interface TransactionItemProps {
  id: number;
  type: TransactionType;
  category: string;
  occurredAt: string;
  amount: string | number;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  type,
  category,
  occurredAt,
  amount,
}) => {
  const isExpense = type === 'SPEND';
  const formattedAmount =
    typeof amount === 'number' ? amount.toLocaleString() : amount;

  return (
    <Link
      href={`/transactions/update/${type.toLowerCase()}?id=${id}`}
      className="rounded-sm p-4 flex justify-between items-center border"
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-9 h-9 ${isExpense ? 'bg-warning/20' : 'bg-primary/20'} rounded-full flex items-center justify-center`}
        >
          <span className={isExpense ? 'text-warning' : 'text-primary'}>
            {isExpense ? <Minus size={24} /> : <Plus size={24} />}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="title4">{category}</p>
          <p className="body3 text-gray-500">{occurredAt}</p>
        </div>
      </div>
      <span
        className={`title4 
          ${isExpense ? 'text-warning' : 'text-primary'}
        `}
      >
        {isExpense ? `-${formattedAmount}` : `+${formattedAmount}`}
      </span>
    </Link>
  );
};
