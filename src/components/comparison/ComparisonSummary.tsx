"use client";

import type { ComparisonResult } from "./ModelComparison";

interface ComparisonSummaryProps {
  results: ComparisonResult[];
}

export default function ComparisonSummary({ results }: ComparisonSummaryProps) {
  const successfulResults = results.filter(r => r.status === 'success');
  
  if (successfulResults.length === 0) {
    return null;
  }

  // Find best performers
  const cheapest = successfulResults.reduce((min, current) => 
    (current.costs?.totalCost || Infinity) < (min.costs?.totalCost || Infinity) ? current : min
  );

  const fastest = successfulResults.reduce((min, current) => 
    (current.responseTime || Infinity) < (min.responseTime || Infinity) ? current : min
  );

  const mostTokens = successfulResults.reduce((max, current) => 
    (current.inputTokens || 0) > (max.inputTokens || 0) ? current : max
  );

  const exportResults = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      results: successfulResults.map(r => ({
        provider: r.provider,
        model: r.modelName,
        inputTokens: r.inputTokens,
        outputTokens: r.outputTokens,
        totalCost: r.costs?.totalCost,
        responseTime: r.responseTime,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `model-comparison-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        padding: 20,
        boxShadow: "0 4px 6px rgba(30, 58, 138, 0.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
          Comparison Summary
        </h3>
        <button
          onClick={exportResults}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #10b981",
            background: "white",
            color: "#059669",
            fontSize: 12,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          📥 Export Results
        </button>
      </div>

      {/* Key Insights */}
      <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {/* Cheapest */}
          {cheapest.costs && (
            <div style={{ 
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 12,
              padding: 16,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>💰</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Most Cost-Effective</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#059669" }}>
                {cheapest.modelName}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#047857" }}>
                ${cheapest.costs.totalCost.toFixed(6)}
              </div>
            </div>
          )}

          {/* Fastest */}
          {fastest.responseTime && (
            <div style={{ 
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: 12,
              padding: 16,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Fastest Response</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#2563eb" }}>
                {fastest.modelName}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1d4ed8" }}>
                {fastest.responseTime}ms
              </div>
            </div>
          )}

          {/* Most Accurate Tokenization */}
          <div style={{ 
            background: "#fef3c7",
            border: "1px solid #fde68a",
            borderRadius: 12,
            padding: 16,
            textAlign: "center"
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Highest Token Count</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#d97706" }}>
              {mostTokens.modelName}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#b45309" }}>
              {mostTokens.inputTokens?.toLocaleString()} tokens
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={{ padding: "12px 8px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                Model
              </th>
              <th style={{ padding: "12px 8px", textAlign: "right", borderBottom: "1px solid #e2e8f0" }}>
                Input Tokens
              </th>
              <th style={{ padding: "12px 8px", textAlign: "right", borderBottom: "1px solid #e2e8f0" }}>
                Output Tokens
              </th>
              <th style={{ padding: "12px 8px", textAlign: "right", borderBottom: "1px solid #e2e8f0" }}>
                Total Cost
              </th>
              <th style={{ padding: "12px 8px", textAlign: "right", borderBottom: "1px solid #e2e8f0" }}>
                Response Time
              </th>
              <th style={{ padding: "12px 8px", textAlign: "center", borderBottom: "1px solid #e2e8f0" }}>
                Mode
              </th>
            </tr>
          </thead>
          <tbody>
            {successfulResults
              .sort((a, b) => (a.costs?.totalCost || 0) - (b.costs?.totalCost || 0))
              .map((result, index) => (
                <tr key={result.id} style={{ 
                  background: index % 2 === 0 ? "white" : "#f8fafc",
                  borderBottom: "1px solid #f1f5f9"
                }}>
                  <td style={{ padding: "12px 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ 
                        fontSize: 10, 
                        fontWeight: 600, 
                        background: "#f1f5f9", 
                        padding: "2px 6px", 
                        borderRadius: 4,
                        textTransform: "uppercase"
                      }}>
                        {result.provider}
                      </span>
                      <span style={{ fontWeight: 500 }}>{result.modelName}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "right", fontWeight: 600 }}>
                    {result.inputTokens?.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "right", fontWeight: 600 }}>
                    {result.outputTokens?.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "right", fontWeight: 600 }}>
                    {result.costs ? (
                      <span style={{ 
                        color: result.id === cheapest.id ? "#059669" : "inherit",
                        fontWeight: result.id === cheapest.id ? 700 : 600
                      }}>
                        ${result.costs.totalCost.toFixed(6)}
                        {result.id === cheapest.id && " 🏆"}
                      </span>
                    ) : (
                      <span style={{ opacity: 0.5 }}>N/A</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "right", fontWeight: 600 }}>
                    {result.responseTime ? (
                      <span style={{ 
                        color: result.id === fastest.id ? "#2563eb" : "inherit",
                        fontWeight: result.id === fastest.id ? 700 : 600
                      }}>
                        {result.responseTime}ms
                        {result.id === fastest.id && " ⚡"}
                      </span>
                    ) : (
                      <span style={{ opacity: 0.5 }}>N/A</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 8px", textAlign: "center" }}>
                    <span style={{ 
                      fontSize: 10,
                      background: result.countingMode === 'exact' ? "#dcfce7" : "#fef3c7",
                      color: result.countingMode === 'exact' ? "#166534" : "#92400e",
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontWeight: 500
                    }}>
                      {result.countingMode || 'estimate'}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Cost Savings Insight */}
      {successfulResults.length > 1 && cheapest.costs && (
        <div style={{ 
          marginTop: 20,
          padding: 16,
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 12
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#059669", marginBottom: 8 }}>
            💡 Cost Optimization Insight
          </div>
          <div style={{ fontSize: 12, color: "#047857", lineHeight: 1.5 }}>
            {(() => {
              const mostExpensive = successfulResults.reduce((max, current) => 
                (current.costs?.totalCost || 0) > (max.costs?.totalCost || 0) ? current : max
              );
              const savings = ((mostExpensive.costs?.totalCost || 0) - (cheapest.costs?.totalCost || 0));
              const savingsPercent = mostExpensive.costs?.totalCost ? 
                ((savings / mostExpensive.costs.totalCost) * 100).toFixed(1) : 0;
              
              return `Choosing ${cheapest.modelName} over ${mostExpensive.modelName} saves $${savings.toFixed(6)} (${savingsPercent}%) per request.`;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}