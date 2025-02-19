import { API_BASE_URL } from "../constants";
import { CreateTransferRequestDto } from "../domain/Customer";

export async function createTransferRequest(data: CreateTransferRequestDto) {
  const response = await fetch(`${API_BASE_URL}/transfer-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create transfer request");
  }

  return response.json();
}
