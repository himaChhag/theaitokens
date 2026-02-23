import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export default function TokenCounterPage() {
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
            📝 Query History Notice
          </div>
          <div style={{ color: "#78350f", lineHeight: 1.4, fontSize: 13 }}>
            Your last 30 queries are automatically saved in your browser's local storage for easy access. 
            This data stays on your device and is not sent to any server. You can load previous queries using URL parameters or the history list below.
          </div>
        </div>

        <div style={{ padding: "0 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>AI Token Counter</h1>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Count tokens accurately with provider-native counters.
          </p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          <Estimator />
          <Sidebar />
        </div>
      </Container>
    </main>
  );
}