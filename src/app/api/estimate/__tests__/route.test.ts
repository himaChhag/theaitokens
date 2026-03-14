/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Mock the catalog functions
jest.mock('@/lib/catalog', () => ({
  findModelByProviderAndId: jest.fn(),
}));

// Mock the pricing functions
jest.mock('@/lib/pricing/band', () => ({
  pickBand: jest.fn(),
}));

jest.mock('@/lib/pricing/math', () => ({
  costFor: jest.fn(),
}));

// Mock the token counting
jest.mock('@/lib/tokens', () => ({
  countTokens: jest.fn(),
}));

describe('/api/estimate', () => {
  const mockFindModelByProviderAndId = require('@/lib/catalog').findModelByProviderAndId;
  const mockPickBand = require('@/lib/pricing/band').pickBand;
  const mockCostFor = require('@/lib/pricing/math').costFor;
  const mockCountTokens = require('@/lib/tokens').countTokens;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('estimates tokens and costs for valid request', async () => {
    // Mock the model lookup
    mockFindModelByProviderAndId.mockReturnValue({
      id: 'gpt-4o',
      name: 'GPT-4o',
      slug: 'gpt-4o',
      status: 'active',
      pricingBands: [
        {
          inputPer1M: 2500,
          outputPer1M: 10000,
          cachedInputPer1M: 1250,
        },
      ],
      officialSourceUrl: 'https://openai.com/pricing',
      lastVerified: '2024-01-01',
    });

    // Mock token counting
    mockCountTokens.mockResolvedValue({
      inputTokens: 100,
      countingMode: 'exact',
      confidenceNote: 'Using tiktoken for accurate counting',
    });

    // Mock pricing
    mockPickBand.mockReturnValue({
      inputPer1M: 2500,
      outputPer1M: 10000,
      cachedInputPer1M: 1250,
    });

    mockCostFor.mockReturnValue({
      inputCost: 0.25,
      outputCost: 0.50,
      totalCost: 0.75,
    });

    const mockRequest = {
      text: jest.fn().mockResolvedValue(JSON.stringify({
        provider: 'openai',
        modelId: 'gpt-4o',
        prompt: 'Test prompt',
        expectedOutputTokens: 50,
      })),
      headers: new Map([['content-type', 'application/json']]),
      method: 'POST',
      url: 'http://localhost:3000/api/estimate',
    } as unknown as Request;

    // Import the handler after mocks are set up
    const { POST } = await import('../route');
    const response = await POST(mockRequest);

    expect(mockFindModelByProviderAndId).toHaveBeenCalledWith('openai', 'gpt-4o');
    expect(mockCountTokens).toHaveBeenCalledWith({
      provider: 'openai',
      modelId: 'gpt-4o',
      prompt: 'Test prompt',
    });

    const responseData = await response.json();
    expect(responseData.ok).toBe(true);
    expect(responseData.inputTokens).toBe(100);
    expect(responseData.expectedOutputTokens).toBe(50);
    expect(responseData.costs).toEqual({
      inputCost: 0.25,
      outputCost: 0.50,
      totalCost: 0.75,
    });
  });

  it('handles missing required fields', async () => {
    const mockRequest = {
      text: jest.fn().mockResolvedValue(JSON.stringify({
        provider: 'openai',
        // Missing modelId and prompt
      })),
      headers: new Map([['content-type', 'application/json']]),
      method: 'POST',
      url: 'http://localhost:3000/api/estimate',
    } as unknown as Request;

    const { POST } = await import('../route');
    const response = await POST(mockRequest);

    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData.ok).toBe(false);
    expect(responseData.error).toContain('Missing provider or modelId');
  });

  it('handles model not found', async () => {
    mockFindModelByProviderAndId.mockImplementation(() => {
      throw new Error('Model not found');
    });

    const mockRequest = {
      text: jest.fn().mockResolvedValue(JSON.stringify({
        provider: 'openai',
        modelId: 'invalid-model',
        prompt: 'Test prompt',
        expectedOutputTokens: 50,
      })),
      headers: new Map([['content-type', 'application/json']]),
      method: 'POST',
      url: 'http://localhost:3000/api/estimate',
    } as unknown as Request;

    const { POST } = await import('../route');
    const response = await POST(mockRequest);

    expect(response.status).toBe(404);
    const responseData = await response.json();
    expect(responseData.ok).toBe(false);
    expect(responseData.error).toBe('Model not found');
  });

  it('handles token counting errors with fallback', async () => {
    mockFindModelByProviderAndId.mockReturnValue({
      id: 'gpt-4o',
      name: 'GPT-4o',
      slug: 'gpt-4o',
      status: 'active',
      pricingBands: [
        {
          inputPer1M: 2500,
          outputPer1M: 10000,
          cachedInputPer1M: 1250,
        },
      ],
      officialSourceUrl: 'https://openai.com/pricing',
      lastVerified: '2024-01-01',
    });

    mockCountTokens.mockRejectedValue(new Error('Token counting failed'));

    mockPickBand.mockReturnValue({
      inputPer1M: 2500,
      outputPer1M: 10000,
      cachedInputPer1M: 1250,
    });

    mockCostFor.mockReturnValue({
      inputCost: 0.125,
      outputCost: 0.50,
      totalCost: 0.625,
    });

    const mockRequest = {
      text: jest.fn().mockResolvedValue(JSON.stringify({
        provider: 'openai',
        modelId: 'gpt-4o',
        prompt: 'Test prompt',
        expectedOutputTokens: 50,
      })),
      headers: new Map([['content-type', 'application/json']]),
      method: 'POST',
      url: 'http://localhost:3000/api/estimate',
    } as unknown as Request;

    const { POST } = await import('../route');
    const response = await POST(mockRequest);

    const responseData = await response.json();
    expect(responseData.ok).toBe(true);
    expect(responseData.countingMode).toBe('estimate');
    expect(responseData.confidenceNote).toContain('fallback estimation');
    expect(responseData.inputTokens).toBeGreaterThan(0); // Should use fallback calculation
  });

  it('handles invalid JSON in request', async () => {
    const mockRequest = {
      text: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      headers: new Map([['content-type', 'application/json']]),
      method: 'POST',
      url: 'http://localhost:3000/api/estimate',
    } as unknown as Request;

    const { POST } = await import('../route');
    const response = await POST(mockRequest);

    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData.ok).toBe(false);
    expect(responseData.error).toBe('Invalid JSON body');
  });

  it('handles model without pricing', async () => {
    mockFindModelByProviderAndId.mockReturnValue({
      id: 'test-model',
      name: 'Test Model',
      slug: 'test-model',
      status: 'preview', // Not active
      pricingBands: [],
      officialSourceUrl: 'https://example.com',
      lastVerified: '2024-01-01',
    });

    mockCountTokens.mockResolvedValue({
      inputTokens: 100,
      countingMode: 'exact',
      confidenceNote: 'Using tiktoken for accurate counting',
    });

    const mockRequest = {
      text: jest.fn().mockResolvedValue(JSON.stringify({
        provider: 'openai',
        modelId: 'test-model',
        prompt: 'Test prompt',
        expectedOutputTokens: 50,
      })),
      headers: new Map([['content-type', 'application/json']]),
      method: 'POST',
      url: 'http://localhost:3000/api/estimate',
    } as unknown as Request;

    const { POST } = await import('../route');
    const response = await POST(mockRequest);

    const responseData = await response.json();
    expect(responseData.ok).toBe(true);
    expect(responseData.pricingReady).toBe(false);
    expect(responseData.costs).toBeNull();
  });
});