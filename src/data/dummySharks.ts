import { SharkDetail, SharkSummary } from "../types/shark";

const baseDate = new Date();

const isoDaysAgo = (days: number) => {
  const dt = new Date(baseDate);
  dt.setDate(dt.getDate() - days);
  return dt.toISOString();
};

const detail = (partial: Partial<SharkDetail>): SharkDetail => ({
  id: partial.id ?? "",
  name: partial.name ?? "Unnamed",
  latitude: partial.latitude ?? 0,
  longitude: partial.longitude ?? 0,
  lastSeenAt: partial.lastSeenAt ?? baseDate.toISOString(),
  species: partial.species,
  gender: partial.gender,
  maturity: partial.maturity,
  lengthMeters: partial.lengthMeters,
  weightKg: partial.weightKg,
  currentDepthMeters: partial.currentDepthMeters,
  notes: partial.notes,
  tagId: partial.tagId,
  status: partial.status,
  previousLocations: partial.previousLocations ?? [],
  movementProbabilities: partial.movementProbabilities ?? [],
});

export const dummySharkDetails: SharkDetail[] = [
  detail({
    id: "shark-001",
    name: "Aqua",
    species: "Great White",
    gender: "Female",
    maturity: "Mature",
    lengthMeters: 4.9,
    weightKg: 1300,
    latitude: -33.8568,
    longitude: 151.2153,
    lastSeenAt: isoDaysAgo(0),
    notes: "Consistent coastal patrol with occasional offshore excursions.",
    tagId: "TAG-7781",
    status: "Active",
    previousLocations: [
      { timestamp: isoDaysAgo(1), latitude: -33.8611, longitude: 151.2092 },
      { timestamp: isoDaysAgo(2), latitude: -33.8675, longitude: 151.2018 },
      { timestamp: isoDaysAgo(3), latitude: -33.8739, longitude: 151.1954 },
    ],
    movementProbabilities: [
      { headingDegrees: 25, probability: 0.55, label: "NNE" },
      { headingDegrees: 320, probability: 0.32, label: "NW" },
      { headingDegrees: 140, probability: 0.13, label: "SE" },
    ],
  }),
  detail({
    id: "shark-002",
    name: "Brutus",
    species: "Bull Shark",
    gender: "Male",
    maturity: "Subadult",
    lengthMeters: 3.1,
    weightKg: 450,
    latitude: 25.7617,
    longitude: -80.1918,
    lastSeenAt: isoDaysAgo(0),
    notes: "Prefers brackish water around river mouths.",
    tagId: "TAG-3388",
    status: "Active",
    previousLocations: [
      { timestamp: isoDaysAgo(1), latitude: 25.7563, longitude: -80.1992 },
      { timestamp: isoDaysAgo(2), latitude: 25.7481, longitude: -80.2055 },
      { timestamp: isoDaysAgo(3), latitude: 25.7424, longitude: -80.2121 },
    ],
    movementProbabilities: [
      { headingDegrees: 190, probability: 0.47, label: "SSW" },
      { headingDegrees: 260, probability: 0.29, label: "W" },
      { headingDegrees: 145, probability: 0.24, label: "SE" },
    ],
  }),
  detail({
    id: "shark-003",
    name: "Coral",
    species: "Tiger Shark",
    gender: "Female",
    maturity: "Mature",
    lengthMeters: 4.3,
    weightKg: 900,
    latitude: 21.3069,
    longitude: -157.8583,
    lastSeenAt: isoDaysAgo(0),
    notes: "Slow-moving around reef edges with targeted dives.",
    tagId: "TAG-9921",
    status: "Resting",
    previousLocations: [
      { timestamp: isoDaysAgo(1), latitude: 21.3114, longitude: -157.8529 },
      { timestamp: isoDaysAgo(2), latitude: 21.3159, longitude: -157.8472 },
      { timestamp: isoDaysAgo(3), latitude: 21.3221, longitude: -157.8418 },
    ],
    movementProbabilities: [
      { headingDegrees: 45, probability: 0.51, label: "NE" },
      { headingDegrees: 120, probability: 0.34, label: "ESE" },
      { headingDegrees: 300, probability: 0.15, label: "WNW" },
    ],
  }),
];

export const dummySharkSummaries: SharkSummary[] = dummySharkDetails.map(
  ({ id, name, latitude, longitude, lastSeenAt }) => ({
    id,
    name,
    latitude,
    longitude,
    lastSeenAt,
  })
);
