import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearchParams, useRouter } from 'next/navigation';
import ModelComparison from '../ModelComparison';
import { QueryHistoryCache } from '@/lib/cache/queryHistory';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock the child components
jest.mock('../ModelSelector', () => {
  return function MockModelSelector({ selectedModels, onAddModel, onRemoveModel }: any) {
    return (
      <div data-testid="model-selector">
        <div data-testid="selected-models-count">{selectedModels.length}</div>
        <button onClick={onAddModel} data-testid="add-model">Add Model</button>
        {selectedModels.map((model: any) => (
          <div key={model.id} data-testid={`model-${model.id}`}>
            <span>{model.modelName}</span>
            <button onClick={() => onRemoveModel(model.id)} data-testid={`remove-${model.id}`}>
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('../ComparisonResults', () => {
  return function MockComparisonResults({ results }: any) {
    return (
      <div data-testid="comparison-results">
        {results.map((result: any) => (
          <div key={result.id} data-testid={`result-${result.id}`}>
            {result.status}: {result.modelName}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('../ComparisonSummary', () => {
  return function MockComparisonSummary({ results }: any) {
    return <div data-testid="comparison-summary">Summary for {results.length} results</div>;
  };
});

// Mock the QueryHistoryCache
jest.mock('@/lib/cache/queryHistory', () => ({
  QueryHistoryCache: {
    addQuery: jest.fn(),
    updateQueryResult: jest.fn(),
    getQueryById: jest.fn(),
  },
}));

// Mock the catalog
jest.mock('@/lib/catalog', () => ({
  modelsByProvider: jest.fn((provider: string) => {
    const mockModels = {
      openai: [{ id: 'gpt-4o', name: 'GPT-4o' }],
      anthropic: [{ id: 'claude-sonnet', name: 'Claude Sonnet' }],
      google: [{ id: 'gemini-pro', name: 'Gemini Pro' }],
    };
    return mockModels[provider as keyof typeof mockModels] || [];
  }),
}));

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ModelComparison', () => {
  const mockRouter = {
    replace: jest.fn(),
  };

  const mockSearchParams = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    mockSearchParams.get.mockReturnValue(null);
    (QueryHistoryCache.addQuery as jest.Mock).mockReturnValue('test-comparison-id');
  });

  it('renders with initial state', () => {
    render(<ModelComparison />);
    
    expect(screen.getByText('Select Models to Compare (2/5)')).toBeDefined();
    expect(screen.getByPlaceholderText(/Enter your prompt to compare/)).toBeDefined();
    expect(screen.getByText('Compare Models')).toBeDefined();
  });

  it('initializes with 2 default models', () => {
    render(<ModelComparison />);
    
    const modelsCount = screen.getByTestId('selected-models-count');
    expect(modelsCount.textContent).toBe('2');
    expect(screen.getByTestId('model-1')).toBeDefined();
    expect(screen.getByTestId('model-2')).toBeDefined();
  });

  it('allows adding models up to 5', async () => {
    const user = userEvent.setup();
    render(<ModelComparison />);
    
    const addButton = screen.getByTestId('add-model');
    
    // Add 3 more models (already have 2)
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);
    
    const modelsCount = screen.getByTestId('selected-models-count');
    expect(modelsCount.textContent).toBe('5');
  });

  it('allows removing models', async () => {
    const user = userEvent.setup();
    render(<ModelComparison />);
    
    const removeButton = screen.getByTestId('remove-1');
    await user.click(removeButton);
    
    const modelsCount = screen.getByTestId('selected-models-count');
    expect(modelsCount.textContent).toBe('1');
    expect(screen.queryByTestId('model-1')).toBeNull();
  });

  it('disables compare button when less than 2 models', async () => {
    const user = userEvent.setup();
    render(<ModelComparison />);
    
    // Remove one model to have only 1
    const removeButton = screen.getByTestId('remove-1');
    await user.click(removeButton);
    
    const compareButton = screen.getByText('Compare Models');
    expect(compareButton).toBeDisabled();
    expect(screen.getByText('Select at least 2 models to compare')).toBeDefined();
  });

  it('disables compare button when prompt is empty', () => {
    render(<ModelComparison />);
    
    const compareButton = screen.getByText('Compare Models');
    expect(compareButton).toBeDisabled();
  });

  it('enables compare button when conditions are met', async () => {
    const user = userEvent.setup();
    render(<ModelComparison />);
    
    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Test prompt');
    
    const compareButton = screen.getByText('Compare Models');
    expect(compareButton).not.toBeDisabled();
  });

  it('starts comparison when compare button is clicked', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({
        ok: true,
        inputTokens: 100,
        expectedOutputTokens: 50,
        costs: { inputCost: 0.25, outputCost: 0.50, totalCost: 0.75 },
        countingMode: 'exact',
        confidenceNote: 'High confidence',
      }),
    });

    render(<ModelComparison />);
    
    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Test prompt');
    
    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);
    
    expect(screen.getByText('Comparing Models...')).toBeDefined();
    expect(QueryHistoryCache.addQuery).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledTimes(2); // 2 models
  });

  it('displays results after comparison', async () => {
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
    await user.type(promptInput, 'Test prompt');
    
    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('comparison-results')).toBeDefined();
      expect(screen.getByTestId('comparison-summary')).toBeDefined();
    });
  });

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({
        ok: false,
        error: 'API Error',
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
  });

  it('handles network errors gracefully', async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<ModelComparison />);
    
    const promptInput = screen.getByPlaceholderText(/Enter your prompt to compare/);
    await user.type(promptInput, 'Test prompt');
    
    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('comparison-results')).toBeDefined();
    });
  });

  it('loads comparison from URL parameters', () => {
    mockSearchParams.get.mockReturnValue('test-comparison-id');
    
    (QueryHistoryCache.getQueryById as jest.Mock).mockReturnValue({
      prompt: 'Loaded prompt',
    });

    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue(JSON.stringify({
        models: [
          { id: '1', provider: 'openai', modelId: 'gpt-4o', modelName: 'GPT-4o', expectedOutputTokens: 250 }
        ],
        results: [
          { id: '1', status: 'success', modelName: 'GPT-4o', inputTokens: 100 }
        ]
      })),
    };
    
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    render(<ModelComparison />);
    
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('comparison-test-comparison-id');
  });

  it('saves comparison data to localStorage', async () => {
    const user = userEvent.setup();
    const mockLocalStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
    };
    
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

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
    await user.type(promptInput, 'Test prompt');
    
    const compareButton = screen.getByText('Compare Models');
    await user.click(compareButton);
    
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'comparison-test-comparison-id',
        expect.stringContaining('models')
      );
    });
  });
});