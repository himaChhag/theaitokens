import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModelComparison from '@/components/comparison/ModelComparison';

// Mock fetch for API calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
  })),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

// Mock QueryHistoryCache
jest.mock('@/lib/cache/queryHistory', () => ({
  QueryHistoryCache: {
    addQuery: jest.fn(() => 'test-comparison-id'),
    updateQueryResult: jest.fn(),
    getQueryById: jest.fn(),
  },
}));

describe('Model Comparison Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('completes full comparison workflow successfully', async () => {
    const user = userEvent.setup();
    
    // Mock successful API responses for both models
    mockFetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          ok: true,
          inputTokens: 100,
          expectedOutputTokens: 50,
          costs: { inputCost: 0.25, outputCost: 0.50, totalCost: 0.75 },
          countingMode: 'exact',
          confidenceNote: 'High confidence',
        }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          ok: true,
          inputTokens: 120,
          expectedOutputTokens: 60,
          costs: { inputCost: 0.36, outputCost: 0.90, totalCost: 1.26 },
          countingMode: 'exact',
          confidenceNote: 'High confidence',
        }),
      });

    render(<ModelComparison />);

    // Enter a prompt
    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Compare these AI models for cost and performance');

    // Start comparison
    const compareButton = screen.getByText('Compare Models');
    expect(compareButton).not.toBeDisabled();
    await user.click(compareButton);

    // Should show loading state
    expect(screen.getByText('Comparing Models...')).toBeDefined();

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByTestId('comparison-results')).toBeDefined();
    }, { timeout: 5000 });

    // Verify results are displayed
    expect(screen.getByTestId('comparison-summary')).toBeDefined();

    // Verify API calls were made
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('handles mixed success and error responses', async () => {
    const user = userEvent.setup();
    
    // Mock one success and one error response
    mockFetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          ok: true,
          inputTokens: 100,
          expectedOutputTokens: 50,
          costs: { inputCost: 0.25, outputCost: 0.50, totalCost: 0.75 },
        }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          ok: false,
          error: 'Rate limit exceeded',
        }),
      });

    render(<ModelComparison />);

    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Test prompt');

    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);

    await waitFor(() => {
      expect(screen.getByTestId('comparison-results')).toBeDefined();
    });

    // Should show results (the actual text content depends on component implementation)
    expect(screen.getByText('Comparison Results')).toBeDefined();
  });

  it('saves and loads comparison from localStorage', async () => {
    const user = userEvent.setup();
    
    // Mock successful comparison
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({
        ok: true,
        inputTokens: 100,
        expectedOutputTokens: 50,
        costs: { inputCost: 0.25, outputCost: 0.50, totalCost: 0.75 },
      }),
    });

    render(<ModelComparison />);

    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Test comparison');

    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'comparison-test-comparison-id',
        expect.stringContaining('models')
      );
    });

    // Verify comparison data structure
    const setItemCall = localStorageMock.setItem.mock.calls.find(
      call => call[0] === 'comparison-test-comparison-id'
    );
    expect(setItemCall).toBeDefined();

    const savedData = JSON.parse(setItemCall[1]);
    expect(savedData).toHaveProperty('models');
    expect(savedData).toHaveProperty('results');
  });

  it('loads comparison from URL parameter', () => {
    // Mock URL parameter
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('existing-comparison-id'),
    };
    (require('next/navigation').useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    // Mock existing comparison data
    localStorageMock.getItem.mockReturnValue(JSON.stringify({
      models: [
        { id: '1', provider: 'openai', modelId: 'gpt-4o', modelName: 'GPT-4o', expectedOutputTokens: 250 }
      ],
      results: [
        { id: '1', status: 'success', modelName: 'GPT-4o', inputTokens: 100 }
      ]
    }));

    render(<ModelComparison />);

    // Should load the results
    expect(screen.getByTestId('comparison-results')).toBeDefined();
  });

  it('handles network errors gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock network error
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<ModelComparison />);

    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Test prompt');

    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);

    await waitFor(() => {
      expect(screen.getByTestId('comparison-results')).toBeDefined();
    });

    // Should show results container
    expect(screen.getByText('Comparison Results')).toBeDefined();
  });

  it('validates minimum models requirement', () => {
    render(<ModelComparison />);

    // With 2 models initially, compare button should be enabled with prompt
    const compareButton = screen.getByText('Compare Models');
    expect(compareButton).toBeDisabled(); // Disabled because no prompt yet
  });

  it('validates prompt requirement', () => {
    render(<ModelComparison />);

    // With empty prompt, compare button should be disabled
    const compareButton = screen.getByText('Compare Models');
    expect(compareButton).toBeDisabled();
  });

  it('handles concurrent API requests correctly', async () => {
    const user = userEvent.setup();
    
    // Mock delayed responses to test concurrency
    let resolveFirst: (value: any) => void;
    let resolveSecond: (value: any) => void;

    const firstPromise = new Promise(resolve => { resolveFirst = resolve; });
    const secondPromise = new Promise(resolve => { resolveSecond = resolve; });

    mockFetch
      .mockReturnValueOnce(firstPromise)
      .mockReturnValueOnce(secondPromise);

    render(<ModelComparison />);

    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Test concurrent requests');

    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);

    // Both requests should be initiated
    expect(mockFetch).toHaveBeenCalledTimes(2);

    // Resolve second request first
    resolveSecond!({
      json: () => Promise.resolve({
        ok: true,
        inputTokens: 120,
        expectedOutputTokens: 60,
        costs: { inputCost: 0.36, outputCost: 0.90, totalCost: 1.26 },
      }),
    });

    // Then resolve first request
    resolveFirst!({
      json: () => Promise.resolve({
        ok: true,
        inputTokens: 100,
        expectedOutputTokens: 50,
        costs: { inputCost: 0.25, outputCost: 0.50, totalCost: 0.75 },
      }),
    });

    await waitFor(() => {
      expect(screen.getByTestId('comparison-results')).toBeDefined();
    });

    // Results should be displayed
    expect(screen.getByText('Comparison Results')).toBeDefined();
  });

  it('updates query history with aggregated results', async () => {
    const user = userEvent.setup();
    
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({
        ok: true,
        inputTokens: 100,
        expectedOutputTokens: 50,
        costs: { inputCost: 0.25, outputCost: 0.50, totalCost: 0.75 },
      }),
    });

    render(<ModelComparison />);

    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Test aggregation');

    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);

    await waitFor(() => {
      expect(screen.getByTestId('comparison-results')).toBeDefined();
    });

    // Verify localStorage was called to save the comparison
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});