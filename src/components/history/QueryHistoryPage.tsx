"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QueryHistoryCache, type QueryHistoryItem } from "@/lib/cache/queryHistory";

export default function QueryHistoryPage() {
  const [history, setHistory] = useState<QueryHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProvider, setFilterProvider] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "provider">("newest");
  const router = useRouter();

  useEffect(() => {
    setHistory(QueryHistoryCache.getHistory());
  }, []);

  const refreshHistory = () => {
    setHistory(QueryHistoryCache.getHistory());
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all query history? This action cannot be undone.')) {
      QueryHistoryCache.clearHistory();
      setHistory([]);
    }
  };

  const exportHistory = () => {
    const data = QueryHistoryCache.exportHistory();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-query-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importHistory = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = e.target?.result as string;
            const success = QueryHistoryCache.importHistory(data);
            if (success) {
              refreshHistory();
              alert('History imported successfully!');
            } else {
              alert('Failed to import history. Please check the file format.');
            }
          } catch (error) {
            alert('Failed to import history. Invalid file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatRelativeTime = (timestamp: number) => {
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

  const getUniqueProviders = () => {
    const providers = [...new Set(history.map(item => item.provider))];
    return providers.sort();
  };

  const filteredAndSortedHistory = () => {
    let filtered = history;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.modelId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by provider
    if (filterProvider !== "all") {
      filtered = filtered.filter(item => item.provider === filterProvider);
    }

    // Sort
    switch (sortBy) {
      case "oldest":
        return filtered.sort((a, b) => a.timestamp - b.timestamp);
      case "provider":
        return filtered.sort((a, b) => a.provider.localeCompare(b.provider));
      case "newest":
      default:
        return filtered.sort((a, b) => b.timestamp - a.timestamp);
    }
  };

  const loadQuery = (query: QueryHistoryItem) => {
    // Navigate to token counter with query parameter
    router.push(`/tools/token-counter?q=${query.id}`);
  };

  const shareQuery = (query: QueryHistoryItem) => {
    const url = `${window.location.origin}/tools/token-counter?q=${query.id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Query URL copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Query URL copied to clipboard!');
    });
  };

  const deleteQuery = (queryId: string) => {
    if (confirm('Are you sure you want to delete this query?')) {
      const updatedHistory = history.filter(item => item.id !== queryId);
      localStorage.setItem('ai-estimator-query-history', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    }
  };

  const displayedHistory = filteredAndSortedHistory();

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
      {/* Controls */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 14,
              }}
            />
          </div>
          
          <select
            value={filterProvider}
            onChange={(e) => setFilterProvider(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 14,
              minWidth: 120,
            }}
          >
            <option value="all">All Providers</option>
            {getUniqueProviders().map(provider => (
              <option key={provider} value={provider}>
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 14,
              minWidth: 120,
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="provider">By Provider</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={refreshHistory}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              background: "white",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            🔄 Refresh
          </button>
          
          <button
            onClick={exportHistory}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #10b981",
              background: "white",
              color: "#059669",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            📥 Export
          </button>
          
          <button
            onClick={importHistory}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #3b82f6",
              background: "white",
              color: "#2563eb",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            📤 Import
          </button>
          
          <button
            onClick={clearHistory}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #ef4444",
              background: "white",
              color: "#dc2626",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ 
        display: "flex", 
        gap: 16, 
        marginBottom: 20, 
        padding: 12, 
        background: "#f8fafc", 
        borderRadius: 8,
        fontSize: 12,
        color: "#64748b"
      }}>
        <span>Total Queries: <strong>{history.length}</strong></span>
        <span>Showing: <strong>{displayedHistory.length}</strong></span>
        <span>Storage: <strong>{history.length}/30</strong></span>
      </div>

      {/* Query List */}
      {displayedHistory.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: 40, 
          color: "#64748b",
          fontSize: 14 
        }}>
          {history.length === 0 ? (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
              <div>No queries found. Start by using the Token Counter or Cost Calculator!</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div>No queries match your search criteria.</div>
            </>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {displayedHistory.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 16,
                background: "white",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}>
                  <span style={{ 
                    fontSize: 11, 
                    fontWeight: 600, 
                    background: "#f1f5f9", 
                    padding: "4px 8px", 
                    borderRadius: 6,
                    textTransform: "uppercase"
                  }}>
                    {item.provider}
                  </span>
                  <span style={{ fontSize: 13, color: "#64748b" }}>
                    {item.modelId}
                  </span>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
                
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => loadQuery(item)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "1px solid #3b82f6",
                      background: "white",
                      color: "#2563eb",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    Load
                  </button>
                  <button
                    onClick={() => shareQuery(item)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "1px solid #10b981",
                      background: "white",
                      color: "#059669",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    Share
                  </button>
                  <button
                    onClick={() => deleteQuery(item.id)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "1px solid #ef4444",
                      background: "white",
                      color: "#dc2626",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div style={{ 
                fontSize: 14, 
                color: "#475569", 
                lineHeight: 1.5,
                marginBottom: 12,
                background: "#f8fafc",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #f1f5f9"
              }}>
                {item.prompt}
              </div>

              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#64748b", flexWrap: "wrap" }}>
                <span>Expected Output: <strong>{item.expectedOutputTokens} tokens</strong></span>
                {item.result && (
                  <>
                    <span>Input: <strong>{item.result.inputTokens} tokens</strong></span>
                    <span>Output: <strong>{item.result.outputTokens} tokens</strong></span>
                    {item.result.costs && (
                      <span>Total Cost: <strong>${item.result.costs.totalCost}</strong></span>
                    )}
                  </>
                )}
                <span>Created: <strong>{formatTimestamp(item.timestamp)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}