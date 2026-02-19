import { useState } from "react";
import { Settings } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveCaptionPanel from "@/components/LiveCaptionPanel";
import ScanFeature from "@/components/ScanFeature";
import PersonalizationDrawer from "@/components/PersonalizationDrawer";
import Footer from "@/components/Footer";

const Index = () => {
  const [captionsActive, setCaptionsActive] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [islMode, setIslMode] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1" id="main-content">
        {!captionsActive && !scanActive && (
          <HeroSection
            onStartCaptions={() => { setCaptionsActive(true); setScanActive(false); }}
            onStartScan={() => { setScanActive(true); setCaptionsActive(false); }}
            onToggleISL={() => setIslMode(!islMode)}
          />
        )}

        {/* ISL Mode indicator */}
        {islMode && !captionsActive && !scanActive && (
          <div className="container max-w-4xl pb-8">
            <div className="rounded-2xl bg-accent/10 border-2 border-accent p-5 text-center">
              <p className="text-accessible-lg font-bold text-accent">
                🤟 ISL Mode Enabled
              </p>
              <p className="text-accessible-base text-muted-foreground mt-1">
                Captions will include ISL gloss translations.
              </p>
            </div>
          </div>
        )}

        <LiveCaptionPanel
          isActive={captionsActive}
          onClose={() => setCaptionsActive(false)}
        />

        <ScanFeature
          isActive={scanActive}
          onClose={() => setScanActive(false)}
        />

        {/* Features overview when nothing is active */}
        {!captionsActive && !scanActive && (
          <section className="container max-w-5xl pb-12" aria-label="Features">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard
                emoji="🎯"
                title="Real-Time Captions"
                description="Live speech-to-text with emotion detection and smart simplification."
              />
              <FeatureCard
                emoji="📷"
                title="Smart Scanning"
                description="Scan text, signs, and labels. Get simplified explanations instantly."
              />
              <FeatureCard
                emoji="🔴"
                title="Emergency SOS"
                description="One-tap emergency alerts with location sharing and auto-detection."
              />
            </div>
          </section>
        )}
      </main>

      {/* Settings FAB */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-105 transition-transform focus-visible:ring-4 focus-visible:ring-ring"
        aria-label="Open personalization settings"
      >
        <Settings className="w-6 h-6" aria-hidden="true" />
      </button>

      <PersonalizationDrawer
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <Footer />
    </div>
  );
};

const FeatureCard = ({ emoji, title, description }: { emoji: string; title: string; description: string }) => (
  <div className="rounded-2xl bg-card border shadow-sm p-6 hover:shadow-md transition-shadow">
    <span className="text-3xl mb-3 block" aria-hidden="true">{emoji}</span>
    <h3 className="font-display font-bold text-accessible-lg text-foreground mb-2">{title}</h3>
    <p className="text-accessible-sm text-muted-foreground">{description}</p>
  </div>
);

export default Index;
