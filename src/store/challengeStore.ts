import { create } from "zustand";
import { Payment } from "../types/Payment";
import { Challenge } from "../types/challenge";

interface ChallengeState {
  challenges: Challenge[];
  selectedChallenge: Challenge | null;
  payments: Payment[];
  addChallenge: (challenge: Challenge) => void;
  selectChallenge: (challengeId: string) => void;
  addPayment: (payment: Payment) => void;
  updateChallengePublic: (challengeId: string, isPublic: boolean) => void;
}

const initialChallenges: Challenge[] = [
  {
    id: "1",
    title: "30일 커피 줄이기 챌린지",
    description: "매일 사 먹는 커피를 줄이고 집에서 텀블러에 커피를 어쩌고",
    startDate: "2025.04.01",
    endDate: "2025.04.30",
    targetAmount: 150000,
    currentAmount: 63000,
    participants: [
      { id: "1", name: "미나", color: "#ff4040" },
      { id: "2", name: "준호", color: "#e0a040" },
      { id: "3", name: "지은", color: "#a0e0c0" },
      { id: "4", name: "현우", color: "#c080ff" },
      { id: "5", name: "소영", color: "#408060" },
    ],
    isPublic: true,
  },
];

const initialPayments: Payment[] = [
  {
    id: "1",
    amount: 4500,
    date: "2024년 4월 9일",
    description: "커피 대신 사무실 시머를 마셨습니다.",
  },
  {
    id: "2",
    amount: 4500,
    date: "2024년 4월 9일",
    description: "커피 대신 사무실 시머를 마셨습니다.",
  },
  {
    id: "3",
    amount: 4500,
    date: "2024년 4월 9일",
    description: "커피 대신 사무실 시머를 마셨습니다.",
  },
];

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenges: initialChallenges,
  selectedChallenge: null,
  payments: initialPayments,

  addChallenge: (challenge) =>
    set((state) => ({
      challenges: [...state.challenges, challenge],
    })),

  selectChallenge: (challengeId) =>
    set((state) => ({
      selectedChallenge:
        state.challenges.find((c) => c.id === challengeId) || null,
    })),

  addPayment: (payment) =>
    set((state) => ({
      payments: [...state.payments, payment],
    })),

  updateChallengePublic: (challengeId, isPublic) =>
    set((state) => ({
      challenges: state.challenges.map((challenge) =>
        challenge.id === challengeId ? { ...challenge, isPublic } : challenge
      ),
      selectedChallenge:
        state.selectedChallenge?.id === challengeId
          ? { ...state.selectedChallenge, isPublic }
          : state.selectedChallenge,
    })),
}));
