import { Challenge } from '@/types/challenge';
import { useState } from 'react';
import { useChallengeStore } from '../../store/challengeStore';

interface AddChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChallengeModal = ({
  isOpen,
  onClose,
}: AddChallengeModalProps) => {
  const addChallenge = useChallengeStore((state) => state.addChallenge);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      title,
      description,
      startDate,
      endDate,
      targetAmount: parseInt(targetAmount) || 0,
      currentAmount: 0,
      participants: [{ id: '1', name: '나', color: '#4f46e5' }],
      isPublic,
    };

    addChallenge(newChallenge);
    onClose();
    setTitle('');
    setDescription('');
    setTargetAmount('');
    setStartDate('');
    setEndDate('');
    setIsPublic(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-w-md mx-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">새 챌린지 추가하기</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            제목
          </label>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="챌린지 제목"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            설명
          </label>

          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="챌린지 설명"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            목표 금액
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="목표 금액 (원)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              시작일
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              종료일
            </label>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-green-500"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-700">
              공개 챌린지로 설정
            </span>
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};
