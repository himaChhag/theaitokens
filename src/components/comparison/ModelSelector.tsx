"use client";

import type { Provider } from "@/lib/catalog/types";
import { modelsByProvider } from "@/lib/catalog";
import type { SelectedModel } from "./ModelComparison";

interface ModelSelectorProps {
  selectedModels: SelectedModel[];
  onAddModel: () => void;
  onRemoveModel: (id: string) => void;
  onUpdateModel: (id: string, updates: Partial<SelectedModel>) => void;
}

export default function ModelSelector({
  selectedModels,
  onAddModel,
  onRemoveModel,
  onUpdateModel,
}: ModelSelectorProps) {
  const providers: Provider[] = [
    "openai",
    "anthropic",
    "google",
    "cohere",
    "mistral",
    "xai",
    "meta",
    "perplexity",
    "together",
  ];

  const handleProviderChange = (id: string, provider: Provider) => {
    const models = modelsByProvider(provider);
    const firstModel = models[0];
    
    if (firstModel) {
      onUpdateModel(id, {
        provider,
        modelId: firstModel.id,
        modelName: firstModel.name,
      });
    }
  };

  const handleModelChange = (id: string, modelId: string) => {
    const model = selectedModels.find(m => m.id === id);
    if (!model) return;
    
    const models = modelsByProvider(model.provider);
    const selectedModel = models.find(m => m.id === modelId);
    
    if (selectedModel) {
      onUpdateModel(id, {
        modelId: selectedModel.id,
        modelName: selectedModel.name,
      });
    }
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {selectedModels.map((model, index) => {
        const providerModels = modelsByProvider(model.provider);
        
        return (
          <div
            key={model.id}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto auto auto",
              gap: 12,
              alignItems: "center",
              padding: 16,
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
            }}
          >
            {/* Model Number */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {index + 1}
            </div>

            {/* Provider Selection */}
            <div style={{ minWidth: 120 }}>
              <label style={{ display: "block", fontSize: 11, opacity: 0.7, marginBottom: 4 }}>
                Provider
              </label>
              <select
                value={model.provider}
                onChange={(e) => handleProviderChange(model.id, e.target.value as Provider)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  background: "white",
                }}
              >
                {providers.map(provider => (
                  <option key={provider} value={provider}>
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Selection */}
            <div style={{ minWidth: 200 }}>
              <label style={{ display: "block", fontSize: 11, opacity: 0.7, marginBottom: 4 }}>
                Model
              </label>
              <select
                value={model.modelId}
                onChange={(e) => handleModelChange(model.id, e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  background: "white",
                }}
              >
                {providerModels.length === 0 ? (
                  <option value="">No models available</option>
                ) : (
                  providerModels.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Output Tokens */}
            <div style={{ minWidth: 100 }}>
              <label style={{ display: "block", fontSize: 11, opacity: 0.7, marginBottom: 4 }}>
                Output Tokens
              </label>
              <input
                type="number"
                min={1}
                max={4000}
                value={model.expectedOutputTokens}
                onChange={(e) => onUpdateModel(model.id, { 
                  expectedOutputTokens: Number(e.target.value) 
                })}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  background: "white",
                }}
              />
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemoveModel(model.id)}
              disabled={selectedModels.length <= 2}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1px solid #ef4444",
                background: selectedModels.length <= 2 ? "#f8fafc" : "white",
                color: selectedModels.length <= 2 ? "#94a3b8" : "#dc2626",
                cursor: selectedModels.length <= 2 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
              title={selectedModels.length <= 2 ? "Minimum 2 models required" : "Remove model"}
            >
              ×
            </button>
          </div>
        );
      })}

      {/* Add Model Button */}
      {selectedModels.length < 5 && (
        <button
          onClick={onAddModel}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "2px dashed #e2e8f0",
            background: "white",
            color: "#64748b",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "#3b82f6";
            e.currentTarget.style.color = "#3b82f6";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.color = "#64748b";
          }}
        >
          <span style={{ fontSize: 18 }}>+</span>
          Add Model ({selectedModels.length}/5)
        </button>
      )}
    </div>
  );
}