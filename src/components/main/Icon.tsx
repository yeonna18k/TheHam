import React from 'react';
import { IconType } from 'react-icons';
import { FiHome, FiBarChart2, FiTarget, FiUsers, FiUser } from 'react-icons/fi';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  const icons: Record<string, IconType> = {
    home: FiHome,
    stats: FiBarChart2,
    goals: FiTarget,
    friends: FiUsers,
    profile: FiUser,
  };

  const IconComponent = icons[name];

  if (!IconComponent) {
    return <span className={className}>Icon not found</span>;
  }

  return <IconComponent size={size} className={className} />;
};

export default Icon;