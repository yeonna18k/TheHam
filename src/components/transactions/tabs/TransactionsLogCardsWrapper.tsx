'use client';

import { postAccountBook } from '@/api/transactionsApi';
import { AccountBookResponse } from '@/types/transactions';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../../../../public/lottie/piggy_loading.json';
import TransactionsLogCard from './TransactionsLogCard';

interface DateProps {
  startDate: string;
  endDate: string;
}

export default function TransactionsLogCardsWrapper({
  startDate,
  endDate,
}: DateProps) {
  const [transactionsData, setTransactionsData] = useState<
    AccountBookResponse[]
  >([]);

  const { mutate: accountBook, isPending } = useMutation({
    mutationFn: postAccountBook,
    onSuccess: (data) => {
      setTransactionsData(data);
    },
  });

  useEffect(() => {
    console.log(isPending);
  }, [isPending]);

  useEffect(() => {
    accountBook({
      startDate,
      endDate,
    });
  }, []);

  return (
    <div className="rounded-lg shadow-sm px-3 py-6 flex flex-col gap-4">
      {isPending && <Lottie animationData={animationData} loop play />}
      {transactionsData &&
        transactionsData
          .slice(0, 20)
          .map((transaction) => (
            <TransactionsLogCard key={transaction.id} data={transaction} />
          ))}
    </div>
  );
}
