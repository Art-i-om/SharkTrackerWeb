export interface SharkSummary {
  id: number;
  name: string;
  geo_lat_deg: number;
  geo_lon_deg: number;
}

export interface MovementProbability {
  headingDegrees: number; // 0-360 bearing
  probability: number; // 0-1
  label?: string;
}

export interface SharkDetail extends SharkSummary {
  species?: string;
  notes?: string;
  createdAt: string,
  geo_lat_deg: number,
  geo_lon_deg: number,
  tagId?: string;
  tagFirmwareVersion: number;
  tagLastSeen: string;
  tagStatus: string;
  latestBatteryVoltage: number;
  latestUptime: number;
  mean24hTemperature: number;
  mean24hActivity: number;
  max24hBiteScore: number;
  previousLocations: Array<{
    timestamp: string;
    depth_cm: number;
    depth_max_cm: number;
    temperature: number;
    bite_score: number;
    activity_level: number;
    geo_lat_deg: number,
    geo_lon_deg: number
  }>
  movementProbabilities?: MovementProbability[];
  totalSurfacePackets: number;
  totalHealthPackets: number;
}
