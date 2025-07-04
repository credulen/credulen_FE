import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Toast = ({ open, message, severity, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs w-full">
      <div
        className={`p-4 rounded-lg shadow-md text-white ${
          severity === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <IoClose size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const WebinarPaymentRow = ({ payment, onDelete }) => (
  <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="px-6 py-4">{`${payment.firstName} ${payment.lastName}`}</td>
    <td className="px-6 py-4">{payment.email}</td>
    <td className="px-6 py-4">{payment.phoneNumber}</td>
    <td className="px-6 py-4">₦{payment.amount.toLocaleString()}</td>
    <td className="px-6 py-4">{payment.paymentStatus}</td>
    <td className="px-6 py-4">
      {moment(payment.transactionDate).format("MMMM D, YYYY HH:mm")}
    </td>
    <td className="px-6 py-4">{payment.paymentReference}</td>
    <td className="px-6 py-4">
      <button
        onClick={() => onDelete(payment._id)}
        className="font-medium text-red-500 bg-transparent border border-red-500 rounded-md px-2 py-1 hover:bg-red-500 hover:text-white transition">
        <AiTwotoneDelete size={18} />
      </button>
    </td>
  </tr>
);

const WebinarPaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendURL}/api/getAllWebinarPayments`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch payments");
      }

      setPayments(data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setToast({
        open: true,
        message: "Failed to fetch webinar payments",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const res = await fetch(
          `${backendURL}/api/deleteWebinarPayment/${id}`, // Adjust endpoint as per your backend
          { method: "DELETE" }
        );

        if (!res.ok) {
          throw new Error("Failed to delete payment");
        }

        setToast({
          open: true,
          message: "Payment deleted successfully",
          severity: "success",
        });

        setShowDeleteModal(false);
        fetchPayments();
      } catch (error) {
        console.error("Error deleting payment:", error);
        setToast({
          open: true,
          message: "Failed to delete payment",
          severity: "error",
        });
      }
    },
    [fetchPayments]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (selectedPaymentId) {
      handleDelete(selectedPaymentId);
    }
  }, [handleDelete, selectedPaymentId]);

  const handleCloseToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Webinar Payment Records
        </h1>
      </div>

      <div className="flex-grow overflow-x-auto">
        <div className="h-full overflow-y-auto">
          {payments.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md rounded-lg">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Transaction Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reference
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <WebinarPaymentRow
                    key={payment._id}
                    payment={payment}
                    onDelete={(id) => {
                      setSelectedPaymentId(id);
                      setShowDeleteModal(true);
                    }}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No webinar payments found!
            </p>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full border border-red-200 bg-red-50">
            <h3 className="text-lg font-semibold mb-2 text-red-600">
              Delete Payment
            </h3>
            <p className="text-gray-700">
              Are you sure you want to delete this payment? This action cannot
              be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium">
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default WebinarPaymentList;
