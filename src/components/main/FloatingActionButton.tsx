import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="fixed bottom-20 right-5 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg text-white text-2xl"
      onClick={onClick}
    >
      +
    </button>
  );
};

export default FloatingActionButton;