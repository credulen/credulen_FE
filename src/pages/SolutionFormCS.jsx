import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, AlertDescription } from "../components/tools/Alert";
import { Loader, CheckCircle, AlertCircle, X } from "lucide-react";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

// Form validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name should only contain letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name should only contain letters"),
  country: yup.string().required("Country is required"),
  solutionCategory: yup
    .string()
    .required("Solution category is required")
    .oneOf(
      ["individual", "business"],
      "Please select a valid solution category"
    ),
  companyName: yup.string().when("solutionCategory", {
    is: "business",
    then: () => yup.string().required("Company name is required"),
  }),
  companyIndustry: yup.string().when("solutionCategory", {
    is: "business",
    then: () => yup.string().required("Company industry is required"),
  }),
  companySize: yup.string().when("solutionCategory", {
    is: "business",
    then: () => yup.string().required("Company size is required"),
  }),
  jobTitle: yup.string().when("solutionCategory", {
    is: "business",
    then: () => yup.string().required("Job title is required"),
  }),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    ),
  selectedSolution: yup.string().required("Solution selection is required"),
});

const SolutionFormCS = () => {
  const { slug } = useParams();
  const [solution, setSolution] = useState(null);
  const [countries, setCountries] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
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
    },
  });

  const solutionCategory = watch("solutionCategory");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countriesResponse, solutionResponse] = await Promise.all([
          fetch("https://restcountries.com/v3.1/all"),
          fetch(`${backendURL}/api/getSolutionBySlug/${slug}`),
        ]);

        if (!countriesResponse.ok) throw new Error("Failed to fetch countries");
        if (!solutionResponse.ok)
          throw new Error("Failed to fetch solution details");

        const countriesData = await countriesResponse.json();
        const solutionData = await solutionResponse.json();

        const sortedCountries = countriesData
          .map((country) => ({
            name: country.name.common,
            code: country.cca2.toLowerCase(),
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(sortedCountries);
        setSolution(solutionData);
        setValue("selectedSolution", solutionData.title);
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
  }, [slug, setValue]);

  const onSubmit = async (formData) => {
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
        reset();
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
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 shadow-sm rounded-sm px-6 py-9 bg-gray-50">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-teal-700 focus:border-teal-700`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } focus:ring-teal-700 focus:border-teal-700`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
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
            {...register("lastName")}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } focus:ring-teal-700 focus:border-teal-700`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900">
            Country
          </label>
          <select
            id="country"
            {...register("country")}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.country ? "border-red-500" : "border-gray-300"
            } focus:ring-teal-700 focus:border-teal-700`}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="solutionCategory"
            className="block mb-2 text-sm font-medium text-gray-900">
            Solution Category
          </label>
          <select
            id="solutionCategory"
            {...register("solutionCategory")}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.solutionCategory ? "border-red-500" : "border-gray-300"
            } focus:ring-teal-700 focus:border-teal-700`}>
            <option value="">Select Solution Category</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
          {errors.solutionCategory && (
            <p className="mt-1 text-sm text-red-600">
              {errors.solutionCategory.message}
            </p>
          )}
        </div>

        {solutionCategory === "business" && (
          <>
            <div>
              <label
                htmlFor="companyName"
                className="block mb-2 text-sm font-medium text-gray-900">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                {...register("companyName")}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                } focus:ring-teal-700 focus:border-teal-700`}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="companyIndustry"
                className="block mb-2 text-sm font-medium text-gray-900">
                Company Industry
              </label>
              <select
                id="companyIndustry"
                {...register("companyIndustry")}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                  errors.companyIndustry ? "border-red-500" : "border-gray-300"
                } focus:ring-teal-700 focus:border-teal-700`}>
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
              </select>
              {errors.companyIndustry && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.companyIndustry.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="companySize"
                className="block mb-2 text-sm font-medium text-gray-900">
                Company Size
              </label>
              <select
                id="companySize"
                {...register("companySize")}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                  errors.companySize ? "border-red-500" : "border-gray-300"
                } focus:ring-teal-700 focus:border-teal-700`}>
                <option value="">Select Company Size</option>
                <option value="1-9">1-9</option>
                <option value="10-20">10-20</option>
                <option value="21-50">21-50</option>
                <option value="50 & above">50 & above</option>
              </select>
              {errors.companySize && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.companySize.message}
                </p>
              )}
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
                {...register("jobTitle")}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                  errors.jobTitle ? "border-red-500" : "border-gray-300"
                } focus:ring-teal-700 focus:border-teal-700`}
              />
              {errors.jobTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="selectedSolution"
                className="block mb-2 text-sm font-medium text-gray-900">
                Select Solution
              </label>
              <select
                id="selectedSolution"
                {...register("selectedSolution")}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                  errors.selectedSolution ? "border-red-500" : "border-gray-300"
                } focus:ring-teal-700 focus:border-teal-700`}>
                <option value="">Select Solution</option>
                <option value={solution.title}>{solution.title}</option>
              </select>
              {errors.selectedSolution && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.selectedSolution.message}
                </p>
              )}
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-900">
            Mobile Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber")}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } focus:ring-teal-700 focus:border-teal-700`}
            placeholder="+000000000000"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-[#198754] hover:text-[#198754] hover:bg-transparent hover:font-bold hover:border hover:border-[#198754] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}>
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
          aria-label="Close">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SolutionFormCS;
