import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { copyToClipboard, formatCurrency, shortenAddress } from "@/lib/utils";
import { useAccountSection } from "./hooks/useAccountSection";
import { Account } from "@/lib/domain/Transfer";

interface AccountSectionProps {
  account: Account | null;
  onAccountCreated: () => void;
}

export function AccountSection({
  account,
  onAccountCreated,
}: AccountSectionProps) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    loading,
    handleCreateAccount,
    toast,
  } = useAccountSection({ onAccountCreated });

  if (account) {
    return (
      <Card className="w-full animate-fade-in">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Balance</Label>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(account.balance)}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Wallet Address</Label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 rounded bg-muted p-2">
                {shortenAddress(account.walletAddress)}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  copyToClipboard(account.walletAddress);
                  toast({
                    description: "Address copied to clipboard",
                  });
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateAccount} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
