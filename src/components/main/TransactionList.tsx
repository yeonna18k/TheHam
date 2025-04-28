import React from 'react';
import { TransactionItem, TransactionItemProps } from './TransactionItem';
import { useGetBudget } from '@/hooks/useBudget';
import Cookies from 'js-cookie';
import { PiggyBank, ArrowRight } from 'lucide-react';

interface TransactionListProps {
    transactions?: (TransactionItemProps & { id: number | string })[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    const userId = Cookies.get('userId');
    const { data: fetchedTransactions, isLoading: loading, error } = useGetBudget(userId);
    const safeFetchedTransactions = Array.isArray(fetchedTransactions) ? fetchedTransactions : [];

    const displayTransactions = transactions || safeFetchedTransactions;

    return (
        <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">오늘 거래 내역</h2>
                <span className="text-gray-400">≫</span>
            </div>

            {loading && <p>로딩 중...</p>}
            {error && <p>오류가 발생했습니다: {String(error)}</p>}

            {displayTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 my-4 bg-gradient-to-r from-green-50 to-green-50 rounded-lg border border-green-100 shadow-sm">
                <div className="flex justify-center items-center bg-green-100 p-3 rounded-full mb-4">
                  <PiggyBank className="text-green-500" size={32} />
                </div>
                
                <h3 className="text-lg font-medium text-gray-800 mb-2">오늘 소비/지출 내역이 없어요!</h3>
                <p className="text-gray-500 text-center text-sm mb-4">지출을 기록하면 소비 패턴을 분석하는 데 도움이 됩니다.</p>
                
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 font-medium">
                  지출 추가하기
                  <ArrowRight className="ml-1" size={16} />
                </button>
              </div>
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
