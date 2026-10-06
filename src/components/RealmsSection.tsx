import React, { useState } from 'react';
import { REALMS, Realm } from '../data/smpData';
import { TiltCard } from './TiltCard';
import { sound } from '../utils/soundFx';
import { Compass, Sparkles, Navigation, Layers, ChevronRight } from 'lucide-react';

export const RealmsSection: React.FC = () => {
  const [selectedRealm, setSelectedRealm] = useState<Realm>(REALMS[0]);

  const getDangerBadge = (danger: Realm['dangerLevel']) => {
    switch (danger) {
      case 'Safe Haven':
        return 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300';
      case 'Moderate':
        return 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300';
      case 'Hazardous':
        return 'bg-amber-500/20 border-amber-400/40 text-amber-300';
      case 'Void Lethal':
        return 'bg-rose-500/20 border-rose-400/40 text-rose-300 animate-pulse';
    }
  };

  return (
    <section id="realms" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-cyan-300 uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Celestial Cartography</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            EXPLORE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">VOID REALMS</span>
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base">
            Journey across custom dimensions generated with unique gravitational physics, 
            condensed milk nebulae, and high-tier void loot drops.
          </p>
        </div>

        {/* Feature Spotlight Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-[#12082b] to-[#070313] p-6 lg:p-8 shadow-[0_0_50px_rgba(147,51,234,0.25)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${getDangerBadge(selectedRealm.dangerLevel)}`}>
                  {selectedRealm.dangerLevel}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-900/40 border border-purple-500/30 text-purple-300">
                  Loot: {selectedRealm.lootTier}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30">
                  {selectedRealm.tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                {selectedRealm.name}
              </h3>
              <p className="text-purple-300/80 text-sm leading-relaxed">
                {selectedRealm.description}
              </p>

              {/* Lore Quote */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border-l-4 border-cyan-400 border-purple-500/20 text-xs text-purple-200 italic font-mono">
                &ldquo;{selectedRealm.lore}&rdquo;
              </div>

              {/* Feature bullet tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {selectedRealm.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-mono text-purple-200">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Coordinates Pill */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-300/90">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Sector Teleport: {selectedRealm.coords}</span>
              </div>
            </div>

            {/* Realm Visual Preview */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-purple-400/40 shadow-2xl aspect-video lg:aspect-4/3">
                <img
                  src="/images/moovoid-realm.png"
                  alt="MooVoidSMP Realm Screenshot"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-purple-200">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Custom Voxel Terrain v4
                  </span>
                  <span className="text-cyan-300">Seed: #MOO-VOID-S4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid for Realm Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REALMS.map((realm) => {
            const isSelected = selectedRealm.id === realm.id;
            return (
              <TiltCard
                key={realm.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedRealm(realm);
                }}
                className={`p-5 cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? 'bg-purple-950/70 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                    : 'bg-[#0e0722]/80 hover:bg-purple-950/40 border-purple-500/20 hover:border-purple-400/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getDangerBadge(realm.dangerLevel)}`}>
                      {realm.dangerLevel}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>

                  <h4 className="text-base font-bold font-display text-white flex items-center justify-between">
                    <span>{realm.name}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-purple-400'}`} />
                  </h4>

                  <p className="text-xs text-purple-300/80 line-clamp-2">
                    {realm.title}
                  </p>

                  <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between text-[11px] font-mono text-purple-400">
                    <span>{realm.lootTier}</span>
                    <span className="text-cyan-300/80">{realm.coords.split(' ')[0]}</span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
