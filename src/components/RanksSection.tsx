import React from 'react';
import { RANKS } from '../data/smpData';
import { TiltCard } from './TiltCard';
import { sound } from '../utils/soundFx';
import confetti from 'canvas-confetti';
import { Sparkles, Check, Crown, Flame, ExternalLink } from 'lucide-react';

export const RanksSection: React.FC = () => {
  const handleRankClick = (rankName: string) => {
    sound.playCopy();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#c084fc', '#38bdf8', '#f43f5e'],
    });
    alert(`Thank you for supporting MooVoidSMP! Rank selection for "${rankName}" has been loaded. Join play.moovoidsmp.net to claim!`);
  };

  return (
    <section id="store" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-300 uppercase">
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <span>Support the Cosmic Void Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            VOID RANKS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">PERKS</span>
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base">
            100% EULA-compliant aesthetic perks, quality-of-life commands, and cosmetic void auras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RANKS.map((rank) => (
            <TiltCard
              key={rank.id}
              maxTilt={6}
              glowColor={rank.color}
              className={`p-6 border flex flex-col justify-between ${
                rank.popular
                  ? 'bg-gradient-to-b from-[#180a33] to-[#0c041c] border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/50'
                  : 'bg-[#0c051a]/85 border-purple-500/20 hover:border-purple-500/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{
                      backgroundColor: `${rank.color}20`,
                      color: rank.color,
                      borderColor: `${rank.color}40`,
                      borderWidth: '1px',
                    }}
                  >
                    {rank.badge}
                  </span>
                  {rank.popular && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-pink-300 bg-pink-500/20 border border-pink-500/40 px-2.5 py-0.5 rounded-full font-bold">
                      <Flame className="w-3.5 h-3.5 fill-pink-400" />
                      POPULAR
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-black font-display text-white">
                    {rank.name}
                  </h3>
                  <p className="text-xs text-purple-300/80 font-mono mt-0.5">
                    {rank.title}
                  </p>
                </div>

                <div className="pt-2 border-t border-purple-500/20 space-y-2">
                  <div className="text-xs font-mono uppercase text-purple-400 font-bold">
                    Privileges & Commands:
                  </div>
                  {rank.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-purple-200">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-2">
                  <div className="text-xs font-mono uppercase text-pink-400 font-bold">
                    Cosmetics Included:
                  </div>
                  {rank.cosmetics.map((cos, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-purple-300">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                      <span>{cos}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleRankClick(rank.name)}
                  onMouseEnter={() => sound.playHover()}
                  className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    rank.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/40'
                      : 'bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 hover:text-white border border-purple-500/30'
                  }`}
                >
                  <span>Select {rank.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
