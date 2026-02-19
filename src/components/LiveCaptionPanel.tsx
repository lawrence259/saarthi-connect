import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";

type Emotion = "happy" | "angry" | "neutral" | "question" | "serious";

interface CaptionLine {
  id: number;
  verbatim: string;
  simplified: string;
  emotion: Emotion;
}

const emotionLabels: Record<Emotion, string> = {
  happy: "😊 Happy",
  angry: "😠 Urgent",
  neutral: "😐 Neutral",
  question: "❓ Question",
  serious: "😐 Serious",
};

const emotionColorClass: Record<Emotion, string> = {
  happy: "emotion-strip-happy",
  angry: "emotion-strip-angry",
  neutral: "emotion-strip-neutral",
  question: "emotion-strip-question",
  serious: "emotion-strip-serious",
};

// Demo captions for simulation
const demoCaptions: CaptionLine[] = [
  { id: 1, verbatim: "Good morning everyone, welcome to today's session.", simplified: "Good morning! Welcome.", emotion: "happy" },
  { id: 2, verbatim: "We'll be discussing the new accessibility features.", simplified: "We talk about new features for access.", emotion: "neutral" },
  { id: 3, verbatim: "Does anyone have questions about the previous topic?", simplified: "Any questions about last topic?", emotion: "question" },
  { id: 4, verbatim: "This is a critical update that needs immediate attention.", simplified: "Important update. Act now.", emotion: "serious" },
  { id: 5, verbatim: "Please evacuate the building immediately!", simplified: "Leave the building NOW!", emotion: "angry" },
];

interface LiveCaptionPanelProps {
  isActive: boolean;
  onClose: () => void;
}

const LiveCaptionPanel = ({ isActive, onClose }: LiveCaptionPanelProps) => {
  const [captions, setCaptions] = useState<CaptionLine[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>("neutral");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    setIsListening(true);

    // Simulate incoming captions
    let index = 0;
    const interval = setInterval(() => {
      if (index < demoCaptions.length) {
        const caption = demoCaptions[index];
        setCaptions((prev) => [...prev, caption]);
        setCurrentEmotion(caption.emotion);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [captions]);

  if (!isActive) return null;

  return (
    <section
      className="container max-w-5xl py-8"
      aria-label="Live Caption Panel"
      aria-live="polite"
    >
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isListening ? "bg-emotion-happy animate-pulse" : "bg-muted-foreground"}`} />
          <span className="font-display font-bold text-accessible-lg">
            {isListening ? "Listening..." : "Paused"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-accessible-sm font-medium text-primary-foreground ${emotionColorClass[currentEmotion]}`}>
            {emotionLabels[currentEmotion]}
          </div>
          <button
            onClick={() => setIsListening(!isListening)}
            className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted"
            aria-label={isListening ? "Pause captions" : "Resume captions"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium text-accessible-sm hover:bg-muted"
          >
            Close
          </button>
        </div>
      </div>

      {/* Split Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Verbatim Panel */}
        <div className="rounded-2xl bg-card border shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b bg-secondary/50">
            <h3 className="font-display font-bold text-accessible-base text-foreground flex items-center gap-2">
              <Volume2 className="w-5 h-5" aria-hidden="true" />
              Verbatim Caption
            </h3>
          </div>
          <div ref={scrollRef} className="p-5 max-h-80 overflow-y-auto space-y-3">
            {captions.length === 0 && (
              <p className="text-muted-foreground text-accessible-base italic">Waiting for speech...</p>
            )}
            {captions.map((c) => (
              <div key={c.id} className="flex gap-3 items-start">
                <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${emotionColorClass[c.emotion]}`} />
                <p className="text-accessible-base text-foreground">{c.verbatim}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Simplified Panel */}
        <div className="rounded-2xl bg-card border shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b bg-primary/5">
            <h3 className="font-display font-bold text-accessible-base text-foreground">
              ✨ Simplified Caption
            </h3>
          </div>
          <div className="p-5 max-h-80 overflow-y-auto space-y-3">
            {captions.length === 0 && (
              <p className="text-muted-foreground text-accessible-base italic">Waiting for speech...</p>
            )}
            {captions.map((c) => (
              <div key={c.id} className="flex gap-3 items-start">
                <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${emotionColorClass[c.emotion]}`} />
                <p className="text-accessible-lg font-semibold text-foreground">{c.simplified}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emotion Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center" aria-label="Emotion color legend">
        {(Object.entries(emotionLabels) as [Emotion, string][]).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${emotionColorClass[key]}`} />
            <span className="text-accessible-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveCaptionPanel;
