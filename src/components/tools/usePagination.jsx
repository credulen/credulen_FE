import { useState, useCallback, useEffect } from "react";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const UsePaginatedSolutions = (category) => {
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 6,
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchSolutions = useCallback(
    async (page) => {
      try {
        setIsLoading(true);
        setError(null);

        const categoryParam = category
          ? `&category=${encodeURIComponent(category)}`
          : "";

        const response = await fetch(
          `${backendURL}/api/getAllSolutions?page=${page}&pageSize=${pagination.pageSize}${categoryParam}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch solutions: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.solutions) {
          throw new Error("Invalid response format from server");
        }

        setSolutions(data.solutions);
        setPagination((prev) => ({
          ...prev,
          ...data.pagination,
        }));
      } catch (error) {
        console.error("Error fetching solutions:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [category, pagination.pageSize]
  );

  useEffect(() => {
    fetchSolutions(1); // Reset to page 1 when category changes
  }, [category]);

  const handlePageChange = (newPage) => {
    fetchSolutions(newPage);
  };

  return {
    solutions,
    isLoading,
    error,
    pagination,
    handlePageChange,
  };
};

export default UsePaginatedSolutions;
