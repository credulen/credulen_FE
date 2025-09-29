import React, { useEffect, useState, useCallback, memo, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete, AiOutlineDown } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import moment from "moment";
import Spinner from "../../components/tools/Spinner";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const SolutionTableRow = memo(({ solution, onDeleteClick }) => (
  <tr className="bg-white dark:bg-neutral-800-dark border-b border-primary-100 dark:border-primary-200-dark">
    <td className="px-4 py-3 text-neutral-700 dark:text-neutral-700-dark">
      {moment(solution.updatedAt).format("MMMM D")}
    </td>
    <td className="px-4 py-3">
      <Link to={`/solution/${solution.slug}`}>
        <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-600-dark">
          <img
            src={`${solution.image}`}
            alt={solution.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-image.png";
            }}
          />
        </div>
      </Link>
    </td>
    <td className="px-4 py-3">
      <Link
        className="font-medium text-neutral-700 dark:text-neutral-700-dark hover:text-primary-500 dark:hover:text-primary-500"
        to={`/solution/${solution.slug}`}>
        {solution.title.length > 50
          ? `${solution.title.substring(0, 50)}...`
          : solution.title}
      </Link>
    </td>
    <td className="px-4 py-3 text-neutral-700 dark:text-neutral-700-dark">
      {solution.category}
    </td>
    <td className="px-4 py-3">
      <button
        onClick={() => onDeleteClick(solution._id)}
        className="font-medium text-error-500 border border-error-500 rounded-md px-2 py-1 hover:bg-error-500 hover:text-white transition-colors duration-200">
        <AiTwotoneDelete size={20} />
      </button>
    </td>
    <td className="px-4 py-3">
      <Link
        className="font-medium bg-primary-500 text-white rounded-md px-2 py-1 hover:bg-secondary-500 transition-colors duration-200"
        to={`/DashBoard/Admin/CreateSolutions/${solution.slug}`}>
        Edit
      </Link>
    </td>
  </tr>
));

export default function AdminSolutionList() {
  const { userInfo } = useSelector((state) => state.auth);
  const [solutions, setSolutions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [solutionIdToDelete, setSolutionIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const PAGE_SIZE = 9;

  const fetchSolutions = useCallback(
    async (startIndex = 0) => {
      try {
        startIndex === 0 ? setInitialLoading(true) : setLoading(true);

        const queryParams = new URLSearchParams({
          startIndex: startIndex.toString(),
          pageSize: PAGE_SIZE.toString(),
        });

        if (selectedCategory) {
          queryParams.append("category", selectedCategory);
        }

        console.log("Fetching solutions with query:", queryParams.toString());

        const res = await fetch(
          `${backendURL}/api/getAllSolutionLists?${queryParams.toString()}`
        );
        const data = await res.json();

        console.log("API response:", data);

        if (res.ok) {
          setSolutions((prev) =>
            startIndex === 0 ? data.solutions : [...prev, ...data.solutions]
          );
          setHasMore(data.pagination.hasMore);
          setTotalCount(data.pagination.totalCount);
        } else {
          throw new Error(data.message || "Failed to fetch solutions");
        }
      } catch (error) {
        console.error("Error fetching solutions:", error);
        setToast({
          open: true,
          message: error.message,
          severity: "error",
        });
      } finally {
        startIndex === 0 ? setInitialLoading(false) : setLoading(false);
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions, userInfo, selectedCategory]);

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast.open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShowMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchSolutions(solutions.length);
    }
  }, [fetchSolutions, loading, hasMore, solutions.length]);

  const handleCategoryFilter = useCallback((category) => {
    setSelectedCategory(category);
    setSolutions([]); // Reset solutions when changing filter
    setHasMore(true); // Reset pagination state
    setDropdownOpen(false); // Close dropdown on selection
  }, []);

  const openDeleteModal = useCallback((solutionId) => {
    setSolutionIdToDelete(solutionId);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSolutionIdToDelete("");
  }, []);

  const handleDeleteSolution = useCallback(async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deleteSolution/${solutionIdToDelete}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok) {
        setSolutions((prev) =>
          prev.filter((solution) => solution._id !== solutionIdToDelete)
        );
        setTotalCount((prev) => prev - 1);
        setToast({
          open: true,
          message: "Solution deleted successfully",
          severity: "success",
        });
        closeDeleteModal();
      } else {
        throw new Error(data.message || "Failed to delete solution");
      }
    } catch (error) {
      console.error("Error deleting solution:", error);
      setToast({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  }, [solutionIdToDelete, closeDeleteModal]);

  const handleCloseToast = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  if (initialLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <Link to="/DashBoard/Admin/CreateSolutions">
          <button className="flex items-center text-primary-500 border border-primary-500 rounded-md px-4 py-2 hover:bg-primary-50 hover:border-primary-500 dark:hover:bg-primary-50-dark dark:hover:border-primary-500 transition-colors duration-200">
            <BiMessageSquareAdd className="mr-2" size={16} />
            Create Solution
          </button>
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-neutral-700 dark:text-neutral-700-dark border border-primary-100 dark:border-primary-200-dark rounded-md px-4 py-2 hover:bg-primary-50 dark:hover:bg-primary-50-dark transition-colors duration-200"
            aria-label="Filter by category">
            {selectedCategory || "Filter by Category"}
            <AiOutlineDown className="ml-2" size={16} />
          </button>
          <ul
            className={`absolute z-10 mt-2 w-48 bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md shadow-lg ${
              dropdownOpen ? "block" : "hidden"
            }`}>
            <li
              onClick={() => handleCategoryFilter("")}
              className="px-4 py-2 text-neutral-700 dark:text-neutral-700-dark hover:bg-primary-50 dark:hover:bg-primary-50-dark cursor-pointer">
              All Categories
            </li>
            <li
              onClick={() => handleCategoryFilter("TrainingSchool")}
              className="px-4 py-2 text-neutral-700 dark:text-neutral-700-dark hover:bg-primary-50 dark:hover:bg-primary-50-dark cursor-pointer">
              Training School
            </li>
            <li
              onClick={() => handleCategoryFilter("ConsultingService")}
              className="px-4 py-2 text-neutral-700 dark:text-neutral-700-dark hover:bg-primary-50 dark:hover:bg-primary-50-dark cursor-pointer">
              Consulting Service
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-x-auto">
        {solutions.length > 0 ? (
          <>
            <table className="w-full border-collapse shadow-sm">
              <thead>
                <tr className="bg-primary-50 dark:bg-primary-50-dark text-neutral-700 dark:text-neutral-700-dark">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Date updated
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Solution image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Solution title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Delete
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100 dark:divide-primary-200-dark">
                {solutions.map((solution) => (
                  <SolutionTableRow
                    key={solution._id}
                    solution={solution}
                    onDeleteClick={openDeleteModal}
                  />
                ))}
              </tbody>
            </table>

            {hasMore && (
              <button
                onClick={handleShowMore}
                disabled={loading}
                className="w-full text-primary-500 hover:text-secondary-500 text-sm py-7 disabled:text-neutral-600 transition-colors duration-200">
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-primary-900 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Show more"
                )}
              </button>
            )}
          </>
        ) : (
          <p className="text-neutral-600 dark:text-neutral-600-dark text-center py-4">
            You have no solutions yet!
          </p>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800-dark p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-bold text-primary-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-neutral-600 dark:text-neutral-600-dark mb-6">
                Are you sure you want to delete this solution? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-700 dark:text-neutral-600-dark dark:hover:text-neutral-700-dark transition-colors duration-200">
                  <IoClose size={24} />
                </button>
                <button
                  onClick={handleDeleteSolution}
                  className="px-4 py-2 text-error-500 hover:text-error-600 transition-colors duration-200">
                  <AiTwotoneDelete size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

        {toast.open && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-md flex items-center gap-2 max-w-sm w-full transition-opacity duration-300 ${
              toast.severity === "success"
                ? "bg-green-500 text-white"
                : "bg-error-500 text-white"
            }`}>
            <span className="flex-1 text-sm">{toast.message}</span>
            <button
              onClick={handleCloseToast}
              className="text-white hover:text-neutral-200">
              <IoClose size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
