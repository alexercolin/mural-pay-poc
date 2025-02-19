import { API_BASE_URL } from "../constants";

export async function getTransfers() {
  const response = await fetch(`${API_BASE_URL}/transfer-requests`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transfers");
  }

  return response.json();
}
