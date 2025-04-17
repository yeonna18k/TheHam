export const ChallengeDetailHeader = ({ title }: { title: string }) => {
    return (
      <div className="bg-green-500 text-white p-4">
        <h1 className="text-xl font-bold text-center">{title}</h1>
      </div>
    );
  };