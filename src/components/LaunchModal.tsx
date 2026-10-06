import React, { useState } from 'react';
import { SERVER_INFO } from '../data/smpData';
import { sound } from '../utils/soundFx';
import confetti from 'canvas-confetti';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Download,
  Terminal,
  Layers,
  Sparkles,
  Smartphone,
  Monitor,
  Flame,
} from 'lucide-react';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyIp: () => void;
  copied: boolean;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({
  isOpen,
  onClose,
  onCopyIp,
  copied,
}) => {
  const [activeTab, setActiveTab] = useState<'java' | 'bedrock' | 'modpack'>('java');
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSimulateDownload = () => {
    sound.playClick();
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.7 },
          });
          sound.playCopy();
          setTimeout(() => setDownloadProgress(null), 3000);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleDirectLaunch = () => {
    sound.playWarp();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
    });
    // Attempt standard Minecraft protocol URL
    window.location.href = `minecraft://`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0d071e]/95 border border-purple-500/40 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.35)] overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow header banner */}
        <div className="relative px-6 pt-6 pb-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-cyan-950/40">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-xl bg-purple-900/30 hover:bg-purple-800/60 text-purple-300 hover:text-white transition-all duration-200 border border-purple-500/30"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/30 flex items-center justify-center">
              <span className="text-2xl">🌌</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-display tracking-wide text-white">
                  MooVoidSMP Launcher
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  1.21.4 Online
                </span>
              </div>
              <p className="text-sm text-purple-300/80">
                Choose your client or join directly with IP address
              </p>
            </div>
          </div>

          {/* Quick tab switch */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => {
                sound.playHover();
                setActiveTab('java');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'java'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                  : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/50'
              }`}
            >
              <Monitor className="w-4 h-4" />
              Java Edition (PC/Mac)
            </button>
            <button
              onClick={() => {
                sound.playHover();
                setActiveTab('bedrock');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'bedrock'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/40'
                  : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/50'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Bedrock Edition (Mobile/Console)
            </button>
            <button
              onClick={() => {
                sound.playHover();
                setActiveTab('modpack');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'modpack'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/40'
                  : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Official Modpack
            </button>
          </div>
        </div>

        {/* Modal body content */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {activeTab === 'java' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold">
                    Primary Server IP (Java 1.20 - 1.21.4)
                  </span>
                  <div className="text-xl font-mono font-bold text-cyan-300 mt-0.5 flex items-center gap-2">
                    {SERVER_INFO.javaIP}
                  </div>
                </div>
                <button
                  onClick={onCopyIp}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-200 shadow-md ${
                    copied
                      ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" /> Copy IP
                    </>
                  )}
                </button>
              </div>

              {/* Quick Launch Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDirectLaunch}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 font-semibold border border-purple-400/40 shadow-lg shadow-purple-700/25 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-900/60 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-purple-300 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white">Direct Launch App</div>
                      <div className="text-xs text-purple-200/70">Launch installed Minecraft client</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-300" />
                </button>

                <a
                  href="https://modrinth.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-950/50 hover:bg-purple-900/60 font-semibold border border-purple-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white">Modrinth App</div>
                      <div className="text-xs text-purple-300/70">One-click profile import</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-400" />
                </a>
              </div>

              {/* Instructions steps */}
              <div className="p-4 rounded-2xl bg-[#090515] border border-purple-500/15 space-y-2">
                <h4 className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Quick Connect Guide
                </h4>
                <ol className="text-xs text-purple-200/80 space-y-1.5 list-decimal pl-4 leading-relaxed">
                  <li>Open Minecraft Java Edition (Version 1.20 to 1.21.4).</li>
                  <li>Click <strong>Multiplayer</strong> &rarr; <strong>Direct Connection</strong> (or Add Server).</li>
                  <li>Paste <code className="bg-purple-950 px-1 py-0.5 rounded text-cyan-300 font-mono">play.moovoidsmp.net</code> into Server Address.</li>
                  <li>Click <strong>Join Server</strong> and begin exploring the Bovine Singularity!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'bedrock' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">
                      Bedrock Server Address
                    </span>
                    <div className="text-lg font-mono font-bold text-white mt-0.5">
                      {SERVER_INFO.bedrockIP}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">
                      Bedrock Port
                    </span>
                    <div className="text-lg font-mono font-bold text-cyan-300 mt-0.5">
                      {SERVER_INFO.bedrockPort}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onCopyIp}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-lg shadow-cyan-600/30"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Bedrock IP Copied!' : 'Copy Bedrock Address'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#090515] border border-cyan-500/20 text-xs text-cyan-200/80 space-y-2">
                <div className="font-bold text-white">Compatible Devices:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20">📱 iOS & Android</div>
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20">💻 Windows 10/11</div>
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20">🎮 Xbox / PS5 (DNS)</div>
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20">🕹️ Nintendo Switch</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'modpack' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-500/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base">
                      MooVoid Season IV Official Modpack
                    </h4>
                    <p className="text-xs text-pink-300/80 mt-0.5">
                      Includes Simple Voice Chat, Iris Shaders, Sodium 300+ FPS booster, MooVoid Custom HUD & Celestial Skybox.
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 font-mono">
                    v4.2.1
                  </span>
                </div>

                {downloadProgress !== null ? (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-pink-300 font-mono">
                      <span>Downloading MooVoidSMP-v4.mrpack...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-purple-950 rounded-full overflow-hidden border border-pink-500/30">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleSimulateDownload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold transition-all shadow-lg shadow-pink-600/30"
                  >
                    <Download className="w-5 h-5" /> Download Modpack (Fabric 1.21.4)
                  </button>
                )}
              </div>

              <div className="text-xs text-purple-300/70 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                💡 <em>Vanilla friendly:</em> You do NOT need the modpack to join! Any standard Minecraft 1.20-1.21.4 client can connect instantly.
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4 border-t border-purple-500/20 bg-purple-950/40 flex items-center justify-between text-xs text-purple-300/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>24/7 Dedicated Cosmic Cluster (99.98% uptime)</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-purple-300 hover:text-white font-semibold underline underline-offset-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
