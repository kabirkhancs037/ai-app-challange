import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import BehavioralMap from "./pages/BehavioralMap";
import ArchetypeExplorer from "./pages/ArchetypeExplorer";
import CompareArchetypes from "./pages/CompareArchetypes";

export default function App() {
  return (
    <div className="h-screen bg-bg text-slate-100 flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-5 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path="/map" element={<BehavioralMap />} />
          <Route path="/archetype/:id" element={<ArchetypeExplorer />} />
          <Route path="/compare" element={<CompareArchetypes />} />
        </Routes>
      </main>
    </div>
  );
}