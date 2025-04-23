import React from "react";
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../components/tools/Alert";

const PaymentSuccess = ({ details }) => {
  console.log(details, "PaymentSuccess details");

  return (
    <div className="text-center">
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          Payment Successful!
        </h2>
        <p className="text-green-600">
          Your payment has been successfully processed.
        </p>
      </div>

      <div className="bg-teal-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-teal-800 mb-4">
          Payment Details
        </h3>
        <div className="space-y-3 text-left max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">
              ₦{(details?.amount || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Training:</span>
            <span className="font-medium">
              {details?.selectedSolution || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{details?.email || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{details?.paymentDate || "N/A"}</span>
          </div>
        </div>

        <Alert variant="success" className="mt-6">
          <AlertDescription>
            A confirmation email has been sent to{" "}
            {details?.email || "your email"}. Please check your inbox (and spam
            folder).
          </AlertDescription>
        </Alert>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-teal-700 text-white py-2 px-6 rounded-md hover:bg-teal-800 transition duration-200">
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
