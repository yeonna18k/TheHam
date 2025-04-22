interface FriendTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
  }
  
  export default function FriendTabs({ activeTab, onTabChange }: FriendTabsProps) {
    return (
      <div className="flex border-b">
        <button
          onClick={() => onTabChange('invite')}
          className={`flex-1 py-3 text-center font-medium ${activeTab === 'invite' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500'}`}
        >
          챌린지 초대
        </button>
        <button
          onClick={() => onTabChange('list')}
          className={`flex-1 py-3 text-center font-medium ${activeTab === 'list' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500'}`}
        >
          친구 목록
        </button>
      </div>
    );
  }