import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "AI Token Counter | Universal Token Calculator for All AI Models 2026",
  description: "Count tokens for any AI model with our universal token counter. Supports OpenAI, Anthropic, Google, xAI, and all major AI providers. Free and accurate.",
  keywords: "AI token counter, token calculator, OpenAI tokens, Claude tokens, Gemini tokens, universal token counter",
};

export default function AITokenCounterPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Token Counter
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Universal token counter for all AI models - OpenAI, Anthropic, Google, xAI, and more
          </p>
        </div>
        
        <Estimator />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>Universal AI Token Counter</h2>
          <p>
            Our AI token counter supports all major AI providers and models, giving you accurate 
            token counts and cost estimates for any AI application.
          </p>
          
          <h3>Supported Providers</h3>
          <ul>
            <li><strong>OpenAI:</strong> GPT-5 series, GPT-4o, o3 models</li>
            <li><strong>Anthropic:</strong> Claude Opus, Sonnet, and Haiku models</li>
            <li><strong>Google:</strong> Gemini 3 series, Gemini 2.5 Pro, Flash models</li>
            <li><strong>xAI:</strong> Grok 4 series, reasoning and non-reasoning variants</li>
            <li><strong>Meta:</strong> Llama 4 Maverick, Scout, and Llama 3 series</li>
            <li><strong>Cohere:</strong> Command A, Command R, and Command R7B</li>
            <li><strong>Mistral:</strong> Large 2, Codestral 2, Devstral 2</li>
            <li><strong>Perplexity:</strong> Sonar Pro, Reasoning Pro, Deep Research</li>
            <li><strong>Together AI:</strong> Hosted open source models</li>
          </ul>
          
          <h3>How Token Counting Works</h3>
          <p>
            Different AI providers use different tokenization methods:
          </p>
          <ul>
            <li><strong>OpenAI:</strong> Uses tiktoken library with model-specific encodings</li>
            <li><strong>Anthropic:</strong> Claude models use their own tokenization system</li>
            <li><strong>Google:</strong> Gemini models have unique token counting rules</li>
            <li><strong>Others:</strong> Each provider has optimized tokenization for their models</li>
          </ul>
          
          <h3>Why Accurate Token Counting Matters</h3>
          <ul>
            <li>Predict API costs before making requests</li>
            <li>Optimize prompts to reduce token usage</li>
            <li>Stay within context window limits</li>
            <li>Budget for AI applications effectively</li>
            <li>Compare costs across different models</li>
          </ul>
          
          <h3>Token Optimization Tips</h3>
          <ul>
            <li>Remove unnecessary words and redundant instructions</li>
            <li>Use abbreviations and concise language</li>
            <li>Structure prompts efficiently</li>
            <li>Consider context window limits for long conversations</li>
            <li>Test different phrasings to find the most token-efficient approach</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}