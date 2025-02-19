import { useToast } from "@/hooks/use-toast";
import { executeTransfer } from "@/lib/services/executeTransfer";
import { useState } from "react";

export const useTransferList = ({ onTransferExecuted }) => {
  const [executingId, setExecutingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExecute = async (transferId: string) => {
    setExecutingId(transferId);
    try {
      await executeTransfer(transferId);
      onTransferExecuted();
      toast({
        title: "Success",
        description: "Transfer executed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute transfer",
        variant: "destructive",
      });
    } finally {
      setExecutingId(null);
    }
  };

  return {
    executingId,
    handleExecute,
  };
};
