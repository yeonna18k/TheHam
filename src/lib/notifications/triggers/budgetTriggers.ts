export function getUsageRate(current: number, limit: number): number {
    return limit > 0 ? current / limit : 0;
  }
  