import { Heart, Shield, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-12" role="contentinfo">
      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-accessible-base text-foreground mb-3">About</h3>
            <p className="text-accessible-sm text-muted-foreground">
              Saarthi AI makes communication accessible for Deaf, hard-of-hearing, and speech-impaired individuals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-accessible-base text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-accessible-sm text-muted-foreground hover:text-foreground hover:underline flex items-center gap-2"><Shield className="w-4 h-4" aria-hidden="true" />Accessibility Statement</a></li>
              <li><a href="#" className="text-accessible-sm text-muted-foreground hover:text-foreground hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-accessible-sm text-muted-foreground hover:text-foreground hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-accessible-base text-foreground mb-3">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:help@saarthi.ai" className="text-accessible-sm text-muted-foreground hover:text-foreground hover:underline flex items-center gap-2"><Mail className="w-4 h-4" aria-hidden="true" />help@saarthi.ai</a></li>
              <li><a href="tel:112" className="text-accessible-sm text-muted-foreground hover:text-foreground hover:underline flex items-center gap-2"><Phone className="w-4 h-4" aria-hidden="true" />Emergency: 112</a></li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="font-display font-bold text-accessible-base text-foreground mb-3">Emergency Resources</h3>
            <ul className="space-y-2">
              <li><a href="tel:112" className="text-accessible-sm text-muted-foreground hover:text-foreground hover:underline">National Emergency: 112</a></li>
              <li><a href="#" className="text-accessible-sm text-muted-foreground hover:text-foreground hover:underline">Disability Helpline</a></li>
              <li><a href="#" className="text-accessible-sm text-muted-foreground hover:text-foreground hover:underline">Mental Health Support</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-accessible-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-sos" aria-label="love" /> for accessibility
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
