import React, { useState, useEffect } from 'react';
import { SERVER_INFO } from '../data/smpData';
import { TiltCard } from './TiltCard';
import { sound } from '../utils/soundFx';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Copy,
  Check,
  Play,
  Wifi,
  Radio,
  Activity,
  Layers,
  Flame,
  Volume2,
} from 'lucide-react';

interface HeroSectionProps {
  onlineCount: number;
  copied: boolean;
  onCopyIp: () => void;
  onOpenLaunch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onlineCount,
  copied,
  onCopyIp,
  onOpenLaunch,
}) => {
  const [ping, setPing] = useState(19);
  const [mooCount, setMooCount] = useState(14820);
  const [isMooing, setIsMooing] = useState(false);

  // Simulate subtle ping fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      setPing(Math.floor(17 + Math.random() * 6));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleMooClick = () => {
    sound.playMoo();
    setMooCount((prev) => prev + 1);
    setIsMooing(true);
    setTimeout(() => setIsMooing(false), 900);

    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.8 },
      colors: ['#c084fc', '#38bdf8', '#fbcfe8', '#ffffff'],
    });
  };

  const handleLaunchClick = () => {
    sound.playWarp();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#06b6d4', '#ec4899', '#ffffff'],
    });
    onOpenLaunch();
  };

  return (
    <section id="hero" className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Text & Primary Launch CTA */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Season Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-pulse-glow">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-200 to-pink-300 uppercase">
                {SERVER_INFO.seasonName} • {SERVER_INFO.season}
              </span>
            </div>

            {/* Main Title with Void Glow */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold font-display tracking-tight text-white leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-cyan-200 drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                  MOOVOID
                </span>
                <span className="block text-4xl sm:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 tracking-wider mt-1">
                  SMP NETWORK
                </span>
              </h1>
              <p className="text-base sm:text-lg text-purple-200/80 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Step beyond the block event horizon into a high-stakes survival multiverse. 
                Custom celestial dimensions, player-driven void economies, proximity voice chat, 
                and mythical bovine relics.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Big Launch Game Button */}
              <button
                onClick={handleLaunchClick}
                onMouseEnter={() => sound.playHover()}
                className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-display text-base font-bold tracking-wider shadow-[0_0_35px_rgba(147,51,234,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 animate-shimmer pointer-events-none" />
                <Play className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
                <span>LAUNCH GAME</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-mono">
                  1.21.4
                </span>
              </button>

              {/* Copy IP Button with Live status feedback */}
              <button
                onClick={onCopyIp}
                onMouseEnter={() => sound.playHover()}
                className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-mono text-sm font-bold border transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-md cursor-pointer ${
                  copied
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.35)]'
                    : 'bg-purple-950/60 hover:bg-purple-900/70 border-purple-500/40 text-purple-200 hover:border-cyan-400 shadow-[0_0_20px_rgba(147,51,234,0.2)]'
                }`}
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400 animate-bounce" /> : <Copy className="w-5 h-5 text-purple-400" />}
                <span>{copied ? 'IP COPIED TO CLIPBOARD!' : SERVER_INFO.javaIP}</span>
              </button>
            </div>

            {/* Diagnostic Ticker Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ONLINE PLAYERS</span>
                </div>
                <div className="text-lg font-bold font-mono text-white flex items-center gap-1.5">
                  <span>{onlineCount}</span>
                  <span className="text-xs text-purple-400 font-normal">/ {SERVER_INFO.maxPlayers}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PING LATENCY</span>
                </div>
                <div className="text-lg font-bold font-mono text-emerald-300">
                  {ping} ms
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                  <Radio className="w-3.5 h-3.5 text-pink-400" />
                  <span>TICKRATE (TPS)</span>
                </div>
                <div className="text-lg font-bold font-mono text-pink-300">
                  20.0 TPS
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>CROSSPLAY</span>
                </div>
                <div className="text-lg font-bold font-mono text-cyan-300 text-sm mt-0.5">
                  Java + Bedrock
                </div>
              </div>
            </div>

            {/* Fun Cosmic Moo Synthesizer widget */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <button
                onClick={handleMooClick}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                  isMooing
                    ? 'bg-pink-600 border-pink-400 text-white scale-105 shadow-[0_0_25px_rgba(236,72,153,0.5)]'
                    : 'bg-purple-950/40 hover:bg-purple-900/60 border-purple-500/30 text-purple-300 hover:text-white'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isMooing ? 'animate-bounce text-pink-200' : 'text-purple-400'}`} />
                <span>{isMooing ? '🐮 WARP MOOO!' : 'SYNTHESIZE COSMIC MOO'}</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-900/60 text-[10px] text-cyan-300">
                  {mooCount.toLocaleString()}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Tilt Card with Cosmic Void Cow Banner Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <TiltCard
              maxTilt={10}
              className="w-full max-w-md bg-gradient-to-b from-[#13092b]/90 to-[#080314]/90 border border-purple-500/40 p-4 shadow-[0_0_40px_rgba(168,85,247,0.3)] backdrop-blur-xl group"
            >
              {/* Animated glowing image frame */}
              <div className="relative rounded-xl overflow-hidden aspect-square border border-purple-400/30 shadow-inner">
                <img
                  src="/images/moovoid-hero.png"
                  alt="MooVoidSMP Cosmic Cow"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Overlaid holographic HUD scan info */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  SPECTRAL ID: #BOVINE-004
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white font-display">
                      SINGULARITY CORE ACTIVE
                    </div>
                    <div className="text-[10px] font-mono text-purple-300">
                      Coordinates: 0,0 Celestial Barn
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-purple-900/80 border border-purple-400/50 text-[10px] font-mono text-pink-300 font-bold">
                      PAPER 1.21.4
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-purple-300">
                  <Flame className="w-4 h-4 text-pink-400" />
                  <span>Season 4: Day {SERVER_INFO.daysActive}</span>
                </div>
                <div className="text-cyan-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Proximity Voice: 24454</span>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
};
