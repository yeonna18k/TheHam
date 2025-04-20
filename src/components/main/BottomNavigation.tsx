import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

interface NavItem {
  name: string;
  icon: string;
  path: string;
  active: boolean;
}

interface BottomNavigationProps {
  activeTab: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  const navItems: NavItem[] = [
    {
      name: '홈',
      icon: 'home',
      path: '/main',
      active: activeTab === 'home',
    },
    {
      name: '통계',
      icon: 'stats',
      path: '/stats',
      active: activeTab === 'stats',
    },
    {
      name: '목표치',
      icon: 'goals',
      path: '/goals',
      active: activeTab === 'goals',
    },
    {
      name: '친구',
      icon: 'friends',
      path: '/friends',
      active: activeTab === 'friends',
    },
    {
      name: '마이',
      icon: 'profile',
      path: '/profile',
      active: activeTab === 'profile',
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

export default BottomNavigation;
