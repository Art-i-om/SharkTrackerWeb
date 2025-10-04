import Sidebar from "./components/Sidebar";
import SharkDetailsPanel from "./components/SharkDetailsPanel";
import SharkMap from "./components/SharkMap";
import { useSharkData } from "./hooks/useSharkData";
import "./App.css";

const App = () => {
  const {
    sharks,
    selectedId,
    selectedShark,
    isListLoading,
    isDetailLoading,
    listError,
    detailError,
    selectShark,
    refresh,
  } = useSharkData();

  return (
    <div className="app-shell">
      <Sidebar
        sharks={sharks}
        selectedId={selectedId}
        onSelect={selectShark}
        isLoading={isListLoading}
        error={listError}
      />
      <section className="main-content">
        <header className="main-content__header">
          <div>
            <h1>Shark Movement Intelligence</h1>
            <p className="main-content__subtitle">
              Explore current positions, probable movement, and historical tracks.
            </p>
          </div>
          <button type="button" className="refresh-button" onClick={refresh} disabled={isListLoading}>
            Refresh Now
          </button>
        </header>
        <div className="main-content__body">
          <SharkMap shark={selectedShark} />
        </div>
      </section>
      <SharkDetailsPanel shark={selectedShark} isLoading={isDetailLoading} error={detailError} />
    </div>
  );
};

export default App;
