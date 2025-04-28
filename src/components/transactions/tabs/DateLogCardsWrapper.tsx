'use client';

import { getAccountBookAll } from '@/api/transactionsApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import Lottie from 'react-lottie-player';
import animationLoadingData from '../../../../public/lottie/piggy_loading.json';
import animationErrorData from '../../../../public/lottie/query_error.json';
import TransactionsLogCard from './TransactionsLogCard';

interface DateProps {
  startDate: string;
  endDate: string;
  page: number;
}

export default function DateLogCardsWrapper({ startDate, endDate }: DateProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['accountBook', startDate, endDate],
    queryFn: ({ pageParam = 1 }) =>
      getAccountBookAll({ startDate, endDate, page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.number < lastPage.totalPage
        ? lastPage.number + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const currentElement = loadMoreRef.current;

    if (currentElement) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      });

      observerRef.current.observe(currentElement);
    }

    return () => {
      if (observerRef.current && currentElement) {
        observerRef.current.unobserve(currentElement);
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  console.log(data);
  const allTransactions =
    data?.pages.flatMap((page) => page.accountBookPeriodResponse) || [];

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
      {allTransactions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm px-3 py-6 flex flex-col gap-4 flex-grow">
          {allTransactions.map((transaction) => (
            <TransactionsLogCard key={transaction.id} data={transaction} />
          ))}
          <div ref={loadMoreRef} className="py-4 flex justify-center">
            {isFetchingNextPage && (
              <Lottie
                animationData={animationLoadingData}
                loop
                play
                style={{ width: 100, height: 100 }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
