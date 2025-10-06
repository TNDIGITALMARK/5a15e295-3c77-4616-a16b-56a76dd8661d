import { Navigation } from "@/components/navigation";
import { CreatorDiscoveryDashboard } from "@/components/creator-discovery-dashboard";

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CreatorDiscoveryDashboard />
    </div>
  );
}