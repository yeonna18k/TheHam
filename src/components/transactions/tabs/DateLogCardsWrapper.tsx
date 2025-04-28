'use client';

import { getAccountBook } from '@/api/transactionsApi';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'react-lottie-player';
import animationLoadingData from '../../../../public/lottie/piggy_loading.json';
import animationErrorData from '../../../../public/lottie/query_error.json';
import TransactionsLogCard from './TransactionsLogCard';

interface DateProps {
  startDate: string;
  endDate: string;
}

export default function DateLogCardsWrapper({ startDate, endDate }: DateProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['accountBook', startDate, endDate],
    queryFn: () => getAccountBook({ startDate, endDate }),
  });

  return (
    <>
      {isPending && <Lottie animationData={animationLoadingData} loop play />}
      {isError && (
        <div className="title3 text-warning flex flex-col justify-center items-center gap-10 mt-20">
          <Lottie
            animationData={animationErrorData}
            loop
            play
            className="w-40 h-40"
          />
          데이터를 불러오는 중 오류가 발생했어요
        </div>
      )}
      {data && (
        <div className="bg-white rounded-lg shadow-sm px-3 py-6 flex flex-col gap-4 flex-grow">
          {data.slice(0, 20).map((transaction) => (
            <TransactionsLogCard key={transaction.id} data={transaction} />
          ))}
        </div>
      )}
    </>
  );
}
