import Link from 'next/link';
import React from 'react';
import { TransactionItem, TransactionItemProps } from './TransactionItem';

interface TransactionListProps {
  transactions?: (TransactionItemProps & { id: number | string })[];
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  const defaultTransactions: (TransactionItemProps & {
    id: number | string;
  })[] = [
    {
      id: 1,
      type: 'expense',
      category: '식비',
      date: '2025. 04. 14.',
      amount: '9,000',
    },
    {
      id: 2,
      type: 'expense',
      category: '쇼핑',
      date: '2025. 04. 14.',
      amount: '9,000',
    },
    {
      id: 3,
      type: 'income',
      category: '월급',
      date: '2025. 04. 14.',
      amount: '3,000,000',
    },
  ];

  const displayTransactions = transactions || defaultTransactions;

  return (
    <div className="p-4 border-b">
      <Link
        href="/transactions/tabs"
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-lg font-bold">오늘 거래 내역</h2>
        <span className="text-gray-400">≫</span>
      </Link>

      {displayTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          type={transaction.type}
          category={transaction.category}
          date={transaction.date}
          amount={transaction.amount}
        />
      ))}
    </div>
  );
};
