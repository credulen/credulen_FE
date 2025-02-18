import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription } from "../components/tools/Alert";
import { Loader, CheckCircle, AlertCircle, X } from "lucide-react";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const SolutionForm = () => {
  const { slug } = useParams();
  const [solution, setSolution] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    employmentStatus: "",
    jobTitle: "",
    selectedSolution: "",
    solutionType: "TrainingSchools",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true); // For initial page load
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    fetchSolutionDetails();
  }, [slug]);

  const fetchSolutionDetails = async () => {
    setIsPageLoading(true); // Start loading
    try {
      const response = await fetch(
        `${backendURL}/api/getSolutionBySlug/${slug}`
      );
      if (!response.ok) throw new Error("Failed to fetch solution details");
      const data = await response.json();
      if (!data) {
        setError("No solution found for the provided slug.");
        return;
      }
      setSolution(data);
      setFormData((prev) => ({ ...prev, selectedSolution: data.title }));
    } catch (error) {
      console.error("Error fetching solution details:", error);
      setAlertInfo({
        message: "Failed to fetch solution details. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsPageLoading(false); // End loading
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/registerForSolution`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, slug }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlertInfo({
          message: `Thank you for registering for our Solution on ${solution.title}. Please check your mail for confirmation and more details.`,
          variant: "success",
          icon: CheckCircle,
        });
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          employmentStatus: "",
          jobTitle: "",
          selectedSolution: solution.title,
        });
      } else {
        setAlertInfo({
          message: data.message || "Failed to submit form. Please try again.",
          variant: data.message.includes("already submitted")
            ? "warning"
            : "destructive",
          icon: AlertCircle,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertInfo({
        message: "An error occurred. Please try again.",
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

        if (alertInfo.variant === "success") {
          (window.location.href = "https://t.me/credulensubscribers"), "_blank";
        }
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);
  if (isPageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          <Loader className="animate-spin" size={40} />
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py- 8 text-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-2" />
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Error Loading Form
          </h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-2" />
          <h2 className="text-lg font-semibold text-yellow-700">
            No Solution Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-12 py-8 max-w-2xl mt-[6rem]">
      <h1 className="text-2xl font-semibold text-btColour mb-6 text-center">
        Please Fill the Form to Register Your Interest in our Solutions for
        Individuals
      </h1>
      <h1 className="text-lg mx-auto mb-4 text-gray-500 text-center">
        {solution.title}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 shadow-sm rounded-sm px-6 py-9 bg-gray-50">
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
            placeholder="Your phone number"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
            placeholder="Your email address"
            required
          />
        </div>
        <div>
          <label
            htmlFor="employmentStatus"
            className="block mb-2 text-sm font-medium text-gray-900">
            Employment Status
          </label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
            required>
            <option value="">Select status</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
            <option value="retired">Retired</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="jobTitle"
            className="block mb-2 text-sm font-medium text-gray-900">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
            placeholder="Your job title"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[#198754] hover:text-[#198754] hover:bg-transparent hover:font-bold hover:border hover:border-[#198754] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
          disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="animate-spin mr-2 inline" size={20} />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>

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

export default SolutionForm;
