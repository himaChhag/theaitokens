import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Business AI Cost Calculator | Enterprise AI Budget Planning 2026",
  description: "Calculate AI costs for your business. Plan budgets for AI implementations across teams, departments, and use cases. Enterprise AI cost optimization.",
  keywords: "business AI costs, enterprise AI calculator, AI budget planning, corporate AI pricing, business AI ROI",
};

export default function BusinessAICostCalculatorPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business AI Cost Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Plan and optimize AI costs for your business across teams, departments, and use cases
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Small Business</h3>
            <p className="text-sm text-blue-700 mb-3">1-10 employees</p>
            <ul className="text-sm space-y-1">
              <li>• Customer service chatbot</li>
              <li>• Content generation</li>
              <li>• Email automation</li>
              <li>• Monthly budget: $50-500</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Medium Business</h3>
            <p className="text-sm text-green-700 mb-3">10-100 employees</p>
            <ul className="text-sm space-y-1">
              <li>• Multi-department AI tools</li>
              <li>• Document processing</li>
              <li>• Sales automation</li>
              <li>• Monthly budget: $500-5,000</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Enterprise</h3>
            <p className="text-sm text-purple-700 mb-3">100+ employees</p>
            <ul className="text-sm space-y-1">
              <li>• Custom AI solutions</li>
              <li>• Large-scale automation</li>
              <li>• Advanced analytics</li>
              <li>• Monthly budget: $5,000+</li>
            </ul>
          </div>
        </div>
        
        <Estimator />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>Business AI Cost Planning Guide</h2>
          
          <h3>Common Business AI Use Cases and Costs</h3>
          
          <h4>Customer Service and Support</h4>
          <ul>
            <li><strong>Chatbot (Basic):</strong> $50-200/month - GPT-5 mini or Gemini 2.5 Flash</li>
            <li><strong>Chatbot (Advanced):</strong> $200-800/month - GPT-5 or Claude Sonnet</li>
            <li><strong>Ticket Classification:</strong> $30-150/month - Budget models work well</li>
            <li><strong>Response Generation:</strong> $100-500/month - Quality models recommended</li>
          </ul>
          
          <h4>Content and Marketing</h4>
          <ul>
            <li><strong>Blog Writing:</strong> $100-400/month - GPT-5 or Claude Sonnet</li>
            <li><strong>Social Media:</strong> $50-200/month - GPT-5 mini sufficient</li>
            <li><strong>Email Campaigns:</strong> $75-300/month - Balanced models</li>
            <li><strong>Product Descriptions:</strong> $100-500/month - Quality important</li>
          </ul>
          
          <h4>Sales and Business Development</h4>
          <ul>
            <li><strong>Lead Qualification:</strong> $100-400/month - Claude models for accuracy</li>
            <li><strong>Proposal Generation:</strong> $200-800/month - Premium models</li>
            <li><strong>CRM Data Processing:</strong> $150-600/month - Depends on volume</li>
          </ul>
          
          <h4>Operations and Analytics</h4>
          <ul>
            <li><strong>Document Processing:</strong> $200-1000/month - Gemini Pro for large docs</li>
            <li><strong>Data Analysis:</strong> $300-1500/month - o3 or Claude for reasoning</li>
            <li><strong>Report Generation:</strong> $150-600/month - Quality models needed</li>
          </ul>
          
          <h3>Cost Optimization Strategies</h3>
          
          <h4>Tiered Model Architecture</h4>
          <p>Use different models for different complexity levels:</p>
          <ul>
            <li><strong>Simple Tasks:</strong> GPT-5 mini, Gemini 2.0 Flash ($0.05-0.30/1M)</li>
            <li><strong>Standard Tasks:</strong> GPT-5, Gemini 2.5 Pro ($1.25/1M)</li>
            <li><strong>Complex Tasks:</strong> GPT-5.2, Claude Sonnet ($1.75-3.00/1M)</li>
          </ul>
          
          <h4>Usage Monitoring and Controls</h4>
          <ul>
            <li>Set monthly budgets and alerts for each department</li>
            <li>Monitor token usage patterns to identify optimization opportunities</li>
            <li>Implement rate limiting to prevent unexpected costs</li>
            <li>Regular review of model performance vs cost</li>
          </ul>
          
          <h4>Bulk Processing Optimization</h4>
          <ul>
            <li>Batch similar requests to reduce API overhead</li>
            <li>Use caching for repeated queries</li>
            <li>Implement smart routing based on query complexity</li>
            <li>Consider context window efficiency for document processing</li>
          </ul>
          
          <h3>ROI Calculation Framework</h3>
          
          <h4>Cost Savings Metrics</h4>
          <ul>
            <li><strong>Time Savings:</strong> Hours saved × hourly rate × team size</li>
            <li><strong>Quality Improvements:</strong> Reduced errors, better outcomes</li>
            <li><strong>Scalability:</strong> Handle more work without hiring</li>
            <li><strong>Customer Satisfaction:</strong> Faster response times, 24/7 availability</li>
          </ul>
          
          <h4>Implementation Costs</h4>
          <ul>
            <li><strong>AI API Costs:</strong> Monthly token usage fees</li>
            <li><strong>Development:</strong> Integration and customization</li>
            <li><strong>Training:</strong> Team education and onboarding</li>
            <li><strong>Maintenance:</strong> Ongoing optimization and updates</li>
          </ul>
          
          <h3>Budget Planning Template</h3>
          
          <h4>Monthly AI Budget Breakdown</h4>
          <ul>
            <li><strong>Customer Service (30%):</strong> Chatbots, support automation</li>
            <li><strong>Content Creation (25%):</strong> Marketing, documentation</li>
            <li><strong>Sales Support (20%):</strong> Lead processing, proposals</li>
            <li><strong>Operations (15%):</strong> Document processing, analysis</li>
            <li><strong>Development (10%):</strong> Code assistance, technical docs</li>
          </ul>
          
          <h4>Scaling Considerations</h4>
          <ul>
            <li>Start with pilot projects in one department</li>
            <li>Measure ROI before expanding to other areas</li>
            <li>Plan for 20-30% monthly growth in usage</li>
            <li>Budget for peak usage periods (holidays, launches)</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}