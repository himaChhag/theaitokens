import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "AI Budget Calculator | Plan Your AI Spending and ROI 2026",
  description: "Calculate and plan your AI budget with our comprehensive calculator. Estimate costs, track spending, and optimize ROI for AI implementations.",
  keywords: "AI budget calculator, AI spending planner, AI ROI calculator, AI cost planning, AI budget optimization",
};

export default function AIBudgetCalculatorPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Budget Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Plan, track, and optimize your AI spending across projects and teams
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Startup Budget</h3>
            <div className="text-3xl font-bold text-blue-700 mb-2">$100-1K</div>
            <p className="text-sm text-blue-600">Monthly AI spending</p>
            <ul className="text-sm text-left mt-4 space-y-1">
              <li>• MVP development</li>
              <li>• Basic automation</li>
              <li>• Customer support bot</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Growth Stage</h3>
            <div className="text-3xl font-bold text-green-700 mb-2">$1K-10K</div>
            <p className="text-sm text-green-600">Monthly AI spending</p>
            <ul className="text-sm text-left mt-4 space-y-1">
              <li>• Multi-use case deployment</li>
              <li>• Content generation</li>
              <li>• Sales automation</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Enterprise</h3>
            <div className="text-3xl font-bold text-purple-700 mb-2">$10K+</div>
            <p className="text-sm text-purple-600">Monthly AI spending</p>
            <ul className="text-sm text-left mt-4 space-y-1">
              <li>• Large-scale deployment</li>
              <li>• Custom AI solutions</li>
              <li>• Advanced analytics</li>
            </ul>
          </div>
        </div>
        
        <Estimator />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>AI Budget Planning Guide</h2>
          
          <h3>Budget Allocation Framework</h3>
          <p>
            A well-structured AI budget should consider multiple cost categories and growth phases:
          </p>
          
          <h4>Cost Categories (Recommended Allocation)</h4>
          <ul>
            <li><strong>API Costs (40-60%):</strong> Direct model usage fees</li>
            <li><strong>Development (20-30%):</strong> Integration and customization</li>
            <li><strong>Infrastructure (10-20%):</strong> Hosting, monitoring, security</li>
            <li><strong>Training & Support (5-10%):</strong> Team education and support</li>
            <li><strong>Contingency (10-15%):</strong> Unexpected costs and scaling</li>
          </ul>
          
          <h3>Budget Planning by Company Stage</h3>
          
          <h4>Startup Phase ($100-1,000/month)</h4>
          <ul>
            <li><strong>Focus:</strong> Proof of concept and MVP development</li>
            <li><strong>Models:</strong> Budget-friendly options (GPT-5 mini, Gemini 2.0 Flash)</li>
            <li><strong>Use Cases:</strong> 1-2 core applications (chatbot, content generation)</li>
            <li><strong>Team Size:</strong> 1-5 people using AI tools</li>
          </ul>
          
          <h4>Growth Stage ($1,000-10,000/month)</h4>
          <ul>
            <li><strong>Focus:</strong> Scaling successful use cases, adding new applications</li>
            <li><strong>Models:</strong> Mix of budget and premium models</li>
            <li><strong>Use Cases:</strong> 3-5 applications across departments</li>
            <li><strong>Team Size:</strong> 10-50 people with AI access</li>
          </ul>
          
          <h4>Enterprise Stage ($10,000+/month)</h4>
          <ul>
            <li><strong>Focus:</strong> Organization-wide deployment, custom solutions</li>
            <li><strong>Models:</strong> Full range including premium models</li>
            <li><strong>Use Cases:</strong> 10+ applications, custom AI solutions</li>
            <li><strong>Team Size:</strong> 100+ people with varying AI needs</li>
          </ul>
          
          <h3>ROI Calculation Framework</h3>
          
          <h4>Cost Savings Metrics</h4>
          <ul>
            <li><strong>Time Savings:</strong> Hours saved × hourly rate × frequency</li>
            <li><strong>Quality Improvements:</strong> Reduced errors, better outcomes</li>
            <li><strong>Productivity Gains:</strong> Increased output per person</li>
            <li><strong>Customer Satisfaction:</strong> Faster response times, 24/7 availability</li>
          </ul>
          
          <h4>Example ROI Calculations</h4>
          
          <p><strong>Customer Support Automation:</strong></p>
          <ul>
            <li>AI Cost: $500/month</li>
            <li>Savings: 40 hours/week × $25/hour = $4,000/month</li>
            <li>ROI: 700% return on investment</li>
          </ul>
          
          <p><strong>Content Generation:</strong></p>
          <ul>
            <li>AI Cost: $300/month</li>
            <li>Savings: 20 hours/week × $50/hour = $4,000/month</li>
            <li>ROI: 1,233% return on investment</li>
          </ul>
          
          <h3>Budget Optimization Strategies</h3>
          
          <h4>Model Selection Optimization</h4>
          <ul>
            <li><strong>Tiered Architecture:</strong> Use appropriate model for each task complexity</li>
            <li><strong>Usage Monitoring:</strong> Track which models provide best ROI</li>
            <li><strong>Regular Review:</strong> Reassess model choices quarterly</li>
          </ul>
          
          <h4>Cost Control Measures</h4>
          <ul>
            <li><strong>Usage Limits:</strong> Set monthly caps per team/project</li>
            <li><strong>Approval Workflows:</strong> Require approval for high-cost operations</li>
            <li><strong>Monitoring Alerts:</strong> Get notified when approaching budget limits</li>
            <li><strong>Regular Audits:</strong> Review usage patterns and optimize</li>
          </ul>
          
          <h3>Scaling Your AI Budget</h3>
          
          <h4>Growth Planning</h4>
          <ul>
            <li>Plan for 20-30% monthly growth in early stages</li>
            <li>Budget for seasonal variations (holidays, product launches)</li>
            <li>Reserve 15-20% for experimentation with new models</li>
            <li>Consider volume discounts as usage scales</li>
          </ul>
          
          <h4>Budget Review Schedule</h4>
          <ul>
            <li><strong>Weekly:</strong> Monitor usage and spending trends</li>
            <li><strong>Monthly:</strong> Review ROI and adjust allocations</li>
            <li><strong>Quarterly:</strong> Reassess model choices and pricing</li>
            <li><strong>Annually:</strong> Strategic planning and budget setting</li>
          </ul>
          
          <h3>Common Budget Pitfalls to Avoid</h3>
          <ul>
            <li><strong>Underestimating Growth:</strong> AI usage often grows faster than expected</li>
            <li><strong>Ignoring Output Costs:</strong> Output tokens are typically 3-5x more expensive</li>
            <li><strong>Not Monitoring Usage:</strong> Lack of visibility leads to budget overruns</li>
            <li><strong>Over-Engineering:</strong> Using premium models for simple tasks</li>
            <li><strong>No Contingency:</strong> Not budgeting for unexpected costs or opportunities</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}