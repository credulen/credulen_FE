// // import React from "react";
// // import { SmallBlogCards } from "../components/Cards";

// // const Solutions = () => {
// //   return (
// //     <div className="md:mt-32 mt-36 md:px-[5rem] px-4">
// //       <div className="pb-12">
// //         <h1 className="text-2xl font-semibold">Solutions</h1>
// //         <p className="mt-3">
// //           Credulen offers specialized training and consulting services designed
// //           to equip you with the skills and strategies needed to excel in a
// //           technology-driven world.
// //         </p>
// //       </div>

// //       <div className="pb-12">
// //         <h2 className="text-xl font-medium">Training School</h2>
// //         <p className="mb-10">
// //           Data Science & Engineering for Professionals: "Our comprehensive
// //           training programs provide professionals with the skills needed to
// //           excel in data science and engineering. Learn from industry experts and
// //           gain practical experience through hands-on projects. " Using
// //           Generative AI to Supercharge Productivity: "Discover how to leverage
// //           Generative AI to enhance your productivity as an individual or
// //           organization. Our training covers the latest AI tools and techniques
// //           to help you stay ahead of the curve.
// //         </p>
// //         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-12 my-5">
// //           <SmallBlogCards />
// //           <SmallBlogCards />
// //           <SmallBlogCards />

// //           <SmallBlogCards />
// //           <SmallBlogCards />
// //           <SmallBlogCards />
// //         </div>
// //       </div>

// //       <div className="">
// //         <h2 className="text-xl font-medium">Consulting Services</h2>
// //         <p className="mb-10">
// //           Data, Blockchain & AI Integration and Strategy: "We offer expert
// //           consulting to help organizations integrate data, blockchain, and AI
// //           technologies seamlessly. Our strategic guidance ensures that your
// //           technology investments drive maximum value creation and business
// //           growth.
// //         </p>
// //         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-12 my-5">
// //           <SmallBlogCards />
// //           <SmallBlogCards />
// //           <SmallBlogCards />

// //           <SmallBlogCards />
// //           <SmallBlogCards />
// //           <SmallBlogCards />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Solutions;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const stripHtmlTags = (content) => {
  return content.replace(/<\/?[^>]+(>|$)/g, "");
};

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

const SolutionCard = ({ event }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-95 flex flex-col h-full">
    <img
      className="w-full h-48 object-cover"
      src={`${backendURL}${event?.image}`}
      alt={event.title}
      style={{ minHeight: "15rem" }}
    />
    <div className="p-4 flex flex-col flex-grow">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 first-letter:uppercase">
        {event.title}
      </h5>
      <p className="mb-3 text-sm text-gray-700 line-clamp-3 flex-grow">
        {truncateText(stripHtmlTags(event.content), 100)}
      </p>
      <Link
        to={`/SolutionForm/${event.slug}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-700 bt rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:text-bg-teal-700 hover:bg-transparent hover:text-teal-700 hover:border-teal-700 hover:border-bg-teal-700 hover:border-2 hover:font-semibold"
      >
        Register Interest
        <svg
          className="w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  </div>
);

const Solutions = () => {
  const [solutions, setSolutions] = useState({
    TrainingSchool: [],
    ConsultingService: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${backendURL}/api/getAllSolutions`);
      if (!response.ok) {
        throw new Error("Failed to fetch solutions");
      }
      const data = await response.json();

      // Filter solutions by category
      const trainingSchool = data.solutions.filter(
        (solution) => solution.category === "TrainingSchool"
      );
      const consultingService = data.solutions.filter(
        (solution) => solution.category === "ConsultingService"
      );

      setSolutions({
        TrainingSchool: trainingSchool,
        ConsultingService: consultingService,
      });
    } catch (error) {
      console.error("Error fetching solutions:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-[3rem] container mx-auto px-4 py-8 md:py-16 lg:px-12">
      <div className="pb-12">
        <h1 className="text-2xl font-semibold">Solutions</h1>
        <p className="mt-3">
          Credulen offers specialized training and consulting services designed
          to equip you with the skills and strategies needed to excel in a
          technology-driven world.
        </p>
      </div>

      <div className="pb-12">
        <h2 className="text-xl font-medium">Training School</h2>
        <p className="mb-10">
          Data Science & Engineering for Professionals: "Our comprehensive
          training programs provide professionals with the skills needed to
          excel in data science and engineering. Learn from industry experts and
          gain practical experience through hands-on projects. " Using
          Generative AI to Supercharge Productivity: "Discover how to leverage
          Generative AI to enhance your productivity as an individual or
          organization. Our training covers the latest AI tools and techniques
          to help you stay ahead of the curve.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.TrainingSchool.length > 0 ? (
            solutions.TrainingSchool.map((event) => (
              <SolutionCard key={event._id} event={event} />
            ))
          ) : (
            <p>No training school solutions available.</p>
          )}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-xl font-medium">Consulting Services</h2>
        <p className="mb-10">
          Data, Blockchain & AI Integration and Strategy: "We offer expert
          consulting to help organizations integrate data, blockchain, and AI
          technologies seamlessly. Our strategic guidance ensures that your
          technology investments drive maximum value creation and business
          growth.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.ConsultingService.length > 0 ? (
            solutions.ConsultingService.map((event) => (
              <SolutionCard key={event._id} event={event} />
            ))
          ) : (
            <p>No consulting service solutions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
