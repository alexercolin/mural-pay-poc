import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTransferForm } from "./hooks/useTransferForm";

interface TransferFormProps {
  onTransferCreated: () => void;
}

export function TransferForm({ onTransferCreated }: TransferFormProps) {
  const {
    amount,
    setAmount,
    recipientBank,
    setRecipientBank,
    email,
    setEmail,
    recipientAccount,
    setRecipientAccount,
    recipientName,
    setRecipientName,
    dateOfBirth,
    setDateOfBirth,
    loading,
    handleSubmit,
  } = useTransferForm({ onTransferCreated });

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Create Transfer Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (COP)</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientBank">Recipient Bank</Label>
            <Input
              id="recipientBank"
              value={recipientBank}
              onChange={(e) => setRecipientBank(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientAccount">Recipient Account Number</Label>
            <Input
              id="recipientAccount"
              value={recipientAccount}
              onChange={(e) => setRecipientAccount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientName">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Transfer Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
