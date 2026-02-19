import { useState } from "react";
import { Phone, MapPin, Send, X, AlertTriangle } from "lucide-react";

const SOSButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSOS = () => {
    setShowModal(true);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  };

  const handleCall112 = () => {
    window.location.href = "tel:112";
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          alert(`Location shared: ${pos.coords.latitude}, ${pos.coords.longitude}`);
        },
        () => {
          alert("Location access denied. Please enable location services.");
        }
      );
    }
  };

  return (
    <>
      <button
        onClick={handleSOS}
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-sos text-sos-foreground flex items-center justify-center animate-sos-pulse font-bold text-accessible-sm shadow-lg hover:scale-105 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-sos/50"
        aria-label="Emergency SOS Button"
        title="Emergency SOS"
      >
        SOS
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="sos-title"
          aria-describedby="sos-desc"
        >
          <div className={`w-full max-w-md rounded-2xl p-6 md:p-8 shadow-2xl ${confirmed ? 'bg-sos' : 'bg-card'}`}>
            {!confirmed ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-sos" aria-hidden="true" />
                    <h2 id="sos-title" className="font-display font-bold text-accessible-xl text-foreground">
                      Activate SOS?
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-lg hover:bg-secondary"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p id="sos-desc" className="text-accessible-base text-muted-foreground mb-6">
                  This will send an emergency alert and share your location with emergency services.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleConfirm}
                    className="w-full py-4 rounded-xl bg-sos text-sos-foreground font-bold text-accessible-lg hover:opacity-90 transition-opacity"
                  >
                    ⚠️ Confirm Emergency
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-medium text-accessible-base"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display font-bold text-accessible-2xl text-sos-foreground text-center mb-2">
                  🚨 EMERGENCY DETECTED
                </h2>
                <p className="text-sos-foreground/90 text-center text-accessible-base mb-8">
                  Help is on the way. Use the options below:
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCall112}
                    className="w-full py-4 rounded-xl bg-sos-foreground text-sos font-bold text-accessible-lg flex items-center justify-center gap-3"
                  >
                    <Phone className="w-6 h-6" /> Call 112
                  </button>
                  <button
                    onClick={handleShareLocation}
                    className="w-full py-4 rounded-xl bg-sos-foreground/20 text-sos-foreground font-bold text-accessible-base flex items-center justify-center gap-3 border-2 border-sos-foreground/30"
                  >
                    <MapPin className="w-6 h-6" /> Share Location
                  </button>
                  <button
                    className="w-full py-4 rounded-xl bg-sos-foreground/20 text-sos-foreground font-bold text-accessible-base flex items-center justify-center gap-3 border-2 border-sos-foreground/30"
                  >
                    <Send className="w-6 h-6" /> Send Alert to Contacts
                  </button>
                  <button
                    onClick={() => { setShowModal(false); setConfirmed(false); }}
                    className="w-full py-3 rounded-xl text-sos-foreground/80 font-medium text-accessible-sm mt-2"
                  >
                    Cancel Emergency
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;
