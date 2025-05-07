import Link from 'next/link';
import Icon from './Icon';

interface NavItem {
  name: string;
  icon: string;
  path: string;
  active: boolean;
}
export const TABS = {
  HOME: 'home',
  STATS: 'stats',
  CHALLENGES: 'challenges',
  FRIENDS: 'friends',
  PROFILE: 'profile',
} as const;

export type TabType = (typeof TABS)[keyof typeof TABS];

interface BottomNavigationProps {
  activeTab: TabType;
}

export const BottomNavigation = ({ activeTab }: BottomNavigationProps) => {
  const navItems: NavItem[] = [
    {
      name: '홈',
      icon: 'home',
      path: '/main',
      active: activeTab === TABS.HOME,
    },
    {
      name: '통계',
      icon: 'stats',
      path: '/stats',
      active: activeTab === TABS.STATS,
    },
    {
      name: '챌린지',
      icon: 'goals',
      path: '/challenges',
      active: activeTab === TABS.CHALLENGES,
    },
    {
      name: '친구',
      icon: 'friends',
      path: '/friends',
      active: activeTab === TABS.FRIENDS,
    },
    {
      name: '마이',
      icon: 'profile',
      path: '/profile',
      active: activeTab === TABS.PROFILE,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 max-w-md mx-auto">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className={`flex flex-col items-center ${item.active ? 'text-green-500' : 'text-gray-400'}`}
        >
          <Icon
            name={item.icon}
            className={item.active ? 'text-green-500' : 'text-gray-400'}
            size={20}
          />
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};
