import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription } from "../components/tools/Alert";
import { Loader, CheckCircle, AlertCircle, X } from "lucide-react";
import { CircularProgress } from "@mui/material";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const SolutionFormCS = () => {
  const { slug } = useParams();
  const [solution, setSolution] = useState(null);
  const initialFormData = {
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    solutionCategory: "",
    companyName: "",
    companyIndustry: "",
    companySize: "",
    jobTitle: "",
    selectedSolution: "",
    phoneNumber: "",
    solutionType: "ConsultingService",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [countries, setCountries] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true); // For initial page load
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Fetch countries and solution details simultaneously
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countriesResponse, solutionResponse] = await Promise.all([
          fetch("https://restcountries.com/v3.1/all"),
          fetch(`${backendURL}/api/getSolutionBySlug/${slug}`),
        ]);

        if (!countriesResponse.ok) {
          throw new Error("Failed to fetch countries");
        }
        if (!solutionResponse.ok) {
          throw new Error("Failed to fetch solution details");
        }

        const countriesData = await countriesResponse.json();
        const solutionData = await solutionResponse.json();

        const countryList = countriesData.map((country) => ({
          name: country.name.common,
          code: country.cca2.toLowerCase(),
        }));

        setCountries(countryList);
        setSolution(solutionData);
        setFormData((prev) => ({
          ...prev,
          selectedSolution: solutionData.title,
        }));
      } catch (error) {
        setError(error.message);
        setAlertInfo({
          message: error.message,
          variant: "destructive",
          icon: AlertCircle,
        });
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchInitialData();
  }, [slug]);

  // Alert modal timer effect
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${backendURL}/api/registerForSolution`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, slug }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form.");
      }

      setAlertInfo({
        message: `Thank you for Registering for our Solution on ${solution.title}, Please check your mail for confirmation and more details`,
        variant: "success",
        icon: CheckCircle,
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertInfo({
        message:
          error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <div className="container mx-auto px-4 py-8 text-center">
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
        Individual or Business
      </h1>
      <h1 className="text-lg mx-auto mb-4 text-gray-500 text-center">
        {solution.title}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 shadow-sm rounded-sm px-6 py-9 bg-gray-50 relative"
      >
        {/* Form fields remain the same */}
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
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
            required
          />
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
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
            className="block mb-2 text-sm font-medium text-gray-900"
          >
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
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="solutionCategory"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Solution Category
          </label>
          <select
            id="solutionCategory"
            name="solutionCategory"
            value={formData.solutionCategory}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
            required
          >
            <option value="">Select Solution Category</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>

        {formData.solutionCategory === "business" && (
          <>
            <div>
              <label
                htmlFor="companyName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="companyIndustry"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Industry
              </label>
              <select
                id="companyIndustry"
                name="companyIndustry"
                value={formData.companyIndustry}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
                required
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="companySize"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Size
              </label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
                required
              >
                <option value="">Select Company Size</option>
                <option value="1-9">1-9</option>
                <option value="10-20">10-20</option>
                <option value="21-50">21-50</option>
                <option value="50 & above">50 & above</option>
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
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="selectedSolution"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Solution
              </label>
              <select
                id="selectedSolution"
                name="selectedSolution"
                value={formData.selectedSolution}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
                required
              >
                <option value="">Select Solution</option>
                <option value={solution.title}>{solution.title}</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="mobileNumber"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700"
            placeholder="+000000000000"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-[#198754] hover:text-[#198754] hover:bg-transparent hover:font-bold hover:border hover:border-[#198754] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader className="animate-spin mr-2" size={20} />
              Submitting...
            </span>
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

export default SolutionFormCS;
