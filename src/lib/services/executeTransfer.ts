import { API_BASE_URL } from "../constants";

export async function executeTransfer(transferId: string) {
  const response = await fetch(`${API_BASE_URL}/transfer-requests/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      "mural-account-api-key": `${import.meta.env.VITE_MURAL_EXECUTE_API_KEY}`,
    },
    body: JSON.stringify({ transferRequestId: transferId }),
  });

  if (!response.ok) {
    throw new Error("Failed to execute transfer");
  }

  return response.json();
}
