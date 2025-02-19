import { API_BASE_URL } from "../constants";
import { CreateCustomerDto } from "../domain/Customer";

export async function createCustomer(data: CreateCustomerDto) {
  const response = await fetch(`${API_BASE_URL}/organizations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create customer");
  }

  return response.json();
}
