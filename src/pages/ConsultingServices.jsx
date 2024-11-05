// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { CircularProgress } from "@mui/material";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

// function truncateText(text, maxLength) {
//   return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
// }

// const SolutionCard = ({ event }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-95 flex flex-col h-full">
//     <img
//       className="w-full h-48 object-cover"
//       src={`${backendURL}${event?.image}`}
//       alt={event.title}
//       style={{ minHeight: "15rem" }}
//     />
//     <div className="p-4 flex flex-col flex-grow">
//       <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 first-letter:uppercase">
//         {event.title}
//       </h5>
//       <p className="mb-3 text-sm text-gray-700 line-clamp-3 flex-grow">
//         {truncateText(stripHtmlTags(event.content), 100)}
//       </p>
//       <Link
//         to={`/SolutionForm/${event.slug}`}
//         className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:bg-transparent hover:text-teal-700 hover:border-teal-700 hover:border-2 hover:font-semibold"
//       >
//         Register Interest
//         <svg
//           className="w-3.5 h-3.5 ms-2"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 14 10"
//           aria-hidden="true"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M1 5h12m0 0L9 1m4 4L9 9"
//           />
//         </svg>
//       </Link>
//     </div>
//   </div>
// );

// const ConsultingServices = () => {
//   const [solutions, setSolutions] = useState({
//     TrainingSchool: [],
//     ConsultingService: [],
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchSolutions = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${backendURL}/api/getAllSolutions`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch solutions");
//       }
//       const data = await response.json();

//       const trainingSchool = data.solutions.filter(
//         (solution) => solution.category === "TrainingSchool"
//       );
//       const consultingService = data.solutions.filter(
//         (solution) => solution.category === "ConsultingService"
//       );

//       setSolutions({
//         TrainingSchool: trainingSchool,
//         ConsultingService: consultingService,
//       });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [backendURL]);

//   useEffect(() => {
//     fetchSolutions();
//   }, [fetchSolutions]);

//   const LoadingSpinner = useMemo(
//     () => (
//       <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//         <CircularProgress size={40} className="text-btColour" />
//       </div>
//     ),
//     []
//   );

//   if (isLoading) {
//     return LoadingSpinner;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="mt-[3rem] container mx-auto px-4 py-8 md:py-16 lg:px-12">
//       <div className="pb-12">
//         <h1 className="text-2xl font-semibold">Solutions</h1>
//         <p className="mt-3">
//           Credulen offers specialized training and consulting services designed
//           to equip you with the skills and strategies needed to excel in a
//           technology-driven world.
//         </p>
//       </div>

//       <div className="mt-2">
//         <h2 className="text-xl font-medium">Consulting Services</h2>
//         <p className="mb-10">
//           <span className="font-medium mr-1">
//             Data, Blockchain & AI Integration and Strategy:
//           </span>
//           We offer expert consulting to help organizations integrate data,
//           blockchain, and AI technologies seamlessly. Our strategic guidance
//           ensures that your technology investments drive maximum value creation
//           and business growth.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {solutions.ConsultingService.length > 0 ? (
//             solutions.ConsultingService.map((event) => (
//               <SolutionCard key={event._id} event={event} />
//             ))
//           ) : (
//             <p>No consulting service solutions available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConsultingServices;
// Common imports

import React, { useEffect, useState, useMemo, useCallback } from "react";

import { Link } from "react-router-dom";

import { CircularProgress } from "@mui/material";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
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
        to={`/SolutionFormCS/${event.slug}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:bg-transparent hover:text-teal-700 hover:border-teal-700 hover:border-2 hover:font-semibold"
      >
        Register Interest
        <svg
          className="w-3.5 h-3.5 ms-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
          aria-hidden="true"
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

// Common Fetching Logic

const useFetchSolutions = () => {
  const [solutions, setSolutions] = useState({
    TrainingSchool: [],

    ConsultingService: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchSolutions = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${backendURL}/api/getAllSolutions`);

      if (!response.ok) {
        throw new Error("Failed to fetch solutions");
      }

      const data = await response.json();

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
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendURL]);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  return { solutions, isLoading, error };
};

// Consulting Services Page

const ConsultingServices = () => {
  const { solutions, isLoading, error } = useFetchSolutions();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <CircularProgress size={40} className="text-btColour" />
      </div>
    );
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

      <div className="mt-2">
        <h2 className="text-xl font-medium">Consulting Services</h2>

        <p className="mb-10">
          <span className="font-medium mr-1">
            Data, Blockchain & AI Integration and Strategy:
          </span>
          We offer expert consulting to help organizations integrate data,
          blockchain, and AI technologies seamlessly. Our strategic guidance
          ensures that your technology investments drive maximum value creation
          and business growth.
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

export default ConsultingServices;
