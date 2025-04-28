export function formatSimpleCurrency(num: number) {
  if (num >= 1000000000) {
    return `${Math.floor(num / 1000000000)}십억원`;
  } else if (num >= 100000000) {
    return `${Math.floor(num / 100000000)}억원`;
  } else if (num >= 10000000) {
    return `${Math.floor(num / 10000000)}천만원`;
  } else if (num >= 1000000) {
    return `${Math.floor(num / 1000000)}백만원`;
  }
  return `${num.toLocaleString()}`;
}
