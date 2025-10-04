import axios from "axios";
import { SharkDetail, SharkSummary } from "../types/shark";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchSharks(): Promise<SharkSummary[]> {
  const response = await client.get<SharkSummary[]>("/sharks");
  return response.data;
}

export async function fetchSharkById(id: string): Promise<SharkDetail> {
  const response = await client.get<SharkDetail>(`/sharks/${id}`);
  return response.data;
}

export const apiConfig = {
  baseUrl: API_BASE_URL,
};
