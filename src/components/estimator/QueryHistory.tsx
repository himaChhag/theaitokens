"use client";

import { useEffect, useState } from "react";
import { QueryHistoryCache, type QueryHistoryItem } from "@/lib/cache/queryHistory";

interface QueryHistoryProps {
  onLoadQuery: (query: QueryHistoryItem) => void;
  currentQueryId?: string | null;
  minimizedByDefault?: boolean;
}

export default function QueryHistory({ onLoadQuery, currentQueryId, minimizedByDefault = false }: QueryHistoryProps) {
  const [history, setHistory] = useState<QueryHistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(!minimizedByDefault);
  const [currentPage, setCurrentPage] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setHistory(QueryHistoryCache.getHistory());
  }, [refreshTrigger]);

  // Listen for storage changes to auto-refresh
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshTrigger(prev => prev + 1);
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when queries are added
    window.addEventListener('queryHistoryUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('queryHistoryUpdated', handleStorageChange);
    };
  }, []);

  const refreshHistory = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all query history?')) {
      QueryHistoryCache.clearHistory();
      setHistory([]);
      setCurrentPage(0);
    }
  };

  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = history.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const truncatePrompt = (prompt: string, maxLength: number = 80) => {
    if (prompt.length <= maxLength) return prompt;
    return prompt.substring(0, maxLength) + '...';
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        padding: 20,
        boxShadow: "0 4px 6px rgba(30, 58, 138, 0.1)",
        marginTop: 14,
      }}
    >
      {/* Header - Always visible */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isExpanded ? 12 : 0 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
          Recent Queries ({history.length}/30)
        </h3>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={refreshHistory}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #10b981",
              background: "white",
              color: "#059669",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              background: "white",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {isExpanded ? 'Minimize' : 'Expand'}
          </button>
          <button
            onClick={clearHistory}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #ef4444",
              background: "white",
              color: "#dc2626",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Content - Only visible when expanded */}
      {isExpanded && (
        <>
          {/* Disclaimer */}
          <div
            style={{
              background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
              border: "1px solid #f59e0b",
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
              fontSize: 12,
            }}
          >
            <div style={{ fontWeight: 600, color: "#92400e", marginBottom: 4 }}>
              📝 Local Storage Notice
            </div>
            <div style={{ color: "#78350f", lineHeight: 1.4 }}>
              Query history is stored locally in your browser. Data is not sent to any server and will be lost if you clear browser data.
            </div>
          </div>

          {/* Query List */}
          <div style={{ display: "grid", gap: 8 }}>
            {currentPageItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: currentQueryId === item.id ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 12,
                  background: currentQueryId === item.id ? "#eff6ff" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => onLoadQuery(item)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ 
                      fontSize: 11, 
                      fontWeight: 600, 
                      background: "#f1f5f9", 
                      padding: "2px 6px", 
                      borderRadius: 4,
                      textTransform: "uppercase"
                    }}>
                      {item.provider}
                    </span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>
                      {item.modelId}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>
                
                <div style={{ 
                  fontSize: 13, 
                  color: "#475569", 
                  lineHeight: 1.4,
                  marginBottom: 8,
                }}>
                  {truncatePrompt(item.prompt)}
                </div>

                {item.result && (
                  <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#64748b" }}>
                    <span>Input: {item.result.inputTokens} tokens</span>
                    <span>Output: {item.result.outputTokens} tokens</span>
                    {item.result.costs && (
                      <span>Cost: ${item.result.costs.totalCost}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              gap: 8, 
              marginTop: 16,
              padding: "12px 0"
            }}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #e2e8f0",
                  background: currentPage === 0 ? "#f8fafc" : "white",
                  color: currentPage === 0 ? "#94a3b8" : "#64748b",
                  fontSize: 12,
                  cursor: currentPage === 0 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>
              
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "1px solid #e2e8f0",
                      background: currentPage === i ? "#3b82f6" : "white",
                      color: currentPage === i ? "white" : "#64748b",
                      fontSize: 12,
                      cursor: "pointer",
                      minWidth: 32,
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #e2e8f0",
                  background: currentPage === totalPages - 1 ? "#f8fafc" : "white",
                  color: currentPage === totalPages - 1 ? "#94a3b8" : "#64748b",
                  fontSize: 12,
                  cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
              
              <div style={{ 
                fontSize: 11, 
                color: "#94a3b8", 
                marginLeft: 12 
              }}>
                Page {currentPage + 1} of {totalPages}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}