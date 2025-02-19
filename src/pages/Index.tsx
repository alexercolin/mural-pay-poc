import { useEffect, useState } from "react";
import { AccountSection } from "@/components/AcoountSection/AccountSection";
import { TransferForm } from "@/components/TransferForm/TransferForm";
import { TransferList } from "@/components/TransferList/TransferList";
import { Account, TransferRequest } from "@/lib/domain/Transfer";
import { getAccount } from "@/lib/services/getAccount";
import { getTransfers } from "@/lib/services/getTransfers";

const Index = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [transfers, setTransfers] = useState<TransferRequest[]>([]);

  const fetchAccount = async () => {
    try {
      const data = await getAccount(localStorage.getItem("accountId") || "");
      const { balance, address, id } = data;
      setAccount({ balance: balance.balance, walletAddress: address, id });
    } catch (error) {
      console.error("Failed to fetch account:", error);
    }
  };

  const fetchTransfers = async () => {
    try {
      const data = await getTransfers();
      if (!data.results.length) return;

      setTransfers(data.results);
    } catch (error) {
      console.error("Failed to fetch transfers:", error);
    }
  };

  useEffect(() => {
    fetchAccount();
    fetchTransfers();
  }, []);

  const handleAccountCreated = () => {
    fetchAccount();
  };

  const handleTransferCreated = () => {
    fetchTransfers();
  };

  const handleTransferExecuted = () => {
    fetchTransfers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Mural Pay Explorer</h1>
          <p className="mt-2 text-muted-foreground">
            Create accounts and manage transfers with ease
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <AccountSection
            account={account}
            onAccountCreated={handleAccountCreated}
          />
          <TransferForm onTransferCreated={handleTransferCreated} />
        </div>

        <TransferList
          transfers={transfers}
          onTransferExecuted={handleTransferExecuted}
        />
      </div>
    </div>
  );
};

export default Index;
