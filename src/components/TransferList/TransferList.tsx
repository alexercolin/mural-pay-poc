import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useTransferList } from "./hooks/useTransferList";
import { TransferRequest } from "@/lib/domain/Transfer";

interface TransferListProps {
  transfers: TransferRequest[];
  onTransferExecuted: () => void;
}

export function TransferList({
  transfers,
  onTransferExecuted,
}: TransferListProps) {
  const { executingId, handleExecute } = useTransferList({
    onTransferExecuted,
  });
  const getStatusBadge = (status: TransferRequest["status"]) => {
    const variants = {
      pending: "warning",
      executed: "success",
      failed: "destructive",
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  console.log("transfer", transfers);
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Transfer Requests</CardTitle>
        <CardDescription>
          Manage your pending and executed transfers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">
                    {formatCurrency(
                      transfer.recipientsInfo[0].tokenAmount.toString()
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                  <TableCell>
                    {new Date(transfer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {transfer.status === "IN_REVIEW" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExecute(transfer.id)}
                        disabled={executingId === transfer.id}
                      >
                        {executingId === transfer.id
                          ? "Executing..."
                          : "Execute"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {transfers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No transfers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
