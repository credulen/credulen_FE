import React, { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enrolled: "",
  });

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed top-20 left-0 right-0 z-40 animate-slideDown">
        <div className="bg-teal-800 text-white px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
            <div className="flex-1">
              <span className="text-base font-medium">
                Join our Next Free Masterclass
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button
                className="bg-white rounded-md pl-4 pr-3 py-1.5 flex items-center"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="text-teal-800 font-semibold text-sm">
                  Register Now
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 ml-1 text-teal-800"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {/* Thumbnail Image */}
              <div className="relative w-48 h-32 mx-auto mb-6">
                <img
                  src="/api/placeholder/192/128"
                  alt="Tutorial preview"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -right-2 -top-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                  1
                </div>
              </div>

              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">
                  Prepare for a Career in Tech: Get FREE Lifetime Access to Case
                  Studies & Video Tutorials
                </h2>
                <p className="text-gray-600 text-sm">
                  Drop your email address to get access
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    className="w-full p-3 pl-12 border border-gray-300 rounded-lg"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <select
                  name="enrolled"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  value={formData.enrolled}
                  onChange={handleInputChange}
                >
                  <option value="">Have you enrolled in any courses?</option>
                  <option value="yes">
                    Yes, I have enrolled in at least one course
                  </option>
                  <option value="no">
                    No, I have not enrolled in any courses
                  </option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Join our community today!
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NotificationBanner;
