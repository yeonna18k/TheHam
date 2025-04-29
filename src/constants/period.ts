export const PERIOD_TYPES = [
  {
    key: 'DAILY',
    ko: '매일',
    en: 'daily',
  },
  {
    key: 'WEEKLY',
    ko: '매주',
    en: 'weekly',
  },
  {
    key: 'MONTHLY',
    ko: '매달',
    en: 'monthly',
  },
  {
    key: 'YEARLY',
    ko: '매년',
    en: 'yearly',
  },
] as const;

export type PeriodType = (typeof PERIOD_TYPES)[number]['key'];
