import Container from "./Container";

export default function Footer() {
  return (
    <footer style={{ 
      borderTop: "1px solid #e2e8f0", 
      marginTop: 60, 
      padding: "24px 0",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
    }}>
      <Container>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          gap: 12, 
          flexWrap: "wrap", 
          fontSize: 13, 
          color: "#64748b",
          fontWeight: 500
        }}>
          <span>© {new Date().getFullYear()} theaitokens</span>
          <span style={{ display: "flex", gap: 16 }}>
            <a href="/privacy" style={{ color: "#64748b", transition: "color 0.2s ease" }}>Privacy</a>
            <a href="/terms" style={{ color: "#64748b", transition: "color 0.2s ease" }}>Terms</a>
            <a href="/contact" style={{ color: "#64748b", transition: "color 0.2s ease" }}>Contact</a>
          </span>
        </div>
      </Container>
    </footer>
  );
}