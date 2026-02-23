import Link from "next/link";
import type { ModelEntry, PricingBand } from "@/lib/catalog/types";
import ModelExampleCosts from "./ModelExampleCosts";
import Script from "next/script";

type Props = {
  model: ModelEntry;
};

const card: React.CSSProperties = {
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 16px",
  borderBottom: "2px solid #38BDF8",
  fontWeight: 700,
  whiteSpace: "nowrap",
  background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
  color: "white",
  fontSize: "14px",
};

const td: React.CSSProperties = {
  padding: "12px 16px",
  borderBottom: "1px solid #e2e8f0",
  verticalAlign: "top",
  fontSize: "14px",
};

function moneyPer1M(n: number) {
  // n is already USD per 1,000,000 tokens
  return `${n.toFixed(2)}`;
}

function bandLabel(b: PricingBand) {
  return typeof b.maxInputTokens === "number"
    ? `≤ ${b.maxInputTokens.toLocaleString()} input tokens`
    : "All usage";
}

function PricingBandsTable({ bands }: { bands?: PricingBand[] }) {
  if (!bands || bands.length === 0) {
    return (
      <p style={{ marginTop: 10, opacity: 0.8 }}>
        Pricing bands are not available for this model yet. See the official
        pricing link above.
      </p>
    );
  }

  const hasCached = bands.some((b) => typeof b.cachedInputPer1M === "number");

  return (
    <div style={{ overflowX: "auto", marginTop: 12 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Tier</th>
            <th style={th}>Input (USD / 1M)</th>
            <th style={th}>Output (USD / 1M)</th>
            {hasCached ? <th style={th}>Cached input (USD / 1M)</th> : null}
          </tr>
        </thead>
        <tbody>
          {bands.map((b, i) => (
            <tr key={i}>
              <td style={td}>{bandLabel(b)}</td>
              <td
                style={{
                  ...td,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                {moneyPer1M(b.inputPer1M)}
              </td>
              <td
                style={{
                  ...td,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}
              >
                {moneyPer1M(b.outputPer1M)}
              </td>
              {hasCached ? (
                <td
                  style={{
                    ...td,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  {typeof b.cachedInputPer1M === "number"
                    ? moneyPer1M(b.cachedInputPer1M)
                    : "—"}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ModelSeoBody({ model }: Props) {
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: model.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "API",
    url: `https://theaitokens.com/${model.provider}/${model.slug}`,
  };

  const price = model.pricingBands?.[0]?.inputPer1M;
  if (price != null) {
    jsonLd.offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      price,
      availability: "https://schema.org/InStock",
    };
  }

  return (
    <section style={{ 
      marginTop: 28, 
      display: "grid", 
      gap: 24, 
      maxWidth: 980,
      margin: "28px auto 0 auto",
      padding: "0 20px"
    }}>
      {/* 1. MOST IMPORTANT: Pricing Breakdown */}
      <div style={card}>
        <h2 style={{ 
          marginTop: 0, 
          color: "#0F172A",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 12
        }}>
          Pricing Breakdown
        </h2>
        <p style={{ 
          marginTop: 0, 
          color: "#64748b",
          fontSize: 15,
          lineHeight: 1.5
        }}>
          Official pricing source:{" "}
          <a 
            href={model.officialSourceUrl} 
            target="_blank" 
            rel="noreferrer"
            style={{
              color: "#1E3A8A",
              fontWeight: 600,
              textDecoration: "underline",
              textDecorationColor: "#38BDF8"
            }}
          >
            verified
          </a>{" "}
          (last checked {model.lastVerified})
        </p>

        <PricingBandsTable bands={model.pricingBands} />
      </div>

      {/* 2. Example Costs - Practical pricing examples */}
      <ModelExampleCosts provider={model.provider} modelId={model.id} />

      {/* 3. Frequently Asked Questions - Common user queries */}
      <div style={card}>
        <h2 style={{ 
          marginTop: 0, 
          color: "#0F172A",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 20
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
            <div style={{
              padding: 16,
              background: "rgba(56, 189, 248, 0.05)",
              borderRadius: 8,
              border: "1px solid rgba(56, 189, 248, 0.1)"
            }}>
              <strong style={{ color: "#1E3A8A", fontSize: 16 }}>How much does {model.name} cost?</strong>
              <p style={{ 
                margin: "8px 0 0 0",
                color: "#64748b",
                fontSize: 14,
                lineHeight: 1.5
              }}>
              {model.pricingBands?.[0]?.inputPer1M != null
                  ? `${model.name} pricing starts around ${model.pricingBands[0].inputPer1M} per 1M input tokens. See the official pricing source above for the latest updates.`
                  : `Pricing depends on provider and usage tier. Refer to the official pricing source above.`}
              </p>
            </div>
            <div style={{
              padding: 16,
              background: "rgba(56, 189, 248, 0.03)",
              borderRadius: 8,
              border: "1px solid rgba(56, 189, 248, 0.08)"
            }}>
              <strong style={{ color: "#0F172A", fontSize: 16 }}>What is {model.name} best for?</strong>
              <p style={{ 
                margin: "8px 0 0 0",
                color: "#64748b",
                fontSize: 14,
                lineHeight: 1.5
              }}>
              {model.name} is typically used for reasoning tasks, document analysis, structured output, and production API workloads.
              </p>
            </div>

            <div style={{
              padding: 16,
              background: "rgba(56, 189, 248, 0.02)",
              borderRadius: 8,
              border: "1px solid rgba(56, 189, 248, 0.06)"
            }}>
              <strong style={{ color: "#64748b", fontSize: 16 }}>Where can I find the official pricing for {model.name}?</strong>
              <p style={{ 
                margin: "8px 0 0 0",
                color: "#64748b",
                fontSize: 14,
                lineHeight: 1.5
              }}>
              Use the "Official pricing source" link at the top of this page for the provider's most up-to-date pricing.
              </p>
            </div>
        </div>
      </div>

      {/* 4. When to Use - Helps users understand if this model fits their needs */}
      <div style={card}>
        <h2 style={{ 
          marginTop: 0, 
          color: "#0F172A",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 16
        }}>
          When to Use {model.name}
        </h2>
        <div style={{ display: "grid", gap: 12 }}>
          {[
            { icon: "🧠", title: "Complex reasoning tasks", desc: "Multi-step problem solving and logical analysis" },
            { icon: "📄", title: "Long document analysis", desc: "Processing large texts, reports, and research papers" },
            { icon: "⚙️", title: "Production-grade structured output", desc: "JSON, XML, and formatted data generation" },
            { icon: "💻", title: "High-quality code generation", desc: "Writing, debugging, and explaining code" }
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 12,
              padding: 12,
              background: "rgba(56, 189, 248, 0.05)",
              borderRadius: 8,
              border: "1px solid rgba(56, 189, 248, 0.1)"
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: "#0F172A", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#64748b" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Context Window - Technical specification users need */}
      <div style={card}>
        <h2 style={{ 
          marginTop: 0, 
          color: "#0F172A",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 12
        }}>
          Context Window
        </h2>
        <div style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          border: "1px solid #38BDF8",
          borderRadius: 12,
          padding: 16,
          marginBottom: 12
        }}>
          <p style={{ 
            margin: 0,
            color: "#0F172A",
            fontSize: 15,
            lineHeight: 1.5
          }}>
            <strong style={{ color: "#1E3A8A" }}>{model.name}</strong> supports a maximum context size of{" "}
            <strong style={{ 
              color: "#1E3A8A",
              background: "rgba(56, 189, 248, 0.1)",
              padding: "2px 6px",
              borderRadius: 4
            }}>
              {(model as any).contextWindow ? `${String((model as any).contextWindow)} tokens` : "See official docs for context limits"}
            </strong>.
          </p>
        </div>
        <p style={{ 
          color: "#64748b",
          fontSize: 14,
          lineHeight: 1.5,
          margin: 0
        }}>
          This includes both input and output tokens combined. If your total tokens exceed this limit, the API may truncate input or return an error.
        </p>
      </div>

      {/* 6. Cost Optimization - Helps users save money */}
      <div style={card}>
        <h2 style={{ 
          marginTop: 0, 
          color: "#0F172A",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 16
        }}>
          How to Reduce API Costs
        </h2>
        <div style={{ display: "grid", gap: 12 }}>
          {[
            { icon: "🎯", title: "Limit maximum output tokens", desc: "Set reasonable max_tokens to avoid unnecessary costs" },
            { icon: "✂️", title: "Trim unnecessary system prompts", desc: "Remove verbose instructions and examples" },
            { icon: "📊", title: "Use smaller models for simple tasks", desc: "Choose the right model size for your use case" },
            { icon: "💾", title: "Cache responses when possible", desc: "Store and reuse responses for repeated queries" }
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 12,
              padding: 12,
              background: "rgba(56, 189, 248, 0.05)",
              borderRadius: 8,
              border: "1px solid rgba(56, 189, 248, 0.1)"
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: "#0F172A", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#64748b" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Words to Tokens - Practical conversion info */}
      <div style={card}>
        <h2 style={{ 
          marginTop: 0, 
          color: "#0F172A",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 16
        }}>
          Words to Tokens Conversion
        </h2>
        <div style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          border: "1px solid #38BDF8",
          borderRadius: 12,
          padding: 16,
          marginBottom: 12
        }}>
          <p style={{ 
            margin: 0,
            color: "#0F172A",
            fontSize: 16,
            fontWeight: 600,
            textAlign: "center"
          }}>
            <strong style={{ color: "#1E3A8A" }}>1,000 tokens ≈ 750–800 English words</strong>
          </p>
        </div>
        <p style={{ 
          color: "#64748b",
          fontSize: 14,
          lineHeight: 1.5,
          margin: 0,
          textAlign: "center"
        }}>
          Use the token counter above for exact model-specific calculation. Different languages and formats may vary.
        </p>
      </div>

      {/* 8. Related Resources - Tools and learning materials */}
      <div style={card}>
        <h2 style={{ 
          marginTop: 0, 
          color: "#0F172A",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 16
        }}>
          Related Resources
        </h2>
        <div style={{ display: "grid", gap: 12, marginTop: 0 }}>
          <div style={{
            padding: 16,
            background: "rgba(56, 189, 248, 0.05)",
            borderRadius: 8,
            border: "1px solid rgba(56, 189, 248, 0.1)"
          }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 16, fontWeight: 600, color: "#1E3A8A" }}>Tools</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href="/tools/cost-calculator" style={{ 
                padding: "6px 12px", 
                background: "white", 
                borderRadius: 6, 
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid #e2e8f0"
              }}>
                AI Cost Calculator
              </Link>
              <Link href="/tools/token-counter" style={{ 
                padding: "6px 12px", 
                background: "white", 
                borderRadius: 6, 
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid #e2e8f0"
              }}>
                Token Counter
              </Link>
            </div>
          </div>
          
          <div style={{
            padding: 16,
            background: "rgba(56, 189, 248, 0.03)",
            borderRadius: 8,
            border: "1px solid rgba(56, 189, 248, 0.08)"
          }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 16, fontWeight: 600, color: "#0F172A" }}>Learn</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href="/learn/what-is-a-token-in-ai" style={{ 
                padding: "6px 12px", 
                background: "white", 
                borderRadius: 6, 
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid #e2e8f0"
              }}>
                What is a token in AI?
              </Link>
              <Link href="/learn/how-ai-token-pricing-works" style={{ 
                padding: "6px 12px", 
                background: "white", 
                borderRadius: 6, 
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid #e2e8f0"
              }}>
                How AI token pricing works
              </Link>
            </div>
          </div>

          <div style={{
            padding: 16,
            background: "rgba(56, 189, 248, 0.02)",
            borderRadius: 8,
            border: "1px solid rgba(56, 189, 248, 0.06)"
          }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 16, fontWeight: 600, color: "#64748b" }}>Compare</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href="/compare/gpt-4o-vs-claude-sonnet" style={{ 
                padding: "6px 12px", 
                background: "white", 
                borderRadius: 6, 
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid #e2e8f0"
              }}>
                Compare GPT vs Claude
              </Link>
              <Link href="/compare/gpt-4o-vs-gemini-pro" style={{ 
                padding: "6px 12px", 
                background: "white", 
                borderRadius: 6, 
                fontSize: 14,
                fontWeight: 500,
                border: "1px solid #e2e8f0"
              }}>
                Compare GPT vs Gemini
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 9. Performance & Latency - Technical details */}
      <div style={card}>
        <h2 style={{ 
          marginTop: 0, 
          color: "#0F172A",
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 12
        }}>
          Performance & Latency
        </h2>
        <p style={{ 
          color: "#64748b",
          fontSize: 15,
          lineHeight: 1.5,
          margin: 0
        }}>
          {model.name} is optimized for high-quality output. For lower latency workloads, consider
          smaller or "flash" variants where available.
        </p>
      </div>

      <Script
        id={`schema-softwareapp-${model.provider}-${model.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Script
        id={`schema-faq-${model.provider}-${model.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                "@type": "Question",
                name: `How much does ${model.name} cost?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                    model.pricingBands?.[0]?.inputPer1M != null
                        ? `${model.name} pricing starts around ${model.pricingBands[0].inputPer1M} per 1M input tokens (check official source for latest).`
                        : `Pricing for ${model.name} depends on the provider and usage tier. Refer to the official pricing source on this page.`,
                },
                },
                {
                "@type": "Question",
                name: `What is ${model.name} best for?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                    `${model.name} is typically used for tasks like reasoning, document analysis, and code generation, depending on the provider's capabilities and limits.`,
                },
                },
                {
                "@type": "Question",
                name: `Where can I find the official pricing for ${model.name}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Use the "Official pricing source" link on this page for the provider's most up-to-date pricing.`,
                },
                },
            ],
            }),
        }}
      />
    </section>
  );
}