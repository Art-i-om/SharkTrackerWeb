// import React, { useMemo } from "react";
// import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip } from "react-leaflet";
// import L, { LatLngExpression } from "leaflet";
// import { SharkDetail } from "../types/shark";
// import { useFocusOnShark } from "../hooks/useFocusOnShark";
//
// interface SharkMapProps {
//   shark: SharkDetail | null;
// }
//
// const MAP_ZOOM = 15;
//
// const markerIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });
//
// const SharkMap: React.FC<SharkMapProps> = ({ shark }) => {
//   const center: LatLngExpression | undefined = shark ? [shark.geo_lat_deg, shark.geo_lon_deg] : undefined;
//   const historyPoints = shark?.previousLocations ?? [];
//   const predictedPoints = shark?.predictedLocations ?? [];
//
//   const trackLines = useMemo(() => {
//     if (historyPoints.length < 2) return [];
//
//     const lines = [];
//     for (let i = 0; i < historyPoints.length - 1; i++) {
//       lines.push([
//         [historyPoints[i].geo_lat_deg, historyPoints[i].geo_lon_deg],
//         [historyPoints[i + 1].geo_lat_deg, historyPoints[i + 1].geo_lon_deg]
//       ] as LatLngExpression[]);
//     }
//
//     if (shark && historyPoints.length > 0) {
//       const lastPoint = historyPoints[historyPoints.length - 1];
//       lines.push([
//         [lastPoint.geo_lat_deg, lastPoint.geo_lon_deg],
//         [shark.geo_lat_deg, shark.geo_lon_deg]
//       ] as LatLngExpression[]);
//     }
//
//     return lines;
//   }, [historyPoints, shark]);
//
//   const predictedLines = useMemo(() => {
//     if (predictedPoints.length === 0 || !shark) return [];
//
//     const lines = [];
//
//     // Connect current position to first predicted point
//     lines.push([
//       [shark.geo_lat_deg, shark.geo_lon_deg],
//       [predictedPoints[0].geo_lat_deg, predictedPoints[0].geo_lon_deg]
//     ] as LatLngExpression[]);
//
//     // Connect predicted points to each other
//     for (let i = 0; i < predictedPoints.length - 1; i++) {
//       lines.push([
//         [predictedPoints[i].geo_lat_deg, predictedPoints[i].geo_lon_deg],
//         [predictedPoints[i + 1].geo_lat_deg, predictedPoints[i + 1].geo_lon_deg]
//       ] as LatLngExpression[]);
//     }
//
//     return lines;
//   }, [predictedPoints, shark]);
//
//
//   if (!shark || !center) {
//     return <div className="map-view map-view--empty">Select a shark to visualize its movement.</div>;
//   }
//
//   return (
//       <MapContainer
//           className="map-view"
//           center={center}
//           zoom={MAP_ZOOM}
//           style={{ height: "100%", width: "100%" }}
//           scrollWheelZoom
//       >
//         <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={center} icon={markerIcon}>
//           <Tooltip direction="top" offset={[0, -20]} permanent>
//             {shark.name}
//           </Tooltip>
//         </Marker>
//         {historyPoints.map((location, index) => (
//             <CircleMarker
//                 key={`history-${index}`}
//                 center={[location.geo_lat_deg, location.geo_lon_deg]}
//                 radius={6}
//                 pathOptions={{
//                   color: "#2f4858",
//                   fillColor: "#3498db",
//                   fillOpacity: 0.7
//                 }}
//             >
//               <Tooltip direction="top" offset={[0, -10]}>
//                 Previous: {new Date(location.timestamp).toLocaleDateString()}
//               </Tooltip>
//             </CircleMarker>
//         ))}
//         {trackLines.map((path, index) => (
//             <Polyline
//                 key={`track-${index}`}
//                 positions={path}
//                 pathOptions={{ color: "#3498db", weight: 3, opacity: 0.8 }}
//             />
//         ))}
//         {predictedPoints.map((location, index) => (
//             <CircleMarker
//                 key={`predicted-${index}`}
//                 center={[location.geo_lat_deg, location.geo_lon_deg]}
//                 radius={8}
//                 pathOptions={{
//                   color: "#c0392b",
//                   fillColor: "#e74c3c",
//                   fillOpacity: 0.6
//                 }}
//             >
//               <Tooltip direction="top" offset={[0, -10]}>
//                 Predicted: {new Date(location.timestamp).toLocaleDateString()}
//                 {location.speed_mps ? `, Speed: ${location.speed_mps.toFixed(1)} m/s` : ""}
//               </Tooltip>
//             </CircleMarker>
//         ))}
//         {predictedLines.map((path, index) => (
//             <Polyline
//                 key={`predicted-line-${index}`}
//                 positions={path}
//                 pathOptions={{
//                   color: "#e74c3c",
//                   weight: 3,
//                   opacity: 0.6,
//                   dashArray: "10, 10"
//                 }}
//             />
//         ))}
//       </MapContainer>
//   );
// };
//
// export default SharkMap;

import React, { useMemo, useEffect } from "react";
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { SharkDetail } from "../types/shark";

interface SharkMapProps {
  shark: SharkDetail | null;
}

const MAP_ZOOM = 15;

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle map view updates
const MapViewController: React.FC<{ center: LatLngExpression; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const SharkMap: React.FC<SharkMapProps> = ({ shark }) => {
  const center: LatLngExpression = shark ? [shark.geo_lat_deg, shark.geo_lon_deg] : [0, 0];
  const historyPoints = shark?.previousLocations ?? [];
  const predictedPoints = shark?.predictedLocations ?? [];

  const trackLines = useMemo(() => {
    if (historyPoints.length < 2) return [];

    const lines = [];
    for (let i = 0; i < historyPoints.length - 1; i++) {
      lines.push([
        [historyPoints[i].geo_lat_deg, historyPoints[i].geo_lon_deg],
        [historyPoints[i + 1].geo_lat_deg, historyPoints[i + 1].geo_lon_deg]
      ] as LatLngExpression[]);
    }

    if (shark && historyPoints.length > 0) {
      const lastPoint = historyPoints[historyPoints.length - 1];
      lines.push([
        [lastPoint.geo_lat_deg, lastPoint.geo_lon_deg],
        [shark.geo_lat_deg, shark.geo_lon_deg]
      ] as LatLngExpression[]);
    }

    return lines;
  }, [historyPoints, shark]);

  const predictedLines = useMemo(() => {
    if (predictedPoints.length === 0 || !shark) return [];

    const lines = [];

    lines.push([
      [shark.geo_lat_deg, shark.geo_lon_deg],
      [predictedPoints[0].geo_lat_deg, predictedPoints[0].geo_lon_deg]
    ] as LatLngExpression[]);

    for (let i = 0; i < predictedPoints.length - 1; i++) {
      lines.push([
        [predictedPoints[i].geo_lat_deg, predictedPoints[i].geo_lon_deg],
        [predictedPoints[i + 1].geo_lat_deg, predictedPoints[i + 1].geo_lon_deg]
      ] as LatLngExpression[]);
    }

    return lines;
  }, [predictedPoints, shark]);

  if (!shark) {
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
        <MapViewController center={center} zoom={MAP_ZOOM} />
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
                key={`history-${index}`}
                center={[location.geo_lat_deg, location.geo_lon_deg]}
                radius={6}
                pathOptions={{
                  color: "#2f4858",
                  fillColor: "#3498db",
                  fillOpacity: 0.7
                }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                Previous: {new Date(location.timestamp).toLocaleDateString()}
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
        {predictedPoints.map((location, index) => (
            <CircleMarker
                key={`predicted-${index}`}
                center={[location.geo_lat_deg, location.geo_lon_deg]}
                radius={8}
                pathOptions={{
                  color: "#c0392b",
                  fillColor: "#e74c3c",
                  fillOpacity: 0.6
                }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                Predicted: {new Date(location.timestamp).toLocaleDateString()}
                {location.speed_mps ? `, Speed: ${location.speed_mps.toFixed(1)} m/s` : ""}
              </Tooltip>
            </CircleMarker>
        ))}
        {predictedLines.map((path, index) => (
            <Polyline
                key={`predicted-line-${index}`}
                positions={path}
                pathOptions={{
                  color: "#e74c3c",
                  weight: 3,
                  opacity: 0.6,
                  dashArray: "10, 10"
                }}
            />
        ))}
      </MapContainer>
  );
};

export default SharkMap;
