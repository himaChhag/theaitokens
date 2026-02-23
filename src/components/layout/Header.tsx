"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid #e2e8f0",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
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
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/logo.svg"
              alt="The AI Tokens"
              width={180}
              height={48}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link
              href="/compare"
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
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
                whiteSpace: "nowrap",
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
                whiteSpace: "nowrap",
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
                whiteSpace: "nowrap",
              }}
            >
              Calculator
            </Link>
            <Link
              href="/tools/model-comparison"
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              Compare Models
            </Link>
            <Link
              href="/tools/query-history"
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              History
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={styles.mobileMenuButton}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className={styles.mobileMenu}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderBottom: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 999,
            }}
          >
            <nav style={{ padding: "16px 0" }}>
              <Link
                href="/compare"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: "1px solid #f1f5f9",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8fafc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Compare Models
              </Link>
              <Link
                href="/learn"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: "1px solid #f1f5f9",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8fafc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Learn
              </Link>
              <Link
                href="/tools/token-counter"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: "1px solid #f1f5f9",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8fafc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Token Counter
              </Link>
              <Link
                href="/tools/cost-calculator"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: "1px solid #f1f5f9",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8fafc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Cost Calculator
              </Link>
              <Link
                href="/tools/model-comparison"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: "1px solid #f1f5f9",
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8fafc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Model Comparison
              </Link>
              <Link
                href="/tools/query-history"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 500,
                  transition: "background-color 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8fafc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Query History
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
