import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Bell, CheckCircle, AlertCircle, X, Loader } from "lucide-react";
import { Alert, AlertDescription } from "../components/tools/Alert";
const backendURL = import.meta.env.VITE_BACKEND_URL;

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

const Footer = () => {
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
    <footer className="bg-slate-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Social Media Icons */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="Credulen" className="h-8 mb-4" />
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-teal-500">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-teal-500">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-teal-500">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-teal-500">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-teal-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-teal-500">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-teal-500">
                  Our Philosophy
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-teal-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-500">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Subscribe to our newsletter
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className=" p-2 rounded text-slate-800 placeholder-slate-400"
              required
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
