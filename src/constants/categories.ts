export const EXPENSE_CATEGORIES = [
  { id: 1, name: '식비' },
  { id: 2, name: '카페 / 간식' },
  { id: 3, name: '편의점 / 마트 / 잡화' },
  { id: 4, name: '술 / 유흥' },
  { id: 5, name: '쇼핑' },
  { id: 6, name: '취미 / 여가' },
  { id: 7, name: '의료 / 건강 / 피트니스' },
  { id: 8, name: '주거 / 통신' },
  { id: 9, name: '보험 / 세금 / 기타금융' },
  { id: 10, name: '미용' },
  { id: 11, name: '교통 / 자동차' },
  { id: 12, name: '여행 / 숙박' },
  { id: 13, name: '교육' },
  { id: 14, name: '생활' },
  { id: 15, name: '기부 / 후원' },
  { id: 16, name: '카드대금' },
  { id: 17, name: '후불결제대금' },
] as const;

// 카테고리 ID 타입
export type ExpenseCategoryId = (typeof EXPENSE_CATEGORIES)[number]['id'];

// 유틸리티 함수 - ID로 카테고리 찾기
export const getCategoryById = (id: ExpenseCategoryId) => {
  return EXPENSE_CATEGORIES.find((category) => category.id === id);
};

// 유틸리티 함수 - 이름으로 카테고리 찾기
export const getCategoryByName = (name: string) => {
  return EXPENSE_CATEGORIES.find((category) => category.name === name);
};

export const CATEGORY_MAP: Record<string, { name: string; color: string }> = {
  식비: { name: '식비', color: '#4ade80' },
  카페: { name: '카페', color: '#60a5fa' },
  쇼핑: { name: '쇼핑', color: '#f472b6' },
  여가: { name: '여가', color: '#a78bfa' },
  건강: { name: '건강', color: '#fb923c' },
  주거: { name: '주거', color: '#94a3b8' },
  교통: { name: '교통', color: '#fbbf24' },
  기타: { name: '기타', color: '#cbd5e1' },
};
