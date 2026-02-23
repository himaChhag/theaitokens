import SponsorCard from "@/components/monetize/SponsorCard";
import UpgradeCard from "@/components/monetize/UpgradeCard";

export default function Sidebar() {
  return (
    <aside style={{ display: "grid", gap: 12 }}>
      <SponsorCard />
      <UpgradeCard />
    </aside>
  );
}