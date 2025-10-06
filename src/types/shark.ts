export interface SharkSummary {
  id: number;
  name: string;
  geo_lat_deg: number;
  geo_lon_deg: number;
}

export interface PreviousLocation {
  timestamp: string;
  depth_cm: number;
  depth_max_cm: number;
  temperature: number;
  bite_score: number;
  activity_level: number;
  geo_lat_deg: number,
  geo_lon_deg: number
}

export interface PredictedLocation {
  timestamp: string;
  speed_mps: number;
  heading_deg: number;
  geo_lat_deg: number;
  geo_lon_deg: number
}

export interface SharkDetail extends SharkSummary {
  species?: string;
  notes?: string;
  createdAt: string,
  geo_lat_deg: number,
  geo_lon_deg: number,
  tagId?: string;
  tagFirmwareVersion: number;
  tagLastSeen?: string;
  tagStatus: string;
  latestBatteryVoltage: number;
  latestUptime: number;
  mean24hTemperature: number;
  mean24hActivity: number;
  max24hBiteScore: number;
  previousLocations: PreviousLocation[];
  predictedLocations?: PredictedLocation[];
  totalSurfacePackets: number;
  totalHealthPackets: number;
}
