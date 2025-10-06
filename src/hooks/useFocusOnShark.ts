// src/hooks/useFocusOnShark.ts
import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

type LatLng = [number, number];

type Point = {
    geo_lat_deg: number | null | undefined;
    geo_lon_deg: number | null | undefined;
    timestamp?: number | string;
};

type Options = {
    historyPoints?: number;       // скільки останніх точок історії брати
    paddingPx?: number;           // відступи при fitBounds/flyToBounds
    zoomSingle?: number;          // зум коли є тільки 1 точка
    durationSec?: number;         // тривалість анімації
    minZoom?: number;             // нижня межа зума
    maxZoom?: number;             // верхня межа зума
};

export function useFocusOnShark(
    selected: {
        id?: number | string;
        center?: Point | null;
        previousLocations?: Point[] | null | undefined;
        predictedPath?: Point[] | null | undefined;
    },
    opts: Options = {}
) {
    const map = useMap();
    const {
        historyPoints = 80,
        paddingPx = 60,
        zoomSingle = 8,
        durationSec = 1.2,
        minZoom = 3,
        maxZoom = 12,
    } = opts;

    const points: LatLng[] = useMemo(() => {
        const arr: LatLng[] = [];

        const pushPoint = (p?: Point | null) => {
            if (!p) return;
            const lat = Number(p.geo_lat_deg);
            const lon = Number(p.geo_lon_deg);
            if (Number.isFinite(lat) && Number.isFinite(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
                arr.push([lat, lon]);
            }
        };

        // історія (беремо останні N точок)
        const hist = (selected.previousLocations ?? []).slice(-historyPoints);
        hist.forEach(pushPoint);

        // прогноз — всі точки
        (selected.predictedPath ?? []).forEach(pushPoint);

        // якщо нічого — спробуємо центр
        if (arr.length === 0) pushPoint(selected.center ?? null);

        return arr;
    }, [selected.id, selected.previousLocations, selected.predictedPath, selected.center, historyPoints]);

    useEffect(() => {
        if (!map || points.length === 0) return;

        if (points.length === 1) {
            map.flyTo(points[0], zoomSingle, { animate: true, duration: durationSec });
            return;
        }

        const bounds = L.latLngBounds(points);

        // ✅ было: getBoundsZoom(bounds, false, [paddingPx, paddingPx])  // TS2345
        const pad = L.point(paddingPx, paddingPx);
        const targetZoom = Math.max(
            minZoom,
            Math.min(map.getBoundsZoom(bounds, false, pad), maxZoom)
        );

        // ✅ было: flyToBounds(bounds, { padding: [paddingPx, paddingPx], ... })
        // Не все тайпинги поддерживают 'padding', используем TL/BR:
        map.flyToBounds(bounds, {
            animate: true,
            duration: durationSec,
            paddingTopLeft: pad,
            paddingBottomRight: pad,
            maxZoom: targetZoom, // чтобы не «въезжать» слишком близко
        });

        // (опционально) тонкая доводка после анимации:
        // setTimeout(() => {
        //   map.flyTo(bounds.getCenter(), targetZoom, { animate: true, duration: 0.6 });
        // }, durationSec * 1000);

// ...
    }, [map, JSON.stringify(points), paddingPx, zoomSingle, durationSec, minZoom, maxZoom]);
}
