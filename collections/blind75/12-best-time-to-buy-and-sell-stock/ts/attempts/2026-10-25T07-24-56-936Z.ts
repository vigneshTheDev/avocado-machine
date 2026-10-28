export function maxProfit(prices: number[]): number {
  let minBuy = prices[0];
  let maxProfit = 0;
  for (let p of prices) {
    const profit = p - minBuy;

    minBuy = Math.min(minBuy, p);
    maxProfit = Math.max(maxProfit, profit);
  }
  return maxProfit;
}
