"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, HeartHandshake, Layers, MapPin } from "lucide-react";

export default function ImpactCounter() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    people: "25,000+",
    volunteers: "750+",
    programs: "150+",
    communities: "85+",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          setStats({
            people: data.settings.stat_people_reached || "25,000+",
            volunteers: data.settings.stat_volunteers || "750+",
            programs: data.settings.stat_health_camps || "150+",
            communities: data.settings.stat_communities_reached || "85+",
          });
        }
      })
      .catch(() => {});
  }, []);

  const items = [
    {
      icon: Users,
      value: stats.people,
      label: t("People Supported", "लोग लाभान्वित"),
      desc: t("Food, health, marriage & education", "भोजन, स्वास्थ्य, विवाह व शिक्षा सहायता"),
      color: "text-[#087F5B]",
      bg: "bg-[#EAF7F2]",
    },
    {
      icon: HeartHandshake,
      value: stats.volunteers,
      label: t("Dedicated Volunteers", "समर्पित स्वयंसेवक"),
      desc: t("Youth & community leaders", "युवा साथी एवं सेवाभावी कार्यकर्ता"),
      color: "text-[#0877C9]",
      bg: "bg-[#EAF4FB]",
    },
    {
      icon: Layers,
      value: stats.programs,
      label: t("Community Programs", "कल्याणकारी कार्यक्रम"),
      desc: t("Health, food, marriage & education drives", "शिविर, अन्नदान, विवाह एवं शिक्षण अभियान"),
      color: "text-[#F58220]",
      bg: "bg-[#FFF2E8]",
    },
    {
      icon: MapPin,
      value: stats.communities,
      label: t("Communities Reached", "ग्राम व बस्तियां"),
      desc: t("Rural villages & urban slums", "दूरस्थ ग्रामीण अंचल एवं बस्तियां"),
      color: "text-emerald-300",
      bg: "bg-emerald-950/60",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-[#0B2F2A] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#087F5B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0877C9]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-300 border border-white/15">
            {t("Grassroots Impact", "जमीनी प्रभाव")}
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            {t("OUR IMPACT", "हमारा प्रभाव")}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80">
            {t(
              "Every number reflects real families supported through community meals, educational kits, mass marriages, and free health checkups.",
              "प्रत्येक संख्या एक सुरक्षित परिवार, समर्थित बच्चा और सशक्त समाज का प्रमाण है।"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-center flex flex-col items-center group"
              >
                <div
                  className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm`}
                >
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-heading font-black text-4xl text-white tracking-tight">
                  {item.value}
                </h3>
                <p className="font-bold text-sm text-emerald-200 mt-2">{item.label}</p>
                <p className="text-xs text-emerald-100/70 mt-1 max-w-xs">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <p className="text-[11px] text-emerald-300/60 max-w-lg mx-auto">
            Note: Statistics represent database-recorded social welfare drives and field verified beneficiary participation.
          </p>
        </div>
      </div>
    </section>
  );
}
