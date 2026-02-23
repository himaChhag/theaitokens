import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Header() {
  return (
    <header style={{ 
      position: "sticky",
      top: 0,
      zIndex: 1000,
      borderBottom: "1px solid #e2e8f0",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)"
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
          <nav style={{ 
            display: "flex", 
            gap: "clamp(8px, 2vw, 20px)", 
            fontSize: 14, 
            fontWeight: 500,
            flexWrap: "wrap"
          }}>
            <Link 
              href="/compare"
              style={{ 
                padding: "8px 12px",
                borderRadius: 8,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
            >
              Compare
            </Link>
            <Link 
              href="/learn"
              style={{ 
                padding: "8px 12px",
                borderRadius: 8,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
            >
              Learn
            </Link>
            <Link 
              href="/tools/token-counter"
              style={{ 
                padding: "8px 12px",
                borderRadius: 8,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
            >
              Counter
            </Link>
            <Link 
              href="/tools/cost-calculator"
              style={{ 
                padding: "8px 12px",
                borderRadius: 8,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
            >
              Calculator
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}