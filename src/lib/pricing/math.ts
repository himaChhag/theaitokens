import type { PricingBand } from "@/lib/catalog/types";

export function usd(n: number) {
  // stable display rounding
  return Math.round(n * 1e6) / 1e6;
}

export function costFor(band: PricingBand, inputTokens: number, outputTokens: number) {
  const inputCost = (inputTokens / 1_000_000) * band.inputPer1M;
  const outputCost = (outputTokens / 1_000_000) * band.outputPer1M;
  return {
    inputCost: usd(inputCost),
    outputCost: usd(outputCost),
    totalCost: usd(inputCost + outputCost),
  };
}