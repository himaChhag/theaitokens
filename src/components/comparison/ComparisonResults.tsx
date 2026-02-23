"use client";

import type { ComparisonResult } from "./ModelComparison";

interface ComparisonResultsProps {
  results: ComparisonResult[];
}

export default function ComparisonResults({ results }: ComparisonResultsProps) {
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
      <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>
        Comparison Results
      </h3>

      {/* Desktop Layout */}
      <div 
        style={{ 
          display: "none",
          gridTemplateColumns: `repeat(${results.length}, 1fr)`,
          gap: 16,
        }}
        className="desktop-results"
      >
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>

      {/* Mobile Layout */}
      <div 
        style={{ 
          display: "grid",
          gap: 16,
        }}
        className="mobile-results"
      >
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-results {
            display: grid !important;
          }
          .mobile-results {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function ResultCard({ result }: { result: ComparisonResult }) {
  const getStatusColor = () => {
    switch (result.status) {
      case 'loading': return '#3b82f6';
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case 'loading': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '⚪';
    }
  };

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: 16,
        minHeight: 200,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 16 }}>{getStatusIcon()}</span>
          <span style={{ 
            fontSize: 11, 
            fontWeight: 600, 
            background: "#f1f5f9", 
            padding: "2px 6px", 
            borderRadius: 4,
            textTransform: "uppercase"
          }}>
            {result.provider}
          </span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
          {result.modelName}
        </div>
        <div style={{ 
          fontSize: 11, 
          color: getStatusColor(),
          fontWeight: 500,
          textTransform: "capitalize"
        }}>
          {result.status}
          {result.responseTime && ` • ${result.responseTime}ms`}
        </div>
      </div>

      {/* Content */}
      {result.status === 'loading' && (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          height: 100,
          color: "#64748b",
          fontSize: 14
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
            <div>Processing...</div>
          </div>
        </div>
      )}

      {result.status === 'error' && (
        <div style={{ 
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 8,
          padding: 12,
          color: "#dc2626",
          fontSize: 12
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Error</div>
          <div>{result.error}</div>
        </div>
      )}

      {result.status === 'success' && (
        <div style={{ display: "grid", gap: 12 }}>
          {/* Token Counts */}
          <div style={{ display: "grid", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>Input Tokens</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{result.inputTokens?.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>Output Tokens</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{result.outputTokens?.toLocaleString()}</div>
            </div>
          </div>

          {/* Costs */}
          {result.costs && (
            <div style={{ 
              background: "#f0f9ff",
              border: "1px solid #bae6fd",
              borderRadius: 8,
              padding: 12
            }}>
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, opacity: 0.7 }}>Input Cost</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>${result.costs.inputCost.toFixed(6)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, opacity: 0.7 }}>Output Cost</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>${result.costs.outputCost.toFixed(6)}</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  borderTop: "1px solid #bae6fd",
                  paddingTop: 6,
                  marginTop: 6
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Total Cost</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1e40af" }}>
                    ${result.costs.totalCost.toFixed(6)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          {result.countingMode && (
            <div style={{ fontSize: 11, opacity: 0.7 }}>
              Mode: <strong>{result.countingMode}</strong>
            </div>
          )}

          {result.confidenceNote && (
            <div style={{ 
              fontSize: 10,
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              borderRadius: 6,
              padding: 8,
              color: "#1e40af"
            }}>
              <strong>Note:</strong> {result.confidenceNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}