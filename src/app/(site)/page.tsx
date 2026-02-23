import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export default function Home() {
  return (
    <main style={{ 
      minHeight: "calc(100vh - 140px)",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
    }}>
      <Container>
        <div style={{ 
          padding: "40px 0 20px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <h1 style={{ 
            fontSize: 48, 
            margin: 0, 
            letterSpacing: -0.8,
            background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 800,
            lineHeight: 1.1
          }}>
            Token Counter & Cost Estimator
          </h1>
          <p style={{ 
            marginTop: 16, 
            maxWidth: 760, 
            margin: "16px auto 0",
            color: "#64748b", 
            lineHeight: 1.6,
            fontSize: 18,
            fontWeight: 500
          }}>
            Uses provider-native token counters and only verified pricing. Models remain disabled until pricing is confirmed.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 20,
            alignItems: "start",
            maxWidth: "1000px",
            margin: "0 auto"
          }}
        >
          <div style={{ display: "grid", gap: 20 }}>
            <Estimator />
          </div>

          {/* Sidebar shows under content on mobile; you can change to 2 columns in Part 2 */}
          <div style={{ marginTop: 10 }}>
            <Sidebar />
          </div>
        </div>
      </Container>
    </main>
  );
}