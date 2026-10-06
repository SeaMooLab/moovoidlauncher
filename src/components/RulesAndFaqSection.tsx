import React, { useState } from 'react';
import { SERVER_RULES } from '../data/smpData';
import { TiltCard } from './TiltCard';
import { sound } from '../utils/soundFx';
import { Shield, BookOpen, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I claim my cosmic base?',
    a: 'Hold a Golden Shovel in hand and right-click two diagonal corners of your desired territory. You earn 100 claim blocks every hour of active playtime. Commands: /claim, /trust <player>, /unclaim.',
  },
  {
    q: 'How do I join using Bedrock Edition?',
    a: 'Bedrock players (consoles, mobile, Windows 10/11) connect to bedrock.moovoidsmp.net with Port 19132. Your inventory, voice chat, and economy seamlessly sync with Java players via GeyserMC!',
  },
  {
    q: 'Is Simple Voice Chat mandatory?',
    a: 'Voice chat is optional but recommended! Install the Simple Voice Chat Fabric or Forge mod (version 1.21.4). Default keybind is "V" to access settings and "CAPSLOCK" or "M" for Push-to-Talk.',
  },
  {
    q: 'What happens when I die in the Void?',
    a: 'Unlike vanilla Minecraft where void falls wipe all items, MooVoid features a Gravitational Bubble: items are teleported back to the nearest floating asteroid checkpoint for 15 minutes!',
  },
];

export const RulesAndFaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    sound.playClick();
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="rules" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Rules Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-cyan-300 uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>Community Protocols & Conduct</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            SMP RULES & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">GUIDELINES</span>
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base">
            Fair play is paramount in the void. Read carefully before venturing out of the Celestial Barn.
          </p>
        </div>

        {/* Rules 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVER_RULES.map((rule) => (
            <TiltCard
              key={rule.num}
              maxTilt={4}
              className="p-6 bg-[#0c051a]/85 border border-purple-500/20 hover:border-purple-400/50"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                  {rule.num}
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-purple-300">
                      {rule.category}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-display text-white">
                    {rule.title}
                  </h4>
                  <p className="text-xs text-purple-200/80 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Holo FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4 pt-4">
          <div className="flex items-center justify-center gap-2 text-sm font-mono text-purple-300 mb-6">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-purple-950/50 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'bg-[#0d0720]/70 border-purple-500/20 hover:border-purple-500/40'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="font-display font-semibold text-white text-sm sm:text-base flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-purple-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-purple-200/85 leading-relaxed border-t border-purple-500/15 pt-3 animate-fadeIn flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
