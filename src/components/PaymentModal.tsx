import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Smartphone, QrCode, CheckCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  creator: string;
  price: string;
  originalPrice?: string;
  type: 'course' | 'asset';
}

const PaymentModal = ({ isOpen, onClose, title, creator, price, originalPrice, type }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'qr'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);

    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setNameOnCard('');
      setUpiId('');
    }, 3000);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UPI://pay?pa=${creator.toLowerCase().replace(' ', '')}@upi&pn=${encodeURIComponent(creator)}&am=${price.replace('₹', '')}&cu=INR&tn=${encodeURIComponent(`Payment for ${title}`)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Complete Your Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Purchase Details */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">by {creator}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-primary">{price}</span>
                  {originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {type === 'course' ? 'Full lifetime access to course materials' : 'Downloadable asset with commercial license'}
                </p>
              </div>
            </CardContent>
          </Card>

          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground">Your {type} has been added to your account.</p>
            </div>
          ) : (
            <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'card' | 'upi' | 'qr')}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="upi" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  UPI
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  QR Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      placeholder="John Doe"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upi" className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Smartphone className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm text-gray-600">
                      Enter your UPI ID to proceed with payment
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                    <img
                      src={qrCodeUrl}
                      alt="Payment QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your UPI app to complete payment
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>UPI ID: {creator.toLowerCase().replace(' ', '')}@upi</p>
                    <p>Amount: {price}</p>
                    <p>Note: Payment for {title}</p>
                  </div>
                </div>
              </TabsContent>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? 'Processing...' : `Pay ${price}`}
                </Button>
              </div>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
