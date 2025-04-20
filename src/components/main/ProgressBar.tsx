import React from 'react';

interface ProgressBarProps {
  percentage: number;
  bgColorClass?: string;
  fillColorClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  bgColorClass = 'bg-gray-200',
  fillColorClass = 'bg-green-500',
}) => {
  return (
    <div className={`w-full h-2 rounded-full ${bgColorClass}`}>
      <div
        className={`h-full rounded-full ${fillColorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
