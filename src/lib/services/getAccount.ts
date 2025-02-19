import { API_BASE_URL } from "../constants";

export async function getAccount(customerId: string) {
  const response = await fetch(`${API_BASE_URL}/accounts/${customerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch account");
  }

  return response.json();
}
