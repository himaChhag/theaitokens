import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComparisonSummary from '../ComparisonSummary';
import type { ComparisonResult } from '../ModelComparison';

// Mock URL.createObjectURL for export tests
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('ComparisonSummary', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up rendered components
    cleanup();
  });

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
      status: 'success',
      inputTokens: 80,
      outputTokens: 40,
      costs: {
        inputCost: 0.20,
        outputCost: 0.30,
        totalCost: 0.50,
      },
      responseTime: 1200,
      countingMode: 'estimate',
    },
  ];

  it('renders comparison summary with key insights', () => {
    render(<ComparisonSummary results={mockResults} />);
    
    expect(screen.getByText('Comparison Summary')).toBeDefined();
    expect(screen.getByText('Most Cost-Effective')).toBeDefined();
    expect(screen.getByText('Fastest Response')).toBeDefined();
    expect(screen.getByText('Highest Token Count')).toBeDefined();
  });

  it('identifies the cheapest model correctly', () => {
    render(<ComparisonSummary results={mockResults} />);
    
    // Gemini Pro appears 3 times: cost-effective insight, fastest insight, and table
    expect(screen.getAllByText('Gemini Pro')).toHaveLength(3);
    expect(screen.getByText('$0.500000')).toBeDefined();
  });

  it('identifies the fastest model correctly', () => {
    render(<ComparisonSummary results={mockResults} />);
    
    // Gemini Pro should be fastest at 1200ms
    expect(screen.getByText('1200ms')).toBeDefined();
  });

  it('shows detailed comparison table', () => {
    render(<ComparisonSummary results={mockResults} />);
    
    // Check table headers
    expect(screen.getByText('Model')).toBeDefined();
    expect(screen.getByText('Input Tokens')).toBeDefined();
    expect(screen.getByText('Output Tokens')).toBeDefined();
    expect(screen.getByText('Total Cost')).toBeDefined();
    expect(screen.getByText('Response Time')).toBeDefined();
    expect(screen.getByText('Mode')).toBeDefined();
    
    // Check model names in table
    expect(screen.getAllByText('GPT-4o')).toHaveLength(1);
    expect(screen.getAllByText('Claude Sonnet')).toHaveLength(2); // Once in insights, once in table
    expect(screen.getAllByText('Gemini Pro')).toHaveLength(3); // Cost insight, speed insight, and table
  });

  it('highlights best performers with icons', () => {
    render(<ComparisonSummary results={mockResults} />);
    
    // Should show trophy and lightning as part of text content (multiple instances)
    expect(screen.getAllByText(/🏆/)).toHaveLength(1);
    expect(screen.getAllByText(/⚡/)).toHaveLength(2); // Icon in insights and table
  });

  it('shows cost optimization insight', () => {
    render(<ComparisonSummary results={mockResults} />);
    
    expect(screen.getByText('💡 Cost Optimization Insight')).toBeDefined();
    expect(screen.getByText(/Choosing.*saves.*per request/)).toBeDefined();
  });

  it('handles export functionality', async () => {
    const user = userEvent.setup();
    
    // Mock document methods
    const mockCreateElement = jest.fn(() => ({
      href: '',
      download: '',
      click: jest.fn(),
    }));
    const mockAppendChild = jest.fn();
    const mockRemoveChild = jest.fn();
    
    document.createElement = mockCreateElement;
    document.body.appendChild = mockAppendChild;
    document.body.removeChild = mockRemoveChild;
    
    render(<ComparisonSummary results={mockResults} />);
    
    const exportButton = screen.getByText('📥 Export Results');
    await user.click(exportButton);
    
    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();
  });

  it('returns null for empty successful results', () => {
    const emptyResults: ComparisonResult[] = [
      {
        id: '1',
        provider: 'openai' as any,
        modelId: 'gpt-4o',
        modelName: 'GPT-4o',
        status: 'error',
        error: 'Failed to process',
      },
    ];
    
    const { container } = render(<ComparisonSummary results={emptyResults} />);
    expect(container.firstChild).toBeNull();
  });
});