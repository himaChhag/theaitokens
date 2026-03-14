import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModelSelector from '../ModelSelector';
import type { SelectedModel } from '../ModelComparison';

// Mock the catalog
jest.mock('@/lib/catalog', () => ({
  modelsByProvider: jest.fn((provider: string) => {
    const mockModels = {
      openai: [
        { id: 'gpt-4o', name: 'GPT-4o' },
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
      ],
      anthropic: [
        { id: 'claude-sonnet', name: 'Claude Sonnet' },
        { id: 'claude-haiku', name: 'Claude Haiku' },
      ],
    };
    return mockModels[provider as keyof typeof mockModels] || [];
  }),
}));

describe('ModelSelector', () => {
  const mockProps = {
    selectedModels: [
      {
        id: '1',
        provider: 'openai' as const,
        modelId: 'gpt-4o',
        modelName: 'GPT-4o',
        expectedOutputTokens: 250,
      },
      {
        id: '2',
        provider: 'anthropic' as const,
        modelId: 'claude-sonnet',
        modelName: 'Claude Sonnet',
        expectedOutputTokens: 250,
      },
    ] as SelectedModel[],
    onAddModel: jest.fn(),
    onRemoveModel: jest.fn(),
    onUpdateModel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders selected models correctly', () => {
    render(<ModelSelector {...mockProps} />);
    
    expect(screen.getByDisplayValue('openai')).toBeDefined();
    expect(screen.getByDisplayValue('anthropic')).toBeDefined();
    expect(screen.getByDisplayValue('gpt-4o')).toBeDefined();
    expect(screen.getByDisplayValue('claude-sonnet')).toBeDefined();
  });

  it('shows add model button when less than 5 models', () => {
    render(<ModelSelector {...mockProps} />);
    
    expect(screen.getByText(/Add Model \(2\/5\)/)).toBeDefined();
  });

  it('hides add model button when 5 models selected', () => {
    const propsWithMaxModels = {
      ...mockProps,
      selectedModels: [
        ...mockProps.selectedModels,
        { id: '3', provider: 'google' as const, modelId: 'gemini-pro', modelName: 'Gemini Pro', expectedOutputTokens: 250 },
        { id: '4', provider: 'cohere' as const, modelId: 'command-r', modelName: 'Command R', expectedOutputTokens: 250 },
        { id: '5', provider: 'mistral' as const, modelId: 'mistral-large', modelName: 'Mistral Large', expectedOutputTokens: 250 },
      ],
    };
    
    render(<ModelSelector {...propsWithMaxModels} />);
    
    expect(screen.queryByText(/Add Model/)).toBeNull();
  });

  it('calls onAddModel when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<ModelSelector {...mockProps} />);
    
    const addButton = screen.getByText(/Add Model \(2\/5\)/);
    await user.click(addButton);
    
    expect(mockProps.onAddModel).toHaveBeenCalledTimes(1);
  });

  it('disables remove buttons when only 2 models', () => {
    render(<ModelSelector {...mockProps} />);
    
    const removeButtons = screen.getAllByText('×');
    removeButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('enables remove buttons when more than 2 models', () => {
    const propsWithThreeModels = {
      ...mockProps,
      selectedModels: [
        ...mockProps.selectedModels,
        { id: '3', provider: 'google' as const, modelId: 'gemini-pro', modelName: 'Gemini Pro', expectedOutputTokens: 250 },
      ],
    };
    
    render(<ModelSelector {...propsWithThreeModels} />);
    
    const removeButtons = screen.getAllByText('×');
    removeButtons.forEach(button => {
      expect(button).not.toBeDisabled();
    });
  });

  it('calls onRemoveModel when remove button is clicked', async () => {
    const user = userEvent.setup();
    const propsWithThreeModels = {
      ...mockProps,
      selectedModels: [
        ...mockProps.selectedModels,
        { id: '3', provider: 'google' as const, modelId: 'gemini-pro', modelName: 'Gemini Pro', expectedOutputTokens: 250 },
      ],
    };
    
    render(<ModelSelector {...propsWithThreeModels} />);
    
    const removeButtons = screen.getAllByText('×');
    await user.click(removeButtons[0]);
    
    expect(mockProps.onRemoveModel).toHaveBeenCalledWith('1');
  });

  it('calls onUpdateModel when provider is changed', async () => {
    const user = userEvent.setup();
    render(<ModelSelector {...mockProps} />);
    
    const providerSelect = screen.getAllByDisplayValue('openai')[0];
    await user.selectOptions(providerSelect, 'anthropic');
    
    expect(mockProps.onUpdateModel).toHaveBeenCalledWith('1', {
      provider: 'anthropic',
      modelId: 'claude-sonnet',
      modelName: 'Claude Sonnet',
    });
  });

  it('calls onUpdateModel when model is changed', async () => {
    const user = userEvent.setup();
    render(<ModelSelector {...mockProps} />);
    
    const modelSelect = screen.getByDisplayValue('gpt-4o');
    await user.selectOptions(modelSelect, 'gpt-4o-mini');
    
    expect(mockProps.onUpdateModel).toHaveBeenCalledWith('1', {
      modelId: 'gpt-4o-mini',
      modelName: 'GPT-4o Mini',
    });
  });

  it('calls onUpdateModel when output tokens are changed', async () => {
    const user = userEvent.setup();
    render(<ModelSelector {...mockProps} />);
    
    const tokenInputs = screen.getAllByDisplayValue('250');
    await user.clear(tokenInputs[0]);
    await user.type(tokenInputs[0], '500');
    
    expect(mockProps.onUpdateModel).toHaveBeenCalledWith('1', {
      expectedOutputTokens: 500,
    });
  });

  it('shows model numbers correctly', () => {
    render(<ModelSelector {...mockProps} />);
    
    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
  });

  it('shows provider labels', () => {
    render(<ModelSelector {...mockProps} />);
    
    const providerLabels = screen.getAllByText('Provider');
    expect(providerLabels).toHaveLength(2);
  });

  it('shows model labels', () => {
    render(<ModelSelector {...mockProps} />);
    
    const modelLabels = screen.getAllByText('Model');
    expect(modelLabels).toHaveLength(2);
  });

  it('shows output tokens labels', () => {
    render(<ModelSelector {...mockProps} />);
    
    const tokenLabels = screen.getAllByText('Output Tokens');
    expect(tokenLabels).toHaveLength(2);
  });
});