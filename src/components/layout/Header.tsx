import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Header() {
  return (
    <header style={{ 
      borderBottom: "1px solid #e2e8f0",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
    }}>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              src="/logo.svg"
              alt="The AI Tokens"
              width={180}
              height={48}
              priority
            />
          </Link>

          {/* Navigation */}
          <nav style={{ display: "flex", gap: 20, fontSize: 14, fontWeight: 500 }}>
            <Link 
              href="/compare"
              style={{ 
                padding: "8px 16px",
                borderRadius: 8,
                transition: "all 0.2s ease",
              }}
            >
              Compare
            </Link>
            <Link 
              href="/tools/token-counter"
              style={{ 
                padding: "8px 16px",
                borderRadius: 8,
                transition: "all 0.2s ease",
              }}
            >
              Token Counter
            </Link>
            <Link 
              href="/tools/cost-calculator"
              style={{ 
                padding: "8px 16px",
                borderRadius: 8,
                transition: "all 0.2s ease",
              }}
            >
              Cost Calculator
            </Link>
            <Link 
              href="/learn/what-is-a-token"
              style={{ 
                padding: "8px 16px",
                borderRadius: 8,
                transition: "all 0.2s ease",
              }}
            >
              Learn
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}