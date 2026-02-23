import { modelsByProvider } from "@/lib/catalog";
import ModelPage from "../../models/[provider]/[slug]/page";

export function generateStaticParams(): { slug: string }[] {
  return modelsByProvider("anthropic").map((m) => ({ slug: m.slug }));
}

export default async function ClaudeModelPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <ModelPage params={Promise.resolve({ provider: "claude", slug })} />;
}