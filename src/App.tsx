import { useState, useEffect } from 'react';
import { CowSpotsBackground, SpotTheme } from './components/CowSpotsBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RealmsSection } from './components/RealmsSection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { RanksSection } from './components/RanksSection';
import { RulesAndFaqSection } from './components/RulesAndFaqSection';
import { LiveConsoleStream } from './components/LiveConsoleStream';
import { LaunchModal } from './components/LaunchModal';
import { ControlsHUD } from './components/ControlsHUD';
import { Footer } from './components/Footer';
import { SERVER_INFO } from './data/smpData';
import { sound } from './utils/soundFx';
import confetti from 'canvas-confetti';

export function App() {
  const [onlineCount, setOnlineCount] = useState<number>(SERVER_INFO.initialOnline);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Cow spots customizable background state
  const [cowTheme, setCowTheme] = useState<SpotTheme>('void');
  const [cowSpeed, setCowSpeed] = useState<number>(1.0);
  const [spotCount, setSpotCount] = useState<number>(16);
  const [scanlines, setScanlines] = useState<boolean>(false);

  // Subtle live player count variation
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3);
      setOnlineCount((prev) => Math.max(180, Math.min(SERVER_INFO.maxPlayers - 20, prev + delta)));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listeners (e.g. 'M' for moo, 'C' for copy IP)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'm' || e.key === 'M') {
        sound.playMoo();
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.8 },
        });
      } else if (e.key === 'c' || e.key === 'C') {
        handleCopyIp();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(SERVER_INFO.javaIP).catch(() => {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = SERVER_INFO.javaIP;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });

    setCopied(true);
    sound.playCopy();

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#a855f7', '#06b6d4', '#ec4899', '#ffffff'],
    });

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* 1. Moving Cow Spots in Cosmic Void Canvas */}
      <CowSpotsBackground
        theme={cowTheme}
        speed={cowSpeed}
        spotCount={spotCount}
        interactive={true}
      />

      {/* 2. Interactive Custom Cursor with Hover Tracking */}
      <CustomCursor />

      {/* 3. Optional CRT Scanline Overlay */}
      {scanlines && <div className="fixed inset-0 scanline-overlay z-30 pointer-events-none" />}

      {/* 4. Top Navigation Bar */}
      <Navbar
        onlineCount={onlineCount}
        copied={copied}
        onCopyIp={handleCopyIp}
        onOpenLaunch={() => setIsLaunchModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 5. Main Single Page Launcher Content */}
      <main className="relative z-10">
        <HeroSection
          onlineCount={onlineCount}
          copied={copied}
          onCopyIp={handleCopyIp}
          onOpenLaunch={() => setIsLaunchModalOpen(true)}
        />

        <RealmsSection />

        <LeaderboardSection />

        <RanksSection />

        <RulesAndFaqSection />

        <LiveConsoleStream />
      </main>

      {/* 6. Footer */}
      <Footer
        copied={copied}
        onCopyIp={handleCopyIp}
        onOpenLaunch={() => setIsLaunchModalOpen(true)}
      />

      {/* 7. Atmosphere & Audio Floating HUD Controls */}
      <ControlsHUD
        theme={cowTheme}
        setTheme={setCowTheme}
        speed={cowSpeed}
        setSpeed={setCowSpeed}
        spotCount={spotCount}
        setSpotCount={setSpotCount}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        scanlines={scanlines}
        setScanlines={setScanlines}
      />

      {/* 8. Launch Game Modal */}
      <LaunchModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        onCopyIp={handleCopyIp}
        copied={copied}
      />
    </div>
  );
}

export default App;
