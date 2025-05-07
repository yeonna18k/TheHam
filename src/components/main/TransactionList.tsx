import { getAccountBookAll } from '@/api/transactionsApi';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { BadgeInfo, ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import { TransactionItem } from './TransactionItem';

export const TransactionList = () => {
  const startDate = format(new Date(), 'yyyy-MM-dd');
  const endDate = format(new Date(), 'yyyy-MM-dd');

  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: () =>
      getAccountBookAll({
        startDate,
        endDate,
        page: 1,
      }),
  });

  return (
    <div className="px-3 py-6 flex flex-col gap-3 rounded-lg bg-white shadow-sm">
      <Link
        href="/transactions/tabs"
        className="flex justify-between items-center"
      >
        <h1 className="title1">오늘 거래 내역</h1>
        <ChevronsRight size={24} />
      </Link>

      {data && data.accountBookPeriodResponse.length > 0 ? (
        data.accountBookPeriodResponse
          .slice(0, 3)
          .map((transaction) => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))
      ) : (
        <div className="rounded-md p-4 flex border items-center gap-2">
          <div className="rounded-full bg-primary/20 h-9 w-9 items-center flex justify-center">
            <BadgeInfo size={24} className="text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 body3">아직 거래내역이 없어요!</span>
            <Link
              href="/transactions/create"
              className="flex title3 text-primary"
            >
              거래내역 등록하기
              <ChevronsRight />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
