import React, { useState, useEffect } from 'react';
import { INITIAL_TRANSMISSIONS } from '../data/smpData';
import { sound } from '../utils/soundFx';
import { Terminal, Pause, Play, Send } from 'lucide-react';

export interface LogItem {
  time: string;
  user: string;
  msg: string;
  type: 'event' | 'chat' | 'boss' | 'death' | 'join';
}

const RANDOM_EVENTS: LogItem[] = [
  { time: 'now', user: 'SpaceCowboy', msg: 'Just established an automatic milk brewery on Asteroid #149!', type: 'chat' },
  { time: 'now', user: 'ServerSys', msg: 'Gravitational surge detected in Sector 7! Elytra speeds increased by 200%', type: 'event' },
  { time: 'now', user: 'VoidReaper', msg: 'slain by Singularity Boss with 5% HP remaining!', type: 'death' },
  { time: 'now', user: 'StarGazer', msg: 'Can anyone lend a Netherite Pickaxe at /warp spawn?', type: 'chat' },
  { time: 'now', user: 'ServerSys', msg: 'Player "MilkMage" connected from Bedrock client', type: 'join' },
  { time: 'now', user: 'AbyssBreaker', msg: 'Discovered Cosmic Void Rune at Y: -58! Loot drop claimed', type: 'boss' },
  { time: 'now', user: 'DairyLord', msg: 'Trading 32 Totems of Undying for 1 Singularity Pearl', type: 'chat' },
  { time: 'now', user: 'AstroCalf', msg: 'tried to swim in concentrated void plasma', type: 'death' },
];

export const LiveConsoleStream: React.FC = () => {
  const [logs, setLogs] = useState<LogItem[]>(INITIAL_TRANSMISSIONS as LogItem[]);
  const [isPaused, setIsPaused] = useState(false);
  const [inputMsg, setInputMsg] = useState('');

  // Periodically stream new messages
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const randomMsg = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];

      const newLog: LogItem = {
        ...randomMsg,
        time: timeStr,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 15)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    sound.playClick();
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const newLog: LogItem = {
      time: timeStr,
      user: 'You (Terminal)',
      msg: inputMsg,
      type: 'chat',
    };

    setLogs((prev) => [newLog, ...prev]);
    setInputMsg('');
  };

  const getTypeStyle = (type: LogItem['type']) => {
    switch (type) {
      case 'boss':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'event':
        return 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30';
      case 'death':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'join':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default:
        return 'text-purple-300 bg-purple-500/10 border-purple-500/30';
    }
  };

  return (
    <section id="console" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-cyan-300 uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>Direct Voxel Feed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            LIVE TELEMETRY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400">STREAM</span>
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base">
            Live broadcast of player chat, dimension rifts, world boss assaults, and void incidents.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#090416]/95 border border-purple-500/40 shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden font-mono">
          {/* Terminal Window Header */}
          <div className="px-5 py-3.5 bg-[#0e0622] border-b border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                smp.moovoid.telemetry.tty1
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE (UDP 25565)
              </span>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsPaused(!isPaused);
                }}
                className="p-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 text-purple-300 hover:text-white transition-all text-xs flex items-center gap-1 border border-purple-500/30"
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Logs List */}
          <div className="p-5 h-80 overflow-y-auto space-y-2.5 text-xs">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center gap-2 py-1 px-2.5 rounded-lg hover:bg-purple-950/40 transition-colors animate-fadeIn"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-purple-500 font-bold">[{log.time}]</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTypeStyle(log.type)}`}>
                    {log.type.toUpperCase()}
                  </span>
                  <span className="text-white font-bold">&lt;{log.user}&gt;</span>
                </div>
                <div className="text-purple-200/90 break-all sm:break-normal">
                  {log.msg}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Input Bar */}
          <form
            onSubmit={handleSendTest}
            className="p-3 bg-[#0c051e] border-t border-purple-500/30 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-bold pl-2 select-none">&gt;</span>
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Broadcast a message to the cosmic void terminal..."
              className="flex-1 bg-transparent border-none text-xs text-purple-100 placeholder-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/30 cursor-pointer"
            >
              <span>Transmit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
