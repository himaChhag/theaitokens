import Container from "./Container";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #eee", marginTop: 40, padding: "18px 0" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", fontSize: 12, opacity: 0.8 }}>
          <span>© {new Date().getFullYear()} theaitokens</span>
          <span style={{ display: "flex", gap: 12 }}>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/affiliate-disclosure">Affiliate Disclosure</a>
          </span>
        </div>
      </Container>
    </footer>
  );
}