import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import PhoneIcon from "@mui/icons-material/Phone";
import { Alert, AlertDescription } from "../components/tools/Alert";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";
const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enrolled: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/[^\d]/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.enrolled) {
      newErrors.enrolled = "Please select an option";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const lastShown = localStorage.getItem("bannerLastShown");
    const today = new Date().toDateString();

    if (lastShown !== today) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem("bannerLastShown", today);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setAlertInfo({
        message: "Please fix the form errors before submitting.",
        variant: "warning",
        icon: AlertCircle,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/registerJoinCommunity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setAlertInfo({
          message: "Registration successful! 🏆🎉",
          variant: "success",
          icon: CheckCircle,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          enrolled: "",
        });
        setTimeout(() => setIsModalOpen(false), 2000);
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      setAlertInfo({
        message: error.message || "An error occurred. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alertInfo) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        setAlertInfo(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed top-20 left-0 right-0 z-50 animate-slideDown">
        <div className="bg-teal-800 text-white px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
            <div className="flex-1">
              <span className="text-base font-medium animate-pulse">
                Join our Next Free Masterclass
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white rounded-md pl-4 pr-3 py-1.5 flex items-center"
              >
                <span className="text-teal-800 font-semibold text-sm">
                  Register Now
                </span>

                <IoMdSend className=" w-4 h-4 ml-1 text-[#05505c]" />
              </button>
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md mx-4 relative shadow-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6">
                {/* Alert Component */}
                {alertInfo && (
                  <Alert variant={alertInfo.variant} className="mb-4">
                    <alertInfo.icon className="h-4 w-4" />
                    <AlertDescription>{alertInfo.message}</AlertDescription>
                  </Alert>
                )}

                {/* Form Content */}
                <div className="space-y-6">
                  {/* Thumbnail */}
                  <div className="relative w-48 h-32 mx-auto">
                    <img
                      src="/api/placeholder/192/128"
                      alt="credulen form header image"
                      className="rounded-lg shadow-lg"
                    />
                    <div className="absolute -right-2 -top-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                      1
                    </div>
                  </div>

                  {/* Form Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-2 text-btColour">
                      Prepare for a Career in Tech: Get FREE Lifetime Access to
                      Case Studies & Video Tutorials
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Drop your email address to get access
                    </p>
                  </div>

                  {/* Registration Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 overflow-y-auto"
                  >
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className={`w-full p-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className={`w-full p-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        className={`w-full p-3 pl-12 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <select
                        name="enrolled"
                        className={`w-full p-3 border rounded-lg bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          errors.enrolled ? "border-red-500" : "border-gray-300"
                        }`}
                        value={formData.enrolled}
                        onChange={handleInputChange}
                      >
                        <option value="">
                          Have you enrolled in any courses?
                        </option>
                        <option value="yes">
                          Yes, I have enrolled in at least one course
                        </option>
                        <option value="no">
                          No, I have not enrolled in any courses
                        </option>
                      </select>
                      {errors.enrolled && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.enrolled}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-btColour text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Join our community today!</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NotificationBanner;