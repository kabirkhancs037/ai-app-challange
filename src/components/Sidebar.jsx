import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Network, Users, Scale, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import zetaLogo from "../assets/zeta-logo.png";

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
      className={`h-screen border-r border-[#1c2b3a] zeta-sidebar p-5 flex flex-col sticky top-0 overflow-hidden transition-all duration-300 ${
        collapsed ? "w-[86px]" : "w-[250px]"
      }`}
    >
      <div
          className={`flex items-center justify-between mr-20 ${
            collapsed ? "mb-20" : "mb-10"
          }`}
        >
       {!collapsed && (
          <div className="flex items-center">
            <img
              src={zetaLogo}
              alt="Zeta Political Dashboard"
              className="h-16 w-auto object-contain"
            />
          </div>
        )}

        <button
            onClick={toggleSidebar}
            className={`absolute top-5 ${
              collapsed ? "left-1/2 -translate-x-1/2" : "right-5"
            } w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-[#10233b] mt-3`}
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
                  ? "zeta-active-nav"
                  : "text-slate-400 hover:text-white hover:bg-[#071322]"
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="card p-4 mt-auto text-xs text-zetaGray leading-relaxed">
          <div className="font-bold text-[#334155] mb-3">ABOUT THIS PAGE</div>
          Explore voter archetypes, behavior patterns, and political leanings.
        </div>
      )}
    </aside>
  );
}