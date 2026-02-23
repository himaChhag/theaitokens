import { modelsByProvider } from "@/lib/catalog";
import ModelPage from "../../models/[provider]/[slug]/page";

export function generateStaticParams(): { slug: string }[] {
  return modelsByProvider("openai").map((m) => ({ slug: m.slug }));
}

export default async function OpenAIModelPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <ModelPage params={Promise.resolve({ provider: "openai", slug })} />;
}