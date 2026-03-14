import { QueryHistoryCache } from '../queryHistory';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.dispatchEvent
const mockDispatchEvent = jest.fn();
Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
});

describe('QueryHistoryCache', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('addQuery', () => {
    it('adds a new query and returns an ID', () => {
      const query = {
        provider: 'openai',
        modelId: 'gpt-4o',
        prompt: 'Test prompt',
        expectedOutputTokens: 250,
      };

      const id = QueryHistoryCache.addQuery(query);

      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'ai-estimator-query-history',
        expect.stringContaining(id)
      );
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'queryHistoryUpdated' })
      );
    });

    it('stores query with timestamp', () => {
      const query = {
        provider: 'openai',
        modelId: 'gpt-4o',
        prompt: 'Test prompt',
        expectedOutputTokens: 250,
      };

      const beforeTime = Date.now();
      QueryHistoryCache.addQuery(query);
      const afterTime = Date.now();

      const setItemCall = localStorageMock.setItem.mock.calls[0];
      const storedData = JSON.parse(setItemCall[1]);
      
      expect(storedData[0].timestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(storedData[0].timestamp).toBeLessThanOrEqual(afterTime);
    });

    it('maintains query history order (newest first)', () => {
      // Add first query
      localStorageMock.getItem.mockReturnValue('[]');
      QueryHistoryCache.addQuery({
        provider: 'openai',
        modelId: 'gpt-4o',
        prompt: 'First query',
        expectedOutputTokens: 250,
      });

      // Mock existing history for second query
      const firstCall = localStorageMock.setItem.mock.calls[0];
      localStorageMock.getItem.mockReturnValue(firstCall[1]);

      // Add second query
      QueryHistoryCache.addQuery({
        provider: 'anthropic',
        modelId: 'claude-sonnet',
        prompt: 'Second query',
        expectedOutputTokens: 300,
      });

      const secondCall = localStorageMock.setItem.mock.calls[1];
      const storedData = JSON.parse(secondCall[1]);

      expect(storedData[0].prompt).toBe('Second query'); // Newest first
      expect(storedData[1].prompt).toBe('First query');
    });

    it('limits history to maximum entries', () => {
      // Create 30 existing queries (at the limit)
      const existingQueries = Array.from({ length: 30 }, (_, i) => ({
        id: `id-${i}`,
        timestamp: Date.now() - i * 1000,
        provider: 'openai',
        modelId: 'gpt-4o',
        prompt: `Query ${i}`,
        expectedOutputTokens: 250,
      }));

      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingQueries));

      // Add a new query
      QueryHistoryCache.addQuery({
        provider: 'openai',
        modelId: 'gpt-4o',
        prompt: 'New query',
        expectedOutputTokens: 250,
      });

      const setItemCall = localStorageMock.setItem.mock.calls[0];
      const storedData = JSON.parse(setItemCall[1]);

      expect(storedData).toHaveLength(30); // Should not exceed max
      expect(storedData[0].prompt).toBe('New query'); // New entry at top
    });
  });

  describe('getQueryById', () => {
    it('returns query by ID', () => {
      const queries = [
        {
          id: 'test-id',
          timestamp: Date.now(),
          provider: 'openai',
          modelId: 'gpt-4o',
          prompt: 'Test query',
          expectedOutputTokens: 250,
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(queries));

      const result = QueryHistoryCache.getQueryById('test-id');

      expect(result).toEqual(queries[0]);
    });

    it('returns null for non-existent ID', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      const result = QueryHistoryCache.getQueryById('non-existent');

      expect(result).toBeNull();
    });

    it('handles corrupted localStorage data', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = QueryHistoryCache.getQueryById('test-id');

      expect(result).toBeNull();
    });
  });

  describe('getHistory', () => {
    it('returns all queries in chronological order', () => {
      const queries = [
        {
          id: 'id-1',
          timestamp: 1000,
          provider: 'openai',
          modelId: 'gpt-4o',
          prompt: 'Older query',
          expectedOutputTokens: 250,
        },
        {
          id: 'id-2',
          timestamp: 2000,
          provider: 'anthropic',
          modelId: 'claude-sonnet',
          prompt: 'Newer query',
          expectedOutputTokens: 300,
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(queries));

      const result = QueryHistoryCache.getHistory();

      expect(result).toHaveLength(2);
      expect(result[0].timestamp).toBeGreaterThan(result[1].timestamp);
    });

    it('returns empty array when no history exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = QueryHistoryCache.getHistory();

      expect(result).toEqual([]);
    });

    it('handles corrupted localStorage data gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = QueryHistoryCache.getHistory();

      expect(result).toEqual([]);
    });
  });

  describe('updateQueryResult', () => {
    it('updates existing query with results', () => {
      const queries = [
        {
          id: 'test-id',
          timestamp: Date.now(),
          provider: 'openai',
          modelId: 'gpt-4o',
          prompt: 'Test query',
          expectedOutputTokens: 250,
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(queries));

      const resultData = {
        inputTokens: 100,
        outputTokens: 50,
        costs: {
          inputCost: 0.25,
          outputCost: 0.50,
          totalCost: 0.75,
        },
      };

      QueryHistoryCache.updateQueryResult('test-id', resultData);

      const setItemCall = localStorageMock.setItem.mock.calls[0];
      const storedData = JSON.parse(setItemCall[1]);
      const updatedQuery = storedData[0];

      expect(updatedQuery.result.inputTokens).toBe(100);
      expect(updatedQuery.result.outputTokens).toBe(50);
      expect(updatedQuery.result.costs).toEqual(resultData.costs);
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'queryHistoryUpdated' })
      );
    });

    it('does nothing for non-existent query ID', () => {
      localStorageMock.getItem.mockReturnValue('[]');

      QueryHistoryCache.updateQueryResult('non-existent', {
        inputTokens: 100,
        outputTokens: 50,
      });

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('handles partial result updates', () => {
      const queries = [
        {
          id: 'test-id',
          timestamp: Date.now(),
          provider: 'openai',
          modelId: 'gpt-4o',
          prompt: 'Test query',
          expectedOutputTokens: 250,
          result: {
            inputTokens: 50,
            outputTokens: 25,
          },
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(queries));

      const newResult = {
        inputTokens: 50,
        outputTokens: 75,
        costs: {
          inputCost: 0.125,
          outputCost: 0.375,
          totalCost: 0.50,
        },
      };

      QueryHistoryCache.updateQueryResult('test-id', newResult);

      const setItemCall = localStorageMock.setItem.mock.calls[0];
      const storedData = JSON.parse(setItemCall[1]);
      const updatedQuery = storedData[0];

      expect(updatedQuery.result.inputTokens).toBe(50); // Updated
      expect(updatedQuery.result.outputTokens).toBe(75); // Updated
      expect(updatedQuery.result.costs).toEqual(newResult.costs); // Added
    });
  });

  describe('clearHistory', () => {
    it('removes all queries from history', () => {
      QueryHistoryCache.clearHistory();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('ai-estimator-query-history');
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'queryHistoryUpdated' })
      );
    });
  });

  describe('exportHistory', () => {
    it('exports history as JSON string', () => {
      const queries = [
        {
          id: 'test-id',
          timestamp: Date.now(),
          provider: 'openai',
          modelId: 'gpt-4o',
          prompt: 'Test query',
          expectedOutputTokens: 250,
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(queries));

      const result = QueryHistoryCache.exportHistory();

      expect(typeof result).toBe('string');
      expect(JSON.parse(result)).toEqual(queries);
    });
  });

  describe('importHistory', () => {
    it('imports valid history data', () => {
      const historyData = [
        {
          id: 'imported-id',
          timestamp: Date.now(),
          provider: 'openai',
          modelId: 'gpt-4o',
          prompt: 'Imported query',
          expectedOutputTokens: 250,
        },
      ];

      const result = QueryHistoryCache.importHistory(JSON.stringify(historyData));

      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'ai-estimator-query-history',
        JSON.stringify(historyData)
      );
    });

    it('rejects invalid JSON data', () => {
      const result = QueryHistoryCache.importHistory('invalid json');

      expect(result).toBe(false);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('filters out invalid items', () => {
      const mixedData = [
        {
          id: 'valid-id',
          timestamp: Date.now(),
          provider: 'openai',
          modelId: 'gpt-4o',
          prompt: 'Valid query',
          expectedOutputTokens: 250,
        },
        {
          // Missing required fields
          id: 'invalid-id',
        },
      ];

      const result = QueryHistoryCache.importHistory(JSON.stringify(mixedData));

      expect(result).toBe(true);
      const setItemCall = localStorageMock.setItem.mock.calls[0];
      const storedData = JSON.parse(setItemCall[1]);
      
      expect(storedData).toHaveLength(1);
      expect(storedData[0].id).toBe('valid-id');
    });
  });
});