export default function NewsletterCard() {
    return (
      <div style={{ 
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e2e8f0", 
        borderRadius: 16, 
        padding: 20,
        boxShadow: "0 2px 4px rgba(30, 58, 138, 0.1)",
        minHeight: "140px",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ 
          fontWeight: 700, 
          color: "#0F172A", 
          fontSize: 17,
          marginBottom: 8
        }}>
          Get cost-saving tips
        </div>
        <div style={{ 
          fontSize: 14, 
          color: "#64748b", 
          lineHeight: 1.5,
          marginBottom: 16,
          flex: 1
        }}>
          Weekly insights on optimizing AI costs and token usage.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Enter your email"
            disabled
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              color: "#64748b",
              fontSize: 14,
              outline: "none"
            }}
          />
          <button
            disabled
            style={{
              padding: "12px 20px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
              color: "#94a3b8",
              cursor: "not-allowed",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap"
            }}
          >
            Join
          </button>
        </div>
      </div>
    );
  }