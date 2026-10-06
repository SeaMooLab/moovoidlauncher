import React from 'react';
import { SERVER_INFO } from '../data/smpData';
import { sound } from '../utils/soundFx';
import { Copy, Check, MessageSquare, ExternalLink, Heart, Sparkles, Disc } from 'lucide-react';

interface FooterProps {
  copied: boolean;
  onCopyIp: () => void;
  onOpenLaunch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ copied, onCopyIp, onOpenLaunch }) => {
  return (
    <footer className="relative border-t border-purple-500/20 bg-[#060210] pt-16 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <div 
              onClick={() => sound.playMoo()}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-[#0d0620] rounded-[14px] flex items-center justify-center text-lg">
                  🐮
                </div>
              </div>
              <div>
                <span className="font-extrabold font-display text-lg tracking-wider text-white">
                  MOOVOID<span className="text-cyan-400">SMP</span>
                </span>
                <p className="text-[10px] font-mono text-purple-400">
                  {SERVER_INFO.seasonName}
                </p>
              </div>
            </div>
            <p className="text-xs text-purple-300/70 leading-relaxed font-light">
              A community-driven, next-generation Minecraft survival network. 
              Traverse the singularity, harvest cosmic milk, and conquer the void.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              <li>
                <a
                  href="#hero"
                  onClick={() => sound.playHover()}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" /> Web Launcher
                </a>
              </li>
              <li>
                <a
                  href="#realms"
                  onClick={() => sound.playHover()}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Void Realms & Biomes
                </a>
              </li>
              <li>
                <a
                  href="#leaderboards"
                  onClick={() => sound.playHover()}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Bovine Hall of Fame
                </a>
              </li>
              <li>
                <a
                  href="#rules"
                  onClick={() => sound.playHover()}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Server Rules & Claims
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
              Community Hub
            </h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              <li>
                <a
                  href={SERVER_INFO.discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-indigo-300"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Official Discord Server
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenLaunch}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Disc className="w-3.5 h-3.5 text-pink-400" /> Download Fabric Modpack
                </button>
              </li>
              <li>
                <a
                  href="https://minecraft.net"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" /> Minecraft Official
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Connect Pill */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
              Direct Connection
            </h4>
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20 space-y-2">
              <div className="text-[11px] font-mono text-cyan-300">
                {SERVER_INFO.javaIP}
              </div>
              <button
                onClick={onCopyIp}
                className={`w-full py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-black'
                    : 'bg-purple-900/60 hover:bg-purple-800 text-white border border-purple-500/40'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'IP COPIED!' : 'COPY SERVER IP'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-purple-400/70">
          <div>
            &copy; {new Date().getFullYear()} MooVoidSMP Network. All rights reserved.
          </div>
          <div className="text-center sm:text-right max-w-md text-[11px] leading-tight">
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
          </div>
          <div className="flex items-center gap-1 text-purple-400">
            <span>Powered by Void Lactose</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
