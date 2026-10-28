export function maxProfit(prices: number[]): number {
  let minBuy = prices[0];
  let maxProfit = 0;
  for (let p of prices) {
    minBuy = Math.min(minBuy, p);
    const profit = p - minBuy;
    maxProfit = Math.max(maxProfit, profit);
  }
  return maxProfit;
}
