export default function SponsorCard() {
    // Placeholder slot (toggle later)
    return (
      <div style={{ 
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e2e8f0", 
        borderRadius: 16, 
        padding: 18,
        boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
      }}>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8, fontWeight: 600 }}>Sponsored</div>
        <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 16 }}>Sponsored spot</div>
        <div style={{ marginTop: 8, fontSize: 14, color: "#64748b", lineHeight: 1.4 }}>
          Reserved space for a relevant dev tool or API sponsor.
        </div>
        <button
          disabled
          style={{
            marginTop: 12,
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "none",
            background: "#e2e8f0",
            color: "#94a3b8",
            cursor: "not-allowed",
            fontWeight: 600,
            fontSize: 14
          }}
        >
          Coming soon
        </button>
      </div>
    );
  }