import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import moment from "moment";
import { HiOutlineTrash } from "react-icons/hi";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const PaginationButtons = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisibleButtons = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg ${
          currentPage === 1
            ? " text-gray-500 cursor-not-allowed"
            : "text-blue-500 hover:text-white hover:bg-blue-600"
        }`}
      >
        &lt;
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg text-blue-50 hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && <span className="px-3 py-2">...</span>}
        </>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-2 py-0 rounded-lg ${
            currentPage === number
              ? "bg-btColour text-white"
              : " text-btColour hover:text-white hover:bg-btColour"
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-3 py-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg  text-btColour hover:text-white hover:bg-btColour"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-200 text- cursor-not-allowed"
            : "text-btColour hover:text-white hover:bg-btColour"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default function RegisteredSolutionsList() {
  const [solutions, setSolutions] = useState([]);
  const [selectedSolution, setSelectedSolution] = useState("");
  const [totalSolutions, setTotalSolutions] = useState(0);
  const [lastMonthSolutions, setLastMonthSolutions] = useState(0);
  const [availableSolutions, setAvailableSolutions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSolutions();
  }, [currentPage, selectedSolution]);

  const fetchSolutions = async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/getSolutionForms?page=${currentPage}&limit=${itemsPerPage}${
          selectedSolution ? `&selectedSolution=${selectedSolution}` : ""
        }`
      );
      const data = await res.json();
      if (res.ok) {
        setSolutions(data.solutions);
        setTotalSolutions(data.totalSolutions);
        setLastMonthSolutions(data.lastMonthSolutions);
        setTotalPages(Math.ceil(data.totalSolutions / itemsPerPage));

        const uniqueSolutions = [
          ...new Set(data.solutions.map((s) => s.selectedSolution)),
        ];
        setAvailableSolutions(uniqueSolutions);
      }
    } catch (error) {
      console.error("Error fetching solutions:", error);
      toast.error("Failed to fetch registered solutions");
    }
  };

  const handleFilter = (solution) => {
    setSelectedSolution(solution);
    setCurrentPage(1);
  };

  const handleDeleteBySolution = async () => {
    if (!selectedSolution) {
      toast.error("Please select a solution to delete");
      return;
    }

    try {
      const res = await fetch(`${backendURL}/api/deleteSolutionsByType`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedSolution }),
      });

      if (res.ok) {
        toast.success(`Deleted all entries for ${selectedSolution}`);
        setSelectedSolution("");
        setCurrentPage(1);
        fetchSolutions();
      } else {
        toast.error("Failed to delete solutions");
      }
    } catch (error) {
      console.error("Error deleting solutions:", error);
      toast.error("Failed to delete solutions");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-3">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold">Registered Solutions</h1>
          <div className="flex gap-2 text-sm">
            <span className="text-slate-700 font-semibold">
              Total: {totalSolutions}
            </span>
            <span className="text-slate-700 font-semibold">
              Last month: {lastMonthSolutions}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Dropdown
            style={{ color: "black" }}
            label={selectedSolution || "Filter by Solution"}
          >
            <Dropdown.Item
              onClick={() => handleFilter("")}
              style={{ color: "black" }}
            >
              All Solutions
            </Dropdown.Item>
            {availableSolutions.map((solution) => (
              <Dropdown.Item
                key={solution}
                onClick={() => handleFilter(solution)}
                style={{ color: "black" }}
              >
                {solution}
              </Dropdown.Item>
            ))}
          </Dropdown>

          <span className="mt-2">
            <button
              className="flex gap-2 font-medium hover:text-red-500 hover:bg-transparent cursor-pointer text-btColour p-1 rounded-md text-xs"
              onClick={() => setShowDeleteModal(true)}
            >
              <HiOutlineTrash className="h-4 w-4" />
              Delete All
            </button>
          </span>
        </div>
      </div>

      <div className="flex-grow overflow-x-auto">
        <div className="h-full overflow-y-auto">
          {solutions.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Full Name</Table.HeadCell>
                <Table.HeadCell>Phone Number</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Employment Status</Table.HeadCell>
                <Table.HeadCell>Job Title</Table.HeadCell>
                <Table.HeadCell>Selected Solution</Table.HeadCell>
                <Table.HeadCell>Submitted At</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {solutions.map((solution) => (
                  <Table.Row
                    key={solution._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{solution.fullName}</Table.Cell>
                    <Table.Cell>{solution.phoneNumber}</Table.Cell>
                    <Table.Cell>{solution.email}</Table.Cell>
                    <Table.Cell>{solution.employmentStatus}</Table.Cell>
                    <Table.Cell>{solution.jobTitle}</Table.Cell>
                    <Table.Cell>{solution.selectedSolution}</Table.Cell>
                    <Table.Cell>
                      {moment(solution.submittedAt).format("MMMM D, HH:mm")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p className="text-center py-4">No registered solutions found!</p>
          )}
        </div>
      </div>

      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500  dark:text-gray-400">
              Are you sure you want to delete all entries for{" "}
              <span className="font-bold">
                {selectedSolution || "the selected solution"}?
              </span>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDeleteBySolution}>
            Yes, Delete All
          </Button>
          <Button color="gray" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
