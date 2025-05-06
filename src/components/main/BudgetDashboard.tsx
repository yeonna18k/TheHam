import React from 'react';
import BudgetContainer from '../transactions/tabs/BudgetContainer';
import { ChallengeList } from './ChallengesList';
import { TransactionList } from './TransactionList';

export const BudgetDashboard: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* <BudgetStatus /> */}
      <div className="px-4 py-6 flex flex-col gap-3">
        <BudgetContainer page="MAIN" />
        <TransactionList />
        <ChallengeList />
      </div>
    </div>
  );
};
