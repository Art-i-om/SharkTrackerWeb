import axios from "axios";
import { SharkDetail, SharkSummary } from "../types/shark";
import { supabase } from "./supabase-client";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
// const API_BASE_URL = "http://localhost:8000";
const API_BASE_URL = "https://xicqpfyxppqanofrnrva.supabase.co";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchAllSharks(): Promise<SharkSummary[]> {
  try {
    const { data, error } = await supabase.functions.invoke('all-sharks');

    if (error) {
      console.error('Supabase function error:', error);
      throw error;
    }

    console.log('Recieved data:', data);
    return data;

  } catch (error) {
    console.error("Error while getting data", error);
    throw error;
  }
}

export async function fetchSharkById(id: number): Promise<SharkDetail> {
  try {
    const { data, error } = await supabase.functions.invoke(`get-shark-by-id?id=${id}`);

    if (error) {
      console.error('Supabase function error:', error);
      throw error;
    }

    console.log('Recieved data:', data);
    return data;

  } catch (error) {
    console.error("Error while getting data", error);
    throw error;
  }
}

export async function fetchSharks(): Promise<SharkSummary[]> {
  const response = await client.get<SharkSummary[]>("/all-sharks");
  return response.data;
}

// export async function fetchSharkById(id: number): Promise<SharkDetail> {
//   const response = await client.get<SharkDetail>(`/data/${id}`);
//   return response.data;
// }
//
// export const apiConfig = {
//   baseUrl: API_BASE_URL,
// };
