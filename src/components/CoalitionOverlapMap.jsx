import {
  Users,
  Briefcase,
  TrendingUp,
  HeartPulse,
  Home,
  Leaf,
  Church,
  Landmark,
  GraduationCap,
  Smartphone,
  Globe2,
  ShieldCheck,
} from "lucide-react";

const COLORS = {
  "Eco-Conscious Progressives": "#178CFF",
  "Economic Survivalists": "#FFA000",
  "Latino Aspirational Families": "#DE47FF",
  "Wellness Maximizers": "#00D9FF",
  "Cultural Traditionalists": "#FF4638",
  "Suburban Family First": "#B85CFF",
  "Digital Hustlers": "#F15CFF",
  "Multicultural Digital Natives": "#9146FF",
  "Asian Affluent Professionals": "#21AFFF",
  "Asian Affluent Networkers": "#21AFFF",
  "Aspiring Achievers": "#38B6FF",
  "Urban Progressives": "#4C7DFF",
  "Heartland Anchors": "#FF5238",
  "Exurban Explorers": "#FF7200",
  "Rooted Ethnic Enclaves": "#00E0EE",
  "Senior Security Voters": "#FF8A3D",
};

const ICONS = {
  "Suburban Family First": Home,
  "Latino Aspirational Families": Users,
  "Economic Survivalists": TrendingUp,
  "Digital Hustlers": Briefcase,
  "Heartland Anchors": Landmark,
  "Eco-Conscious Progressives": Leaf,
  "Wellness Maximizers": HeartPulse,
  "Cultural Traditionalists": Church,
  "Asian Affluent Professionals": GraduationCap,
  "Asian Affluent Networkers": GraduationCap,
  "Multicultural Digital Natives": Smartphone,
  "Urban Progressives": Globe2,
  "Rooted Ethnic Enclaves": Users,
  "Exurban Explorers": Home,
  "Senior Security Voters": ShieldCheck,
  "Aspiring Achievers": Briefcase,
};

function getColor(name) {
  return COLORS[name] || "#8B3FF6";
}

function getIcon(name) {
  return ICONS[name] || Users;
}

function getStrength(value) {
  if (value >= 55) return "Strong";
  if (value >= 40) return "Moderate";
  return "Emerging";
}

export default function CoalitionOverlapMap({ profile }) {
  if (!profile) return null;

  const overlaps = [...(profile.coalitionOverlap || [])].sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="relative h-full overflow-y-auto pr-2 pt-2 coalition-scrollbar">
      <div className="mb-5 rounded-2xl border border-purple/40 bg-zetaBlue/10 p-4 text-center">
        <div className="text-xs uppercase tracking-wide text-[#244FA1]">
          Anchor Archetype
        </div>

        <div className="mt-2 text-lg font-black leading-tight text-[#244FA1]">
          {profile.name}
        </div>
      </div>

      <div className="relative pl-4">
        <div className="absolute left-[35px] top-2 bottom-2 w-px bg-[#507CA8]/30" />

        <div className="space-y-4">
          {overlaps.map(([name, value]) => {
            const color = getColor(name);
            const Icon = getIcon(name);
            const strength = getStrength(value);

            return (
              <div
                key={name}
                className="relative grid grid-cols-[42px_1fr] gap-3 items-center"
              >
                <div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/20"
                  style={{
                    background: color,
                    boxShadow: `0 0 18px ${color}70`,
                  }}
                >
                  <Icon size={18} className="text-white" strokeWidth={2.3} />
                </div>

                <div className="rounded-xl border border-border bg-white/70 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div
                        className="text-sm font-bold leading-tight"
                        style={{ color }}
                      >
                        {name}
                      </div>

                      <div className="mt-1 text-[11px] text-zetaGray">
                        {strength} overlap
                      </div>
                    </div>

                    <div className="text-lg font-black text-white">
                      {value}%
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 rounded-full bg-[#d3d3d3] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${value}%`,
                        background: color,
                        boxShadow: `0 0 10px ${color}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}