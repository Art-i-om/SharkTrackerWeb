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
        {/*<span className="details__status">{shark.status ?? "Active"}</span>*/}
        <span className="details__status">{"Active"}</span>
      </div>
      {error && <div className="details__error">{error}</div>}
      {isLoading && <div className="details__loading">Refreshing data...</div>}
      <div className="details__grid">
        <InfoRow label="Tag ID" value={shark.tagId} />
        <InfoRow label="Species" value={shark.species} />
        <InfoRow label="Tag Firmware Version" value={shark.tagFirmwareVersion ? `${shark.tagFirmwareVersion.toFixed(1)}` : null} />
        <InfoRow label="Tag Last Seen" value={shark.tagLastSeen ? `${shark.tagLastSeen}` : null} />
        <InfoRow label="Tag Status" value={shark.tagStatus ? `${shark.tagStatus}` : "Near surface"} />
        <InfoRow label="Latest Battery Voltage" value={shark.latestBatteryVoltage ? `${shark.latestBatteryVoltage}` : 5.6} />
        <InfoRow label="Latest uptime" value={shark.latestUptime ? `${shark.latestUptime}` : 4124} />
        <InfoRow label="Max 24h bite score" value={shark.max24hBiteScore ? `${shark.max24hBiteScore}` : 42} />
        <InfoRow label="Mean 24h temperature" value={shark.mean24hTemperature ? `${shark.mean24hTemperature}` : 18} />
        <InfoRow label="Total surface packets" value={shark.totalSurfacePackets ? `${shark.totalSurfacePackets}` : 50} />
        <InfoRow label="Coordinates" value={`${shark.geo_lat_deg.toFixed(4)}, ${shark.geo_lon_deg.toFixed(4)}`} />
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
                {new Date(location.timestamp).toLocaleDateString()} - {location.geo_lat_deg.toFixed(4)}, {location.geo_lon_deg.toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SharkDetailsPanel;
