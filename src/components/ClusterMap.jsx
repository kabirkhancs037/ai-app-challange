import { useEffect, useRef, useCallback, useState } from "react";
import { archetypes } from "../data/mockData";

const connections = [
  ["wellness-maximizers", "asian-affluent-networkers"],
  ["asian-affluent-networkers", "rooted-ethnic-enclaves"],
  ["eco-conscious-progressives", "aspiring-achievers"],
  ["eco-conscious-progressives", "suburban-family-first"],
  ["aspiring-achievers", "suburban-family-first"],
  ["wellness-maximizers", "suburban-family-first"],
  ["asian-affluent-networkers", "multicultural-digital-natives"],
  ["rooted-ethnic-enclaves", "multicultural-digital-natives"],
  ["multicultural-digital-natives", "suburban-family-first"],
  ["multicultural-digital-natives", "latino-aspirational-families"],
  ["suburban-family-first", "digital-hustlers"],
  ["suburban-family-first", "cultural-traditionalists"],
  ["digital-hustlers", "latino-aspirational-families"],
  ["digital-hustlers", "economic-survivalists"],
  ["latino-aspirational-families", "heartland-anchors"],
  ["cultural-traditionalists", "exurban-explorers"],
  ["exurban-explorers", "economic-survivalists"],
  ["economic-survivalists", "heartland-anchors"],

  ["urban-progressives", "eco-conscious-progressives"],
  ["urban-progressives", "aspiring-achievers"],
  ["urban-progressives", "multicultural-digital-natives"],
  ["senior-security-voters", "heartland-anchors"],
  ["senior-security-voters", "cultural-traditionalists"],
  ["senior-security-voters", "economic-survivalists"],
];

const fillerZones = [
  { x: 42, y: 35, color: "#9146FF", count: 220, spread: 0.12 },
  { x: 43, y: 49, color: "#B85CFF", count: 260, spread: 0.13 },
  { x: 57, y: 47, color: "#F15CFF", count: 230, spread: 0.12 },
  { x: 61, y: 68, color: "#DE47FF", count: 210, spread: 0.12 },
  { x: 29, y: 56, color: "#178CFF", count: 200, spread: 0.12 },
  { x: 73, y: 42, color: "#FF7200", count: 230, spread: 0.13 },
  { x: 72, y: 62, color: "#FFA000", count: 240, spread: 0.13 },
];

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function getNode(id, list) {
  return list.find((a) => a.id === id);
}

export default function ClusterMap({ populationById = {}, onSelectArchetype }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    const minDim = Math.min(W, H);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#020916";
    ctx.fillRect(0, 0, W, H);

    const ambient = ctx.createRadialGradient(
      W * 0.5,
      H * 0.45,
      0,
      W * 0.5,
      H * 0.45,
      W * 0.66
    );

    ambient.addColorStop(0, "rgba(24,55,105,0.7)");
    ambient.addColorStop(0.58, "rgba(10,24,50,0.34)");
    ambient.addColorStop(1, "rgba(2,9,22,0)");

    ctx.fillStyle = ambient;
    ctx.fillRect(0, 0, W, H);

    connections.forEach(([fid, tid]) => {
      const a = getNode(fid, archetypes);
      const b = getNode(tid, archetypes);
      if (!a || !b) return;

      const [r, g, bl] = hexToRgb(a.color);

      ctx.save();
      ctx.strokeStyle = `rgba(${r},${g},${bl},0.42)`;
      ctx.lineWidth = 0.75;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo((a.x / 100) * W, (a.y / 100) * H);
      ctx.lineTo((b.x / 100) * W, (b.y / 100) * H);
      ctx.stroke();
      ctx.restore();
    });

    fillerZones.forEach((zone, zi) => {
      const cx = (zone.x / 100) * W;
      const cy = (zone.y / 100) * H;
      const [r, g, b] = hexToRgb(zone.color);

      for (let i = 0; i < zone.count; i++) {
        const angle = ((i * 137.508 + zi * 19) % 360) * (Math.PI / 180);
        const radius = Math.sqrt(i / zone.count) * minDim * zone.spread;

        const px =
          cx +
          Math.cos(angle) * radius +
          Math.sin(i * 1.91 + zi) * minDim * 0.008;

        const py =
          cy +
          Math.sin(angle) * radius +
          Math.cos(i * 2.31 + zi) * minDim * 0.008;

        if (px < 0 || px > W || py < 0 || py > H) continue;

        ctx.beginPath();
        ctx.arc(
          px,
          py,
          i % 30 === 0 ? 1.8 : i % 9 === 0 ? 1.25 : 0.8,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${r},${g},${b},0.28)`;
        ctx.fill();
      }
    });

    archetypes.forEach((a, ci) => {
      const cx = (a.x / 100) * W;
      const cy = (a.y / 100) * H;
      const [r, g, b] = hexToRgb(a.color);
      const active = hoveredId === a.id;

      const count =
        a.id === "suburban-family-first"
          ? 430
          : a.id === "economic-survivalists"
          ? 360
          : a.id === "cultural-traditionalists"
          ? 320
          : 260;

      const spreadR = minDim * 0.075;

      for (let i = 0; i < count; i++) {
        const angle = ((i * 137.508) % 360) * (Math.PI / 180);
        const radius = Math.sqrt(i / count) * spreadR;

        const px =
          cx +
          Math.cos(angle) * radius +
          Math.sin(i * 1.7 + ci) * minDim * 0.008;

        const py =
          cy +
          Math.sin(angle) * radius +
          Math.cos(i * 2.1 + ci) * minDim * 0.008;

        if (px < 0 || px > W || py < 0 || py > H) continue;

        const sz = i % 24 === 0 ? 2.15 : i % 8 === 0 ? 1.45 : 0.9;
        const op = active ? 0.95 : i % 24 === 0 ? 0.88 : 0.62;

        ctx.beginPath();
        ctx.arc(px, py, active ? sz * 1.15 : sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${op})`;
        ctx.fill();
      }

      const outerR = minDim * 0.046;

      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r},${g},${b},${active ? 0.72 : 0.48})`;
      ctx.lineWidth = active ? 1.05 : 0.75;
      ctx.setLineDash([2.5, 3.5]);
      ctx.stroke();
      ctx.setLineDash([]);

      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, minDim * 0.037);
      halo.addColorStop(0, `rgba(${r},${g},${b},${active ? 0.5 : 0.34})`);
      halo.addColorStop(1, `rgba(${r},${g},${b},0)`);

      ctx.beginPath();
      ctx.arc(cx, cy, minDim * 0.037, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, minDim * 0.0155, 0, Math.PI * 2);
      ctx.fillStyle = "#030916";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, minDim * 0.0132, 0, Math.PI * 2);
      ctx.fillStyle = a.color;
      ctx.globalAlpha = 0.28;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.strokeStyle = `rgba(${r},${g},${b},0.95)`;
      ctx.lineWidth = active ? 1.6 : 1.1;
      ctx.stroke();

      const core = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        minDim * 0.0105
      );

      core.addColorStop(0, `rgba(${r},${g},${b},1)`);
      core.addColorStop(0.62, `rgba(${r},${g},${b},0.9)`);
      core.addColorStop(1, `rgba(${r},${g},${b},0.36)`);

      ctx.beginPath();
      ctx.arc(cx, cy, minDim * 0.0095, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();
    });
  }, [hoveredId]);

  useEffect(() => {
    draw();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", draw);
      return () => window.removeEventListener("resize", draw);
    }

    const observer = new ResizeObserver(() => requestAnimationFrame(draw));

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [draw]);

  function getArchetypeAtPoint(event) {
    const container = containerRef.current;
    if (!container) return null;

    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    return archetypes.find((a) => {
      const nodeX = (a.x / 100) * rect.width;
      const nodeY = (a.y / 100) * rect.height;
      const distance = Math.hypot(mouseX - nodeX, mouseY - nodeY);

      return distance <= 35;
    });
  }

  function selectArchetype(archetype) {
    onSelectArchetype?.(archetype);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedArchetypeId", archetype.id);
    }
  }

  function handleMapClick(event) {
    const clicked = getArchetypeAtPoint(event);
    if (clicked) selectArchetype(clicked);
  }

  function handleMapMove(event) {
    const hovered = getArchetypeAtPoint(event);
    setHoveredId(hovered?.id || null);

    if (containerRef.current) {
      containerRef.current.style.cursor = hovered ? "pointer" : "default";
    }
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        onClick={handleMapClick}
        onMouseMove={handleMapMove}
        onMouseLeave={() => {
          setHoveredId(null);
          if (containerRef.current) {
            containerRef.current.style.cursor = "default";
          }
        }}
        className="relative w-full h-[680px] rounded-2xl overflow-hidden bg-[#020916] border border-border"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {archetypes.map((a) => {
          const isLeft = a.labelSide === "left";
          const lines = (a.mapLabel || a.name).split("\n");
          const active = hoveredId === a.id;
          const displayPopulation = populationById?.[a.id] || a.population;

          return (
            <button
              key={a.id}
              onClick={(event) => {
                event.stopPropagation();
                selectArchetype(a);
              }}
              onMouseEnter={() => setHoveredId(a.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute z-10 bg-transparent border-0 p-0 cursor-pointer"
              style={{
                left: `${a.x}%`,
                top: `${a.y}%`,
                transform: isLeft
                  ? "translate(calc(-100% - 34px), -50%)"
                  : "translate(38px, -50%)",
                textAlign: isLeft ? "right" : "left",
                maxWidth: 145,
                lineHeight: 1.2,
              }}
            >
              {lines.map((line) => (
                <span
                  key={`${a.id}-${line}`}
                  className="block"
                  style={{
                    fontSize: active ? 13 : 12,
                    fontWeight: 500,
                    color: a.color,
                  }}
                >
                  {line}
                </span>
              ))}

              <span
                className="block mt-1"
                style={{
                  fontSize: active ? 13 : 12,
                  fontWeight: 600,
                  color: "rgba(220,232,255,0.95)",
                }}
              >
                {displayPopulation}
              </span>
            </button>
          );
        })}
      </div>

      <div className="card p-5 w-full">
        <div className="text-sm font-bold mb-3">
          POLITICAL LEANING BY COHORT
        </div>

        <div className="flex h-10 rounded-md overflow-hidden font-bold text-white">
        <div
          style={{
            background:
              "linear-gradient(90deg, #1687f6 0%, #20acfb 50%, #00d7e5 100%)"
          }}
          className="flex-1 flex items-center justify-center text-white"
        >
          32%
        </div>

          <div
          style={{
            background:
              "linear-gradient(90deg, #8a43f4 0%, #b45afa 50%, #e759f5 100%)"
          }}
          className="flex-1 flex items-center justify-center text-white"
        >
          26%
        </div>

          <div
            style={{
              background:
                "linear-gradient(90deg, #fb883c 0%, #f24e36 50%, #f46d01 100%)"
            }}
            className="flex-1 flex items-center justify-center text-white"
          >
            26%
          </div>
        </div>

        <div className="grid grid-cols-3 text-center mt-3 text-xs text-zetaGray">
          <div>Lean D / Dem</div>
          <div>Competitive / Mixed</div>
          <div>Lean R / GOP</div>
        </div>
      </div>
    </div>
  );
}