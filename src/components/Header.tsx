import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import SOSButton from "./SOSButton";

const languages = ["English", "हिन्दी", "தமிழ்", "తెలుగు", "বাংলা"];

const Header = () => {
  const [lang, setLang] = useState("English");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-sm" role="banner">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-xl">S</span>
          </div>
          <span className="font-display font-bold text-accessible-lg text-foreground">
            Saarthi AI
          </span>
        </div>

        {/* Language Selector - Center */}
        <div className="hidden md:flex items-center gap-2">
          <Globe className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="language-select" className="sr-only">Select Language</label>
          <select
            id="language-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-accessible-sm font-medium border-0 focus:ring-2 focus:ring-ring cursor-pointer"
            aria-label="Select language"
          >
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Right: SOS + Mobile Menu */}
        <div className="flex items-center gap-3">
          <SOSButton />
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="language-select-mobile" className="sr-only">Select Language</label>
            <select
              id="language-select-mobile"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-accessible-sm font-medium w-full"
            >
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <nav className="flex flex-col gap-2">
            <a href="#features" className="px-4 py-3 rounded-lg hover:bg-secondary text-accessible-base font-medium">Features</a>
            <a href="#about" className="px-4 py-3 rounded-lg hover:bg-secondary text-accessible-base font-medium">About</a>
            <a href="#contact" className="px-4 py-3 rounded-lg hover:bg-secondary text-accessible-base font-medium">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
