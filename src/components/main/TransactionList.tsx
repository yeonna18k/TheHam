import React from 'react';
import { TransactionItem, TransactionItemProps } from './TransactionItem';
import { useGetBudget } from '@/hooks/useBudget';
import Cookies from 'js-cookie';

interface TransactionListProps {
    transactions?: (TransactionItemProps & { id: number | string })[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    const userId = Cookies.get('userId');
    const { data: fetchedTransactions = [], isLoading: loading, error } = useGetBudget(userId);

    // `transactions`가 없으면 API에서 가져온 데이터를 사용
    const displayTransactions = transactions || fetchedTransactions;

    return (
        <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">오늘 거래 내역</h2>
                <span className="text-gray-400">≫</span>
            </div>

            {loading && <p>로딩 중...</p>}
            {error && <p>오류가 발생했습니다: {String(error)}</p>}

            {displayTransactions.length === 0 ? (
                <div>오늘 소비/지출 내역이 없어요!</div>
            ) : (
                displayTransactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        type={transaction.type}
                        category={transaction.category}
                        date={transaction.date}
                        amount={transaction.amount}
                    />
                ))
            )}
        </div>
    );
};
