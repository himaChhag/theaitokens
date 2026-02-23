"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Provider } from "@/lib/catalog/types";
import { CATALOG, modelsByProvider } from "@/lib/catalog";
import { QueryHistoryCache } from "@/lib/cache/queryHistory";
import ModelSelector from "./ModelSelector";
import ComparisonResults from "./ComparisonResults";
import ComparisonSummary from "./ComparisonSummary";

export interface SelectedModel {
  id: string;
  provider: Provider;
  modelId: string;
  modelName: string;
  expectedOutputTokens: number;
}

export interface ComparisonResult {
  id: string;
  provider: Provider;
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
  countingMode?: string;
  confidenceNote?: string;
}

interface AggregatedResults {
  inputTokens: number;
  outputTokens: number;
  costs?: {
    inputCost: number;
    outputCost: number;
    totalCost: number;
  };
}

function aggregateResults(results: ComparisonResult[]): AggregatedResults {
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

export default function ModelComparison() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedModels, setSelectedModels] = useState<SelectedModel[]>([]);
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonId, setComparisonId] = useState<string | null>(null);

  // Load comparison from URL parameters
  useEffect(() => {
    const compId = searchParams.get('c');
    if (compId) {
      const comparison = QueryHistoryCache.getQueryById(compId);
      if (comparison && comparison.prompt) {
        setPrompt(comparison.prompt);
        setComparisonId(compId);
        
        // Try to load full comparison data from localStorage
        try {
          const savedData = localStorage.getItem(`comparison-${compId}`);
          if (savedData) {
            const comparisonData = JSON.parse(savedData);
            
            // Load models and results from saved data
            if (comparisonData.models) {
              setSelectedModels(comparisonData.models);
            }
            if (comparisonData.results) {
              setResults(comparisonData.results);
            }
          }
        } catch (error) {
          console.warn('Failed to load comparison data from localStorage:', error);
          
          // Fallback: try to load from QueryHistoryCache (legacy support)
          if ((comparison as any).models) {
            const models = (comparison as any).models as SelectedModel[];
            setSelectedModels(models);
            
            if ((comparison as any).results) {
              setResults((comparison as any).results);
            }
          }
        }
      }
    }
  }, [searchParams]);

  const canCompare = selectedModels.length >= 2 && selectedModels.length <= 5 && prompt.trim().length > 0;

  const addModel = () => {
    if (selectedModels.length >= 5) return;
    
    const newId = Date.now().toString();
    const defaultProvider: Provider = "openai";
    const defaultModel = modelsByProvider(defaultProvider)[0];
    
    if (defaultModel) {
      setSelectedModels([...selectedModels, {
        id: newId,
        provider: defaultProvider,
        modelId: defaultModel.id,
        modelName: defaultModel.name,
        expectedOutputTokens: 250,
      }]);
    }
  };

  const removeModel = (id: string) => {
    setSelectedModels(selectedModels.filter(model => model.id !== id));
  };

  const updateModel = (id: string, updates: Partial<SelectedModel>) => {
    setSelectedModels(selectedModels.map(model => 
      model.id === id ? { ...model, ...updates } : model
    ));
  };

  const startComparison = async () => {
    if (!canCompare) return;

    setIsComparing(true);
    
    // Save comparison to history
    const compId = QueryHistoryCache.addQuery({
      provider: 'comparison' as Provider,
      modelId: `${selectedModels.length}-models`,
      prompt,
      expectedOutputTokens: selectedModels[0]?.expectedOutputTokens || 250,
      isComparison: true,
      comparisonData: {
        models: selectedModels,
      },
    });
    setComparisonId(compId);

    // Update URL with comparison ID
    const url = new URL(window.location.href);
    url.searchParams.set('c', compId);
    router.replace(url.pathname + url.search, { scroll: false });

    // Initialize results with loading state
    const initialResults: ComparisonResult[] = selectedModels.map(model => ({
      id: model.id,
      provider: model.provider,
      modelId: model.modelId,
      modelName: model.modelName,
      status: 'loading',
    }));
    setResults(initialResults);

    // Start parallel API calls
    const promises = selectedModels.map(async (model) => {
      const startTime = Date.now();
      
      try {
        const response = await fetch('/api/estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: model.provider,
            modelId: model.modelId,
            prompt,
            expectedOutputTokens: model.expectedOutputTokens,
          }),
        });

        const data = await response.json();
        const responseTime = Date.now() - startTime;

        if (data.ok) {
          return {
            id: model.id,
            provider: model.provider,
            modelId: model.modelId,
            modelName: model.modelName,
            status: 'success' as const,
            inputTokens: data.inputTokens,
            outputTokens: data.expectedOutputTokens,
            costs: data.costs,
            responseTime,
            countingMode: data.countingMode,
            confidenceNote: data.confidenceNote,
          };
        } else {
          return {
            id: model.id,
            provider: model.provider,
            modelId: model.modelId,
            modelName: model.modelName,
            status: 'error' as const,
            error: data.error,
            responseTime,
          };
        }
      } catch (error: any) {
        const responseTime = Date.now() - startTime;
        return {
          id: model.id,
          provider: model.provider,
          modelId: model.modelId,
          modelName: model.modelName,
          status: 'error' as const,
          error: error.message || 'Network error',
          responseTime,
        };
      }
    });

    // Process results as they come in
    Promise.allSettled(promises).then((settledResults) => {
      const finalResults = settledResults.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          return {
            id: selectedModels[index].id,
            provider: selectedModels[index].provider,
            modelId: selectedModels[index].modelId,
            modelName: selectedModels[index].modelName,
            status: 'error' as const,
            error: 'Request failed',
          };
        }
      });

      setResults(finalResults);
      setIsComparing(false);

      // Update history with results
      const aggregated = aggregateResults(finalResults);
      QueryHistoryCache.updateQueryResult(compId, aggregated);

      // Also save the full comparison data
      const comparisonData = {
        models: selectedModels,
        results: finalResults,
      };
      
      // Store in localStorage with a special key for comparisons
      try {
        localStorage.setItem(`comparison-${compId}`, JSON.stringify(comparisonData));
      } catch (error) {
        console.warn('Failed to save comparison data:', error);
      }
    });

    // Update results in real-time as each promise resolves
    promises.forEach((promise, index) => {
      promise.then((result) => {
        setResults(prev => prev.map((r, i) => i === index ? result : r));
      });
    });
  };

  // Initialize with 2 models by default
  useEffect(() => {
    if (selectedModels.length === 0) {
      const openaiModel = modelsByProvider("openai")[0];
      const anthropicModel = modelsByProvider("anthropic")[0];
      
      if (openaiModel && anthropicModel) {
        setSelectedModels([
          {
            id: "1",
            provider: "openai",
            modelId: openaiModel.id,
            modelName: openaiModel.name,
            expectedOutputTokens: 250,
          },
          {
            id: "2",
            provider: "anthropic",
            modelId: anthropicModel.id,
            modelName: anthropicModel.name,
            expectedOutputTokens: 250,
          },
        ]);
      }
    }
  }, [selectedModels.length]);

  return (
    <div style={{ display: "grid", gap: 20 }}>
      {/* Model Selection */}
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid #e2e8f0",
          borderRadius: 18,
          padding: 20,
          boxShadow: "0 4px 6px rgba(30, 58, 138, 0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: 18, fontWeight: 600 }}>
          Select Models to Compare ({selectedModels.length}/5)
        </h3>
        
        <ModelSelector
          selectedModels={selectedModels}
          onAddModel={addModel}
          onRemoveModel={removeModel}
          onUpdateModel={updateModel}
        />

        {/* Prompt Input */}
        <div style={{ marginTop: 20 }}>
          <label style={{ display: "block", fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
            Prompt
          </label>
          <textarea
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt to compare across all selected models..."
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 14,
              border: "1px solid #e2e8f0",
              fontFamily: "inherit",
              fontSize: "14px",
              background: "white",
              color: "#0F172A",
              transition: "border-color 0.2s ease",
              resize: "vertical",
            }}
          />
        </div>

        {/* Compare Button */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button
            onClick={startComparison}
            disabled={!canCompare || isComparing}
            style={{
              padding: "12px 24px",
              borderRadius: 12,
              border: "none",
              background: !canCompare || isComparing
                ? "#e2e8f0"
                : "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
              color: !canCompare || isComparing ? "#94a3b8" : "#fff",
              cursor: !canCompare || isComparing ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontSize: "14px",
              transition: "all 0.2s ease",
              boxShadow: !canCompare || isComparing ? "none" : "0 2px 4px rgba(30, 58, 138, 0.2)",
            }}
          >
            {isComparing ? "Comparing Models..." : "Compare Models"}
          </button>
        </div>

        {selectedModels.length < 2 && (
          <div style={{ 
            marginTop: 12, 
            textAlign: "center", 
            fontSize: 12, 
            color: "#ef4444" 
          }}>
            Select at least 2 models to compare
          </div>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          <ComparisonResults results={results} />
          <ComparisonSummary results={results} />
        </>
      )}
    </div>
  );
}