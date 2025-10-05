import { SharkDetail, SharkSummary } from "../types/shark";

const baseDate = new Date();

const isoDaysAgo = (days: number) => {
  const dt = new Date(baseDate);
  dt.setDate(dt.getDate() - days);
  return dt.toISOString();
};

const detail = (partial: Partial<SharkDetail>): SharkDetail => ({
  id: partial.id ?? -1,
  name: partial.name ?? "Unnamed",
  geo_lat_deg: partial.geo_lat_deg ?? 0,
  geo_lon_deg: partial.geo_lon_deg ?? 0,
  species: partial.species,
  notes: partial.notes,
  tagId: partial.tagId,
  tagFirmwareVersion: partial.tagFirmwareVersion ?? 0,
  tagLastSeen: partial.tagLastSeen,
  tagStatus: partial.tagStatus ?? "Inactive",
  latestBatteryVoltage: partial.latestBatteryVoltage ?? 0,
  latestUptime: partial.latestUptime ?? 0,
  mean24hTemperature: partial.mean24hTemperature ?? 0,
  mean24hActivity: partial.mean24hActivity ?? 0,
  max24hBiteScore: partial.max24hBiteScore ?? 0,
  previousLocations: partial.previousLocations ?? [],
  movementProbabilities: partial.movementProbabilities ?? [],
  totalHealthPackets: partial.totalHealthPackets ?? 0,
  totalSurfacePackets: partial.totalSurfacePackets ?? 0,
  createdAt: partial.createdAt ?? new Date().toISOString()
});

export const dummySharkDetails: SharkDetail[] = [
  detail({
    id: 1,
    name: "Aqua",
    species: "Great White",
    geo_lat_deg: -33.8568,
    geo_lon_deg: 151.2153,
    notes: "Consistent coastal patrol with occasional offshore excursions.",
    tagId: "TAG-7781",
    previousLocations: [
      {
        timestamp: isoDaysAgo(1),
        geo_lat_deg: -33.8611,
        geo_lon_deg: 151.2092,
        depth_cm: 250,
        depth_max_cm: 400,
        temperature: 18.5,
        bite_score: 3,
        activity_level: 7
      },
      {
        timestamp: isoDaysAgo(2),
        geo_lat_deg: -33.8675,
        geo_lon_deg: 151.2018,
        depth_cm: 180,
        depth_max_cm: 350,
        temperature: 19.2,
        bite_score: 2,
        activity_level: 5
      },
      {
        timestamp: isoDaysAgo(3),
        geo_lat_deg: -33.8739,
        geo_lon_deg: 151.1954,
        depth_cm: 320,
        depth_max_cm: 480,
        temperature: 17.8,
        bite_score: 4,
        activity_level: 8
      }
    ],
    movementProbabilities: [
      { headingDegrees: 25, probability: 0.55, label: "NNE" },
      { headingDegrees: 320, probability: 0.32, label: "NW" },
      { headingDegrees: 140, probability: 0.13, label: "SE" },
    ],
  }),
  detail({
    id: 2,
    name: "Brutus",
    species: "Bull Shark",
    geo_lat_deg: 25.7617,
    geo_lon_deg: -80.1918,
    notes: "Prefers brackish water around river mouths.",
    tagId: "TAG-3388",
    previousLocations: [
      {
        timestamp: isoDaysAgo(1),
        geo_lat_deg: 25.7563,
        geo_lon_deg: -80.1992,
        depth_cm: 150,
        depth_max_cm: 200,
        temperature: 24.1,
        bite_score: 5,
        activity_level: 9
      },
      {
        timestamp: isoDaysAgo(2),
        geo_lat_deg: 25.7481,
        geo_lon_deg: -80.2055,
        depth_cm: 120,
        depth_max_cm: 180,
        temperature: 24.8,
        bite_score: 6,
        activity_level: 8
      },
      {
        timestamp: isoDaysAgo(3),
        geo_lat_deg: 25.7424,
        geo_lon_deg: -80.2121,
        depth_cm: 90,
        depth_max_cm: 140,
        temperature: 25.2,
        bite_score: 4,
        activity_level: 6
      }
    ],
    movementProbabilities: [
      { headingDegrees: 190, probability: 0.47, label: "SSW" },
      { headingDegrees: 260, probability: 0.29, label: "W" },
      { headingDegrees: 145, probability: 0.24, label: "SE" },
    ],
  }),
  detail({
    id: 3,
    name: "Coral",
    species: "Tiger Shark",
    geo_lat_deg: 21.3069,
    geo_lon_deg: -157.8583,
    notes: "Slow-moving around reef edges with targeted dives.",
    tagId: "TAG-9921",
    previousLocations: [
      {
        timestamp: isoDaysAgo(1),
        geo_lat_deg: 21.3114,
        geo_lon_deg: -157.8529,
        depth_cm: 300,
        depth_max_cm: 450,
        temperature: 22.3,
        bite_score: 2,
        activity_level: 4
      },
      {
        timestamp: isoDaysAgo(2),
        geo_lat_deg: 21.3159,
        geo_lon_deg: -157.8472,
        depth_cm: 280,
        depth_max_cm: 420,
        temperature: 22.7,
        bite_score: 1,
        activity_level: 3
      },
      {
        timestamp: isoDaysAgo(3),
        geo_lat_deg: 21.3221,
        geo_lon_deg: -157.8418,
        depth_cm: 350,
        depth_max_cm: 500,
        temperature: 21.9,
        bite_score: 3,
        activity_level: 5
      }
    ],
    movementProbabilities: [
      { headingDegrees: 45, probability: 0.51, label: "NE" },
      { headingDegrees: 120, probability: 0.34, label: "ESE" },
      { headingDegrees: 300, probability: 0.15, label: "WNW" },
    ],
  }),
];

export const dummySharkSummaries: SharkSummary[] = dummySharkDetails.map(
  ({ id, name, geo_lat_deg, geo_lon_deg }) => ({
    id,
    name,
    geo_lat_deg: geo_lat_deg,
    geo_lon_deg: geo_lon_deg,
  })
);
