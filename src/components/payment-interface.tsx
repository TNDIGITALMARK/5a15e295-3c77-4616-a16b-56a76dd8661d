"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Shield,
  Lock,
  Check,
  Calendar,
  User,
  DollarSign,
  Gift,
  Star,
  AlertTriangle,
  Info,
  Wallet,
  Smartphone,
  Globe,
  ChevronRight,
  Receipt
} from "lucide-react";

interface PaymentInterfaceProps {
  service: {
    id: string;
    title: string;
    price: number;
    duration: number;
  };
  creator: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
}

export function PaymentInterface({ service, creator }: PaymentInterfaceProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock fees calculation
  const subtotal = service.price;
  const platformFee = Math.round(subtotal * 0.05);
  const processingFee = 2.99;
  const total = subtotal + platformFee + processingFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Booking Summary */}
      <Card className="creator-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{creator.name}</span>
                {creator.verified && (
                  <Shield className="w-4 h-4 text-blue-400" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{service.title}</p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Verified
            </Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Duration</span>
              <span className="font-medium">{service.duration} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Scheduled for</span>
              <span className="font-medium">Today, 7:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Service Fee</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Platform Fee (5%)</span>
              <span className="text-muted-foreground">${platformFee}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Processing Fee</span>
              <span className="text-muted-foreground">${processingFee}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary">${total}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card className="creator-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/60 hover:border-primary/50">
              <RadioGroupItem value="card" id="card" />
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                Credit/Debit Card
                <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
              </Label>
              <Badge variant="secondary" className="text-xs">Most Popular</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/60 hover:border-primary/50">
              <RadioGroupItem value="crypto" id="crypto" />
              <Wallet className="w-5 h-5 text-muted-foreground" />
              <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                Cryptocurrency
                <p className="text-sm text-muted-foreground">Bitcoin, Ethereum, USDC</p>
              </Label>
              <Badge className="bg-primary/20 text-primary text-xs">Anonymous</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/60 hover:border-primary/50">
              <RadioGroupItem value="digital" id="digital" />
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <Label htmlFor="digital" className="flex-1 cursor-pointer">
                Digital Wallet
                <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, PayPal</p>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/60 hover:border-primary/50">
              <RadioGroupItem value="bank" id="bank" />
              <Globe className="w-5 h-5 text-muted-foreground" />
              <Label htmlFor="bank" className="flex-1 cursor-pointer">
                Bank Transfer
                <p className="text-sm text-muted-foreground">Direct transfer (2-3 business days)</p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Details Form */}
      {paymentMethod === 'card' && (
        <Card className="creator-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Card Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="elegant-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="elegant-input"
                />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  className="elegant-input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                className="elegant-input"
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger className="elegant-input">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security & Privacy */}
      <Card className="creator-card">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Your payment is secure and private</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• End-to-end encryption protects your financial information</li>
                <li>• We never store your complete card details</li>
                <li>• All transactions are processed through certified payment providers</li>
                <li>• Your booking information is kept completely confidential</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="creator-card">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the{" "}
              <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and{" "}
              <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
            </Label>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox id="cancellation" />
            <Label htmlFor="cancellation" className="text-sm leading-relaxed">
              I understand the{" "}
              <span className="text-primary hover:underline cursor-pointer">cancellation policy</span>
              {" "}(24-hour notice required for full refund)
            </Label>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox id="age" />
            <Label htmlFor="age" className="text-sm leading-relaxed">
              I confirm I am 18+ years of age and understand this is an adult service
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <div className="space-y-3">
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full sophisticated-button text-lg py-6"
          size="lg"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Processing Payment...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 mr-2" />
              Confirm & Pay ${total}
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>256-bit SSL encryption</span>
          <span>•</span>
          <span>PCI DSS compliant</span>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <DialogTitle className="text-2xl">Payment Successful!</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Your booking with {creator.name} has been confirmed.
            </p>

            <Card className="creator-card">
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-mono">#BK-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Paid:</span>
                  <span className="font-semibold">${total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scheduled:</span>
                  <span>Today, 7:00 PM</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full sophisticated-button">
                <Receipt className="w-4 h-4 mr-2" />
                View Booking Details
              </Button>
              <Button variant="outline" className="w-full">
                Download Receipt
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
              <Info className="w-3 h-3" />
              <span>You will receive a confirmation email shortly</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Methods Accepted */}
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground mb-3">We accept</p>
        <div className="flex justify-center gap-4 opacity-60">
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-xs font-mono">VISA</div>
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-xs font-mono">MC</div>
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-xs font-mono">AMEX</div>
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-xs font-mono">BTC</div>
          <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-xs font-mono">ETH</div>
        </div>
      </div>
    </div>
  );
}