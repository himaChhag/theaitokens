import Link from "next/link";
import type { LearnContent } from "@/lib/learn/types";
import React from "react";

interface ContentRendererProps {
  content: LearnContent[];
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div style={{ maxWidth: "none" }}>
      {content.map((block, index) => (
        <ContentBlock key={index} block={block} />
      ))}
    </div>
  );
}

function ContentBlock({ block }: { block: LearnContent }) {
  switch (block.type) {
    case "heading":
      const headingStyle = {
        fontSize: block.level === 1 ? 32 : block.level === 2 ? 24 : 20,
        fontWeight: 700,
        color: "#0F172A",
        marginTop: block.level === 1 ? 0 : 32,
        marginBottom: 16,
        lineHeight: 1.3
      };
      
      if (block.level === 1) {
        return <h1 style={headingStyle}>{block.text}</h1>;
      } else if (block.level === 2) {
        return <h2 style={headingStyle}>{block.text}</h2>;
      } else {
        return <h3 style={headingStyle}>{block.text}</h3>;
      }

    case "paragraph":
      return (
        <p style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: "#374151",
          marginBottom: 16
        }}>
          {block.text}
        </p>
      );

    case "list":
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: "#374151",
          marginBottom: 16,
          paddingLeft: 24
        }}>
          {block.items.map((item, index) => (
            <li key={index} style={{ marginBottom: 8 }}>
              {item}
            </li>
          ))}
        </ListTag>
      );

    case "code":
      return (
        <pre style={{
          background: "#1f2937",
          color: "#f9fafb",
          padding: 16,
          borderRadius: 8,
          fontSize: 14,
          fontFamily: "monospace",
          overflow: "auto",
          marginBottom: 16
        }}>
          <code>{block.code}</code>
        </pre>
      );

    case "quote":
      return (
        <blockquote style={{
          borderLeft: "4px solid #3b82f6",
          paddingLeft: 16,
          marginLeft: 0,
          marginBottom: 16,
          fontStyle: "italic",
          color: "#6b7280"
        }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
            "{block.text}"
          </p>
          {block.author && (
            <cite style={{ 
              display: "block", 
              marginTop: 8, 
              fontSize: 14,
              fontWeight: 500 
            }}>
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    case "callout":
      const calloutStyles = {
        info: { bg: "rgba(59, 130, 246, 0.1)", border: "#3b82f6", icon: "ℹ️" },
        warning: { bg: "rgba(245, 158, 11, 0.1)", border: "#f59e0b", icon: "⚠️" },
        tip: { bg: "rgba(34, 197, 94, 0.1)", border: "#22c55e", icon: "💡" }
      };
      const style = calloutStyles[block.variant];
      
      return (
        <div style={{
          background: style.bg,
          border: `1px solid ${style.border}`,
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          display: "flex",
          alignItems: "flex-start",
          gap: 12
        }}>
          <span style={{ fontSize: 18 }}>{style.icon}</span>
          <p style={{ 
            margin: 0, 
            fontSize: 14, 
            lineHeight: 1.6, 
            color: "#374151",
            fontWeight: 500
          }}>
            {block.text}
          </p>
        </div>
      );

    case "table":
      return (
        <div style={{ 
          overflowX: "auto", 
          marginBottom: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8
        }}>
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            fontSize: 14
          }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {block.headers.map((header, index) => (
                  <th key={index} style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#374151",
                    borderBottom: "1px solid #e5e7eb"
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} style={{
                  borderBottom: rowIndex < block.rows.length - 1 ? "1px solid #f3f4f6" : "none"
                }}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{
                      padding: "12px 16px",
                      color: "#6b7280"
                    }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "link":
      if (block.external) {
        return (
          <a 
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#3b82f6",
              textDecoration: "underline",
              fontWeight: 500
            }}
          >
            {block.text}
          </a>
        );
      } else {
        return (
          <Link 
            href={block.href}
            style={{
              color: "#3b82f6",
              textDecoration: "underline",
              fontWeight: 500
            }}
          >
            {block.text}
          </Link>
        );
      }

    default:
      return null;
  }
}