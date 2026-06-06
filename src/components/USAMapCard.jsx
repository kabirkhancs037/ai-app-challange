import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const metroAreas = [
  ["Atlanta, GA", "1.82M"],
  ["Dallas-Fort Worth, TX", "1.71M"],
  ["Phoenix, AZ", "1.63M"],
  ["Houston, TX", "1.48M"],
  ["Charlotte, NC", "1.35M"],
];

const urbanicity = [
  ["Suburban", 72],
  ["Urban", 18],
  ["Rural", 10],
];

const hotspots = [
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522], size: 18 },
  { name: "Phoenix", coordinates: [-112.074, 33.4484], size: 14 },
  { name: "Dallas", coordinates: [-96.797, 32.7767], size: 17 },
  { name: "Houston", coordinates: [-95.3698, 29.7604], size: 15 },
  { name: "Atlanta", coordinates: [-84.388, 33.749], size: 20 },
  { name: "Charlotte", coordinates: [-80.8431, 35.2271], size: 14 },
  { name: "Chicago", coordinates: [-87.6298, 41.8781], size: 17 },
  { name: "New York", coordinates: [-74.006, 40.7128], size: 18 },
  { name: "Miami", coordinates: [-80.1918, 25.7617], size: 13 },
  { name: "Seattle", coordinates: [-122.3321, 47.6062], size: 12 },
];

const networkLines = [
  ["Los Angeles", "Phoenix"],
  ["Phoenix", "Dallas"],
  ["Dallas", "Houston"],
  ["Dallas", "Atlanta"],
  ["Houston", "Atlanta"],
  ["Atlanta", "Charlotte"],
  ["Chicago", "Atlanta"],
  ["Chicago", "New York"],
  ["Charlotte", "New York"],
  ["Atlanta", "Miami"],
];

function findHotspot(name) {
  return hotspots.find((item) => item.name === name);
}

export default function USAMapCard() {
  return (
    <div className="grid grid-cols-[1fr_285px] gap-5 h-full">
      <div className="relative min-h-[330px] flex flex-col justify-start pt-2">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 930,
          }}
          width={760}
          height={430}
          className="w-full h-[300px]"
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

          {networkLines.map(([fromName, toName]) => {
            const from = findHotspot(fromName);
            const to = findHotspot(toName);

            if (!from || !to) return null;

            return (
              <Line
                key={`${fromName}-${toName}`}
                from={from.coordinates}
                to={to.coordinates}
                stroke="#8b3ff6"
                strokeWidth={1}
                strokeLinecap="round"
                strokeDasharray="4 7"
                opacity={0.35}
              />
            );
          })}

          {hotspots.map((spot) => (
            <Marker key={spot.name} coordinates={spot.coordinates}>
              <circle
                r={spot.size}
                fill="url(#heatGlow)"
                opacity={0.9}
                filter="url(#geoGlow)"
              />
              <circle
                r={spot.size * 0.28}
                fill="#FFD447"
                opacity={0.95}
              />
            </Marker>
          ))}

          {hotspots.map((spot, index) => (
            <Marker
              key={`dot-${spot.name}`}
              coordinates={[
                spot.coordinates[0] + ((index % 3) - 1) * 2.2,
                spot.coordinates[1] + ((index % 4) - 1) * 1.4,
              ]}
            >
              <circle
                r={2}
                fill={index % 2 === 0 ? "#ff4bd8" : "#ff8a00"}
                opacity={0.8}
                filter="url(#geoGlow)"
              />
            </Marker>
          ))}
        </ComposableMap>

        <div className="flex gap-4 items-end ml-8 mt-1">
          <div>
            <div className="flex">
              <div className="w-16 h-6 bg-[#FFD447]" />
              <div className="w-16 h-6 bg-[#FF4B54]" />
            </div>
            <div className="text-xs text-slate-300 mt-2">High</div>
          </div>

          <div>
            <div className="flex">
              <div className="w-16 h-6 bg-[#391B88]" />
              <div className="w-16 h-6 bg-[#8B3FF6]" />
            </div>
            <div className="text-xs text-slate-300 mt-2">Low</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-5">
          <h3 className="text-sm font-black mb-4">TOP METRO AREAS</h3>

          <div className="space-y-4">
            {metroAreas.map(([city, value], index) => (
              <div
                key={city}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex gap-3 items-center">
                  <span className="w-7 h-7 rounded-full bg-purple flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{city}</span>
                </div>
                <span className="text-slate-300">{value}</span>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full border border-border rounded-lg py-2 text-sm hover:bg-[#10233b]">
            View All 50+
          </button>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-black mb-4">URBANICITY</h3>

          <div className="space-y-3">
            {urbanicity.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[82px_1fr_40px] gap-3 items-center text-sm"
              >
                <span>{label}</span>

                <div className="h-2 bg-[#142239] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple rounded-full"
                    style={{ width: `${value}%` }}
                  />
                </div>

                <span>{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}