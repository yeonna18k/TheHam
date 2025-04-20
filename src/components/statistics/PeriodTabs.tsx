export function PeriodTabs({ period, setPeriod }: { period: string; setPeriod: (tab: string) => void }) {
  return (
    <div className="bg-gray-100 rounded-full p-2 mb-4 w-full max-w-xs mx-auto shadow-inner flex">
      {['일간', '주간', '월간'].map((tab) => {
        const isActive = period === tab;
        return (
          <button
            key={tab}
            className={`rounded-full py-2 px-4 flex-1 flex items-center justify-center text-sm font-semibold transition-all duration-200
              ${isActive 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-green-100'}`}
            onClick={() => setPeriod(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
