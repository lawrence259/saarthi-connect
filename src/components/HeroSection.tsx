import { Mic, Camera, Hand } from "lucide-react";

interface HeroSectionProps {
  onStartCaptions: () => void;
  onStartScan: () => void;
  onToggleISL: () => void;
}

const HeroSection = ({ onStartCaptions, onStartScan, onToggleISL }: HeroSectionProps) => {
  return (
    <section className="py-12 md:py-20 px-4" id="main-content" aria-labelledby="hero-title">
      <div className="container max-w-4xl text-center">
        <h1
          id="hero-title"
          className="font-display font-extrabold text-accessible-3xl md:text-accessible-4xl text-foreground mb-4 leading-tight"
        >
          Real-Time Accessible Communication{" "}
          <span className="text-accent">for Everyone</span>
        </h1>
        <p className="text-accessible-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Breaking communication barriers with live captions, smart simplification, and sign language support.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <button
            onClick={onStartCaptions}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-ring"
            aria-label="Start Live Captions"
          >
            <Mic className="w-10 h-10" aria-hidden="true" />
            <span className="font-display font-bold text-accessible-base">Start Live Captions</span>
          </button>

          <button
            onClick={onStartScan}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-ring"
            aria-label="Scan Text or Object"
          >
            <Camera className="w-10 h-10" aria-hidden="true" />
            <span className="font-display font-bold text-accessible-base">Scan Text / Object</span>
          </button>

          <button
            onClick={onToggleISL}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card text-card-foreground shadow-lg border-2 border-border hover:shadow-xl transition-all hover:scale-[1.02] hover:border-primary focus-visible:ring-4 focus-visible:ring-ring"
            aria-label="Enable ISL Mode"
          >
            <Hand className="w-10 h-10" aria-hidden="true" />
            <span className="font-display font-bold text-accessible-base">Enable ISL Mode</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
