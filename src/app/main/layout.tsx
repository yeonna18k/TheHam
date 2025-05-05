import BottomNavigation from '@/components/main/BottomNavigation';
import { PiggyBank } from 'lucide-react';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <header className="p-3 border-b flex gap-2 items-center">
        <PiggyBank className="text-primary" size={24} />
        <h1 className="ml-2 title2">더함</h1>
      </header>
      {children}
      <BottomNavigation activeTab={'home'} />
    </div>
  );
}
