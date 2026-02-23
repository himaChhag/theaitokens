export default function UpgradeCard() {
    return (
      <div style={{ 
        background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
        border: "1px solid #38BDF8", 
        borderRadius: 16, 
        padding: 20,
        boxShadow: "0 4px 8px rgba(30, 58, 138, 0.25)",
        minHeight: "140px",
        display: "flex",
        flexDirection: "column",
        color: "white"
      }}>
        <div style={{ 
          fontWeight: 700, 
          fontSize: 17, 
          color: "white",
          marginBottom: 8
        }}>
          Pro (coming soon)
        </div>
        <ul style={{ 
          margin: 0, 
          paddingLeft: 20, 
          fontSize: 14, 
          color: "rgba(255, 255, 255, 0.95)",
          lineHeight: 1.6,
          flex: 1,
          listStyleType: "disc"
        }}>
          <li style={{ marginBottom: 4 }}>Compare multiple models at once</li>
          <li style={{ marginBottom: 4 }}>Batch estimate prompts</li>
          <li style={{ marginBottom: 4 }}>Saved prompts & share links</li>
        </ul>
        <div style={{ 
          marginTop: 12,
          padding: "8px 12px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: 8,
          textAlign: "center",
          fontSize: 13,
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.9)"
        }}>
          Early access coming Q2 2026
        </div>
      </div>
    );
  }