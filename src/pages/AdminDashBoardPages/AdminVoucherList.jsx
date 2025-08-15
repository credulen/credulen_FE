import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import { BiMessageSquareAdd } from "react-icons/bi";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} className="text-btColour" />
  </div>
);

const VoucherRow = ({ voucher, onDelete, navigate }) => (
  <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="px-4 py-4">{voucher.code}</td>
    <td className="px-4 py-4">{voucher.discountType}</td>
    <td className="px-4 py-4">
      {voucher.discountType === "percentage"
        ? `${voucher.discountValue}%`
        : `₦${voucher.discountValue.toLocaleString()}`}
    </td>
    <td className="px-4 py-4">
      {moment(voucher.expiryDate).format("MMMM D, YYYY")}
    </td>
    <td className="px-4 py-4">{voucher.usageLimit || "Unlimited"}</td>
    <td className="px-4 py-4">{voucher.usageCount || 0}</td>
    <td className="px-4 py-4">
      {voucher.applicableItems.length > 0
        ? `${voucher.applicableItems.length} items`
        : "None"}
    </td>
    <td className="px-4 py-4">
      {voucher.minCartAmount > 0
        ? `₦${voucher.minCartAmount.toLocaleString()}`
        : "None"}
    </td>
    <td className="px-4 py-4">{voucher.oncePerUser ? "Yes" : "No"}</td>
    <td className="px-4 py-4">{voucher.forNewUsers ? "Yes" : "No"}</td>

    <td className="px-4 py-4 flex gap-2">
      <button
        onClick={() =>
          navigate(`/DashBoard/Admin/CreateEditVoucher/${voucher._id}`)
        }
        className="font-medium text-blue-500 bg-transparent border border-blue-500 rounded-md px-2 py-1 hover:bg-blue-500 hover:text-white transition">
        Edit
      </button>
      <button
        onClick={() => onDelete(voucher._id)}
        className="font-medium text-red-500 bg-transparent border border-red-500 rounded-md px-2 py-1 hover:bg-red-500 hover:text-white transition">
        <AiTwotoneDelete size={18} />
      </button>
    </td>
  </tr>
);

const AdminVoucherList = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit for simplicity
  const [totalVouchers, setTotalVouchers] = useState(0);

  const fetchVouchers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${backendURL}/api/getAllVouchers?page=${page}&limit=${limit}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch vouchers");
      }

      setVouchers(data.vouchers || []);
      setTotalVouchers(data.totalVouchers || 0);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch vouchers",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  const handleDelete = useCallback(async (id) => {
    try {
      const res = await fetch(`${backendURL}/api/deleteVoucher/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete voucher");
      }

      setSnackbar({
        open: true,
        message: "Voucher deleted successfully",
        severity: "success",
      });

      setShowDeleteModal(false);
      fetchVouchers();
    } catch (error) {
      console.error("Error deleting voucher:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete voucher",
        severity: "error",
      });
    }
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedVoucherId) {
      handleDelete(selectedVoucherId);
    }
  }, [handleDelete, selectedVoucherId]);

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleNextPage = useCallback(() => {
    if (page * limit < totalVouchers) {
      setPage((prev) => prev + 1);
    }
  }, [page, limit, totalVouchers]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6">
      <div className="my-5 ml-3 mid:mt-20">
        <Link to="/DashBoard/Admin/CreateEditVoucher">
          <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
            <span className="flex whitespace-nowrap">
              <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
              Create Voucher
            </span>
          </button>
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Voucher Management
        </h1>
      </div>

      <div className="flex-grow overflow-x-auto">
        <div className="h-full overflow-y-auto">
          {vouchers.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md rounded-lg">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Code
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Discount Type
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Discount Value
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Expiry Date
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Usage Limit
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Usage Count
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Applicable Items
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Min Cart Amount
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Once Per User
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    For New Users
                  </th>
                  <th scope="col" className="px-4 py-3 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <VoucherRow
                    key={voucher._id}
                    voucher={voucher}
                    onDelete={(id) => {
                      setSelectedVoucherId(id);
                      setShowDeleteModal(true);
                    }}
                    navigate={navigate}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-gray-500 dark:text-gray-400">
              No vouchers found!
            </p>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50">
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(totalVouchers / limit)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page * limit >= totalVouchers}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50">
          Next
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" p-6 rounded-lg max-w-md w-full border border-red-200 bg-red-200">
            <h3 className="text-lg font-semibold mb-2 text-red-600">
              Delete Voucher
            </h3>
            <p className="text-gray-700">
              Are you sure you want to delete this voucher? This action cannot
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminVoucherList;
