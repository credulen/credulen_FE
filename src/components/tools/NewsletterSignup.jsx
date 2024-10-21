import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, AlertCircle, X, Loader } from "lucide-react";
import { Alert, AlertDescription } from "./Alert";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (alertInfo) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        setAlertInfo(null);
      }, 5000); // Increased to 5 seconds to give users time to read and close if desired
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/newsletter-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setAlertInfo({
          message: "Subscription successful!",
          variant: "success",
          icon: CheckCircle,
        });
        setEmail("");
      } else {
        setAlertInfo({
          message: data.message || "An error occurred. Please try again.",
          variant: data.message.includes("already subscribed")
            ? "warning"
            : "destructive",
          icon: AlertCircle,
        });
        setEmail("");
      }
    } catch (error) {
      setAlertInfo({
        message: "An error occurred. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sky-10 p-8 rounded-lg max-w-2xl mx-auto relative">
      <style jsx>{`
        @keyframes continuousRing {
          0%,
          100% {
            transform: rotate(0);
          }
          5%,
          15%,
          25% {
            transform: rotate(15deg);
          }
          10%,
          20%,
          30% {
            transform: rotate(-15deg);
          }
          35% {
            transform: rotate(0);
          }
        }
        .ringing {
          animation: continuousRing 2s ease-in-out infinite;
          transform-origin: top center;
        }
      `}</style>
      <h3 className="text-3xl font-bold text-teal-600 mb-4 uppercase">
        Sign up for our newsletter, stay updated!
      </h3>
      <p className="text-teal-700 mb-6">
        Join Our Newsletter for the latest updates and exclusive content.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          autoComplete="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
          className="flex-grow p-2 border border-teal-500 rounded placeholder-slate-400"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:font-medium  transition-colors flex items-center justify-center hover:border-2 hover:border-teal-700 hover:bg-white hover:text-teal-700  duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin mr-2" size={20} />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {alertInfo && (
          <Alert variant={alertInfo.variant} className="m-0">
            <div className="flex items-center gap-2">
              {alertInfo.icon && (
                <alertInfo.icon className="h-5 w-5 flex-shrink-0" />
              )}
              <AlertDescription>{alertInfo.message}</AlertDescription>
            </div>
          </Alert>
        )}
      </Modal>
      <div className="absolute top-4 right-4">
        <Bell size={32} className="text-gray-700 ringing" />
      </div>
    </div>
  );
};

export default NewsletterSignup;
