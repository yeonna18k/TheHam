interface TabNavProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export const TabNav = ({ tabs, activeTab, onTabChange }: TabNavProps) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 ${activeTab === index ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500'}`}
          onClick={() => onTabChange(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};