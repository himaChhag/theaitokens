import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export default function CostCalculatorPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>AI Cost Calculator</h1>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Estimate input/output token costs once pricing is verified and enabled.
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