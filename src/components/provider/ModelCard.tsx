"use client";

import Link from "next/link";
import type { ModelEntry } from "@/lib/catalog/types";

type Props = {
  model: ModelEntry;
  provider: string;
};

const card = {
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
  transition: "all 0.2s ease",
  cursor: "pointer",
  height: "100%"
};

export default function ModelCard({ model, provider }: Props) {
  // Use user-friendly route names for canonical URLs
  const routeProvider = provider === 'anthropic' ? 'claude' : provider;
  
  return (
    <Link
      href={`/${routeProvider}/${model.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit"
      }}
    >
      <div 
        style={card}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(30, 58, 138, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(30, 58, 138, 0.1)";
        }}
      >
        <h3 style={{
          marginTop: 0,
          marginBottom: 12,
          fontSize: 20,
          fontWeight: 700,
          color: "#1E3A8A"
        }}>
          {model.name}
        </h3>
        <p style={{
          color: "#64748b",
          fontSize: 14,
          lineHeight: 1.5,
          marginBottom: 16
        }}>
          {model.description || `Pricing and token information for ${model.name}`}
        </p>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 16,
          borderTop: "1px solid #e2e8f0"
        }}>
          <div>
            <div style={{
              fontSize: 12,
              color: "#64748b",
              marginBottom: 4
            }}>
              Starting from
            </div>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#1E3A8A",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
            }}>
              {model.pricingBands?.[0]?.inputPer1M 
                ? `$${model.pricingBands[0].inputPer1M}/1M tokens`
                : "See pricing"
              }
            </div>
          </div>
          <div style={{
            padding: "6px 12px",
            background: "rgba(56, 189, 248, 0.1)",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 500,
            color: "#1E3A8A"
          }}>
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
}