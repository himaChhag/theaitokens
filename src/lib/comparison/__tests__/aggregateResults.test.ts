import { aggregateResults } from '../utils';
import type { ComparisonResult } from '@/components/comparison/ModelComparison';

describe('aggregateResults', () => {
  const mockSuccessResult: ComparisonResult = {
    id: 'test-1',
    provider: 'openai' as any,
    modelId: 'gpt-4o',
    modelName: 'GPT-4o',
    status: 'success',
    inputTokens: 100,
    outputTokens: 50,
    costs: {
      inputCost: 0.25,
      outputCost: 0.50,
      totalCost: 0.75,
    },
    responseTime: 1500,
  };

  const mockErrorResult: ComparisonResult = {
    id: 'test-2',
    provider: 'anthropic' as any,
    modelId: 'claude-sonnet',
    modelName: 'Claude Sonnet',
    status: 'error',
    error: 'API Error',
  };

  const mockLoadingResult: ComparisonResult = {
    id: 'test-3',
    provider: 'google' as any,
    modelId: 'gemini-pro',
    modelName: 'Gemini Pro',
    status: 'loading',
  };

  it('should aggregate results from successful responses only', () => {
    const results = [mockSuccessResult, mockErrorResult, mockLoadingResult];
    const aggregated = aggregateResults(results);

    expect(aggregated).toEqual({
      inputTokens: 100,
      outputTokens: 50,
      costs: {
        inputCost: 0.25,
        outputCost: 0.50,
        totalCost: 0.75,
      },
    });
  });

  it('should sum multiple successful results', () => {
    const result1: ComparisonResult = {
      ...mockSuccessResult,
      id: 'test-1',
      inputTokens: 100,
      outputTokens: 50,
      costs: { inputCost: 0.25, outputCost: 0.50, totalCost: 0.75 },
    };

    const result2: ComparisonResult = {
      ...mockSuccessResult,
      id: 'test-2',
      inputTokens: 200,
      outputTokens: 75,
      costs: { inputCost: 0.50, outputCost: 0.75, totalCost: 1.25 },
    };

    const results = [result1, result2, mockErrorResult];
    const aggregated = aggregateResults(results);

    expect(aggregated).toEqual({
      inputTokens: 300,
      outputTokens: 125,
      costs: {
        inputCost: 0.75,
        outputCost: 1.25,
        totalCost: 2.00,
      },
    });
  });

  it('should handle results without costs', () => {
    const resultWithoutCosts: ComparisonResult = {
      ...mockSuccessResult,
      costs: undefined,
    };

    const results = [resultWithoutCosts];
    const aggregated = aggregateResults(results);

    expect(aggregated).toEqual({
      inputTokens: 100,
      outputTokens: 50,
      costs: undefined,
    });
  });

  it('should handle mixed results with and without costs', () => {
    const resultWithCosts: ComparisonResult = {
      ...mockSuccessResult,
      costs: { inputCost: 0.25, outputCost: 0.50, totalCost: 0.75 },
    };

    const resultWithoutCosts: ComparisonResult = {
      ...mockSuccessResult,
      id: 'test-2',
      costs: undefined,
    };

    const results = [resultWithCosts, resultWithoutCosts];
    const aggregated = aggregateResults(results);

    expect(aggregated).toEqual({
      inputTokens: 200,
      outputTokens: 100,
      costs: {
        inputCost: 0.25,
        outputCost: 0.50,
        totalCost: 0.75,
      },
    });
  });

  it('should return zero values when no successful results', () => {
    const results = [mockErrorResult, mockLoadingResult];
    const aggregated = aggregateResults(results);

    expect(aggregated).toEqual({
      inputTokens: 0,
      outputTokens: 0,
      costs: undefined,
    });
  });

  it('should handle empty results array', () => {
    const results: ComparisonResult[] = [];
    const aggregated = aggregateResults(results);

    expect(aggregated).toEqual({
      inputTokens: 0,
      outputTokens: 0,
      costs: undefined,
    });
  });

  it('should handle undefined token values', () => {
    const resultWithUndefinedTokens: ComparisonResult = {
      ...mockSuccessResult,
      inputTokens: undefined,
      outputTokens: undefined,
    };

    const results = [resultWithUndefinedTokens];
    const aggregated = aggregateResults(results);

    expect(aggregated).toEqual({
      inputTokens: 0,
      outputTokens: 0,
      costs: {
        inputCost: 0.25,
        outputCost: 0.50,
        totalCost: 0.75,
      },
    });
  });
});