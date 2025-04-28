'use client';

import { postAccountBook, postAccountBookMonth } from '@/api/transactionsApi';
import {
  AccountBookMonthResponse,
  AccountBookResponse,
} from '@/types/transactions';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../../../../public/lottie/piggy_loading.json';
import TransactionsLogCard from './TransactionsLogCard';

interface DateProps {
  startDate?: string;
  endDate?: string;
  requestMonth?: string;
}

export default function TransactionsLogCardsWrapper({
  startDate,
  endDate,
  requestMonth,
}: DateProps) {
  const [transactionsData, setTransactionsData] = useState<
    AccountBookResponse[]
  >([]);
  const [transactionsMonthData, setTransactionsMonthData] = useState<
    AccountBookMonthResponse[]
  >([]);

  const { mutate: accountBook, isPending } = useMutation({
    mutationFn: postAccountBook,
    onSuccess: (data) => {
      setTransactionsData(data);
    },
  });

  const { mutate: accountBookMonth, isPending: isPendingMonth } = useMutation({
    mutationFn: postAccountBookMonth,
    onSuccess: (data) => {
      setTransactionsMonthData(data);
    },
  });

  useEffect(() => {
    if (startDate && endDate) {
      accountBook({
        startDate,
        endDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  useEffect(() => {
    if (requestMonth) accountBookMonth(requestMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestMonth]);

  return (
    <div className="bg-white rounded-lg shadow-sm px-3 py-6 flex flex-col gap-4">
      {(isPending || isPendingMonth) && (
        <Lottie animationData={animationData} loop play />
      )}
      {transactionsData &&
        transactionsData
          .slice(0, 20)
          .map((transaction) => (
            <TransactionsLogCard key={transaction.id} data={transaction} />
          ))}
      {transactionsMonthData &&
        transactionsMonthData
          .slice(0, 20)
          .map((dayData) =>
            dayData.dayList.map((transaction) => (
              <TransactionsLogCard key={transaction.id} data={transaction} />
            ))
          )}
    </div>
  );
}
