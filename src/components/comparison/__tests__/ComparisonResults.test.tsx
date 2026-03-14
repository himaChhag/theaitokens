import { render, screen } from '@testing-library/react';
import ComparisonResults from '../ComparisonResults';
import type { ComparisonResult } from '../ModelComparison';

// Mock window.innerWidth for mobile tests
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

// Mock URL.createObjectURL for export tests
global.URL.createObjectURL = jest.fn(() => 'mock-url');

describe('ComparisonResults', () => {
  const mockResults: ComparisonResult[] = [
    {
      id: '1',
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
      countingMode: 'exact',
      confidenceNote: 'High confidence',
    },
    {
      id: '2',
      provider: 'anthropic' as any,
      modelId: 'claude-sonnet',
      modelName: 'Claude Sonnet',
      status: 'success',
      inputTokens: 120,
      outputTokens: 60,
      costs: {
        inputCost: 0.36,
        outputCost: 0.90,
        totalCost: 1.26,
      },
      responseTime: 2000,
      countingMode: 'exact',
      confidenceNote: 'High confidence',
    },
    {
      id: '3',
      provider: 'google' as any,
      modelId: 'gemini-pro',
      modelName: 'Gemini Pro',
      status: 'error',
      error: 'API rate limit exceeded',
    },
    {
      id: '4',
      provider: 'openai' as any,
      modelId: 'gpt-4o-mini',
      modelName: 'GPT-4o Mini',
      status: 'loading',
    },
  ];

  it('renders all comparison results', () => {
    render(<ComparisonResults results={mockResults} />);
    
    // Each model name appears twice (desktop + mobile layout)
    expect(screen.getAllByText('GPT-4o')).toHaveLength(2);
    expect(screen.getAllByText('Claude Sonnet')).toHaveLength(2);
    expect(screen.getAllByText('Gemini Pro')).toHaveLength(2);
    expect(screen.getAllByText('GPT-4o Mini')).toHaveLength(2);
  });

  it('displays success results with all metrics', () => {
    render(<ComparisonResults results={mockResults} />);
    
    // Check token counts (appears in both layouts)
    expect(screen.getAllByText('100')).toHaveLength(2); // input tokens
    expect(screen.getAllByText('50')).toHaveLength(2); // output tokens
    
    // Check costs (formatted to 6 decimal places)
    expect(screen.getAllByText('$0.750000')).toHaveLength(2); // total cost
    
    // Check response time (in ms)
    expect(screen.getAllByText('success • 1500ms')).toHaveLength(2);
  });

  it('displays error results with error message', () => {
    render(<ComparisonResults results={mockResults} />);
    
    expect(screen.getAllByText('API rate limit exceeded')).toHaveLength(2);
  });

  it('displays loading state for pending results', () => {
    render(<ComparisonResults results={mockResults} />);
    
    expect(screen.getAllByText('Processing...')).toHaveLength(2);
  });

  it('shows provider badges', () => {
    render(<ComparisonResults results={mockResults} />);
    
    // Provider names are shown in uppercase in badges
    // We have 2 openai results (GPT-4o and GPT-4o Mini) × 2 layouts = 4
    expect(screen.getAllByText('openai')).toHaveLength(4);
    expect(screen.getAllByText('anthropic')).toHaveLength(2); // 1 result × 2 layouts
    expect(screen.getAllByText('google')).toHaveLength(2); // 1 result × 2 layouts
  });

  it('shows confidence indicators', () => {
    render(<ComparisonResults results={mockResults} />);
    
    // Confidence notes appear in both desktop and mobile layouts (2 results × 2 layouts = 4)
    expect(screen.getAllByText(/High confidence/)).toHaveLength(4);
  });

  it('displays counting mode information', () => {
    render(<ComparisonResults results={mockResults} />);
    
    // Mode information appears in both layouts (2 results × 2 layouts = 4)
    expect(screen.getAllByText('exact')).toHaveLength(4);
  });

  it('handles empty results array', () => {
    render(<ComparisonResults results={[]} />);
    
    // Component should render but with no result cards
    expect(screen.getByText('Comparison Results')).toBeDefined();
    expect(screen.queryByText('GPT-4o')).toBeNull();
  });

  it('formats costs correctly', () => {
    render(<ComparisonResults results={mockResults} />);
    
    // Check that costs are formatted to 6 decimal places (appears in both layouts)
    expect(screen.getAllByText('$0.250000')).toHaveLength(2); // input cost in both layouts
    expect(screen.getAllByText('$0.500000')).toHaveLength(2); // output cost in both layouts  
    expect(screen.getAllByText('$0.750000')).toHaveLength(2); // total cost in both layouts
  });

  it('shows status icons correctly', () => {
    render(<ComparisonResults results={mockResults} />);
    
    // Check for status icons (emojis) - appears in both layouts
    // Note: ⏳ appears both as status icon and in loading content, so 4 total
    expect(screen.getAllByText('✅')).toHaveLength(4); // 2 success results × 2 layouts
    expect(screen.getAllByText('❌')).toHaveLength(2); // 1 error result × 2 layouts
    expect(screen.getAllByText('⏳')).toHaveLength(4); // 1 loading result × 2 layouts + loading content
  });

  it('displays responsive layout classes', () => {
    render(<ComparisonResults results={mockResults} />);
    
    expect(screen.getByTestId('comparison-results')).toBeDefined();
    expect(document.querySelector('.desktop-results')).toBeDefined();
    expect(document.querySelector('.mobile-results')).toBeDefined();
  });
});