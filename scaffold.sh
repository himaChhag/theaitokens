#!/usr/bin/env bash
set -euo pipefail

# Run from Next.js project root
# Creates folders + empty files for the structure you listed.

dirs=(
  "app/(site)"
  "app/(site)/tools/token-counter"
  "app/(site)/tools/cost-calculator"
  "app/(site)/models/[provider]/[slug]"
  "app/api/estimate"
  "components/estimator"
  "components/layout"
  "components/monetize"
  "lib/catalog"
  "lib/pricing"
  "lib/seo"
  "lib/tokens"
  "styles"
)

files=(
  "app/(site)/layout.tsx"
  "app/(site)/page.tsx"
  "app/(site)/tools/token-counter/page.tsx"
  "app/(site)/tools/cost-calculator/page.tsx"
  "app/(site)/models/[provider]/[slug]/page.tsx"
  "app/api/estimate/route.ts"
  "app/robots.ts"
  "app/sitemap.ts"

  "components/estimator/Estimator.tsx"
  "components/layout/Container.tsx"
  "components/layout/Header.tsx"
  "components/layout/Footer.tsx"
  "components/layout/Sidebar.tsx"
  "components/monetize/NewsletterCard.tsx"
  "components/monetize/SponsorCard.tsx"
  "components/monetize/UpgradeCard.tsx"

  "lib/catalog/types.ts"
  "lib/catalog/openai.ts"
  "lib/catalog/anthropic.ts"
  "lib/catalog/gemini.ts"
  "lib/catalog/index.ts"
  "lib/pricing/band.ts"
  "lib/pricing/math.ts"
  "lib/seo/slugs.ts"
  "lib/tokens/types.ts"
  "lib/tokens/openai.ts"
  "lib/tokens/anthropic.ts"
  "lib/tokens/gemini.ts"
  "lib/tokens/index.ts"

  "styles/globals.css"
)

echo "Creating directories..."
for d in "${dirs[@]}"; do
  mkdir -p "$d"
done

echo "Creating files..."
for f in "${files[@]}"; do
  mkdir -p "$(dirname "$f")"
  if [[ ! -f "$f" ]]; then
    cat > "$f" <<'EOF'
EOF
    echo "  + $f"
  else
    echo "  = $f (exists, skipped)"
  fi
done

echo "Done ✅"