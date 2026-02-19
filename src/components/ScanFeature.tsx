import { useState } from "react";
import { Camera, X, AlertTriangle, Volume2, FileText } from "lucide-react";

interface ScanResult {
  originalText: string;
  simplified: string;
  warnings: string[];
  islGloss?: string;
}

// Demo scan results
const demoResults: ScanResult[] = [
  {
    originalText: "CAUTION: Wet Floor Ahead. Please use alternate route.",
    simplified: "Floor is wet. Go another way.",
    warnings: ["⚠️ Safety warning detected"],
    islGloss: "FLOOR WET. OTHER WAY GO.",
  },
  {
    originalText: "Paracetamol 500mg. Take 1-2 tablets every 4-6 hours. Do not exceed 8 tablets in 24 hours.",
    simplified: "Medicine: Paracetamol. Take 1 or 2 pills. Wait 4-6 hours. Maximum 8 pills per day.",
    warnings: ["💊 Medicine label detected"],
    islGloss: "MEDICINE PARACETAMOL. 1-2 PILL TAKE. 4-6 HOUR WAIT. MAX 8 PILL DAY.",
  },
];

interface ScanFeatureProps {
  isActive: boolean;
  onClose: () => void;
}

const ScanFeature = ({ isActive, onClose }: ScanFeatureProps) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showISL, setShowISL] = useState(false);

  const handleCapture = () => {
    setScanning(true);
    // Simulate scan
    setTimeout(() => {
      setResult(demoResults[Math.floor(Math.random() * demoResults.length)]);
      setScanning(false);
    }, 2000);
  };

  if (!isActive) return null;

  return (
    <section className="container max-w-3xl py-8" aria-label="Scan Feature">
      <div className="rounded-2xl bg-card border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-display font-bold text-accessible-xl text-foreground flex items-center gap-2">
            <Camera className="w-6 h-6" aria-hidden="true" />
            Scan Text / Object
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary" aria-label="Close scanner">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera View Placeholder */}
        {!result && (
          <div className="relative bg-foreground/5 aspect-video flex items-center justify-center">
            {scanning ? (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-accessible-lg font-medium text-muted-foreground">Scanning...</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
                <p className="text-accessible-base text-muted-foreground mb-6">Point your camera at text or objects</p>
                <button
                  onClick={handleCapture}
                  className="w-20 h-20 rounded-full bg-accent text-accent-foreground shadow-xl flex items-center justify-center hover:scale-105 transition-transform mx-auto focus-visible:ring-4 focus-visible:ring-ring"
                  aria-label="Capture"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-accent-foreground" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="p-5 space-y-4">
            {/* Warnings */}
            {result.warnings.map((w, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emotion-serious/10 text-foreground">
                <AlertTriangle className="w-5 h-5 text-emotion-serious flex-shrink-0" aria-hidden="true" />
                <span className="text-accessible-base font-medium">{w}</span>
              </div>
            ))}

            {/* Original Text */}
            <div className="rounded-xl bg-secondary p-4">
              <h3 className="font-display font-bold text-accessible-sm text-muted-foreground mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" aria-hidden="true" />
                Detected Text
              </h3>
              <p className="text-accessible-base text-foreground">{result.originalText}</p>
            </div>

            {/* Simplified */}
            <div className="rounded-xl bg-primary/5 border-2 border-primary/20 p-4">
              <h3 className="font-display font-bold text-accessible-sm text-primary mb-2">
                ✨ Simplified
              </h3>
              <p className="text-accessible-lg font-semibold text-foreground">{result.simplified}</p>
            </div>

            {/* ISL Gloss */}
            {result.islGloss && (
              <div>
                <button
                  onClick={() => setShowISL(!showISL)}
                  className="text-accent font-medium text-accessible-base hover:underline"
                >
                  {showISL ? "Hide" : "Show"} ISL Gloss
                </button>
                {showISL && (
                  <div className="mt-2 rounded-xl bg-accent/10 p-4">
                    <p className="text-accessible-lg font-bold text-accent tracking-wide">{result.islGloss}</p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium text-accessible-sm hover:bg-muted">
                <Volume2 className="w-5 h-5" aria-hidden="true" />
                Speak Aloud
              </button>
              <button
                onClick={() => setResult(null)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-accessible-sm"
              >
                <Camera className="w-5 h-5" aria-hidden="true" />
                Scan Again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScanFeature;
