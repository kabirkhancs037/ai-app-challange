import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Network, Users, Scale, PanelLeftClose, PanelLeftOpen } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

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

  function toggleSidebar() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebarCollapsed", String(next));
  }

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
    <aside
      className={`h-screen border-r border-border bg-[#06101d] p-5 flex flex-col sticky top-0 overflow-hidden transition-all duration-300 ${
        collapsed ? "w-[86px]" : "w-[250px]"
      }`}
    >
      <div className="flex items-center justify-between mb-10">
       {!collapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple via-blue to-orange glow-purple shrink-0" />

            <div className="font-bold text-sm leading-tight">
              AMERICA'S
              <br />
              BEHAVIORAL
              <br />
              POLITICAL MAP
            </div>
          </div>
        )}

        <button
            onClick={toggleSidebar}
            className={`absolute top-5 ${
              collapsed ? "left-1/2 -translate-x-1/2" : "right-5"
            } w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-[#10233b]`}
          >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className="space-y-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : ""}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-[#10233b] text-white border-l-2 border-purple"
                  : "text-slate-400 hover:text-white"
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="card p-4 mt-auto text-xs text-slate-400 leading-relaxed">
          <div className="font-bold text-slate-300 mb-3">ABOUT THIS PAGE</div>
          Explore voter archetypes, behavior patterns, and political leanings.
        </div>
      )}
    </aside>
  );
}