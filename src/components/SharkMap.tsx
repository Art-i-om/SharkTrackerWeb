import React, { useMemo } from "react";
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { MovementProbability, SharkDetail } from "../types/shark";

interface SharkMapProps {
  shark: SharkDetail | null;
}

const MAP_ZOOM = 15; // ~2km span depending on latitude
const DIRECTION_PROJECTION_KM = 1.2;

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
const toDegrees = (radians: number) => (radians * 180) / Math.PI;

const projectPoint = (latitude: number, longitude: number, bearingDegrees: number, distanceKm: number) => {
  const radiusEarthKm = 6371;
  const bearing = toRadians(bearingDegrees);
  const latRad = toRadians(latitude);
  const lonRad = toRadians(longitude);
  const angularDistance = distanceKm / radiusEarthKm;

  const projectedLat = Math.asin(
    Math.sin(latRad) * Math.cos(angularDistance) +
      Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
  );

  const projectedLon =
    lonRad +
    Math.atan2(
      Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
      Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(projectedLat)
    );

  return {
    latitude: toDegrees(projectedLat),
    longitude: toDegrees(projectedLon),
  };
};

const buildDirectionLines = (
  shark: SharkDetail
): Array<{ path: LatLngExpression[]; movement: MovementProbability }> => {
  const movements = shark.movementProbabilities ?? [];
  if (!movements.length) {
    return [];
  }

  return movements.map((movement) => {
    const destination = projectPoint(
      shark.geo_lat_deg,
      shark.geo_lon_deg,
      movement.headingDegrees,
      DIRECTION_PROJECTION_KM
    );

    return {
      path: [
        [shark.geo_lat_deg, shark.geo_lon_deg],
        [destination.latitude, destination.longitude],
      ],
      movement,
    };
  });
};

const SharkMap: React.FC<SharkMapProps> = ({ shark }) => {
  const center: LatLngExpression | undefined = shark ? [shark.geo_lat_deg, shark.geo_lon_deg] : undefined;
  const historyPoints = shark?.previousLocations ?? [];

  const directionLines = useMemo(() => (shark ? buildDirectionLines(shark) : []), [shark]);

  const trackLines = useMemo(() => {
    if (historyPoints.length < 2) return [];

    const lines = [];
    for (let i = 0; i < historyPoints.length - 1; i++) {
      lines.push([
        [historyPoints[i].geo_lat_deg, historyPoints[i].geo_lon_deg],
        [historyPoints[i + 1].geo_lat_deg, historyPoints[i + 1].geo_lon_deg]
      ] as LatLngExpression[]);
    }

    // Add line from last history point to current position
    if (shark && historyPoints.length > 0) {
      const lastPoint = historyPoints[historyPoints.length - 1];
      lines.push([
        [lastPoint.geo_lat_deg, lastPoint.geo_lon_deg],
        [shark.geo_lat_deg, shark.geo_lon_deg]
      ] as LatLngExpression[]);
    }

    return lines;
  }, [historyPoints, shark]);

  if (!shark || !center) {
    return <div className="map-view map-view--empty">Select a shark to visualize its movement.</div>;
  }

  return (
    <MapContainer
      className="map-view"
      center={center}
      zoom={MAP_ZOOM}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={markerIcon}>
        <Tooltip direction="top" offset={[0, -20]} permanent>
          {shark.name}
        </Tooltip>
      </Marker>
      {historyPoints.map((location, index) => (
        <CircleMarker
          key={location.timestamp}
          center={[location.geo_lat_deg, location.geo_lon_deg]}
          radius={6}
          pathOptions={{
            color: index === historyPoints.length - 1 ? "#e74c3c" : "#2f4858",
            fillColor: index === historyPoints.length - 1 ? "#e74c3c" : "#2f4858",
            fillOpacity: 0.7 }}
        >
          <Tooltip direction="top" offset={[0, -10]}>
            {new Date(location.timestamp).toLocaleDateString()}
          </Tooltip>
        </CircleMarker>
      ))}
      {trackLines.map((path, index) => (
          <Polyline
              key={`track-${index}`}
              positions={path}
              pathOptions={{ color: "#3498db", weight: 3, opacity: 0.8 }}
          />
      ))}
      {directionLines.map(({ path, movement }) => (
        <Polyline
          key={`${movement.headingDegrees}-${movement.probability}`}
          positions={path}
          pathOptions={{ color: "#f67280", weight: 4, opacity: 0.6 }}
        >
          <Tooltip permanent direction="center">
            {(movement.label ?? `${movement.headingDegrees.toFixed(0)} deg`)} -
            {` ${Math.round(movement.probability * 100)}%`}
          </Tooltip>
        </Polyline>
      ))}
    </MapContainer>
  );
};

export default SharkMap;
