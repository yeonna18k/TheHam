import { useChallengeFormStore } from '@/store/ChallengeFormState';
import { useCreateChallenge } from '@/hooks/useChallenges';
import { CreateChallengeParams } from '@/types/challenge';
import React from 'react';

interface AddChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChallengeModal = ({ isOpen, onClose }: AddChallengeModalProps) => {
  const { title, description, targetAmount, startDate, endDate, isPublic, capacity, setTitle, setDescription, setTargetAmount, setStartDate, setEndDate, setIsPublic, setCapacity, resetForm } = useChallengeFormStore();
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const { mutate: createChallenge } = useCreateChallenge();

  if (!isOpen) return null;

  const handleSubmit = () => {
    const payload: CreateChallengeParams = {
      title,
      text: description,              // 반드시 text 로
      release: isPublic ? 'PUBLIC' : 'PRIVATE',
      amount: Number(targetAmount) || 0,
      capacity: Number(capacity) || 1, // capacity 필드도 폼에 추가하세요
      categoryList: selectedCategories, 
      startDate,
      endDate,
    };

    console.log('▶️ payload', payload); 

    createChallenge(payload, {
      onSuccess: () => {
        resetForm();
        onClose();
      },
      onError: (error) => {
        const err = error as { response?: { data?: string } };
        console.error('📌 400 에러 응답', err.response?.data);
        alert('입력값을 다시 확인해주세요.');
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-w-md mx-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">새 챌린지 추가하기</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="챌린지 제목"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="챌린지 설명"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">참여 인원 수</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)} // capacity 값을 state로 관리
            placeholder="참여 인원 수"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">목표 금액</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* 카테고리 선택 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
            multiple
          >
            <option value="FOOD">음식</option>
            <option value="HEALTH">건강</option>
            <option value="SPORT">운동</option>
            <option value="EDUCATION">교육</option>
            <option value="GENERAL">일반</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-green-500"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-700">공개 챌린지로 설정</span>
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700" onClick={onClose}>
            취소
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleSubmit}>
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};
