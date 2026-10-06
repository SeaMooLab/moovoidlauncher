import React, { useState } from 'react';
import { SpotTheme } from './CowSpotsBackground';
import { sound } from '../utils/soundFx';
import {
  Sliders,
  Sparkles,
  Volume2,
  VolumeX,
  Gauge,
  Tv,
  ChevronUp,
  ChevronDown,
  Layers,
} from 'lucide-react';

interface ControlsHUDProps {
  theme: SpotTheme;
  setTheme: (t: SpotTheme) => void;
  speed: number;
  setSpeed: (s: number) => void;
  spotCount: number;
  setSpotCount: (c: number) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  scanlines: boolean;
  setScanlines: (v: boolean) => void;
}

export const ControlsHUD: React.FC<ControlsHUDProps> = ({
  theme,
  setTheme,
  speed,
  setSpeed,
  spotCount,
  setSpotCount,
  soundEnabled,
  setSoundEnabled,
  scanlines,
  setScanlines,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    sound.playClick();
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {isOpen ? (
        <div className="w-80 rounded-3xl bg-[#0b041c]/95 border border-purple-500/40 p-5 shadow-[0_0_40px_rgba(147,51,234,0.4)] backdrop-blur-2xl text-white space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">🐮</span>
              <span className="font-display font-bold text-sm tracking-wide text-cyan-300">
                Atmosphere Engine
              </span>
            </div>
            <button
              onClick={toggleOpen}
              className="p-1 rounded-lg bg-purple-900/40 hover:bg-purple-800 text-purple-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Presets */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Cow Spot Color Profile
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'void', label: 'Hyper-Void' },
                { id: 'classic', label: 'Holstein' },
                { id: 'cyberpunk', label: 'Cyber-Moo' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setTheme(item.id as SpotTheme);
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    theme === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                      : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/60 border border-purple-500/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Drift Speed */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-purple-400">
              <span className="flex items-center gap-1.5 font-bold uppercase">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                Spot Drift Velocity
              </span>
              <span className="text-cyan-300">{speed}x</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { val: 0.5, label: '0.5x Slow' },
                { val: 1.0, label: '1.0x Flow' },
                { val: 2.0, label: '2.0x Warp' },
              ].map((sp) => (
                <button
                  key={sp.val}
                  onClick={() => {
                    sound.playClick();
                    setSpeed(sp.val);
                  }}
                  className={`py-1 px-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    speed === sp.val
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/50'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Spot Density */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-purple-400">
              <span className="flex items-center gap-1.5 font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                Cow Spot Count
              </span>
              <span className="text-pink-300">{spotCount} Spots</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { count: 10, label: 'Minimal' },
                { count: 16, label: 'Optimal' },
                { count: 24, label: 'Dense' },
              ].map((item) => (
                <button
                  key={item.count}
                  onClick={() => {
                    sound.playClick();
                    setSpotCount(item.count);
                  }}
                  className={`py-1 px-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    spotCount === item.count
                      ? 'bg-pink-600 text-white font-bold'
                      : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Toggles: Scanlines & Sound */}
          <div className="pt-2 border-t border-purple-500/20 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setScanlines(!scanlines);
              }}
              className={`p-2 rounded-xl text-xs font-mono flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                scanlines
                  ? 'bg-cyan-950/50 border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'bg-purple-950/40 border-purple-500/20 text-purple-400'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>CRT Scanlines</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setSoundEnabled(!soundEnabled);
                sound.enabled = !soundEnabled;
              }}
              className={`p-2 rounded-xl text-xs font-mono flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-purple-950/60 border-purple-400 text-purple-200'
                  : 'bg-rose-950/30 border-rose-500/30 text-rose-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'FX ON' : 'MUTED'}</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] backdrop-blur-xl transition-all duration-300 group cursor-pointer"
        >
          <Sliders className="w-4 h-4 group-hover:rotate-45 transition-transform text-purple-300" />
          <span className="hidden sm:inline">VFX & Audio Controls</span>
          <ChevronUp className="w-3.5 h-3.5 text-purple-400" />
        </button>
      )}
    </div>
  );
};
