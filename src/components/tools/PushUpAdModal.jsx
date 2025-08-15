import React, { useState, useEffect } from "react";
import { Gift, MessageCircle, X, Sparkles, Star, Zap } from "lucide-react";

const PushUpAdModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    console.log("isOpen changed to:", isOpen); // Debug log
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    } else if (!isOpen && isVisible) {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 300);
    }
  }, [isOpen, onClose, isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const whatsappLink =
    "https://wa.me/2349012048912?text=Hi%20Credulen%20Team%2C%20I%27m%20interested%20in%20the%20special%20promo%20link%20to%20pay%20for%20the%20Blockchain%20Analytics%20Webinar.%20Please%20send%20me%20the%20details";

  return (
    <div
      className={`fixed inset-0 bg-black transition-all duration-500 ease-out flex items-center justify-center z-50 ${
        isClosing ? "bg-opacity-0" : "bg-opacity-60"
      }`}
      onClick={() => !isClosing && handleClose()}>
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div
        className={`relative bg-[#c4d5e1] rounded-xl p-6 max-w-md w-full mx-2 shadow-xl transform transition-all duration-500 ease-out border-2 border-[#047481] ${
          isClosing
            ? "scale-90 opacity-0 translate-y-4 rotate-1"
            : "scale-100 opacity-100 translate-y-0 rotate-0"
        }`}
        onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-br from-[#047481] to-[#198754] rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-br from-[#047481] to-[#198754] rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}></div>

        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-[#0a3d62] hover:text-white bg-white hover:bg-[#047481] rounded-full p-1 transition-all duration-200 hover:scale-110 z-10"
          aria-label="Close modal">
          <X size={20} />
        </button>

        <div
          className="absolute top-5 left-5 text-[#198754] animate-bounce"
          style={{ animationDelay: "0.5s" }}>
          <Sparkles size={14} />
        </div>
        <div
          className="absolute top-7 right-14 text-[#047481] animate-bounce"
          style={{ animationDelay: "1.5s" }}>
          <Star size={12} />
        </div>
        <div
          className="absolute bottom-20 left-7 text-[#198754] animate-bounce"
          style={{ animationDelay: "2s" }}>
          <Zap size={10} />
        </div>

        <div className="text-center mb-6 relative">
          <div className="relative mx-auto w-16 h-16 mb-5">
            <div
              className="absolute inset-0 border-4 border-[#047481] rounded-full animate-spin"
              style={{ animationDuration: "3s" }}></div>
            <div className="w-16 h-16 bg-gradient-to-br from-[#047481] to-[#198754] rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
              <Gift className="w-10 h-10 text-pink-500 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#047481] to-[#198754] rounded-full blur-md opacity-30 animate-pulse"></div>
          </div>

          <h2 className="text-2xl font-bold bg-[#198754] bg-clip-text text-transparent mb-2 transform transition-all duration-300 hover:scale-105">
            Unlock Savings!
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#047481] to-[#198754] mx-auto rounded-lg"></div>
        </div>

        <div className="text-center text-[#0a3d62] space-y-4">
          <div className="transform transition-all duration-500">
            <p className="text-lg font-semibold">
              Get up to{" "}
              <span className="text-2xl font-extrabold text-[#047481] animate-pulse rounded-md">
                50% OFF
              </span>{" "}
              with our promo code!
            </p>
          </div>

          <div className="transform transition-all duration-500 delay-100">
            <p className="text-gray-700 text-sm mt-4">
              You can qualify for this promo by reaching out to us on WhatsApp
              to learn more about how to qualify and get your exclusive promo
              code.
            </p>
          </div>

          <div className="transform transition-all duration-500 delay-200">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#e6f3f5] to-[#f0f9ff] rounded-full border-2 border-[#047481]">
              <span className="text-xl animate-bounce">🎉</span>
              <p className="text-[#198754] text-sm font-semibold">
                Exclusive deal!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center transform transition-all duration-500 delay-300">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#047481] to-[#198754] rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative bg-[#198754] text-white py-2 px-3 rounded-xl hover:bg-[#112b2e] transition-all duration-300 flex items-center justify-center gap-3 transform group-hover:scale-105">
              <MessageCircle
                size={18}
                className="transform group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="font-bold text-base">WhatsApp Us</span>
              <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                →
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 group-hover:animate-ping rounded-xl"></div>
            </div>
          </a>

          <div className="mt-3 flex items-center justify-center gap-3 text-sm text-[#0a3d62]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#198754] rounded-full animate-pulse"></div>
              <span className="font-medium">Secure</span>
            </div>
            <div className="w-0.5 h-4 bg-gray-300"></div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 bg-[#047481] rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}></div>
              <span className="font-medium">Instant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushUpAdModal;
