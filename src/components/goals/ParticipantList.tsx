export const ParticipantList = ({ capacity }: { capacity: number }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-medium mb-2">참여 인원 ({capacity}명)</h3>
      <div className="text-sm text-gray-600">참여자 정보가 없습니다.</div>
    </div>
  );
};
