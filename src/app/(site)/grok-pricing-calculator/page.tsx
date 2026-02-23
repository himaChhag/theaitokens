import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Grok Pricing Calculator | xAI Grok 4 Cost Estimator 2026",
  description: "Calculate xAI Grok API costs with our free pricing calculator. Compare Grok 4.1, Grok 4, and Grok Code pricing. Get accurate cost estimates for reasoning models.",
  keywords: "Grok pricing, xAI pricing calculator, Grok 4 cost, Grok reasoning pricing, xAI API costs",
};

export default function GrokPricingCalculatorPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Grok Pricing Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Calculate costs for xAI's Grok model family including reasoning and non-reasoning variants
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-green-900 mb-2">Grok Model Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Grok 4.1 Fast Reasoning:</strong> Enhanced reasoning with speed
              </div>
              <div>
                <strong>Grok 4.1 Fast Non-Reasoning:</strong> Fast general-purpose model
              </div>
              <div>
                <strong>Grok 4 Fast Reasoning:</strong> Balanced reasoning capabilities
              </div>
              <div>
                <strong>Grok 4:</strong> Standard general-purpose model
              </div>
              <div>
                <strong>Grok Code Fast 1:</strong> Specialized for coding tasks
              </div>
            </div>
          </div>
        </div>
        
        <Estimator defaultProvider="xai" />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>xAI Grok Pricing Guide</h2>
          <p>
            xAI's Grok models offer a unique approach with both reasoning and non-reasoning variants, 
            plus specialized coding models. This calculator helps you estimate costs based on your specific needs.
          </p>
          
          <h3>Reasoning vs Non-Reasoning Models</h3>
          <p>
            xAI offers both reasoning and non-reasoning variants of their models, allowing you to choose 
            based on your specific requirements:
          </p>
          <ul>
            <li><strong>Reasoning Models:</strong> Enhanced logical problem-solving, step-by-step reasoning, better for analytical tasks</li>
            <li><strong>Non-Reasoning Models:</strong> Faster responses, more efficient for simple queries, better for conversational use</li>
          </ul>
          
          <h3>Specialized Models</h3>
          <ul>
            <li><strong>Grok Code Fast 1:</strong> Optimized specifically for programming tasks and software development</li>
            <li><strong>Grok 4.1 Series:</strong> Latest generation with improved performance and capabilities</li>
          </ul>
          
          <h3>Best Use Cases</h3>
          <ul>
            <li>Choose reasoning models for complex analytical and research tasks</li>
            <li>Use non-reasoning models for chatbots and quick content generation</li>
            <li>Select Grok Code Fast 1 for all programming-related applications</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}