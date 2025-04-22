'use client';

import { SetStateAction, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PeriodTabs } from '@/components/statistics/PeriodTabs';
import { DonutChart } from '@/components/statistics/DonutChart';
import { TopCategories } from '@/components/statistics/TopCategories';
import { CategoryList } from '@/components/statistics/CategoryList';
import BottomNavigation from '@/components/main/BottomNavigation';
import {
  useGetFrequency,
  useGetFrequencyCategory,
  useGetConsumeCategory,
} from '@/hooks/useStatics';
import { CATEGORY_MAP } from '@/constants/categories';

const periodMap: Record<string, string> = {
  일간: 'daily',
  주간: 'weekly',
  월간: 'monthly',
};

type RawCategory = {
  category: string;
  totalAmount: number;
};

export default function Statistics() {
  const [period, setPeriod] = useState('일간');
  const [selectedCategory, setSelectedCategory] = useState('식비');

  const frequency = periodMap[period];

  const { data: rawData = [] } = useGetFrequency(frequency);
  const { data: categoryDetail = { items: [] } } = useGetFrequencyCategory(frequency, selectedCategory);
  const { data: consumeDelta } = useGetConsumeCategory(frequency, selectedCategory);

  const categoryData = (rawData as RawCategory[]).map((item) => ({
    name: item.category,
    value: item.totalAmount,
    color: CATEGORY_MAP[item.category]?.color || '#d1d5db',
  }));

  const topCategories = [...categoryData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const allCategories = [...categoryData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4">
          <Link href="/main" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">통계</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="flex justify-center">
          <PeriodTabs period={period} setPeriod={setPeriod} />
        </div>

        <div className="mt-4 mb-6 text-center text-sm text-gray-600">
          {consumeDelta ? (
            <span>
              <b>{selectedCategory}</b> 소비가 전 기간 대비{' '}
              <b className={consumeDelta.change > 0 ? 'text-red-500' : 'text-blue-500'}>
                {consumeDelta.change > 0 ? '증가' : '감소'} ({Math.abs(consumeDelta.change)}%)
              </b>{' '}
              했어요.
            </span>
          ) : (
            <span>소비 증감 데이터를 불러오는 중...</span>
          )}
        </div>

        <DonutChart data={topCategories} />
        <TopCategories
          categories={topCategories}
          onSelect={(cat: { name: SetStateAction<string> }) => setSelectedCategory(cat.name)}
        />
        <CategoryList
          categories={allCategories}
          onSelect={(cat: { name: SetStateAction<string> }) => setSelectedCategory(cat.name)}
        />

        {categoryDetail && (
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-2">{selectedCategory} 상세</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {categoryDetail.items.map((item: { description: string; amount: number }, idx: number) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.description}</span>
                  <span>{item.amount.toLocaleString()}원</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <BottomNavigation activeTab="stats" />
      </main>
    </div>
  );
}
