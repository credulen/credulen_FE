import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../components/tools/Alert";
import { Loader, CheckCircle, AlertCircle, X, ArrowLeft } from "lucide-react";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { solution } = state || {};
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    employmentStatus: "",
    jobTitle: "",
    selectedSolution: solution?.title || "",
    solutionType: solution?.category || "TrainingSchools",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!solution) {
      navigate("/404");
    }
  }, [solution, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      setAlertInfo({
        message:
          "Please fill in all required fields before proceeding to payment.",
        variant: "destructive",
        icon: AlertCircle,
      });
      return;
    }

    if (!solution?.amount || solution.amount <= 0) {
      setAlertInfo({
        message: "Invalid training fee. Please contact support.",
        variant: "destructive",
        icon: AlertCircle,
      });
      return;
    }

    setIsLoading(true);
    try {
      const amountInKobo = solution.amount * 100; // Use discounted amount in kobo
      const payload = {
        ...formData,
        slug: solution.slug,
        solutionId: solution._id,
        amount: amountInKobo,
        callback_url: `${window.location.origin}/payment-success`,
      };

      const response = await fetch(
        `${backendURL}/api/initiate-paystack-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment initialization failed");
      }

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        throw new Error("No payment URL received from server");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setAlertInfo({
        message:
          error.message || "Failed to initialize payment. Please try again.",
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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  if (!solution) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Course
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Billing Information
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                  placeholder="+234 123 456 7890"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Status (Optional)
                </label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
                  <option value="">Select your status</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title (Optional)
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-gray-500">{solution.category}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  {solution.discountPercentage > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="text-gray-500 line-through">
                        ₦{solution.price?.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {solution.discountPercentage > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Discount:</span>
                      <span className="text-green-600">
                        {solution.discountPercentage}% Off
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-teal-600">
                      ₦{solution.amount?.toLocaleString() || solution.price}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center"
                  disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin mr-2" size={20} />
                      Processing...
                    </>
                  ) : (
                    `Pay ₦${
                      solution.amount?.toLocaleString() || solution.price
                    }`
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Secure payment via Paystack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PaymentPage;
