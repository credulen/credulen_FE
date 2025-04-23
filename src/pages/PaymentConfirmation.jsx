import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/tools/Alert";
import PaymentSuccess from "../components/Payments/PaymentSuccess";
import PaymentError from "../components/Payments/PaymentError";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const PaymentConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const reference = searchParams.get("reference");

  useEffect(() => {
    if (reference) {
      verifyPayment();
    } else {
      setIsLoading(false);
      setPaymentStatus("error");
    }
  }, [reference]);

  const verifyPayment = async () => {
    try {
      const response = await fetch(
        `${backendURL}/api/verify-paystack-payment?reference=${reference}`
      );
      const data = await response.json();
      console.log(data, "data received");

      if (response.ok && data.success) {
        setPaymentDetails(data.data);
        setPaymentStatus("success");
      } else {
        throw new Error(data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      // <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      //   <div className="text-center">
      //     <Loader className="animate-spin" size={40} />
      //     <p className="text-gray-600 mt-2">Verifying payment...</p>
      //   </div>
      // </div>
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center max-w-md px-4">
          {/* Animated spinner with checkmark */}
          <div className="relative inline-block mb-8">
            {/* Pulsing background circle */}
            <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>

            {/* Spinner */}
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
            </div>

            {/* Checkmark (hidden initially) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Verifying Payment
            </h3>

            <div className="flex items-center">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full animate-[progress_3s_ease-in-out_forwards]"
                  style={{ "--tw-animate-progress": "0%" }}></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-600">
                50%
              </span>
            </div>
          </div>

          {/* Status messages */}
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="inline-flex h-3 w-3 rounded-full bg-blue-500 animate-pulse mr-2"></span>
              Processing with Paystack...
            </p>
            <p className="text-gray-600">
              <span className="inline-flex h-3 w-3 rounded-full bg-blue-500 animate-pulse mr-2"></span>
              Verifying transaction details
            </p>
            <p className="text-gray-400">
              <span className="inline-flex h-3 w-3 rounded-full bg-gray-300 mr-2"></span>
              Completing registration
            </p>
          </div>

          {/* Loading dots */}
          <div className="mt-6 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-2.5 w-2.5 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}></div>
            ))}
          </div>

          {/* Instruction */}
          <p className="mt-6 text-sm text-gray-500">
            Please wait while we confirm your payment. This may take a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="containe mx-auto px-4 py-4 max-w-3xl mt-[4rem]">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-teal-700 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">
            Payment Confirmation
          </h1>
          <p className="text-center text-teal-100 mt-2">
            Transaction Reference: {reference || "N/A"}
          </p>
        </div>

        <div className="p-6">
          {paymentStatus === "success" && (
            <PaymentSuccess details={paymentDetails} />
          )}
          {paymentStatus === "error" && <PaymentError reference={reference} />}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
