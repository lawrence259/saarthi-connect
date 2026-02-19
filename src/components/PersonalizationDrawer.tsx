import { useState } from "react";
import { Settings, X, Sun, Moon, Type, Gauge, Hand, SmilePlus, AlertTriangle, Timer } from "lucide-react";

interface PersonalizationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonalizationDrawer = ({ isOpen, onClose }: PersonalizationDrawerProps) => {
  const [fontSize, setFontSize] = useState(18);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [simplification, setSimplification] = useState(2);
  const [islGloss, setIslGloss] = useState(true);
  const [emotionIndicator, setEmotionIndicator] = useState(true);
  const [autoSOS, setAutoSOS] = useState(false);
  const [captionSpeed, setCaptionSpeed] = useState(2);

  const handleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  };

  return (
    <>
      {/* Trigger */}
      {!isOpen && (
        <button
          onClick={() => {/* parent controls */}}
          className="sr-only"
          aria-label="Open settings"
        >
          Open Settings
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[95] h-full w-full max-w-sm bg-card shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Personalization settings"
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-display font-bold text-accessible-xl text-foreground flex items-center gap-2">
            <Settings className="w-6 h-6" aria-hidden="true" />
            Settings
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary" aria-label="Close settings">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 space-y-6 overflow-y-auto h-[calc(100%-72px)]">
          {/* Font Size */}
          <div>
            <label className="flex items-center gap-2 font-medium text-accessible-base mb-3">
              <Type className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min={14}
              max={28}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
              aria-label={`Font size: ${fontSize} pixels`}
            />
            <div className="flex justify-between text-accessible-sm text-muted-foreground mt-1">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>

          {/* High Contrast */}
          <ToggleSetting
            icon={<Sun className="w-5 h-5" />}
            label="High Contrast Mode"
            checked={highContrast}
            onChange={setHighContrast}
          />

          {/* Dark Mode */}
          <ToggleSetting
            icon={<Moon className="w-5 h-5" />}
            label="Dark Mode"
            checked={darkMode}
            onChange={handleDarkMode}
          />

          {/* Simplification Level */}
          <div>
            <label className="flex items-center gap-2 font-medium text-accessible-base mb-3">
              <Gauge className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              Simplification Level
            </label>
            <div className="flex gap-2">
              {["Basic", "Medium", "Simple"].map((level, i) => (
                <button
                  key={level}
                  onClick={() => setSimplification(i)}
                  className={`flex-1 py-2 rounded-xl font-medium text-accessible-sm transition-colors ${
                    simplification === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                  aria-pressed={simplification === i}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* ISL Gloss */}
          <ToggleSetting
            icon={<Hand className="w-5 h-5" />}
            label="ISL Gloss"
            checked={islGloss}
            onChange={setIslGloss}
          />

          {/* Emotion Indicator */}
          <ToggleSetting
            icon={<SmilePlus className="w-5 h-5" />}
            label="Emotion Indicator"
            checked={emotionIndicator}
            onChange={setEmotionIndicator}
          />

          {/* Auto SOS */}
          <ToggleSetting
            icon={<AlertTriangle className="w-5 h-5" />}
            label="Auto-SOS Detection"
            checked={autoSOS}
            onChange={setAutoSOS}
          />

          {/* Caption Speed */}
          <div>
            <label className="flex items-center gap-2 font-medium text-accessible-base mb-3">
              <Timer className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              Caption Speed
            </label>
            <input
              type="range"
              min={1}
              max={3}
              value={captionSpeed}
              onChange={(e) => setCaptionSpeed(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
              aria-label={`Caption speed: ${["Slow", "Normal", "Fast"][captionSpeed - 1]}`}
            />
            <div className="flex justify-between text-accessible-sm text-muted-foreground mt-1">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable toggle component
const ToggleSetting = ({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <label className="flex items-center gap-2 font-medium text-accessible-base cursor-pointer">
      <span className="text-muted-foreground" aria-hidden="true">{icon}</span>
      {label}
    </label>
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-7 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-secondary"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-card shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

export default PersonalizationDrawer;
