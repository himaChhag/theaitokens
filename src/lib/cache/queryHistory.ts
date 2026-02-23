export interface QueryHistoryItem {
  id: string;
  timestamp: number;
  provider: string;
  modelId: string;
  prompt: string;
  expectedOutputTokens: number;
  result?: {
    inputTokens: number;
    outputTokens: number;
    costs?: {
      inputCost: number;
      outputCost: number;
      totalCost: number;
    };
  };
  // For model comparisons
  isComparison?: boolean;
  comparisonData?: {
    models: Array<{
      id: string;
      provider: string;
      modelId: string;
      modelName: string;
      expectedOutputTokens: number;
    }>;
    results?: Array<{
      id: string;
      provider: string;
      modelId: string;
      modelName: string;
      status: 'loading' | 'success' | 'error';
      inputTokens?: number;
      outputTokens?: number;
      costs?: {
        inputCost: number;
        outputCost: number;
        totalCost: number;
      };
      responseTime?: number;
      error?: string;
    }>;
  };
}

const MAX_HISTORY_ITEMS = 30;
const STORAGE_KEY = 'ai-estimator-query-history';

export class QueryHistoryCache {
  static getHistory(): QueryHistoryItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const items: QueryHistoryItem[] = JSON.parse(stored);
      return items.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.warn('Failed to load query history:', error);
      return [];
    }
  }

  static addQuery(query: Omit<QueryHistoryItem, 'id' | 'timestamp'>): string {
    if (typeof window === 'undefined') return '';
    
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const newItem: QueryHistoryItem = {
      ...query,
      id,
      timestamp: Date.now(),
    };

    try {
      const history = this.getHistory();
      const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
      
      // Dispatch custom event to notify components
      window.dispatchEvent(new CustomEvent('queryHistoryUpdated'));
      
      return id;
    } catch (error) {
      console.warn('Failed to save query to history:', error);
      return id;
    }
  }

  static updateQueryResult(id: string, result: QueryHistoryItem['result']): void {
    if (typeof window === 'undefined') return;
    
    try {
      const history = this.getHistory();
      const itemIndex = history.findIndex(item => item.id === id);
      
      if (itemIndex !== -1) {
        history[itemIndex].result = result;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        
        // Dispatch custom event to notify components
        window.dispatchEvent(new CustomEvent('queryHistoryUpdated'));
      }
    } catch (error) {
      console.warn('Failed to update query result:', error);
    }
  }

  static getQueryById(id: string): QueryHistoryItem | null {
    const history = this.getHistory();
    return history.find(item => item.id === id) || null;
  }

  static clearHistory(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(STORAGE_KEY);
      
      // Dispatch custom event to notify components
      window.dispatchEvent(new CustomEvent('queryHistoryUpdated'));
    } catch (error) {
      console.warn('Failed to clear query history:', error);
    }
  }

  static exportHistory(): string {
    const history = this.getHistory();
    return JSON.stringify(history, null, 2);
  }

  static importHistory(jsonData: string): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const items: QueryHistoryItem[] = JSON.parse(jsonData);
      
      // Validate the structure
      if (!Array.isArray(items)) return false;
      
      const validItems = items.filter(item => 
        item.id && 
        item.timestamp && 
        item.provider && 
        item.modelId && 
        item.prompt
      ).slice(0, MAX_HISTORY_ITEMS);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validItems));
      return true;
    } catch (error) {
      console.warn('Failed to import query history:', error);
      return false;
    }
  }
}