import React from 'react';
import BudgetContainer from '../transactions/tabs/BudgetContainer';
import BottomNavigation from './BottomNavigation';
import { Header } from './Header';
import { ChallengeList } from './List';
import { TransactionList } from './TransactionList';

export const BudgetDashboard: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      <Header />
      {/* <BudgetStatus /> */}
      <div className="px-4 py-6 flex flex-col gap-3">
        <BudgetContainer page="MAIN" />
        <TransactionList />
        <ChallengeList />
        <BottomNavigation activeTab={'home'} />
      </div>
    </div>
  );
};
