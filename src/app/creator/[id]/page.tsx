import { Navigation } from "@/components/navigation";
import { CreatorProfile } from "@/components/creator-profile";

interface CreatorPageProps {
  params: {
    id: string;
  };
}

export default function CreatorPage({ params }: CreatorPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CreatorProfile creatorId={params.id} />
    </div>
  );
}