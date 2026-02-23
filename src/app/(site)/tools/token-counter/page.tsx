import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export default function TokenCounterPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
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