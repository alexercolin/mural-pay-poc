import { useToast } from "@/hooks/use-toast";
import { OrganizationType } from "@/lib/domain/Transfer";
import { createAccount } from "@/lib/services/createAccount";
import { createCustomer } from "@/lib/services/createCustomer";
import { useState } from "react";

export const useAccountSection = ({ onAccountCreated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Creating account...");
    try {
      const customer = await createAccount({
        name: `${firstName} ${lastName}`,
        // organizationType: OrganizationType.Business,
      });

      localStorage.setItem("accountId", customer.id);
      onAccountCreated();
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error) {
      console.log("Error creating account", error);
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    loading,
    handleCreateAccount,
    toast,
  };
};
