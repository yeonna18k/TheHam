import { postAccountBookMonth } from '@/api/transactionsApi';
import { AccountBookMonthResponse } from '@/types/transactions';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../../../../public/lottie/piggy_loading.json';
import TransactionsLogCard from './TransactionsLogCard';

interface CalendarLogProps {
  requestMonth: string;
}

export default function CalendarLogCardsWrapper({
  requestMonth,
}: CalendarLogProps) {
  const [transactionsMonthData, setTransactionsMonthData] = useState<
    AccountBookMonthResponse[]
  >([]);

  const { mutate: accountBookMonth, isPending: isPendingMonth } = useMutation({
    mutationFn: postAccountBookMonth,
    onSuccess: (data) => {
      setTransactionsMonthData(data);
    },
  });

  useEffect(() => {
    if (requestMonth) accountBookMonth(requestMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestMonth]);

  return (
    <div className="bg-white rounded-lg shadow-sm px-3 py-6 flex flex-col gap-4">
      {isPendingMonth && <Lottie animationData={animationData} loop play />}
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
