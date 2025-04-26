import React from 'react';
import { PiggyBank } from 'lucide-react';


export const BudgetTip: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-3 mt-4 flex items-start">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
        <PiggyBank className="text-green-500 text-sm"/>
      </div>
      <div>
        <p className="text-gray-500 text-xs">김똑닮의 소비팁</p>
        <p className="font-medium">가급적은 대중교통도 좋아요!</p>
      </div>
    </div>
  );
};