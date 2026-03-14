import type { ComparisonResult } from '@/components/comparison/ModelComparison';

export interface AggregatedResults {
  inputTokens: number;
  outputTokens: number;
  costs?: {
    inputCost: number;
    outputCost: number;
    totalCost: number;
  };
}

export function aggregateResults(results: ComparisonResult[]): AggregatedResults {
  const successResults = results.filter(r => r.status === 'success');
  
  if (successResults.length === 0) {
    return {
      inputTokens: 0,
      outputTokens: 0,
      costs: undefined,
    };
  }

  const totals = successResults.reduce((acc, result) => ({
    inputTokens: acc.inputTokens + (result.inputTokens || 0),
    outputTokens: acc.outputTokens + (result.outputTokens || 0),
    inputCost: acc.inputCost + (result.costs?.inputCost || 0),
    outputCost: acc.outputCost + (result.costs?.outputCost || 0),
    totalCost: acc.totalCost + (result.costs?.totalCost || 0),
  }), { 
    inputTokens: 0, 
    outputTokens: 0, 
    inputCost: 0, 
    outputCost: 0, 
    totalCost: 0 
  });

  const hasCosts = successResults.some(r => r.costs);
  
  return {
    inputTokens: totals.inputTokens,
    outputTokens: totals.outputTokens,
    costs: hasCosts ? {
      inputCost: totals.inputCost,
      outputCost: totals.outputCost,
      totalCost: totals.totalCost,
    } : undefined,
  };
}