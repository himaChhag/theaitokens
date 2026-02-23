import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import QueryHistoryPage from "@/components/history/QueryHistoryPage";

export default function QueryHistoryPageRoute() {
  return (
    <main>
      <Container>
        {/* Disclaimer */}
        <div
          style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
            border: "1px solid #f59e0b",
            borderRadius: 12,
            padding: 16,
            marginTop: 22,
            marginBottom: 16,
          }}
        >
          <div style={{ fontWeight: 600, color: "#92400e", marginBottom: 6, fontSize: 14 }}>
            📝 Query History
          </div>
          <div style={{ color: "#78350f", lineHeight: 1.4, fontSize: 13 }}>
            Your query history is stored locally in your browser. This data stays on your device and is not sent to any server. 
            You can export, import, or clear your history from this page.
          </div>
        </div>

        <div style={{ padding: "0 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>Query History</h1>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            View, manage, and share your recent token counting and cost calculation queries.
          </p>
        </div>
        
        <div style={{ display: "grid", gap: 14 }}>
          <QueryHistoryPage />
          <Sidebar />
        </div>
      </Container>
    </main>
  );
}

export const metadata = {
  title: "Query History - AI Token Counter & Cost Calculator",
  description: "View and manage your recent AI token counting and cost calculation queries. Export, import, or share your query history.",
};