"use client";

import { useEffect, useMemo, useState } from "react";
import type { Provider } from "@/lib/catalog/types";

type Props = {
  provider: Provider;
  modelId: string;
};

type Row = {
  label: string;
  inputTokens: number;
  expectedOutputTokens: number;
  ok: boolean;
  totalCost?: number;
  pricingReady?: boolean;
};

function formatUsd(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 6,
  }).format(n);
}

export default function ModelExampleCosts({ provider, modelId }: Props) {
  // We want "example costs for 1K/100K/1M tokens".
  // Your API computes inputTokens from `prompt`, and output from `expectedOutputTokens`.
  // We'll keep the prompt tiny and use expectedOutputTokens to drive the scale.
  const prompt = "Estimate cost example.";

  const scenarios = useMemo(
    () => [
      { label: "1K tokens", expectedOutputTokens: 1000 },
      { label: "10K tokens", expectedOutputTokens: 10_000 },
      { label: "100K tokens", expectedOutputTokens: 100_000 },
    ],
    []
  );

  const [rows, setRows] = useState<Row[]>(
    scenarios.map((s) => ({
      label: s.label,
      inputTokens: 0,
      expectedOutputTokens: s.expectedOutputTokens,
      ok: true,
    }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);

      const next: Row[] = [];
      for (const s of scenarios) {
        try {
          const res = await fetch("/api/estimate", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              provider,
              modelId,
              prompt,
              expectedOutputTokens: s.expectedOutputTokens,
            }),
          });

          const data = await res.json();

          if (!res.ok || !data?.ok) {
            next.push({
              label: s.label,
              inputTokens: 0,
              expectedOutputTokens: s.expectedOutputTokens,
              ok: false,
            });
            continue;
          }

          next.push({
            label: s.label,
            inputTokens: Number(data.inputTokens ?? 0),
            expectedOutputTokens: Number(
              data.expectedOutputTokens ?? s.expectedOutputTokens
            ),
            ok: true,
            pricingReady: Boolean(data.pricingReady),
            totalCost:
              typeof data?.costs?.totalCost === "number"
                ? data.costs.totalCost
                : undefined,
          });
        } catch {
          next.push({
            label: s.label,
            inputTokens: 0,
            expectedOutputTokens: s.expectedOutputTokens,
            ok: false,
          });
        }
      }

      if (!cancelled) {
        setRows(next);
        setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [provider, modelId, scenarios]);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 700,
          color: "#0F172A",
          marginBottom: 12,
        }}
      >
        Example Costs
      </h2>
      <p
        style={{
          marginTop: 0,
          color: "#64748b",
          fontSize: 15,
          lineHeight: 1.5,
          marginBottom: 16,
        }}
      >
        These are quick estimates using verified pricing bands (when available).
        Output tokens are the main driver here; use the calculator above for
        real prompt-based totals.
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        {rows.map((r) => {
          const right = loading
            ? "Calculating…"
            : r.ok && r.pricingReady && typeof r.totalCost === "number"
            ? formatUsd(r.totalCost)
            : r.ok && !r.pricingReady
            ? "Pricing not enabled"
            : "Use calculator above";

          return (
            <div
              key={r.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
                borderRadius: 8,
                background: "rgba(56, 189, 248, 0.05)",
                border: "1px solid rgba(56, 189, 248, 0.1)",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#0F172A",
                    fontSize: 15,
                  }}
                >
                  {r.label}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    color: "#64748b",
                    fontSize: 13,
                    lineHeight: 1.4,
                  }}
                >
                  expected output: {r.expectedOutputTokens.toLocaleString()}{" "}
                  tokens
                </div>
              </div>
              <div
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontWeight: 600,
                  color: "#1E3A8A",
                  fontSize: 14,
                }}
              >
                {right}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
