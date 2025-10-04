import React from "react";
import { SharkSummary } from "../types/shark";

interface SidebarProps {
  sharks: SharkSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}

const formatCoord = (value: number) => value.toFixed(3);

const Sidebar: React.FC<SidebarProps> = ({ sharks, selectedId, onSelect, isLoading, error }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h1>Tracked Sharks</h1>
        {isLoading && <span className="sidebar__status">Loading...</span>}
      </div>
      {error && <div className="sidebar__error">{error}</div>}
      <div className="sidebar__list" role="list">
        {sharks.map((shark) => {
          const isActive = shark.id === selectedId;
          return (
            <button
              key={shark.id}
              className={`sidebar__item${isActive ? " sidebar__item--active" : ""}`}
              onClick={() => onSelect(shark.id)}
              type="button"
              role="listitem"
            >
              <div className="sidebar__item-title">{shark.name}</div>
              <div className="sidebar__item-meta">
                <span>ID: {shark.id}</span>
                <span>
                  Lat: {formatCoord(shark.latitude)} | Lon: {formatCoord(shark.longitude)}
                </span>
              </div>
            </button>
          );
        })}
        {!isLoading && sharks.length === 0 && (
          <div className="sidebar__empty">No sharks available.</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
