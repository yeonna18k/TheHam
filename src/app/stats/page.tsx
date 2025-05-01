'use client';
import { getConsumeFrequency } from '@/api/StatsAPI';
import BottomNavigation from '@/components/main/BottomNavigation';
import { CategoryList } from '@/components/statistics/CategoryList';
import { DonutChart } from '@/components/statistics/DonutChart';
import { PeriodTabs } from '@/components/statistics/PeriodTabs';
import { TopCategories } from '@/components/statistics/TopCategories';
import { CATEGORY_MAP, getCategoryByKorean } from '@/constants/categories';
import { useGetFrequency } from '@/hooks/useStatics';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, BarChart3, PenLine } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// 빈 소비 기록 UI 컴포넌트 추가
function EmptyConsumptionState() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 relative">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full">
            <BarChart3 className="w-8 h-8 text-green-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-amber-50 rounded-full shadow-sm border border-white">
            <PenLine className="w-4 h-4 text-amber-500" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          아직 소비 기록이 없어요!
        </h3>
        <p className="text-gray-500 mb-5 max-w-xs">
          소비 내역을 기록하면 동향을 분석하고 더 나은 소비 습관을 만들 수
          있어요.
        </p>
        <button
          className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r bg-green-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          onClick={() => (window.location.href = '/transactions/detail')}
        >
          <span>기록 시작하기</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}

const periodMap: Record<string, string> = {
  일간: 'daily',
  주간: 'weekly',
  월간: 'monthly',
};

export default function Statistics() {
  const [period, setPeriod] = useState('주간');
  const [selectedCategory, setSelectedCategory] = useState('식비');
  // const [consumeDelta, setConsumeDelta] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);

  const frequency = periodMap[period];
  const { data: rawData } = useGetFrequency(frequency);

  const { data: categoryDetailResponse, isError } = useQuery({
    queryKey: ['stat', frequency, selectedCategory],
    queryFn: () => getConsumeFrequency(frequency),
  });

  const categoryData = Array.isArray(rawData)
    ? rawData.map((item) => ({
        name: item.category,
        value: item.sum,
        color: getCategoryByKorean(item.category)?.color,
      }))
    : [];

  const topCategories = categoryData
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const allCategories = categoryData
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

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
        {isError ? (
          <div className="mt-4 mb-6 text-center text-sm text-gray-600">
            <span>데이터를 불러오는 중 오류가 발생했습니다</span>
          </div>
        ) : (
          <></>
        )}

        <DonutChart data={topCategories} />
        <TopCategories
          categories={topCategories}
          onSelect={(cat) => setSelectedCategory(cat.name)}
        />
        <CategoryList
          categories={allCategories}
          onSelect={(cat) => setSelectedCategory(cat.name)}
        />

        {categoryDetailResponse && (
          <div className="mt-6 flex flex-col gap-3">
            <h2 className="font-semibold text-lg mb-2">카테고리별 상세보기</h2>
            <span>
              <b>{selectedCategory}</b> 소비가 전 기간 대비{' '}
              <b
                className={
                  categoryDetailResponse.consume > 0
                    ? 'text-red-500'
                    : 'text-blue-500'
                }
              >
                {categoryDetailResponse.consume > 0 ? '증가' : '감소'}
                {/* {Math.abs(categoryDetailResponse.consume)}% */}
              </b>{' '}
              했어요.
            </span>

            <div className="mb-4">
              <label
                htmlFor="category-select"
                className="block text-sm font-medium text-gray-700"
              >
                카테고리 선택
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm max-w-md mx-auto"
              >
                {Object.keys(CATEGORY_MAP).map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_MAP[category].name}
                  </option>
                ))}
              </select>
            </div>

            {/* <ul className="space-y-1 text-sm text-gray-700">
              {categoryDetailResponse.items?.map(
                (
                  item: { description: string; amount: number },
                  idx: number
                ) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.description}</span>
                    <span>{item.amount.toLocaleString()}원</span>
                  </li>
                )
              )}
            </ul> */}
          </div>
        )}
        <BottomNavigation activeTab="stats" />
      </main>
    </div>
  );
}
