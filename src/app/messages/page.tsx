import { Navigation } from "@/components/navigation";
import { MessagingInterface } from "@/components/messaging-interface";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <MessagingInterface />
    </div>
  );
}