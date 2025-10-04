export interface SharkSummary {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lastSeenAt: string;
}

export interface MovementProbability {
  headingDegrees: number; // 0-360 bearing
  probability: number; // 0-1
  label?: string;
}

export interface SharkDetail extends SharkSummary {
  species?: string;
  gender?: "Male" | "Female" | "Unknown";
  maturity?: string;
  lengthMeters?: number;
  weightKg?: number;
  currentDepthMeters?: number;
  notes?: string;
  tagId?: string;
  status?: string;
  previousLocations?: Array<{
    timestamp: string;
    latitude: number;
    longitude: number;
  }>;
  movementProbabilities?: MovementProbability[];
}
