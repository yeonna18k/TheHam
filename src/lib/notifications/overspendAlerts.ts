export function getOverspendMessage(usageRate: number) {
    if (usageRate >= 1.0) {
      return { title: "💸 과소비 알림 🔴", message: "예산 초과! 지갑을 잠글 시간이에요 🚫" };
    } else if (usageRate >= 0.8) {
      return { title: "💸 과소비 알림 🟠", message: "예산의 80%에 도달했어요! 조금만 더 신중하게 💳" };
    } else if (usageRate >= 0.5) {
      return { title: "💸 과소비 알림 🟡", message: "예산의 50% 사용 중이에요! 절반을 넘었어요 👀" };
    }
    return null;
  }
  