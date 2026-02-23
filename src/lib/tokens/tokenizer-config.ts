// Tokenizer configuration mapping for different models
export type TokenizerType = 
  | "tiktoken-cl100k"     // OpenAI GPT-4, GPT-3.5, etc. (using tiktoken package)
  | "tiktoken-p50k"       // OpenAI GPT-3, Codex (using tiktoken package)
  | "tiktoken-r50k"       // OpenAI GPT-2 (using tiktoken package)
  | "sentencepiece"       // Google Gemini, Meta LLaMA, Mistral, T5 (using @xenova/transformers)
  | "wordpiece"           // Google BERT (using @xenova/transformers)
  | "anthropic-claude"    // Anthropic Claude (using @anthropic-ai/tokenizer)
  | "cohere-command"      // Cohere Command models (proprietary - estimated)
  | "xai-grok"            // xAI Grok models (proprietary - estimated)
  | "perplexity"          // Perplexity models (proprietary - estimated)
  | "estimate";           // Fallback estimation

export interface TokenizerConfig {
  type: TokenizerType;
  encoding?: string;
  notes?: string;
  implementation: "exact" | "estimate";
}

// Model-specific tokenizer mappings
export const MODEL_TOKENIZERS: Record<string, TokenizerConfig> = {
  // OpenAI Models - Use tiktoken with cl100k_base encoding
  "gpt-4": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "gpt-4o": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "gpt-4-turbo": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "gpt-3.5-turbo": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "gpt-5": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "gpt-5.1": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "gpt-5.2": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "gpt-5-mini": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "gpt-5-nano": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "o3": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "o3-mini": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  
  // OpenAI Legacy Models
  "gpt-3": { type: "tiktoken-p50k", encoding: "p50k_base", implementation: "exact" },
  "text-davinci-003": { type: "tiktoken-p50k", encoding: "p50k_base", implementation: "exact" },
  "gpt-2": { type: "tiktoken-r50k", encoding: "r50k_base", implementation: "exact" },
  
  // Google Models - Use SentencePiece
  "gemini-pro": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  "gemini-3.1-pro-preview": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  "gemini-3-pro-preview": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  "gemini-3-flash-preview": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  "gemini-2.5-pro": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  "gemini-2.5-flash": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  "gemini-2.0-flash": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  "gemma-7b": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  "gemma-2b": { type: "sentencepiece", notes: "Google SentencePiece tokenizer", implementation: "exact" },
  
  // Google BERT Models - Use WordPiece
  "bert-base": { type: "wordpiece", notes: "Google WordPiece tokenizer", implementation: "exact" },
  "bert-large": { type: "wordpiece", notes: "Google WordPiece tokenizer", implementation: "exact" },
  
  // Google T5 Models - Use SentencePiece
  "t5-small": { type: "sentencepiece", notes: "Google T5 SentencePiece tokenizer", implementation: "exact" },
  "t5-base": { type: "sentencepiece", notes: "Google T5 SentencePiece tokenizer", implementation: "exact" },
  "t5-large": { type: "sentencepiece", notes: "Google T5 SentencePiece tokenizer", implementation: "exact" },
  
  // Meta LLaMA Models - Use SentencePiece
  "llama-2-7b": { type: "sentencepiece", notes: "Meta LLaMA SentencePiece tokenizer", implementation: "exact" },
  "llama-2-13b": { type: "sentencepiece", notes: "Meta LLaMA SentencePiece tokenizer", implementation: "exact" },
  "llama-2-70b": { type: "sentencepiece", notes: "Meta LLaMA SentencePiece tokenizer", implementation: "exact" },
  "llama-3-8b": { type: "sentencepiece", notes: "Meta LLaMA 3 SentencePiece tokenizer", implementation: "exact" },
  "llama-3-70b": { type: "sentencepiece", notes: "Meta LLaMA 3 SentencePiece tokenizer", implementation: "exact" },
  "llama-3.1-8b": { type: "sentencepiece", notes: "Meta LLaMA 3.1 SentencePiece tokenizer", implementation: "exact" },
  "llama-3.1-70b": { type: "sentencepiece", notes: "Meta LLaMA 3.1 SentencePiece tokenizer", implementation: "exact" },
  "llama-3.1-405b": { type: "sentencepiece", notes: "Meta LLaMA 3.1 SentencePiece tokenizer", implementation: "exact" },
  
  // Meta LLaMA 4 Models - Use specialized multimodal SentencePiece BPE tokenizer
  "llama-4-scout": { type: "sentencepiece", notes: "Meta LLaMA 4 Scout multimodal SentencePiece BPE tokenizer (supports 200+ languages, 10M context)", implementation: "exact" },
  "llama-4-maverick": { type: "sentencepiece", notes: "Meta LLaMA 4 Maverick multimodal SentencePiece BPE tokenizer (supports 200+ languages, 1M context)", implementation: "exact" },
  
  // Mistral Models - Use SentencePiece
  "mistral-7b": { type: "sentencepiece", notes: "Mistral SentencePiece tokenizer", implementation: "exact" },
  "mistral-8x7b": { type: "sentencepiece", notes: "Mistral SentencePiece tokenizer", implementation: "exact" },
  "mistral-large": { type: "sentencepiece", notes: "Mistral SentencePiece tokenizer", implementation: "exact" },
  "mistral-medium": { type: "sentencepiece", notes: "Mistral SentencePiece tokenizer", implementation: "exact" },
  "mistral-small": { type: "sentencepiece", notes: "Mistral SentencePiece tokenizer", implementation: "exact" },
  
  // Anthropic Models - Use official tokenizer
  "claude-3-opus": { type: "anthropic-claude", notes: "Anthropic official tokenizer", implementation: "exact" },
  "claude-3-sonnet": { type: "anthropic-claude", notes: "Anthropic official tokenizer", implementation: "exact" },
  "claude-3-haiku": { type: "anthropic-claude", notes: "Anthropic official tokenizer", implementation: "exact" },
  "claude-opus-4-6": { type: "anthropic-claude", notes: "Anthropic official tokenizer", implementation: "exact" },
  "claude-sonnet-4-6": { type: "anthropic-claude", notes: "Anthropic official tokenizer", implementation: "exact" },
  "claude-haiku-4-5": { type: "anthropic-claude", notes: "Anthropic official tokenizer", implementation: "exact" },
  "claude-haiku-3-5": { type: "anthropic-claude", notes: "Anthropic official tokenizer", implementation: "exact" },
  
  // Cohere Models - Proprietary (estimated)
  "command": { type: "cohere-command", notes: "Cohere proprietary tokenizer", implementation: "estimate" },
  "command-light": { type: "cohere-command", notes: "Cohere proprietary tokenizer", implementation: "estimate" },
  "command-r": { type: "cohere-command", notes: "Cohere proprietary tokenizer", implementation: "estimate" },
  "command-r-plus": { type: "cohere-command", notes: "Cohere proprietary tokenizer", implementation: "estimate" },
  
  // XLM-RoBERTa - Use SentencePiece
  "xlm-roberta-base": { type: "sentencepiece", notes: "XLM-RoBERTa SentencePiece tokenizer", implementation: "exact" },
  "xlm-roberta-large": { type: "sentencepiece", notes: "XLM-RoBERTa SentencePiece tokenizer", implementation: "exact" },
};

// Provider-level fallbacks
export const PROVIDER_TOKENIZERS: Record<string, TokenizerConfig> = {
  "openai": { type: "tiktoken-cl100k", encoding: "cl100k_base", implementation: "exact" },
  "google": { type: "sentencepiece", notes: "Google models typically use SentencePiece", implementation: "exact" },
  "anthropic": { type: "anthropic-claude", notes: "Anthropic official tokenizer", implementation: "exact" },
  "meta": { type: "sentencepiece", notes: "Meta LLaMA models use SentencePiece", implementation: "exact" },
  "mistral": { type: "sentencepiece", notes: "Mistral models use SentencePiece", implementation: "exact" },
  "cohere": { type: "cohere-command", notes: "Cohere proprietary tokenizer", implementation: "estimate" },
  "xai": { type: "xai-grok", notes: "xAI Grok tokenizer (estimated)", implementation: "estimate" },
  "perplexity": { type: "perplexity", notes: "Perplexity tokenizer (estimated)", implementation: "estimate" },
  "together": { type: "estimate", notes: "Together AI uses various tokenizers", implementation: "estimate" },
};

/**
 * Get tokenizer configuration for a specific model
 */
export function getTokenizerConfig(provider: string, modelId: string): TokenizerConfig {
  // First try exact model match
  const modelConfig = MODEL_TOKENIZERS[modelId];
  if (modelConfig) {
    return modelConfig;
  }
  
  // Try partial model match (for model variants)
  for (const [key, config] of Object.entries(MODEL_TOKENIZERS)) {
    if (modelId.includes(key) || key.includes(modelId)) {
      return config;
    }
  }
  
  // Fall back to provider-level tokenizer
  const providerConfig = PROVIDER_TOKENIZERS[provider];
  if (providerConfig) {
    return providerConfig;
  }
  
  // Ultimate fallback
  return { type: "estimate", notes: "Unknown model, using character-based estimation", implementation: "estimate" };
}