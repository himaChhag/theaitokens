import type { ComparisonEntry } from "./types";

export const COMPARISONS: ComparisonEntry[] = [
  {
    slug: "gpt-4o-vs-claude-sonnet",
    title: "GPT-4o vs Claude Sonnet 4.6",
    description: "Compare OpenAI's GPT-4o with Anthropic's Claude Sonnet 4.6. Detailed pricing, performance, and capability analysis.",
    modelA: {
      id: "gpt-4o",
      label: "GPT-4o"
    },
    modelB: {
      id: "claude-sonnet-4-6",
      label: "Claude Sonnet 4.6"
    },
    winner: "tie",
    summary: "Both models excel in different areas. GPT-4o offers better coding and math, while Claude Sonnet 4.6 provides superior reasoning and safety.",
    keyDifferences: [
      "GPT-4o has multimodal capabilities (vision, audio)",
      "Claude Sonnet 4.6 has longer context window (200K vs 128K tokens)",
      "GPT-4o is faster for most tasks",
      "Claude Sonnet 4.6 is more cautious and safety-focused",
      "GPT-4o has better integration ecosystem"
    ],
    useCases: {
      modelA: [
        "Code generation and debugging",
        "Mathematical problem solving",
        "Image analysis and description",
        "Quick creative writing",
        "API integrations"
      ],
      modelB: [
        "Long document analysis",
        "Complex reasoning tasks",
        "Safety-critical applications",
        "Detailed research and analysis",
        "Constitutional AI applications"
      ]
    }
  },
  {
    slug: "gpt-4o-vs-gemini-pro",
    title: "GPT-4o vs Gemini Pro",
    description: "Compare OpenAI's GPT-4o with Google's Gemini Pro. Performance, pricing, and feature comparison.",
    modelA: {
      id: "gpt-4o",
      label: "GPT-4o"
    },
    modelB: {
      id: "gemini-pro",
      label: "Gemini Pro"
    },
    winner: "A",
    summary: "GPT-4o generally outperforms Gemini Pro in most benchmarks, offering better reasoning and more consistent outputs.",
    keyDifferences: [
      "GPT-4o has more consistent performance",
      "Gemini Pro offers competitive pricing",
      "GPT-4o has better third-party integrations",
      "Gemini Pro has native Google services integration",
      "GPT-4o has more extensive fine-tuning options"
    ],
    useCases: {
      modelA: [
        "Professional content creation",
        "Complex problem solving",
        "Code generation",
        "Business applications",
        "Creative writing"
      ],
      modelB: [
        "Google Workspace integration",
        "Cost-sensitive applications",
        "Search-enhanced tasks",
        "Multi-language support",
        "Basic automation tasks"
      ]
    }
  },
  {
    slug: "claude-sonnet-vs-gemini-pro",
    title: "Claude Sonnet 4.6 vs Gemini Pro",
    description: "Compare Anthropic's Claude Sonnet 4.6 with Google's Gemini Pro. Safety, reasoning, and cost analysis.",
    modelA: {
      id: "claude-sonnet-4-6",
      label: "Claude Sonnet 4.6"
    },
    modelB: {
      id: "gemini-pro",
      label: "Gemini Pro"
    },
    winner: "A",
    summary: "Claude Sonnet 4.6 offers superior reasoning and safety features, while Gemini Pro provides better value for basic tasks.",
    keyDifferences: [
      "Claude has stronger safety guardrails",
      "Gemini Pro is more cost-effective",
      "Claude has better long-form reasoning",
      "Gemini Pro has faster response times",
      "Claude is more transparent about limitations"
    ],
    useCases: {
      modelA: [
        "Research and analysis",
        "Safety-critical applications",
        "Long document processing",
        "Ethical AI applications",
        "Complex reasoning tasks"
      ],
      modelB: [
        "High-volume applications",
        "Cost-sensitive projects",
        "Quick content generation",
        "Google ecosystem integration",
        "Multilingual applications"
      ]
    }
  },
  {
    slug: "gpt-4-vs-gpt-4o",
    title: "GPT-4 vs GPT-4o",
    description: "Compare OpenAI's GPT-4 with the newer GPT-4o. Speed, cost, and capability differences.",
    modelA: {
      id: "gpt-4",
      label: "GPT-4"
    },
    modelB: {
      id: "gpt-4o",
      label: "GPT-4o"
    },
    winner: "B",
    summary: "GPT-4o is faster, cheaper, and has multimodal capabilities while maintaining GPT-4's intelligence level.",
    keyDifferences: [
      "GPT-4o is 2x faster than GPT-4",
      "GPT-4o is 50% cheaper than GPT-4",
      "GPT-4o has native vision and audio capabilities",
      "GPT-4 has slightly better reasoning in some benchmarks",
      "GPT-4o has better multilingual performance"
    ],
    useCases: {
      modelA: [
        "Legacy applications",
        "Maximum reasoning quality",
        "Specific fine-tuned versions",
        "Research applications",
        "When cost is not a factor"
      ],
      modelB: [
        "Production applications",
        "Cost-sensitive projects",
        "Multimodal applications",
        "Real-time applications",
        "Modern AI workflows"
      ]
    }
  },
  {
    slug: "claude-opus-vs-claude-sonnet",
    title: "Claude Opus 4.6 vs Claude Sonnet 4.6",
    description: "Compare Anthropic's Claude Opus 4.6 with Claude Sonnet 4.6. Intelligence vs efficiency analysis.",
    modelA: {
      id: "claude-opus-4-6",
      label: "Claude Opus 4.6"
    },
    modelB: {
      id: "claude-sonnet-4-6",
      label: "Claude Sonnet 4.6"
    },
    winner: "B",
    summary: "Claude Sonnet 4.6 offers better performance than Opus at a fraction of the cost, making it the better choice for most use cases.",
    keyDifferences: [
      "Claude Sonnet 4.6 is 5x cheaper than Opus",
      "Claude Sonnet 4.6 is faster",
      "Claude Opus 4.6 has slightly better reasoning on complex tasks",
      "Claude Sonnet 4.6 has more recent training data",
      "Both have 200K context windows"
    ],
    useCases: {
      modelA: [
        "Extremely complex reasoning",
        "Research applications",
        "When cost is not a concern",
        "Maximum quality requirements",
        "Complex mathematical proofs"
      ],
      modelB: [
        "Production applications",
        "Business use cases",
        "Content creation",
        "Code generation",
        "Most AI applications"
      ]
    }
  },
  {
    slug: "gpt-4o-mini-vs-claude-haiku",
    title: "GPT-4o mini vs Claude Haiku 4.5",
    description: "Compare budget-friendly AI models: OpenAI's GPT-4o mini vs Anthropic's Claude Haiku 4.5. Best value for cost-conscious projects.",
    modelA: {
      id: "gpt-4o-mini",
      label: "GPT-4o mini"
    },
    modelB: {
      id: "claude-haiku-4-5",
      label: "Claude Haiku 4.5"
    },
    winner: "tie",
    summary: "Both models offer excellent value for money. GPT-4o mini excels at quick tasks and integrations, while Claude Haiku provides better safety and longer context.",
    keyDifferences: [
      "Claude Haiku has 200K context vs GPT-4o mini's 128K",
      "GPT-4o mini is significantly cheaper ($0.15 vs $1.0 input)",
      "Claude Haiku has better safety features",
      "GPT-4o mini has faster response times",
      "Both offer excellent performance for their price points"
    ],
    useCases: {
      modelA: [
        "High-volume applications",
        "Quick content generation",
        "Simple automation tasks",
        "Cost-sensitive projects",
        "Rapid prototyping"
      ],
      modelB: [
        "Document analysis",
        "Safety-critical applications",
        "Long-form content processing",
        "Research tasks",
        "Ethical AI applications"
      ]
    }
  },
  {
    slug: "gpt-4o-mini-vs-gemini-flash",
    title: "GPT-4o mini vs Gemini 2.5 Flash",
    description: "Compare fast, affordable AI models: OpenAI's GPT-4o mini vs Google's Gemini 2.5 Flash. Speed and cost analysis.",
    modelA: {
      id: "gpt-4o-mini",
      label: "GPT-4o mini"
    },
    modelB: {
      id: "gemini-2.5-flash",
      label: "Gemini 2.5 Flash"
    },
    winner: "A",
    summary: "GPT-4o mini offers better value with lower costs and consistent performance, while Gemini 2.5 Flash provides massive context windows.",
    keyDifferences: [
      "GPT-4o mini is 2x cheaper for input tokens",
      "Gemini 2.5 Flash has 1M context window vs 128K",
      "GPT-4o mini has better ecosystem integration",
      "Gemini 2.5 Flash supports multimodal inputs natively",
      "GPT-4o mini has more predictable pricing"
    ],
    useCases: {
      modelA: [
        "Cost-sensitive applications",
        "Quick API integrations",
        "Simple content generation",
        "Chatbots and assistants",
        "Batch processing tasks"
      ],
      modelB: [
        "Large document processing",
        "Multimodal applications",
        "Google ecosystem integration",
        "Long conversation contexts",
        "Video and image analysis"
      ]
    }
  },
  {
    slug: "claude-haiku-vs-gemini-flash-lite",
    title: "Claude Haiku 4.5 vs Gemini 2.5 Flash-Lite",
    description: "Ultra-budget AI model comparison: Anthropic's Claude Haiku vs Google's Gemini Flash-Lite. Maximum value analysis.",
    modelA: {
      id: "claude-haiku-4-5",
      label: "Claude Haiku 4.5"
    },
    modelB: {
      id: "gemini-2.5-flash-lite",
      label: "Gemini 2.5 Flash-Lite"
    },
    winner: "B",
    summary: "Gemini 2.5 Flash-Lite offers the lowest cost per token, while Claude Haiku provides better reasoning and safety for slightly higher cost.",
    keyDifferences: [
      "Gemini Flash-Lite is 10x cheaper ($0.10 vs $1.0 input)",
      "Claude Haiku has better reasoning capabilities",
      "Gemini Flash-Lite has 1M context window vs 200K",
      "Claude Haiku has stronger safety guardrails",
      "Both offer excellent value for basic tasks"
    ],
    useCases: {
      modelA: [
        "Safety-critical applications",
        "Quality-focused projects",
        "Research and analysis",
        "Content moderation",
        "Ethical AI requirements"
      ],
      modelB: [
        "Ultra-high-volume applications",
        "Basic content generation",
        "Simple automation",
        "Experimental projects",
        "Cost-minimized deployments"
      ]
    }
  },
  {
    slug: "gemini-pro-vs-claude-sonnet",
    title: "Gemini 2.5 Pro vs Claude Sonnet 4.6",
    description: "Premium AI model comparison: Google's Gemini 2.5 Pro vs Anthropic's Claude Sonnet 4.6. Advanced capabilities analysis.",
    modelA: {
      id: "gemini-2.5-pro",
      label: "Gemini 2.5 Pro"
    },
    modelB: {
      id: "claude-sonnet-4-6",
      label: "Claude Sonnet 4.6"
    },
    winner: "tie",
    summary: "Both are premium models with different strengths. Gemini 2.5 Pro offers massive context and multimodal capabilities, while Claude Sonnet excels at reasoning and safety.",
    keyDifferences: [
      "Gemini 2.5 Pro has 2M context window vs 200K",
      "Claude Sonnet is more expensive but offers better reasoning",
      "Gemini 2.5 Pro has native multimodal capabilities",
      "Claude Sonnet has superior safety features",
      "Gemini 2.5 Pro integrates better with Google services"
    ],
    useCases: {
      modelA: [
        "Massive document analysis",
        "Multimodal AI applications",
        "Google Workspace integration",
        "Long-form content processing",
        "Video and image understanding"
      ],
      modelB: [
        "Complex reasoning tasks",
        "Safety-critical applications",
        "High-quality content creation",
        "Research and analysis",
        "Professional writing assistance"
      ]
    }
  },
  {
    slug: "gpt-4-1-vs-claude-opus",
    title: "GPT-4.1 vs Claude Opus 4.6",
    description: "Flagship AI model comparison: OpenAI's GPT-4.1 vs Anthropic's Claude Opus 4.6. Ultimate performance analysis.",
    modelA: {
      id: "gpt-4.1",
      label: "GPT-4.1"
    },
    modelB: {
      id: "claude-opus-4-6",
      label: "Claude Opus 4.6"
    },
    winner: "tie",
    summary: "Both represent the pinnacle of AI capabilities. GPT-4.1 offers better speed and integration, while Claude Opus provides superior reasoning and safety.",
    keyDifferences: [
      "Claude Opus is 2.5x more expensive than GPT-4.1",
      "Both have 200K context windows",
      "GPT-4.1 has better ecosystem integration",
      "Claude Opus has superior reasoning on complex tasks",
      "GPT-4.1 offers better multimodal capabilities"
    ],
    useCases: {
      modelA: [
        "Professional applications",
        "Complex coding projects",
        "Business intelligence",
        "Advanced automation",
        "Multimodal AI systems"
      ],
      modelB: [
        "Research and academia",
        "Complex problem solving",
        "Safety-critical systems",
        "Philosophical reasoning",
        "Maximum quality requirements"
      ]
    }
  },
  {
    slug: "gemini-pro-vs-gpt-4o",
    title: "Gemini 2.5 Pro vs GPT-4o",
    description: "Premium model showdown: Google's Gemini 2.5 Pro vs OpenAI's GPT-4o. Context, capabilities, and cost comparison.",
    modelA: {
      id: "gemini-2.5-pro",
      label: "Gemini 2.5 Pro"
    },
    modelB: {
      id: "gpt-4o",
      label: "GPT-4o"
    },
    winner: "tie",
    summary: "Both excel in different areas. Gemini 2.5 Pro offers massive context and competitive pricing, while GPT-4o provides consistent performance and better integrations.",
    keyDifferences: [
      "Gemini 2.5 Pro has 2M context window vs 128K",
      "GPT-4o is 2x more expensive for input tokens",
      "Gemini 2.5 Pro has better multimodal capabilities",
      "GPT-4o has more consistent performance",
      "Gemini 2.5 Pro offers better value for large contexts"
    ],
    useCases: {
      modelA: [
        "Large document processing",
        "Long conversation contexts",
        "Multimodal applications",
        "Cost-sensitive premium projects",
        "Google ecosystem integration"
      ],
      modelB: [
        "Production applications",
        "Consistent quality requirements",
        "OpenAI ecosystem integration",
        "Real-time applications",
        "Professional content creation"
      ]
    }
  }
];