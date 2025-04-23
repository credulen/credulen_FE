import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../components/tools/Alert";

const PaymentError = ({ reference }) => {
  return (
    <div className="text-center">
      <div className="bg-red-50 p-6 rounded-lg mb-6">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700 mb-2">
          Payment Failed
        </h2>
        <p className="text-red-600">
          There was an issue processing your payment.
        </p>
      </div>

      <div className="bg-teal-50 p-6 rounded-lg">
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertDescription>
              {reference
                ? "Your payment could not be verified. Please try again or contact support."
                : "No transaction reference provided."}
            </AlertDescription>
          </Alert>

          {reference && (
            <div className="text-left max-w-md mx-auto">
              <p className="text-gray-600">
                Reference: <span className="font-medium">{reference}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Please keep this reference number for support inquiries.
              </p>
            </div>
          )}

          <div className="space-y-3 mt-6">
            <button
              onClick={() => (window.location.href = "/solutions")}
              className="bg-teal-700 text-white py-2 px-6 rounded-md hover:bg-teal-800 transition duration-200">
              Try Again
            </button>
            <p className="text-sm text-gray-600">
              If the problem persists, contact support at{" "}
              <a
                href="mailto:support@example.com"
                className="text-teal-700 hover:underline">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
