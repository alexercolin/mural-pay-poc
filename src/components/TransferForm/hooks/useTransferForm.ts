import { useToast } from "@/hooks/use-toast";
import { OrganizationType, TransferType } from "@/lib/domain/Transfer";
import { createTransferRequest } from "@/lib/services/createTransferRequest";
import { useState } from "react";

export const useTransferForm = ({ onTransferCreated }) => {
  const [amount, setAmount] = useState("");
  const [recipientBank, setRecipientBank] = useState("");
  const [email, setEmail] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTransferRequest({
        payoutAccountId: "d2bed531-0f1c-464b-9a44-be283f786cec",
        recipientsInfo: [
          {
            name: recipientName,
            tokenAmount: Number(amount),
            email,
            recipientType: OrganizationType.Individual,
            recipientTransferType: TransferType.Blockchain,
            dateOfBirth,
            walletDetails: {
              walletAddress: recipientAccount,
              blockchain: "POLYGON",
            },
          },
        ],
      });
      onTransferCreated();
      toast({
        title: "Success",
        description: "Transfer request created successfully!",
      });
      setAmount("");
      setRecipientBank("");
      setRecipientAccount("");
      setRecipientName("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create transfer request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
