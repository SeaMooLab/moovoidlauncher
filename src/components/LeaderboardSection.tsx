import React, { useState } from 'react';
import { LEADERBOARD_CATEGORIES, LEADERBOARDS } from '../data/smpData';
import { TiltCard } from './TiltCard';
import { sound } from '../utils/soundFx';
import { Trophy, Milk, Swords, Clock, Skull, Crown } from 'lucide-react';

export const LeaderboardSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('milk');

  const currentList = LEADERBOARDS[activeCategory] || LEADERBOARDS.milk;

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'milk':
        return <Milk className="w-4 h-4 text-cyan-300" />;
      case 'kills':
        return <Swords className="w-4 h-4 text-rose-400" />;
      case 'playtime':
        return <Clock className="w-4 h-4 text-amber-300" />;
      case 'bosses':
        return <Skull className="w-4 h-4 text-purple-400" />;
      default:
        return <Trophy className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <section id="leaderboards" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-pink-300 uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>Seasonal Hall of Fame</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            BOVINE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400">LEGENDS</span>
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base">
            Honoring the galactic dairy tycoons, void duelists, and ancient elders dominating Season 4.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {LEADERBOARD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] scale-105'
                    : 'bg-purple-950/40 text-purple-300 hover:text-white hover:bg-purple-900/40 border border-purple-500/20'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {currentList.map((player) => {
            const isFirst = player.rank === 1;
            const isSecond = player.rank === 2;
            const isThird = player.rank === 3;

            return (
              <TiltCard
                key={player.rank}
                maxTilt={4}
                className={`p-4 border transition-all duration-300 ${
                  isFirst
                    ? 'bg-gradient-to-r from-purple-950/80 via-yellow-950/30 to-purple-950/80 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.25)]'
                    : isSecond
                    ? 'bg-purple-950/60 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : isThird
                    ? 'bg-purple-950/50 border-purple-500/40'
                    : 'bg-[#0d0720]/80 border-purple-500/15 hover:border-purple-500/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left: Rank + Avatar + Name */}
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl font-mono font-black text-sm shrink-0">
                      {isFirst ? (
                        <span className="flex items-center justify-center w-full h-full rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 shadow-[0_0_12px_#f59e0b]">
                          <Crown className="w-5 h-5" />
                        </span>
                      ) : isSecond ? (
                        <span className="flex items-center justify-center w-full h-full rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300">
                          #2
                        </span>
                      ) : isThird ? (
                        <span className="flex items-center justify-center w-full h-full rounded-xl bg-purple-500/20 border border-purple-400 text-purple-300">
                          #3
                        </span>
                      ) : (
                        <span className="text-purple-400">#{player.rank}</span>
                      )}
                    </div>

                    {/* Minecraft Avatar Head */}
                    <div className="relative w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-500/30 overflow-hidden shrink-0">
                      <img
                        src={`https://mc-heads.net/avatar/${player.name}/64`}
                        alt={player.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://mc-heads.net/avatar/MHF_Cow/64`;
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name + Title */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-display text-white text-base">
                          {player.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-900/60 text-purple-300 border border-purple-500/30">
                          {player.tag}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-purple-400/90 flex items-center gap-2 mt-0.5">
                        <span>{player.secondaryStat}:</span>
                        <span className="text-purple-200">{player.secondaryVal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Primary Stat & Badge */}
                  <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-purple-500/20">
                    <div className="text-lg font-mono font-black text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                      {player.value}
                    </div>
                    <div className="text-[11px] font-mono text-purple-400">
                      {player.primaryStat}
                    </div>
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
