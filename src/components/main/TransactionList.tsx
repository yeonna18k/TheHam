import { getAccountBookAll } from '@/api/transactionsApi';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
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
    <div className="p-4 border-b">
      <Link
        href="/transactions/tabs"
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-lg font-bold">오늘 거래 내역</h2>
        <span className="text-gray-400">≫</span>
      </Link>

      {data && data.accountBookPeriodResponse.length > 0 ? (
        data.accountBookPeriodResponse
          .slice(0, 3)
          .map((transaction) => (
            <TransactionItem
              key={transaction.id}
              type={transaction.type}
              category={transaction.category}
              date={transaction.occurredAt}
              amount={transaction.amount}
            />
          ))
      ) : (
        <div className="mb-3 bg-white rounded-lg p-3.5 flex flex-col gap-2 shadow-sm">
          아직 거래내역이 없어요!
          <Link
            href="/transactions/create"
            className="flex title3 text-primary"
          >
            <ChevronRight />
            거래내역 등록하기
          </Link>
        </div>
      )}
    </div>
  );
};
