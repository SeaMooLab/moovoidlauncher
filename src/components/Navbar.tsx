import React from 'react';
import { SERVER_INFO } from '../data/smpData';
import { sound } from '../utils/soundFx';
import { Volume2, VolumeX, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onlineCount: number;
  copied: boolean;
  onCopyIp: () => void;
  onOpenLaunch: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onlineCount,
  copied,
  onCopyIp,
  onOpenLaunch,
  soundEnabled,
  onToggleSound,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070313]/85 border-b border-purple-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            sound.playMoo();
            onNavigate('hero');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Cosmic Cow Emblem */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[2px] shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] transition-all duration-300">
            <div className="w-full h-full bg-[#0d0620] rounded-[14px] flex items-center justify-center overflow-hidden relative">
              <span className="text-xl group-hover:scale-125 transition-transform duration-300 select-none">
                🐮
              </span>
              <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 group-hover:text-cyan-200 transition-colors">
                MOOVOID
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-md bg-purple-900/60 border border-purple-400/40 text-purple-300 uppercase tracking-widest">
                SMP
              </span>
            </div>
            <div className="text-[11px] font-mono text-purple-400/80 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              <span>{onlineCount} / {SERVER_INFO.maxPlayers} Online</span>
              <span className="text-purple-600">•</span>
              <span className="text-cyan-400/90 font-semibold">{SERVER_INFO.season}</span>
            </div>
          </div>
        </div>

        {/* Navigation Items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-purple-950/30 p-1.5 rounded-2xl border border-purple-500/20 backdrop-blur-md">
          {[
            { id: 'hero', label: 'Launcher' },
            { id: 'realms', label: 'Realms & Biomes' },
            { id: 'leaderboards', label: 'Bovine Legends' },
            { id: 'rules', label: 'Rules & FAQ' },
            { id: 'console', label: 'Live Telemetry' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playHover();
                onNavigate(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]'
                  : 'text-purple-300/80 hover:text-white hover:bg-purple-900/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Copy IP Button */}
          <button
            onClick={onCopyIp}
            onMouseEnter={() => sound.playHover()}
            title="Click to copy server IP"
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 border ${
              copied
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                : 'bg-purple-950/50 hover:bg-purple-900/60 border-purple-500/40 text-purple-200 hover:border-cyan-400/60'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
            <span>{copied ? 'IP COPIED!' : SERVER_INFO.javaIP}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                sound.enabled = true;
                sound.playClick();
              }
            }}
            title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
            className={`p-2.5 rounded-xl border transition-all duration-200 ${
              soundEnabled
                ? 'bg-purple-900/40 border-purple-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-black/40 border-purple-500/20 text-purple-500'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Discord CTA */}
          <a
            href={SERVER_INFO.discordUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            title="Join MooVoid Discord"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 text-[#a5b4fc] text-xs font-semibold transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord</span>
          </a>

          {/* Launch Modal Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenLaunch();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-display text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] group active:scale-95"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Play Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
