import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import emailjs from "emailjs-com";
const backendURL = import.meta.env.VITE_BACKEND_URL;

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
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "service_mfruavt",
        "template_cst1uc9",
        formData,
        "9Tp4XEvOsWGi69ktz"
      );

      // Save form data to database
      const response = await fetch(`${backendURL}/api/submitSolutionForm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      alert("Form submitted successfully!");
      // Reset form or redirect user
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  if (!solution) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-12 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
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
            required
            className="bg-gray-50 border border-[#0FEA84] text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-900 border-[#0FEA84]"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            className="bg-gray-50 border border-[#0FEA84] text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-gray-50 border border-[#0FEA84] text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
          />
          <p className="mt-2 text-sm text-gray-600">
            We'll never share your email with anyone else.
          </p>
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
            required
            className="bg-gray-50 border border-[#0FEA84] text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
          >
            <option value="">Please Select your Employment Status</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
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
            className="bg-gray-50 border border-[#0FEA84] text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
          />
        </div>
        <button
          type="submit"
          className=" text-white bg-[#198754] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SolutionForm;

//  const sendEmail = async (e) => {
//    e.preventDefault();
//    setIsLoading(true);
//    setError("");

//    try {
//      const templateParams = {
//        to_name: "Peter Uche",
//        from_name: email,
//        message,
//      };

//      await emailjs.send(
//        "service_mfruavt",
//        "template_cst1uc9",
//        templateParams,
//        "9Tp4XEvOsWGi69ktz"
//      );
//      toast.success("Message sent successfully! 📧");
//    } catch (error) {
//      setError("Failed to send message. Please try again.");
//      toast.error("Failed to send message. Please try again.");
//    } finally {
//      setIsLoading(false);
//    }

//    setEmail("");
//    setMessage("");
//  };
