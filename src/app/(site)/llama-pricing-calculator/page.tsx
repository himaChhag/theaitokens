import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Llama Pricing Calculator | Meta Llama 4 Cost Estimator 2026",
  description: "Calculate Meta Llama API costs with our free pricing calculator. Compare Llama 4 Maverick, Scout, and Llama 3 series pricing. Open source AI costs.",
  keywords: "Llama pricing, Meta Llama calculator, Llama 4 cost, open source AI pricing, Meta AI costs",
};

export default function LlamaPricingCalculatorPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Llama Pricing Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Calculate costs for Meta's Llama model family including Llama 4 Maverick, Scout, and Llama 3 series
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Llama Model Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Llama 4 Maverick:</strong> Flagship open source performance
              </div>
              <div>
                <strong>Llama 4 Scout:</strong> Efficient production deployment
              </div>
              <div>
                <strong>Llama 3.3 70B:</strong> Balanced capabilities
              </div>
              <div>
                <strong>Llama 3 70B/8B:</strong> Proven reliable models
              </div>
            </div>
          </div>
        </div>
        
        <Estimator defaultProvider="meta" />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>Meta Llama Pricing Guide</h2>
          <p>
            Meta's Llama models represent the leading edge of open-source AI, offering transparency, 
            customization, and cost control that proprietary models can't match.
          </p>
          
          <h3>Llama 4 Series: Next-Generation Open Source</h3>
          <ul>
            <li><strong>Llama 4 Maverick:</strong> Flagship performance competing with proprietary models</li>
            <li><strong>Llama 4 Scout:</strong> Optimized for production efficiency and deployment</li>
          </ul>
          
          <h3>Llama 3 Series: Proven Performance</h3>
          <ul>
            <li><strong>Llama 3.3 70B:</strong> Enhanced version with improved capabilities</li>
            <li><strong>Llama 3 70B:</strong> Large model for complex tasks</li>
            <li><strong>Llama 3 8B:</strong> Efficient model for resource-constrained environments</li>
          </ul>
          
          <h3>Open Source Advantages</h3>
          <ul>
            <li><strong>Transparency:</strong> Full model weights and architecture available</li>
            <li><strong>Customization:</strong> Fine-tune for your specific use cases</li>
            <li><strong>Cost Control:</strong> Self-hosting options eliminate API fees</li>
            <li><strong>Privacy:</strong> Keep data on your own infrastructure</li>
            <li><strong>No Vendor Lock-in:</strong> Complete control over your AI stack</li>
          </ul>
          
          <h3>Deployment Options</h3>
          <ul>
            <li><strong>Hosted APIs:</strong> Use through Meta AI or Together AI for convenience</li>
            <li><strong>Self-Hosting:</strong> Deploy on your own infrastructure for maximum control</li>
            <li><strong>Cloud Deployment:</strong> Use cloud providers like AWS, GCP, or Azure</li>
            <li><strong>Edge Deployment:</strong> Run smaller models on edge devices</li>
          </ul>
          
          <h3>Cost Considerations</h3>
          <ul>
            <li>API costs when using hosted services</li>
            <li>Infrastructure costs for self-hosting</li>
            <li>Development time for custom implementations</li>
            <li>Maintenance and updates</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}