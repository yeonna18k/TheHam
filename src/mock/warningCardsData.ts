export interface WarningCard {
  id: string;
  type: "budget_percentage" | "monthly_pace";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  date: string;
  budgetData?: {
    currentPercentage: number;
    remainingAmount: number;
    totalBudget: number;
  };
  paceData?: {
    dayOfMonth: number;
    percentageSpent: number;
    isOverPace: boolean;
  };
}

export const MOCK_WARNING_CARDS: WarningCard[] = [
  {
    id: "1",
    type: "budget_percentage",
    title: "예산 한도 80% 도달",
    description: "예산 한도까지 앞으로 50,000원 남았어요",
    severity: "medium",
    date: "2025-04-16",
    budgetData: {
      currentPercentage: 80,
      remainingAmount: 50000,
      totalBudget: 250000,
    },
  },
  {
    id: "2",
    type: "budget_percentage",
    title: "예산 한도 50% 도달",
    description: "예산의 절반을 사용했어요. 남은 금액을 계획적으로 사용하세요",
    severity: "low",
    date: "2025-04-10",
    budgetData: {
      currentPercentage: 50,
      remainingAmount: 125000,
      totalBudget: 250000,
    },
  },
  {
    id: "3",
    type: "budget_percentage",
    title: "예산 한도 95% 도달",
    description: "예산 한도까지 앞으로 12,500원 남았어요. 주의하세요!",
    severity: "high",
    date: "2025-04-25",
    budgetData: {
      currentPercentage: 95,
      remainingAmount: 12500,
      totalBudget: 250000,
    },
  },
  {
    id: "4",
    type: "monthly_pace",
    title: "지출 페이스가 빠릅니다",
    description: "월의 절반(15일)이 지났는데 예산의 65%를 이미 사용했어요",
    severity: "medium",
    date: "2025-04-15",
    paceData: {
      dayOfMonth: 15,
      percentageSpent: 65,
      isOverPace: true,
    },
  },
  {
    id: "5",
    type: "monthly_pace",
    title: "지출 페이스가 매우 빠릅니다",
    description: "월의 1/3만 지났는데 예산의 절반 이상을 사용했어요!",
    severity: "high",
    date: "2025-04-10",
    paceData: {
      dayOfMonth: 10,
      percentageSpent: 52,
      isOverPace: true,
    },
  },
  {
    id: "6",
    type: "monthly_pace",
    title: "지출 페이스가 양호합니다",
    description: "월의 절반(15일)이 지났고 예산의 45%를 사용했어요",
    severity: "low",
    date: "2025-04-15",
    paceData: {
      dayOfMonth: 15,
      percentageSpent: 45,
      isOverPace: false,
    },
  },
];

export default MOCK_WARNING_CARDS;
