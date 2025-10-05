import { useCallback, useEffect, useMemo, useState } from "react";
import { dummySharkDetails, dummySharkSummaries } from "../data/dummySharks";
import { fetchSharkById, fetchSharks, fetchAllSharks } from "../services/api";
import { SharkDetail, SharkSummary } from "../types/shark";

const DAILY_REFRESH_MS = 24 * 60 * 60 * 1000;

interface SharkDataState {
  sharks: SharkSummary[];
  selectedId: number | null;
  selectedShark: SharkDetail | null;
  isListLoading: boolean;
  isDetailLoading: boolean;
  listError: string | null;
  detailError: string | null;
  selectShark: (id: number) => void;
  refresh: () => Promise<void>;
}

const normalizeDetail = (detail: SharkDetail): SharkDetail => ({
  ...detail,
  previousLocations: detail.previousLocations ?? [],
  movementProbabilities: detail.movementProbabilities ?? [],
});

export const useSharkData = (): SharkDataState => {
  const [sharks, setSharks] = useState<SharkSummary[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedShark, setSelectedShark] = useState<SharkDetail | null>(null);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [listError, setListError] = useState<string | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);

  const resolveSelection = useCallback((items: SharkSummary[]) => {
    setSelectedId((prev) => {
      if (prev && items.some((item) => item.id === prev)) {
        return prev;
      }
      return items.length > 0 ? items[0].id : null;
    });
  }, []);

  const loadSharkList = useCallback(async () => {
    setIsListLoading(true);
    try {
      const response = await fetchAllSharks();
      setSharks(response);
      setListError(null);
      resolveSelection(response);
    } catch (error) {
      console.warn("Falling back to dummy shark list", error);
      setSharks(dummySharkSummaries);
      setListError("Unable to reach shark service. Showing cached sample data.");
      resolveSelection(dummySharkSummaries);
    } finally {
      setIsListLoading(false);
    }
  }, [resolveSelection]);

  const loadSharkDetail = useCallback(async (id: number) => {
    setIsDetailLoading(true);
    try {
      const response = await fetchSharkById(id);
      setSelectedShark(normalizeDetail(response));
      setDetailError(null);
    } catch (error) {
      console.warn(`Falling back to dummy detail for shark ${id}`, error);
      const fallback = dummySharkDetails.find((item) => item.id === id) ?? null;
      setSelectedShark(fallback ? normalizeDetail(fallback) : null);
      setDetailError("Unable to reach shark service. Showing cached sample data.");
    } finally {
      setIsDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSharkList();
    const interval = window.setInterval(() => {
      loadSharkList();
    }, DAILY_REFRESH_MS);

    return () => window.clearInterval(interval);
  }, [loadSharkList]);

  useEffect(() => {
    if (!selectedId) {
      setSelectedShark(null);
      return;
    }

    loadSharkDetail(selectedId);
  }, [loadSharkDetail, selectedId]);

  const selectShark = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const value: SharkDataState = useMemo(
    () => ({
      sharks,
      selectedId,
      selectedShark,
      isListLoading,
      isDetailLoading,
      listError,
      detailError,
      selectShark,
      refresh: loadSharkList,
    }),
    [
      detailError,
      isDetailLoading,
      isListLoading,
      listError,
      loadSharkList,
      selectedId,
      selectedShark,
      sharks,
      selectShark,
    ]
  );

  return value;
};
