import { Navigation } from "@/components/navigation";
import { PaymentInterface } from "@/components/payment-interface";

export default function PaymentPage() {
  // Mock data for demo
  const mockService = {
    id: 's1',
    title: 'Premium Lifestyle Consultation',
    price: 300,
    duration: 60
  };

  const mockCreator = {
    id: '1',
    name: 'Sophia Rose',
    avatar: '/api/placeholder/200/200',
    verified: true
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8">
        <PaymentInterface service={mockService} creator={mockCreator} />
      </div>
    </div>
  );
}