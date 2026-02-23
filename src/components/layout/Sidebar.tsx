import SponsorCard from "@/components/monetize/SponsorCard";
import NewsletterCard from "@/components/monetize/NewsletterCard";
import UpgradeCard from "@/components/monetize/UpgradeCard";

export default function Sidebar() {
  return (
    <aside style={{ display: "grid", gap: 12 }}>
      <SponsorCard />
      <NewsletterCard />
      <UpgradeCard />
    </aside>
  );
}