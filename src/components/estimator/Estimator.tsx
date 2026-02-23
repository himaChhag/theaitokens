"use client";

import { useEffect, useMemo, useState } from "react";
import type { Provider } from "@/lib/catalog/types";
import { CATALOG, modelsByProvider } from "@/lib/catalog";

type ApiOk = {
  ok: true;
  provider: Provider;
  modelId: string;
  modelName: string;
  slug: string;
  inputTokens: number;
  expectedOutputTokens: number;
  pricing: { officialSourceUrl: string; lastVerified: string };
  countingMode: "exact" | "near-exact" | "estimate";
  confidenceNote: string | null;
  pricingReady: boolean;
  pricingBand: any | null;
  costs: { inputCost: number; outputCost: number; totalCost: number } | null;
};

type ApiErr = { ok: false; error: string };

export default function Estimator(props: {
  defaultProvider?: Provider;
  defaultModelId?: string;
}) {
  const providers: Provider[] = [
    "openai",
    "anthropic",
    "google",
    "cohere",
    "mistral",
    "xai",
    "meta",
    "perplexity",
    "together",
  ];

  const [provider, setProvider] = useState<Provider>(
    props.defaultProvider ?? "openai"
  );

  const providerModels = useMemo(() => modelsByProvider(provider), [provider]);

  const [modelId, setModelId] = useState<string>(
    props.defaultModelId ?? providerModels[0]?.id ?? ""
  );
  const [prompt, setPrompt] = useState("");
  const [expectedOutputTokens, setExpectedOutputTokens] = useState(250);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<ApiOk | ApiErr | null>(null);

  useEffect(() => {
    const first = modelsByProvider(provider)[0];
    setModelId(
      props.defaultModelId &&
        CATALOG.some(
          (m) => m.provider === provider && m.id === props.defaultModelId
        )
        ? props.defaultModelId
        : first?.id ?? ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const canRun = modelId && prompt.trim().length > 0;

  async function estimate() {
    setLoading(true);
    setRes(null);

    // Try multiple endpoints in order
    const endpoints = ["/api/estimate", "/api/simple-estimate", "/api/debug"];

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);

        const r = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider,
            modelId,
            prompt,
            expectedOutputTokens,
          }),
        });

        console.log(`Response status: ${r.status}`);

        if (r.status === 405) {
          console.log(`405 error on ${endpoint}, trying next...`);
          continue; // Try next endpoint
        }

        const text = await r.text();
        console.log(`Response text length: ${text.length}`);

        let j: any;
        try {
          j = JSON.parse(text);
        } catch {
          console.log(`JSON parse failed for ${endpoint}`);
          if (endpoints.indexOf(endpoint) === endpoints.length - 1) {
            // Last endpoint failed
            throw new Error(
              `API returned non-JSON (${r.status} ${r.statusText}). ` +
                `First 200 chars: ${text.slice(0, 200)}`
            );
          }
          continue; // Try next endpoint
        }

        console.log(`Success with ${endpoint}`);
        setRes(j);
        return; // Success, exit function
      } catch (e: any) {
        console.log(`Error with ${endpoint}:`, e.message);
        if (endpoints.indexOf(endpoint) === endpoints.length - 1) {
          // Last endpoint failed
          setRes({
            ok: false,
            error: `All endpoints failed. Last error: ${
              e?.message ?? "Network error"
            }`,
          });
          return;
        }
        continue; // Try next endpoint
      }
    }

    // If we get here, all endpoints failed
    setRes({
      ok: false,
      error: "All API endpoints are unavailable (405 errors)",
    });
    setLoading(false);
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        padding: 20,
        boxShadow: "0 4px 6px rgba(30, 58, 138, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <Field label="Provider">
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as Provider)}
            style={selectStyle}
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google</option>
            <option value="cohere">Cohere</option>
            <option value="mistral">Mistral</option>
            <option value="xai">xAI</option>
            <option value="meta">Meta</option>
            <option value="perplexity">Perplexity</option>
            <option value="together">Together AI</option>
          </select>
        </Field>

        <Field label="Model">
          <select
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            style={selectStyle}
          >
            {providerModels.length === 0 ? (
              <option value="">No enabled models yet</option>
            ) : (
              providerModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))
            )}
          </select>
        </Field>

        <Field label="Completion tokens (estimated max)">
          <input
            type="number"
            min={0}
            value={expectedOutputTokens}
            onChange={(e) => setExpectedOutputTokens(Number(e.target.value))}
            style={inputStyle}
          />
        </Field>

        <button
          onClick={estimate}
          disabled={!canRun || loading}
          style={{
            padding: "12px 20px",
            borderRadius: 12,
            border: "none",
            background:
              !canRun || loading
                ? "#e2e8f0"
                : "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
            color: !canRun || loading ? "#94a3b8" : "#fff",
            cursor: !canRun || loading ? "not-allowed" : "pointer",
            height: 44,
            fontWeight: 600,
            fontSize: "14px",
            transition: "all 0.2s ease",
            boxShadow:
              !canRun || loading ? "none" : "0 2px 4px rgba(30, 58, 138, 0.2)",
          }}
        >
          {loading ? "Estimating…" : "Estimate"}
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <Field label="Prompt">
          <textarea
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Paste your prompt here…"
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 14,
              border: "1px solid #e2e8f0",
              fontFamily: "inherit",
              fontSize: "14px",
              background: "white",
              color: "#0F172A",
              transition: "border-color 0.2s ease",
              resize: "vertical",
            }}
          />
        </Field>
      </div>

      <div style={{ marginTop: 12 }}>
        {res?.ok === false && (
          <div
            style={{
              border: "1px solid #ef4444",
              borderRadius: 14,
              padding: 16,
              background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
            }}
          >
            <div style={{ fontWeight: 700, color: "#dc2626" }}>Error</div>
            <div style={{ marginTop: 6, color: "#7f1d1d" }}>{res.error}</div>
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                opacity: 0.75,
                color: "#991b1b",
              }}
            >
              Enable models by adding verified pricing in{" "}
              <code>lib/catalog/*</code> and setting{" "}
              <code>status: "active"</code>.
            </div>
          </div>
        )}

        {res?.ok === true && (
          <div
            style={{
              border: "1px solid #38BDF8",
              borderRadius: 14,
              padding: 16,
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            }}
          >
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Stat label="Input tokens" value={res.inputTokens} />
              <Stat label="Output tokens" value={res.expectedOutputTokens} />
            </div>

            {res.costs ? (
              <>
                <Stat label="Input cost" value={`$${res.costs.inputCost}`} />
                <Stat label="Output cost" value={`$${res.costs.outputCost}`} />
                <Stat label="Total" value={`$${res.costs.totalCost}`} />
              </>
            ) : (
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
                Pricing not enabled yet — showing token count only.
              </div>
            )}

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
              Token count mode: <b>{res.countingMode}</b>
              {res.confidenceNote ? (
                <span style={{ display: "block", marginTop: 4, opacity: 0.8 }}>
                  Note: {res.confidenceNote}
                </span>
              ) : null}
            </div>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
              Pricing source:{" "}
              <a
                href={res.pricing.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                official
              </a>{" "}
              • Verified: {res.pricing.lastVerified}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ minWidth: 150 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 900 }}>{value}</div>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  height: 44,
  fontSize: "14px",
  background: "white",
  color: "#0F172A",
  transition: "border-color 0.2s ease",
};

const inputStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  height: 44,
  width: 220,
  fontSize: "14px",
  background: "white",
  color: "#0F172A",
  transition: "border-color 0.2s ease",
};
