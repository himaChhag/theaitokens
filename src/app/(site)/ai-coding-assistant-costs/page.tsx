import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "AI Coding Assistant Costs | Programming AI Pricing Calculator 2026",
  description:
    "Calculate costs for AI coding assistants. Compare pricing for GPT-5, Codestral 2, Grok Code, and other programming AI models. Optimize your development budget.",
  keywords:
    "AI coding assistant costs, programming AI pricing, Codestral pricing, GPT-5 coding costs, AI development tools pricing",
};

export default function AICodingAssistantCostsPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Coding Assistant Costs
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Calculate and compare costs for AI-powered coding assistants and
            programming tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Specialized Coding Models
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <strong>Codestral 2:</strong> Mistral's coding specialist
              </li>
              <li>
                <strong>Grok Code Fast 1:</strong> xAI's programming model
              </li>
              <li>
                <strong>Qwen3-Coder 480B:</strong> Massive coding model
              </li>
              <li>
                <strong>Devstral 2:</strong> Development workflow optimizer
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              General Purpose (Good for Code)
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <strong>GPT-5 series:</strong> Excellent coding capabilities
              </li>
              <li>
                <strong>Claude Sonnet 4.6:</strong> Strong reasoning for complex
                code
              </li>
              <li>
                <strong>Gemini 3 series:</strong> Good coding with large context
              </li>
              <li>
                <strong>o3 models:</strong> Advanced reasoning for algorithms
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">
              Budget Coding Options
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <strong>GPT-5 mini:</strong> $0.25/1M - Great for simple tasks
              </li>
              <li>
                <strong>Gemini 2.5 Flash:</strong> $0.30/1M - Good balance
              </li>
              <li>
                <strong>Claude Haiku 4.5:</strong> $1.00/1M - Quality + safety
              </li>
            </ul>
          </div>
        </div>

        <Estimator />

        <div className="mt-12 prose prose-lg max-w-none">
          <h2>AI Coding Assistant Cost Guide</h2>

          <h3>Specialized Coding Models</h3>
          <p>
            These models are specifically trained and optimized for programming
            tasks:
          </p>
          <ul>
            <li>
              <strong>Codestral 2 (Mistral):</strong> Deep understanding of
              programming languages, excellent code generation
            </li>
            <li>
              <strong>Grok Code Fast 1 (xAI):</strong> Fast code generation with
              good debugging capabilities
            </li>
            <li>
              <strong>Qwen3-Coder 480B (Together AI):</strong> Massive 480B
              parameter model for complex coding tasks
            </li>
            <li>
              <strong>Devstral 2 (Mistral):</strong> Optimized for entire
              development workflows, not just coding
            </li>
          </ul>

          <h3>General Purpose Models for Coding</h3>
          <p>
            These models excel at coding while offering broader capabilities:
          </p>
          <ul>
            <li>
              <strong>GPT-5 Series:</strong> Excellent coding performance across
              all variants, from nano to 5.2
            </li>
            <li>
              <strong>Claude Sonnet 4.6:</strong> Superior reasoning makes it
              great for complex algorithms
            </li>
            <li>
              <strong>o3 Models:</strong> Advanced reasoning capabilities
              perfect for algorithmic challenges
            </li>
            <li>
              <strong>Gemini 3 Series:</strong> Large context windows great for
              analyzing entire codebases
            </li>
          </ul>

          <h3>Cost Optimization for Coding Tasks</h3>

          <h4>By Task Type:</h4>
          <ul>
            <li>
              <strong>Code Completion:</strong> Use GPT-5 mini or Gemini 2.5
              Flash for cost efficiency
            </li>
            <li>
              <strong>Code Generation:</strong> Codestral 2 or GPT-5 for
              quality, GPT-5 mini for volume
            </li>
            <li>
              <strong>Code Review:</strong> Claude Sonnet 4.6 for thorough
              analysis, GPT-5 for general review
            </li>
            <li>
              <strong>Debugging:</strong> o3 models for complex bugs, GPT-5 for
              standard debugging
            </li>
            <li>
              <strong>Documentation:</strong> Claude models for comprehensive
              docs, GPT-5 mini for simple comments
            </li>
          </ul>

          <h4>By Development Stage:</h4>
          <ul>
            <li>
              <strong>Prototyping:</strong> Use budget models like GPT-5 mini
              for rapid iteration
            </li>
            <li>
              <strong>Production Code:</strong> Invest in premium models like
              GPT-5.2 or Claude Sonnet
            </li>
            <li>
              <strong>Code Maintenance:</strong> Balanced models like GPT-5 or
              Gemini 2.5 Pro
            </li>
          </ul>

          <h3>Typical Usage Patterns and Costs</h3>

          <h4>Individual Developer (Light Usage)</h4>
          <ul>
            <li>~50K tokens/day for code completion and simple queries</li>
            <li>Monthly cost: $3-15 depending on model choice</li>
            <li>Recommended: GPT-5 mini or Gemini 2.5 Flash</li>
          </ul>

          <h4>Individual Developer (Heavy Usage)</h4>
          <ul>
            <li>~200K tokens/day for extensive code generation and review</li>
            <li>Monthly cost: $15-75 depending on model choice</li>
            <li>Recommended: GPT-5 or Codestral 2</li>
          </ul>

          <h4>Development Team (5-10 developers)</h4>
          <ul>
            <li>~1M tokens/day across team members</li>
            <li>Monthly cost: $75-500 depending on model mix</li>
            <li>Recommended: Tiered approach with multiple models</li>
          </ul>

          <h3>Best Practices for Cost Management</h3>
          <ul>
            <li>
              Use specialized coding models for complex tasks, general models
              for simple ones
            </li>
            <li>
              Implement caching for repeated code patterns and documentation
            </li>
            <li>Optimize prompts to reduce token usage</li>
            <li>Consider context window size for large codebase analysis</li>
            <li>
              Monitor usage patterns and adjust model selection accordingly
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
