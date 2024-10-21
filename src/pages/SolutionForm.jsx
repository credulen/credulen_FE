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
    fullName: "",
    phoneNumber: "",
    email: "",
    employmentStatus: "",
    jobTitle: "",
    selectedSolution: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSolutionDetails();
  }, [slug]);

  const fetchSolutionDetails = async () => {
    try {
      const response = await fetch(
        `${backendURL}/api/getSolutionBySlug/${slug}`
      );
      if (!response.ok) throw new Error("Failed to fetch solution details");
      const data = await response.json();
      setSolution(data);
      setFormData((prev) => ({ ...prev, selectedSolution: data.title }));
    } catch (error) {
      console.error("Error fetching solution details:", error);
      setAlertInfo({
        message: "Failed to fetch solution details. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
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
          message: "Form submitted successfully!",
          variant: "success",
          icon: CheckCircle,
        });
        setFormData({
          fullName: "",
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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  if (!solution) return <div>Loading...</div>;

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
        className="space-y-6 shadow-sm rounded-sm px-6 py-9 bg-gray-50"
      >
        <div>
          <label
            htmlFor="fullName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
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
            className="block mb-2 text-sm font-medium text-gray-900"
          >
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
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Employment Status
          </label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
            required
          >
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
            className="block mb-2 text-sm font-medium text-gray-900"
          >
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
          disabled={isLoading}
        >
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
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SolutionForm;
