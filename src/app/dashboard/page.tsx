import { Navigation } from "@/components/navigation";
import { CreatorDashboard } from "@/components/creator-dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CreatorDashboard />
    </div>
  );
}