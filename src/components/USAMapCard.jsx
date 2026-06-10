import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import { MoreHorizontal, X } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const metroCoordinates = {
  Phoenix: [-112.074, 33.4484],
  Atlanta: [-84.388, 33.749],
  Charlotte: [-80.8431, 35.2271],
  Tampa: [-82.4572, 27.9506],
  Seattle: [-122.3321, 47.6062],
  "San Francisco Bay Area": [-122.4194, 37.7749],
  Denver: [-104.9903, 39.7392],
  Portland: [-122.6765, 45.5152],
  Boston: [-71.0589, 42.3601],
  Austin: [-97.7431, 30.2672],
  Cleveland: [-81.6944, 41.4993],
  Detroit: [-83.0458, 42.3314],
  Pittsburgh: [-79.9959, 40.4406],
  Nashville: [-86.7816, 36.1627],
  "Oklahoma City": [-97.5164, 35.4676],
  Houston: [-95.3698, 29.7604],
  Miami: [-80.1918, 25.7617],
  "Las Vegas": [-115.1398, 36.1699],
  "Los Angeles": [-118.2437, 34.0522],
  "New York City": [-74.006, 40.7128],
  "San Diego": [-117.1611, 32.7157],
  Chicago: [-87.6298, 41.8781],
  "Washington DC": [-77.0369, 38.9072],
  "San Francisco": [-122.4194, 37.7749],

  // Metro regions / suburbs / exurbs
  "Dallas-Fort Worth": [-96.797, 32.7767],
  "Dallas suburbs": [-96.85, 32.95],
  "Dallas outer suburbs": [-96.9, 33.15],

  "Phoenix suburbs": [-111.95, 33.55],
  "Phoenix outer suburbs": [-111.8, 33.7],
  "Phoenix exurbs": [-111.65, 33.8],

  "Atlanta outer suburbs": [-84.2, 33.95],

  "Nashville suburbs": [-86.65, 36.3],
  "Nashville exurbs": [-86.45, 36.45],

  "Charlotte outer suburbs": [-80.7, 35.35],

  "Tampa exurbs": [-82.2, 28.15],
  "Tampa / Central Florida exurbs": [-81.8, 28.2],

  "Northern Virginia": [-77.2, 38.85],
  "New Jersey suburbs": [-74.3, 40.7],
  "Northern New Jersey": [-74.17, 40.74],

  "Orange County": [-117.8531, 33.7175],

  "Queens / NYC boroughs": [-73.7949, 40.7282],

  "Southern California Inland Empire": [-117.3961, 33.9533],

  // Regional approximations
  "Rural Midwest": [-93.5, 41.5],
  "Southern working-class suburbs": [-86.5, 34.8],
  "Tennessee rural regions": [-86.0, 35.8],
  "Midwest small metros": [-89.5, 41.8],
  "Ohio small metros": [-82.8, 40.2],
  "Indiana suburbs": [-86.1, 39.9],
  "Wisconsin regional metros": [-89.4, 43.1],
  "Missouri suburbs": [-90.2, 38.7],
  "Iowa communities": [-93.6, 41.6],
  "Western Pennsylvania": [-80.1, 40.7],

  // Retirement / lifestyle regions
  "Florida retirement corridors": [-81.8, 27.9],
  "Arizona retirement communities": [-112.3, 33.7],
  "Carolinas coastal communities": [-78.9, 33.9],
  "Central Florida": [-81.5, 28.5],
  "Nevada retirement communities": [-115.3, 36.3],
};



function getPresenceSize(presence) {
  if (presence === "High") return 20;
  if (presence === "Medium-High") return 16;
  if (presence === "Medium") return 12;
  return 10;
}

export default function USAMapCard({ profile }) {
  const [showGeoPopup, setShowGeoPopup] = useState(false);

  const geography = profile?.geography || [];
  const urbanicity = profile?.urbanicity || [];

  const dynamicHotspots = geography
  .map(([name, presence]) => {
    const coordinates = metroCoordinates[name];

    if (!coordinates) return null;

    return {
      name,
      presence,
      coordinates,
      size: getPresenceSize(presence),
    };
  })
  .filter(Boolean);

  return (
    <div className="relative h-full overflow-hidden">
      <button
        onClick={() => setShowGeoPopup(true)}
        className="absolute right-0 top-0 z-20 w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-[#10233b]"
        title="View metro and urbanicity details"
      >
        <MoreHorizontal size={18} />
      </button>

      <div className="relative h-full flex flex-col justify-start">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 980 }}
          width={760}
          height={430}
         className="w-full h-[330px] -mt-6"
        >
          <defs>
            <filter id="geoGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="heatGlow">
              <stop offset="0%" stopColor="#FFE75C" stopOpacity="1" />
              <stop offset="35%" stopColor="#FF8A00" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#E040FB" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
          </defs>

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#06182d"
                  stroke="#1b5ba6"
                  strokeWidth={0.65}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#08213d" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {dynamicHotspots.slice(0, -1).map((spot, index) => {
              const nextSpot = dynamicHotspots[index + 1];

              if (!nextSpot) return null;

              return (
                <Line
                  key={`${spot.name}-${nextSpot.name}`}
                  from={spot.coordinates}
                  to={nextSpot.coordinates}
                  stroke="#8b3ff6"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeDasharray="4 7"
                  opacity={0.35}
                />
              );
            })}

          {dynamicHotspots.map((spot) => (
            <Marker key={spot.name} coordinates={spot.coordinates}>
              <circle
                r={spot.size}
                fill="url(#heatGlow)"
                opacity={0.9}
                filter="url(#geoGlow)"
              />
              <circle r={spot.size * 0.28} fill="#FFD447" opacity={0.95} />
            </Marker>
          ))}
        </ComposableMap>


          <div className="flex flex-col items-center mt-1">
            <div
              className="w-48 h-3 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg,#FFD447 0%,#FF8A00 40%,#E040FB 70%,#7C3AED 100%)",
              }}
            />

            <div className="flex justify-between text-[11px] text-slate-400 mt-1 w-48">
              <span>High</span>
              <span>Low</span>
            </div>
          </div>
      </div>

      {showGeoPopup && (
  <div
    className="fixed inset-0 z-[9999] bg-[#020916]/80 backdrop-blur-sm flex items-center justify-center p-5"
    onClick={() => setShowGeoPopup(false)}
  >
    <div
      className="w-full max-w-[560px] rounded-2xl border border-border bg-[#071322] p-5 shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black">GEOGRAPHIC DETAILS</h3>

        <button
          onClick={() => setShowGeoPopup(false)}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-[#10233b]"
          title="Close"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="rounded-xl border border-border bg-[#020916]/50 p-4">
          <h4 className="text-sm font-black mb-4">TOP METRO AREAS</h4>

          <div className="space-y-4">
            {geography.slice(0, 5).map(([name, presence], index) => (
              <div
                key={name}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-full bg-purple flex items-center justify-center font-black shrink-0">
                    {index + 1}
                  </span>

                  <span className="font-semibold text-slate-200 text-sm">
                    {name}
                  </span>
                </div>

                <span className="text-slate-300 text-sm shrink-0">
                  {presence}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-[#020916]/50 p-4">
          <h4 className="text-sm font-black mb-4">URBANICITY</h4>

          <div className="space-y-3">
            {urbanicity.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[90px_1fr_45px] items-center gap-3 text-sm"
              >
                <span className="text-slate-200">{label}</span>

                <div className="h-2.5 bg-[#13243a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple"
                    style={{ width: `${value}%` }}
                  />
                </div>

                <span className="text-right text-slate-200">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}