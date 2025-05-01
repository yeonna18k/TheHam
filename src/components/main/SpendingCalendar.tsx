import React, { useState } from 'react';

interface DayData {
  date: number;
  spending: number;
  saving: number; // Calculated savings (could be budget allocation - spending)
  transactions: {
    id: number;
    title: string;
    amount: number;
    category: string;
  }[];
}

interface SpendingCalendarProps {
  month: number; // 0-indexed (0 = January)
  year: number;
  dailyBudget: number;
  days: DayData[];
  onDayClick: (day: DayData) => void;
}

const SpendingCalendar: React.FC<SpendingCalendarProps> = ({
  month,
  year,
  dailyBudget,
  days,
  onDayClick,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  // Get days in month and first day of month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Calculate placeholder days for grid alignment
  const placeholderDays = Array(firstDayOfMonth).fill(null);

  // Create calendar days array
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    const dayData = days.find((day) => day.date === date) || {
      date,
      spending: 0,
      saving: dailyBudget, // If no spending, saving = full budget
      transactions: [],
    };
    return dayData;
  });

  // Function to determine color intensity based on savings
  const getSavingColor = (saving: number): string => {
    // Max saving should be the daily budget (or higher if they saved more than allocated)
    const savingRatio = Math.min(Math.max(saving / dailyBudget, 0), 1);

    if (saving <= 0) {
      // Overspent - use light red
      return 'bg-red-100';
    } else if (savingRatio < 0.3) {
      return 'bg-green-100';
    } else if (savingRatio < 0.6) {
      return 'bg-green-200';
    } else if (savingRatio < 0.9) {
      return 'bg-green-300';
    } else {
      // Saved most of budget
      return 'bg-green-500';
    }
  };

  // Handle day click
  const handleDayClick = (day: DayData) => {
    setSelectedDay(day);
    onDayClick(day);
  };

  const monthNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">
          {year}년 {monthNames[month]}
        </h3>
        <div className="flex space-x-2">
          <button className="text-gray-500">◀</button>
          <button className="text-gray-500">▶</button>
        </div>
      </div>

      {/* Calendar header (S M T W T F S) */}
      <div className="grid grid-cols-7 mb-2 text-sm text-center text-gray-500">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Placeholder days */}
        {placeholderDays.map((_, i) => (
          <div key={`placeholder-${i}`} className="h-10"></div>
        ))}

        {/* Actual days */}
        {calendarDays.map((day) => (
          <div
            key={`day-${day.date}`}
            className={`h-10 rounded-full flex items-center justify-center text-sm cursor-pointer transition-colors duration-200 ${getSavingColor(
              day.saving
            )} ${selectedDay?.date === day.date ? 'ring-2 ring-green-600' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day.date}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
        <div className="flex items-center mr-3">
          <div className="w-3 h-3 bg-red-100 mr-1 rounded-sm"></div>
          <span>초과지출</span>
        </div>
        <div className="flex items-center mr-3">
          <div className="w-3 h-3 bg-green-100 mr-1 rounded-sm"></div>
          <span>약간 절약</span>
        </div>
        <div className="flex items-center mr-3">
          <div className="w-3 h-3 bg-green-300 mr-1 rounded-sm"></div>
          <span>잘 절약</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 mr-1 rounded-sm"></div>
          <span>많이 절약</span>
        </div>
      </div>

      {/* Selected day detail panel */}
      {selectedDay && (
        <div className="mt-4 border-t pt-3">
          <h4 className="font-medium">
            {month + 1}월 {selectedDay.date}일 내역
          </h4>
          {selectedDay.transactions.length > 0 ? (
            <div className="mt-2 space-y-2">
              {selectedDay.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between p-2 bg-gray-50 rounded-md"
                >
                  <div>
                    <span className="font-medium">{transaction.title}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {transaction.category}
                    </span>
                  </div>
                  <span
                    className={
                      transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                    }
                  >
                    {transaction.amount.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-2">거래 내역이 없습니다.</p>
          )}
          <div className="mt-3 flex justify-between border-t pt-2 text-sm">
            <span>절약 금액</span>
            <span className="font-medium text-green-600">
              {selectedDay.saving.toLocaleString()}원
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingCalendar;
