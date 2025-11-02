import axios from "axios";
import type { Customer } from "../types/customer";

const API_BASE = "http://localhost:3001";

export const fetchCustomers = async (filters: Record<string, string | undefined>): Promise<Customer[]> => {
  // build query params based on provided filters; for partial name matching we'll use q or like handling
  const params: Record<string, string> = {};

  // JSON Server supports simple query params; we'll do basic exact/like matching using 'q' for general search
  // For more control, in production you'd implement backend endpoints.
  const { firstName, lastName, dateOfBirth } = filters;
  if (firstName) params["firstName_like"] = firstName;
  if (lastName) params["lastName_like"] = lastName;
  if (dateOfBirth) params["dateOfBirth"] = dateOfBirth;

  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}/customers${query ? `?${query}` : ""}`;
  const res = await axios.get<Customer[]>(url);
  return res.data;
};
