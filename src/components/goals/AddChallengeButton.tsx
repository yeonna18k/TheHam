interface AddChallengeButtonProps {
  onClick: () => void;
}

export const AddChallengeButton = ({ onClick }: AddChallengeButtonProps) => {
  return (
    <button
      className="fixed bottom-30 right-60 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
};
