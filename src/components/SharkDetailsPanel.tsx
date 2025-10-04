import React from "react";
import { SharkDetail } from "../types/shark";

interface SharkDetailsPanelProps {
  shark: SharkDetail | null;
  isLoading: boolean;
  error: string | null;
}

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="details__row">
    <span className="details__label">{label}</span>
    <span className="details__value">{value ?? "-"}</span>
  </div>
);

const SharkDetailsPanel: React.FC<SharkDetailsPanelProps> = ({ shark, isLoading, error }) => {
  if (!shark) {
    return (
      <section className="details">
        <h2>Shark Details</h2>
        {isLoading ? <p>Loading...</p> : <p>Select a shark to view its profile.</p>}
      </section>
    );
  }

  const previousLocations = shark.previousLocations ?? [];

  return (
    <section className="details">
      <div className="details__header">
        <h2>{shark.name}</h2>
        <span className="details__status">{shark.status ?? "Unknown"}</span>
      </div>
      {error && <div className="details__error">{error}</div>}
      {isLoading && <div className="details__loading">Refreshing data...</div>}
      <div className="details__grid">
        <InfoRow label="Tag ID" value={shark.tagId} />
        <InfoRow label="Species" value={shark.species} />
        <InfoRow label="Gender" value={shark.gender} />
        <InfoRow label="Maturity" value={shark.maturity} />
        <InfoRow label="Length" value={shark.lengthMeters ? `${shark.lengthMeters.toFixed(1)} m` : null} />
        <InfoRow label="Weight" value={shark.weightKg ? `${Math.round(shark.weightKg)} kg` : null} />
        <InfoRow label="Current Depth" value={shark.currentDepthMeters ? `${Math.round(shark.currentDepthMeters)} m` : "Near surface"} />
        <InfoRow label="Last Seen" value={new Date(shark.lastSeenAt).toLocaleString()} />
        <InfoRow label="Coordinates" value={`${shark.latitude.toFixed(4)}, ${shark.longitude.toFixed(4)}`} />
      </div>
      {shark.notes && (
        <div className="details__notes">
          <h3>Notes</h3>
          <p>{shark.notes}</p>
        </div>
      )}
      {previousLocations.length > 0 && (
        <div className="details__history">
          <h3>Recent Positions</h3>
          <ul>
            {previousLocations.map((location) => (
              <li key={location.timestamp}>
                {new Date(location.timestamp).toLocaleDateString()} - {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SharkDetailsPanel;
