import React from 'react';

interface TipBoxProps {
  message: string;
}

const TipBox: React.FC<TipBoxProps> = ({ message }) => {
  return (
    <div className="bg-green-100 rounded-lg p-4 my-4">
      <p className="text-gray-700 font-medium mb-1">지영님의 소비 팁</p>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default TipBox;