import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Loader2,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  ChevronDown,
  Filter,
  ArrowLeft,
  BadgeInfo,
  CreditCard,
  Calendar,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
} from "lucide-react";
import * as Select from "@radix-ui/react-select";
import moment from "moment";
import { useSelector } from "react-redux";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

// Memoized loading spinner component
const LoadingSpinner = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
  </div>
));

// Enhanced Payment Details Modal
const PaymentDetailsModal = memo(
  ({ open, onClose, paymentDetails, loading, error }) => {
    if (!open) return null;
    console.log(paymentDetails, "paymentDetails");

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BadgeInfo className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Payment Details
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-100 rounded-lg m-4 p-4">
              <div className="flex items-center text-red-600 mb-2">
                <X className="h-5 w-5 mr-2" />
                <h4 className="font-medium">Error loading payment details</h4>
              </div>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          ) : paymentDetails ? (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  icon={<User className="h-5 w-5 text-blue-500" />}
                  label="Full Name"
                  value={`${paymentDetails.firstName} ${paymentDetails.lastName}`}
                />
                <DetailItem
                  icon={<Mail className="h-5 w-5 text-blue-500" />}
                  label="Email"
                  value={paymentDetails.email}
                />
                <DetailItem
                  icon={<Phone className="h-5 w-5 text-blue-500" />}
                  label="Phone Number"
                  value={paymentDetails.phoneNumber}
                />
                <DetailItem
                  icon={<FileText className="h-5 w-5 text-blue-500" />}
                  label="Selected Solution"
                  value={paymentDetails.selectedSolution}
                />
                <DetailItem
                  icon={<FileText className="h-5 w-5 text-blue-500" />}
                  label="Solution Type"
                  value={paymentDetails.solutionType || "N/A"}
                />
                <DetailItem
                  icon={<FileText className="h-5 w-5 text-blue-500" />}
                  label="Solution Title"
                  value={
                    paymentDetails.solutionTitle ||
                    paymentDetails.solutionId?.title ||
                    paymentDetails.selectedSolution ||
                    "N/A"
                  }
                />
                <DetailItem
                  icon={<CreditCard className="h-5 w-5 text-blue-500" />}
                  label="Amount"
                  value={`₦${paymentDetails.amount?.toLocaleString()}`}
                />
                <DetailItem
                  icon={
                    <div
                      className={`h-5 w-5 rounded-full ${
                        paymentDetails.paymentStatus === "completed"
                          ? "bg-green-100 text-green-600"
                          : paymentDetails.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      } flex items-center justify-center`}>
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                  }
                  label="Payment Status"
                  value={
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        paymentDetails.paymentStatus === "completed"
                          ? "bg-green-100 text-green-800"
                          : paymentDetails.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {paymentDetails.paymentStatus}
                    </span>
                  }
                />
                <DetailItem
                  icon={<CreditCard className="h-5 w-5 text-blue-500" />}
                  label="Payment Reference"
                  value={paymentDetails.paymentReference || "N/A"}
                />
                <DetailItem
                  icon={<Calendar className="h-5 w-5 text-blue-500" />}
                  label="Payment Date"
                  value={
                    paymentDetails.paymentDate
                      ? moment(paymentDetails.paymentDate).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )
                      : paymentDetails.submittedAt
                      ? moment(paymentDetails.submittedAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )
                      : "N/A"
                  }
                />
                <DetailItem
                  icon={<CreditCard className="h-5 w-5 text-blue-500" />}
                  label="Payment Method"
                  value={paymentDetails.paymentMethod || "N/A"}
                />
                <DetailItem
                  icon={<Briefcase className="h-5 w-5 text-blue-500" />}
                  label="Employment Status"
                  value={paymentDetails.employmentStatus || "N/A"}
                />
                <DetailItem
                  icon={<Briefcase className="h-5 w-5 text-blue-500" />}
                  label="Job Title"
                  value={paymentDetails.jobTitle || "N/A"}
                />
                <DetailItem
                  icon={<Briefcase className="h-5 w-5 text-blue-500" />}
                  label="Referered Agent Code"
                  value={paymentDetails.agentCode || "N/A"}
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No payment details available
            </div>
          )}

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
);

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800 font-medium mt-1">{value}</p>
    </div>
  </div>
);

// Payment Search Component
const PaymentSearch = ({ onSearch, searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-12 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Search by payment reference..."
          required
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600 hover:text-blue-800">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

// Payment Table Component
const PaymentTable = memo(({ payments, onViewDetails }) => {
  if (payments.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 flex flex-col items-center">
        <Search className="h-8 w-8 text-gray-400 mb-2" />
        <p>No payment records found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Solution
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reference
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr
              key={payment._id}
              className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.firstName} {payment.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{payment.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {payment.selectedSolution}
                </div>
                <div className="text-xs text-gray-500">
                  {payment.solutionType || "N/A"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  ₦{payment.amount?.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    payment.paymentStatus === "completed"
                      ? "bg-green-100 text-green-800"
                      : payment.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                  {payment.paymentStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-mono">
                  {payment.paymentReference || "N/A"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.paymentDate
                  ? moment(payment.paymentDate).format("MMM D, YYYY")
                  : payment.submittedAt
                  ? moment(payment.submittedAt).format("MMM D, YYYY")
                  : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onViewDetails(payment.paymentReference)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors"
                  title="View details">
                  <Eye className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState("");
  const [solutionType, setSolutionType] = useState("");
  const [sortBy, setSortBy] = useState("paymentDate"); // Added for sorting
  const [sortOrder, setSortOrder] = useState("desc"); // Added for sorting
  const [availableSolutions, setAvailableSolutions] = useState([]);
  const [availableSolutionTypes, setAvailableSolutionTypes] = useState([]);
  const [paymentDetailsModal, setPaymentDetailsModal] = useState({
    open: false,
    paymentDetails: null,
    loading: false,
    error: null,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPayments: 0,
    limit: 10,
  });
  const { userInfo } = useSelector((state) => state.auth);

  const fetchPayments = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
          sortBy,
          sortOrder,
        });
        if (selectedSolution)
          queryParams.append("selectedSolution", selectedSolution);
        if (solutionType) queryParams.append("solutionType", solutionType);

        const res = await fetch(
          `${backendURL}/api/getAllPayments?${queryParams.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const data = await res.json();
        console.log("Payments API Response:", data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch payments");
        }

        setPayments(data.data?.payments || []);
        setPagination((prev) => ({
          ...prev,
          currentPage: data.data?.currentPage || 1,
          totalPages: data.data?.totalPages || 1,
          totalPayments: data.data?.totalPayments || 0,
        }));

        const uniqueSolutions = [
          ...new Set(data.data?.payments.map((p) => p.selectedSolution)),
        ].filter(Boolean);
        const uniqueSolutionTypes = [
          ...new Set(data.data?.payments.map((p) => p.solutionType)),
        ].filter(Boolean);
        setAvailableSolutions(uniqueSolutions);
        setAvailableSolutionTypes(uniqueSolutionTypes);

        setIsSearching(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [
      userInfo?.token,
      pagination.limit,
      selectedSolution,
      solutionType,
      sortBy,
      sortOrder,
    ]
  );

  const searchPaymentByReference = useCallback(
    async (reference) => {
      if (!reference.trim()) {
        fetchPayments(1);
        return;
      }

      try {
        setIsSearching(true);
        setLoading(true);
        const res = await fetch(
          `${backendURL}/api/getPaymentByReference/${reference}`, // Updated to use params
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Payment not found");
        }

        if (data.data) {
          setPayments([data.data]); // Update table with single result
          setPagination((prev) => ({
            ...prev,
            currentPage: 1,
            totalPages: 1,
            totalPayments: 1,
          }));
        }
      } catch (error) {
        console.error("Error searching payment:", error);
        setPayments([]);
        setPagination((prev) => ({
          ...prev,
          currentPage: 1,
          totalPages: 0,
          totalPayments: 0,
        }));
      } finally {
        setLoading(false);
      }
    },
    [userInfo?.token, fetchPayments]
  );

  const handleViewPaymentDetails = useCallback(
    async (reference) => {
      if (!reference || reference === "N/A") return;

      try {
        setPaymentDetailsModal((prev) => ({
          ...prev,
          open: true,
          loading: true,
          error: null,
          paymentDetails: null,
        }));

        const res = await fetch(
          `${backendURL}/api/getPaymentByReference/${reference}`, // Updated to use params
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Payment not found");
        }

        setPaymentDetailsModal((prev) => ({
          ...prev,
          loading: false,
          paymentDetails: data.data,
        }));
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setPaymentDetailsModal((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    },
    [userInfo?.token]
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchPayments(newPage);
    }
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    fetchPayments(1);
  };

  const handleResetFilters = () => {
    setSelectedSolution("");
    setSolutionType("");
    setSortBy("paymentDate");
    setSortOrder("desc");
    fetchPayments(1);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    fetchPayments(1);
  };

  useEffect(() => {
    fetchPayments(1);
  }, [fetchPayments]);

  const handleClosePaymentDetailsModal = useCallback(() => {
    setPaymentDetailsModal((prev) => ({
      ...prev,
      open: false,
      paymentDetails: null,
      loading: false,
      error: null,
    }));
  }, []);

  if (initialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
        <p className="text-gray-600 mt-2">
          View and manage all payment transactions
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <PaymentSearch
              onSearch={searchPaymentByReference}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select.Root
                  value={selectedSolution || "all"}
                  onValueChange={(value) => {
                    const newValue = value === "all" ? "" : value;
                    setSelectedSolution(newValue);
                    fetchPayments(1);
                  }}>
                  <Select.Trigger className="inline-flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40">
                    <Select.Value placeholder="Filter by Solution" />
                    <Select.Icon>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="z-50 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200">
                      <Select.Viewport className="p-1">
                        <Select.Item
                          value="all"
                          className="relative flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none focus:bg-gray-100">
                          <Select.ItemText>All Solutions</Select.ItemText>
                        </Select.Item>
                        {availableSolutions.map((solution) => (
                          <Select.Item
                            key={solution}
                            value={solution}
                            className="relative flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none focus:bg-gray-100">
                            <Select.ItemText>{solution}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div className="flex items-center space-x-2">
                <Select.Root
                  value={solutionType || "all"}
                  onValueChange={(value) => {
                    const newValue = value === "all" ? "" : value;
                    setSolutionType(newValue);
                    fetchPayments(1);
                  }}>
                  <Select.Trigger className="inline-flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40">
                    <Select.Value placeholder="Filter by Type" />
                    <Select.Icon>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="z-50 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200">
                      <Select.Viewport className="p-1">
                        <Select.Item
                          value="all"
                          className="relative flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none focus:bg-gray-100">
                          <Select.ItemText>All Types</Select.ItemText>
                        </Select.Item>
                        {availableSolutionTypes.map((type) => (
                          <Select.Item
                            key={type}
                            value={type}
                            className="relative flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none focus:bg-gray-100">
                            <Select.ItemText>{type}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              {(selectedSolution || solutionType) && (
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {isSearching && searchTerm && (
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                Showing results for: "{searchTerm}"
              </span>
              <button
                onClick={handleResetSearch}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <X className="h-4 w-4 mr-1" /> Clear search
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange("selectedSolution")}>
                      Solution{" "}
                      {sortBy === "selectedSolution" &&
                        (sortOrder === "desc" ? "↓" : "↑")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange("paymentDate")}>
                      Date{" "}
                      {sortBy === "paymentDate" &&
                        (sortOrder === "desc" ? "↓" : "↑")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {payment.firstName} {payment.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {payment.selectedSolution}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.solutionType || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₦{payment.amount?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            payment.paymentStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : payment.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">
                          {payment.paymentReference || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.paymentDate
                          ? moment(payment.paymentDate).format("MMM D, YYYY")
                          : payment.submittedAt
                          ? moment(payment.submittedAt).format("MMM D, YYYY")
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            handleViewPaymentDetails(payment.paymentReference)
                          }
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors"
                          title="View details">
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!isSearching && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  Showing page {pagination.currentPage} of{" "}
                  {pagination.totalPages} • {pagination.totalPayments} total
                  payments
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className={`p-2 rounded-md ${
                      pagination.currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-200"
                    } transition-colors`}>
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (
                        pagination.currentPage >=
                        pagination.totalPages - 2
                      ) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-md flex items-center justify-center ${
                            pagination.currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-gray-200"
                          } transition-colors`}>
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`p-2 rounded-md ${
                      pagination.currentPage === pagination.totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-200"
                    } transition-colors`}>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <PaymentDetailsModal
        open={paymentDetailsModal.open}
        onClose={handleClosePaymentDetailsModal}
        paymentDetails={paymentDetailsModal.paymentDetails}
        loading={paymentDetailsModal.loading}
        error={paymentDetailsModal.error}
      />
    </div>
  );
}
