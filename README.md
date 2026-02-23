# The AI Tokens

A comprehensive AI token counter and cost calculator supporting 45+ models from 9 major AI providers. Calculate token costs, compare pricing, and optimize your AI usage with accurate, up-to-date information.

🌐 **Live Site:** [theaitokens.com](https://theaitokens.com)

## ✨ Features

- **Token Counter**: Accurate token counting using provider-native tokenizers
- **Cost Calculator**: Real-time cost calculations with verified pricing data
- **Model Comparison**: Side-by-side comparisons of AI models and pricing
- **45+ AI Models**: Support for models from OpenAI, Anthropic, Google, Meta, xAI, Cohere, and more
- **Budget Planning**: Tools to help optimize AI usage and costs
- **Educational Resources**: Comprehensive guides about AI tokens and pricing

## 🤖 Supported Providers

| Provider        | Models                     | Features                     |
| --------------- | -------------------------- | ---------------------------- |
| **OpenAI**      | GPT-4, GPT-4o, GPT-3.5     | Chat, completion, embeddings |
| **Anthropic**   | Claude 3.5, Claude 3       | Chat, analysis, reasoning    |
| **Google**      | Gemini Pro, Gemini Flash   | Multimodal, fast inference   |
| **Meta**        | Llama 3.1, Llama 3.2       | Open source, customizable    |
| **xAI**         | Grok-2, Grok-beta          | Real-time information        |
| **Cohere**      | Command R+, Command R      | Enterprise-focused           |
| **Together AI** | Various open source models | Cost-effective hosting       |
| **Groq**        | Ultra-fast inference       | Lightning-speed processing   |
| **Perplexity**  | Search-augmented models    | Web-connected AI             |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/himaChhag/theaitokens.git
cd theaitokens
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Add your environment variables:

```env
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_ADSENSE_ID=your_adsense_client_id
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Analytics**: Google Analytics, Vercel Analytics
- **Deployment**: Vercel
- **Tokenizers**: Provider-native tokenizers for accuracy

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (site)/            # Main site pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── estimator/         # Token counter & calculator
│   ├── layout/            # Layout components
│   └── seo/               # SEO components
├── lib/                   # Utility libraries
│   ├── catalog/           # AI model definitions
│   ├── tokens/            # Tokenizer implementations
│   └── pricing/           # Pricing calculations
└── styles/                # Global styles
```

## 🔧 Key Features Implementation

### Token Counting

- Uses provider-native tokenizers for maximum accuracy
- Supports text, chat, and completion formats
- Real-time counting as you type

### Cost Calculation

- Up-to-date pricing from official sources
- Input/output token differentiation
- Bulk pricing and volume discounts

### Model Comparison

- Side-by-side feature comparison
- Performance benchmarks
- Cost-effectiveness analysis

## 📚 Official Sources & Verification

We verify all model information and pricing from official provider sources to ensure accuracy:

### OpenAI

- **Pricing**: [OpenAI Pricing](https://openai.com/pricing)
- **Models**: [OpenAI Models Documentation](https://platform.openai.com/docs/models)
- **API Reference**: [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- **Tokenizer**: [OpenAI Tokenizer](https://platform.openai.com/tokenizer)

### Anthropic

- **Pricing**: [Anthropic Pricing](https://www.anthropic.com/pricing)
- **Models**: [Claude Models Overview](https://docs.anthropic.com/claude/docs/models-overview)
- **API Documentation**: [Anthropic API Reference](https://docs.anthropic.com/claude/reference/)
- **Console**: [Anthropic Console](https://console.anthropic.com/)

### Google (Gemini)

- **Pricing**: [Google AI Pricing](https://ai.google.dev/pricing)
- **Models**: [Gemini Models](https://ai.google.dev/models/gemini)
- **API Documentation**: [Google AI API](https://ai.google.dev/docs)
- **AI Studio**: [Google AI Studio](https://aistudio.google.com/)

### Meta (Llama)

- **Models**: [Llama Models](https://llama.meta.com/)
- **Documentation**: [Llama Documentation](https://llama.meta.com/docs/)
- **GitHub**: [Meta Llama Repository](https://github.com/meta-llama)
- **Hugging Face**: [Meta Llama on Hugging Face](https://huggingface.co/meta-llama)

### xAI (Grok)

- **Pricing**: [xAI API Pricing](https://x.ai/api)
- **Documentation**: [xAI API Documentation](https://docs.x.ai/)
- **Console**: [xAI Console](https://console.x.ai/)
- **Models**: [Grok Models Information](https://x.ai/grok)

### Cohere

- **Pricing**: [Cohere Pricing](https://cohere.com/pricing)
- **Models**: [Cohere Models](https://docs.cohere.com/docs/models)
- **API Documentation**: [Cohere API Reference](https://docs.cohere.com/reference/)
- **Dashboard**: [Cohere Dashboard](https://dashboard.cohere.com/)

### Together AI

- **Pricing**: [Together AI Pricing](https://www.together.ai/pricing)
- **Models**: [Together AI Models](https://docs.together.ai/docs/inference-models)
- **API Documentation**: [Together AI API](https://docs.together.ai/reference/)
- **Playground**: [Together AI Playground](https://api.together.xyz/playground)

### Groq

- **Pricing**: [Groq Pricing](https://groq.com/pricing/)
- **Models**: [Groq Models](https://console.groq.com/docs/models)
- **API Documentation**: [Groq API Reference](https://console.groq.com/docs/api-reference)
- **Console**: [Groq Console](https://console.groq.com/)

### Perplexity

- **Pricing**: [Perplexity API Pricing](https://www.perplexity.ai/hub/pricing)
- **Documentation**: [Perplexity API Docs](https://docs.perplexity.ai/)
- **Models**: [Perplexity Models](https://docs.perplexity.ai/docs/model-cards)
- **Hub**: [Perplexity Hub](https://www.perplexity.ai/hub)

### Additional Resources

- **Hugging Face**: [Model Hub](https://huggingface.co/models) - For open source model specifications
- **Papers with Code**: [ML Papers](https://paperswithcode.com/) - For model benchmarks and research
- **GitHub Repositories**: Individual model repositories for technical specifications
- **Provider Blogs**: Official announcements and updates from each provider
- **API Status Pages**: Real-time service status and updates

### Verification Process

1. **Daily Monitoring**: Automated checks for pricing updates
2. **Official Announcements**: Tracking provider blogs and social media
3. **API Testing**: Regular testing of tokenizers and pricing calculations
4. **Community Reports**: User feedback and error reports
5. **Manual Verification**: Cross-referencing multiple official sources

**Note**: All information is gathered from publicly available official sources. We do not have special access or partnerships with any providers.

## 📊 Analytics & Monetization

- Google Analytics for usage tracking
- Google AdSense for revenue generation
- Privacy-compliant data collection
- No storage of user input text

## ⚖️ Legal & Compliance

- **Independence**: Not affiliated with any AI provider
- **Best Efforts**: Information maintained on best-efforts basis
- **No Guarantees**: Users should verify with official sources
- **Privacy**: Token counting happens client-side
- **Terms**: Comprehensive terms of service and privacy policy

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

### Reporting Issues

- Found incorrect pricing? Email us at theaitokens@gmail.com
- Discovered a bug? Please provide detailed reproduction steps
- Have a feature request? We'd love to hear your ideas

### Development

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Contact

- **Email**: theaitokens@gmail.com
- **Website**: [theaitokens.com](https://theaitokens.com)

## 📄 License

This project is for educational and personal use. All AI provider names, logos, and trademarks are property of their respective owners.

## 🙏 Acknowledgments

- Thanks to all AI providers for their innovative models
- Built with Next.js and deployed on Vercel
- Inspired by the need for transparent AI pricing information

---

**Disclaimer**: The AI Tokens is an independent website not affiliated with any AI provider. Information is maintained on a best-efforts basis. Always verify pricing with official sources before making business decisions.
