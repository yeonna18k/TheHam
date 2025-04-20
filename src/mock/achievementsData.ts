export interface Achievement {
  id: string;
  title: string;
  description: string;
  acquiredDate: string;
  icon?: string;
}

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: '첫 챌린지 완료',
    description: '첫 번째 절약 챌린지를 성공적으로 완료하였습니다.',
    acquiredDate: '2025-04-13',
  },
  {
    id: '2',
    title: '연속 30일 로그인',
    description:
      '30일 연속으로 앱에 로그인하였습니다. 꾸준함이 습관이 되고 있네요!',
    acquiredDate: '2025-03-22',
  },
  {
    id: '3',
    title: '절약 마스터',
    description: '한 달 예산을 10% 이상 절약하여 저축에 성공했습니다.',
    acquiredDate: '2025-02-28',
  },
  {
    id: '4',
    title: '소비 패턴 분석가',
    description: '소비 패턴 분석 리포트를 처음으로 확인했습니다.',
    acquiredDate: '2025-01-15',
  },
  {
    id: '5',
    title: '목표 달성',
    description: '첫 번째 저축 목표를 성공적으로 달성했습니다!',
    acquiredDate: '2025-04-01',
  },
  {
    id: '6',
    title: '예산 계획 전문가',
    description: '3개월 연속으로 예산 계획을 성공적으로 준수했습니다.',
    acquiredDate: '2025-03-31',
  },
  {
    id: '7',
    title: '친구 초대하기',
    description: '첫 번째 친구를 앱에 초대했습니다.',
    acquiredDate: '2025-02-14',
  },
  {
    id: '8',
    title: '알뜰 소비 달인',
    description: '첫 번째 소비팁을 공유했습니다.',
    acquiredDate: '2025-03-10',
  },
  {
    id: '9',
    title: '챌린지 스타터',
    description: '5개의 챌린지를 완료했습니다. 소비 습관이 좋아지고 있어요!',
    acquiredDate: '2025-04-10',
  },
  {
    id: '10',
    title: '첫 피드백 제공',
    description: '앱 개선을 위한 첫 번째 피드백을 제공했습니다.',
    acquiredDate: '2025-01-30',
  },
];

export default MOCK_ACHIEVEMENTS;
