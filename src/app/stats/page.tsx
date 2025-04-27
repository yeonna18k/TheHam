"use client"
import { SetStateAction, useState, useEffect } from 'react';
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
  const [consumeDelta, setConsumeDelta] = useState<any>(null);
  const [categoryDetail, setCategoryDetail] = useState<any>({ items: [] });
  const [error, setError] = useState<string | null>(null);

  const frequency = periodMap[period];

  const { data: rawData = [] } = useGetFrequency(frequency);

  // 카테고리별 데이터 요청 시 URL 인코딩 처리
  const { data: categoryDetailResponse } = useGetFrequencyCategory(frequency, selectedCategory);
  
  useEffect(() => {
    // 소비 증감량 데이터 요청 시 404 오류 처리
    async function fetchConsumeDelta() {
      try {
        const decodedCategory = CATEGORY_MAP[selectedCategory]?.english || 'none';
        const response = await fetch(`/stat/consume/${frequency}/${decodedCategory}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConsumeDelta(data);
        setError(null);
      } catch (error: any) {
        setConsumeDelta(null);
        setError('아직 소비 기록이 없어요! 기록을 시작해보세요!');
      }
    }
    fetchConsumeDelta();
  }, [frequency, selectedCategory]); // selectedCategory가 변경될 때마다 호출

  // rawData가 배열인지 확인하고, 그 후 map 사용
  const categoryData = Array.isArray(rawData)
    ? rawData.map((item) => ({
        name: item.category,
        value: item.totalAmount,
        color: CATEGORY_MAP[item.category]?.color || '#d1d5db',
      }))
    : []; // rawData가 배열이 아니면 빈 배열을 반환

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
          ) : error ? (
            <span>{error}</span>
          ) : (
            <span>소비 증감 데이터를 불러오는 중...</span>
          )}
        </div>

        <DonutChart data={topCategories} />
        <TopCategories
          categories={topCategories}
          onSelect={(cat: { name: SetStateAction<string> }) => setSelectedCategory(cat.name)} // 카테고리 클릭 시 selectedCategory 변경
        />
        <CategoryList
          categories={allCategories}
          onSelect={(cat: { name: SetStateAction<string> }) => setSelectedCategory(cat.name)} // 카테고리 클릭 시 selectedCategory 변경
        />

        {categoryDetail && (
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-2">카테고리별 상세보기</h2>

            {/* 드롭다운 메뉴 추가 */}
            <div className="mb-4">
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700">
                카테고리 선택
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)} // 선택 시 카테고리 변경
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm max-w-md mx-auto"
              >
                {Object.keys(CATEGORY_MAP).map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_MAP[category].name}
                  </option>
                ))}
              </select>
            </div>

            {/* 항목 목록 */}
            <ul className="space-y-1 text-sm text-gray-700">
              {categoryDetailResponse?.items?.map(
                (item: { description: string; amount: number }, idx: number) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.description}</span>
                    <span>{item.amount.toLocaleString()}원</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        <BottomNavigation activeTab="stats" />
      </main>
    </div>
  );
}
