import React from 'react';
import { PiggyBank } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <PiggyBank className="text-green-500 text-sm"/>
        </div>
        <h1 className="ml-2 text-lg font-medium">더함</h1>
      </div>
    </div>
  );
};