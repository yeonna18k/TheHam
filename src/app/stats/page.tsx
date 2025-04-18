"use client";

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PeriodTabs } from '@/components/statistics/PeriodTabs';
import { DonutChart } from '@/components/statistics/DonutChart';
import { TopCategories } from '@/components/statistics/TopCategories';
import { CategoryList } from '@/components/statistics/CategoryList';
import BottomNavigation from '@/components/main/BottomNavigation';

export default function Statistics() {
  const [period, setPeriod] = useState('일간');
  
  const categoryData = [
    { name: '식비', value: 300000, color: '#4ade80' },
    { name: '카페', value: 150000, color: '#60a5fa' },
    { name: '쇼핑', value: 200000, color: '#f472b6' },
    { name: '여가', value: 120000, color: '#a78bfa' },
    { name: '건강', value: 80000, color: '#fb923c' },
    { name: '주거', value: 350000, color: '#94a3b8' },
    { name: '교통', value: 70000, color: '#fbbf24' },
    { name: '기타', value: 50000, color: '#cbd5e1' },
  ];
  
  const topCategories = [...categoryData].sort((a, b) => b.value - a.value).slice(0, 3);
  
  const allCategories = [...categoryData].sort((a, b) => a.name.localeCompare(b.name));
  
  const chartData = topCategories.map(cat => ({
    name: cat.name,
    value: cat.value,
    color: cat.color
  }));
  
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
        <DonutChart data={chartData} />
        <TopCategories categories={topCategories} />
        <CategoryList categories={allCategories} />
        <BottomNavigation activeTab="stats" />
      </main>
    </div>
  );
}

//이거 나중에 API로 변경해야함
export async function GET() {
  //const period = new URL(request.url).searchParams.get('period') || 'daily';

  const categoryData = [
    { name: '식비', value: 300000, color: '#4ade80' },
    { name: '카페', value: 150000, color: '#60a5fa' },
    { name: '쇼핑', value: 200000, color: '#f472b6' },
    { name: '여가', value: 120000, color: '#a78bfa' },
    { name: '건강', value: 80000, color: '#fb923c' },
    { name: '주거', value: 350000, color: '#94a3b8' },
    { name: '교통', value: 70000, color: '#fbbf24' },
    { name: '기타', value: 50000, color: '#cbd5e1' },
  ];

  return Response.json({ categoryData });
}