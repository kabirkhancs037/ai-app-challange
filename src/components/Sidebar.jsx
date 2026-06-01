import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Network, Users, Scale } from "lucide-react";

export default function Sidebar() {
  const [selectedArchetypeId, setSelectedArchetypeId] = useState(
  localStorage.getItem("selectedArchetypeId") || "suburban-family-first"
);

useEffect(() => {
  function handleSelection(event) {
    setSelectedArchetypeId(event.detail);
  }

  window.addEventListener("archetype-selected", handleSelection);

  return () => {
    window.removeEventListener("archetype-selected", handleSelection);
  };
}, []);

  const links = [
    { to: "/map", label: "Behavioral Map", icon: Network },
    {
      to: `/archetype/${selectedArchetypeId}`,
      label: "Archetype Explorer",
      icon: Users,
    },
    { to: "/compare", label: "Compare Archetypes", icon: Scale },
  ];

  return (
    <aside className="w-[250px] h-screen border-r border-border bg-[#06101d] p-5 flex flex-col sticky top-0 overflow-hidden">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple via-blue to-orange glow-purple" />
        <div className="font-bold text-sm leading-tight">
          AMERICA'S<br />BEHAVIORAL<br />POLITICAL MAP
        </div>
      </div>

      <nav className="space-y-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
                isActive
                  ? "bg-[#10233b] text-white border-l-2 border-purple"
                  : "text-slate-400 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="card p-4 mt-auto text-xs text-slate-400 leading-relaxed">
        <div className="font-bold text-slate-300 mb-3">ABOUT THIS PAGE</div>
        Explore voter archetypes, behavior patterns, and political leanings.
      </div>
    </aside>
  );
}