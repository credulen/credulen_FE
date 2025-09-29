// import React from "react";
// import { Link } from "react-router-dom";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

// function truncateText(text, maxLength) {
//   return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
// }

// export const SolutionCard = ({ event }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg flex flex-col h-full relative">
//     <Link to={`/SolutionForm/${event.slug}`}>
//       <img
//         className="w-full h-48 object-cover hover:scale-105 transition-all duration-500 "
//         src={`${event?.image}`}
//         alt={event.title}
//         style={{ minHeight: "15rem" }}
//       />
//     </Link>

//     <div className="p-4 flex flex-col flex-grow">
//       {/* Category Label */}
//       <span className="text-xs text-gray-500 uppercase mb-1">
//         {event?.category === "TrainingSchool"
//           ? "Training school"
//           : "Consulting service"}
//       </span>

//       <h5 className="mb-2 text-3xl mid:text-2xl font-bold tracking-tight text-gray-900 first-letter:uppercase">
//         {event.title}
//       </h5>
//       <p className="mb-3 text-sm text-gray-600 line-clamp-2 flex-grow">
//         {truncateText(stripHtmlTags(event.trainingDesc || event.content), 80)}
//       </p>
//       {/* Price and Discount */}
//       <div className="flex items-center mb-3">
//         {event.discountPercentage === 0 ? (
//           <span className="text-xl font-bold text-teal-700">
//             ₦{event.price?.toLocaleString()}
//           </span>
//         ) : (
//           <>
//             <span className="text-xl font-bold text-teal-700 mr-2">
//               ₦{event.amount?.toLocaleString()}
//             </span>
//             <span className="text-sm text-gray-500 line-through">
//               ₦{event.price?.toLocaleString()}
//             </span>
//             <span className="ml-2 text-xs text-red-500 font-semibold">
//               {event.discountPercentage}% Disc.
//             </span>
//           </>
//         )}
//       </div>

//       <Link
//         to={
//           event.category === "TrainingSchool"
//             ? `/SolutionForm/${event.slug}`
//             : `/SolutionFormCS/${event.slug}`
//         }
//         className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 duration-300 mt-auto self-start transition-all hover:scale-105">
//         More Details
//       </Link>
//     </div>
//   </div>
// );
// export const SolutionConsultingCard = ({ event }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg flex flex-col h-full relative">
//     <Link to={`/SolutionForm/${event.slug}`}>
//       <img
//         className="w-full h-48 object-cover hover:scale-105 transition-all duration-500 "
//         src={`${event?.image}`}
//         alt={event.title}
//         style={{ minHeight: "15rem" }}
//       />
//     </Link>

//     <div className="p-4 flex flex-col flex-grow">
//       {/* Category Label */}
//       <span className="text-xs text-gray-500 uppercase mb-1">
//         {event?.category === "TrainingSchool"
//           ? "Training school"
//           : "Consulting service"}
//       </span>

//       <h5 className="mb-2 text-3xl mid:text-2xl font-bold tracking-tight text-gray-900 first-letter:uppercase">
//         {event.title}
//       </h5>
//       <p className="mb-3 text-sm text-gray-600 line-clamp-2 flex-grow">
//         {truncateText(stripHtmlTags(event.trainingDesc || event.content), 80)}
//       </p>

//       <Link
//         to={
//           event.category === "TrainingSchool"
//             ? `/SolutionForm/${event.slug}`
//             : `/SolutionFormCS/${event.slug}`
//         }
//         className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 duration-300 mt-auto self-start transition-all hover:scale-105">
//         More Details
//       </Link>
//     </div>
//   </div>
// );

import React from "react";
import { Link } from "react-router-dom";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export const SolutionCard = ({ event }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full relative border border-primary-100 hover:border-primary-200 group">
    <Link to={`/SolutionForm/${event.slug}`}>
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-cover hover:scale-105 transition-all duration-500 group-hover:brightness-110"
          src={`${event?.image}`}
          alt={event.title}
          style={{ minHeight: "15rem" }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>

    <div className="p-6 flex flex-col flex-grow">
      {/* Category Label */}
      <span className="text-xs text-primary-500 uppercase mb-2 tracking-wider font-medium">
        {event?.category === "TrainingSchool"
          ? "Training School"
          : "Consulting Service"}
      </span>

      <h5 className="mb-3 text-2xl mid:text-xl font-bold tracking-tight text-primary-900 first-letter:uppercase leading-tight group-hover:text-primary-800 transition-colors duration-300">
        {event.title}
      </h5>

      <p className="mb-4 text-sm text-neutral-600 line-clamp-2 flex-grow leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
        {truncateText(stripHtmlTags(event.trainingDesc || event.content), 80)}
      </p>

      {/* Price and Discount */}
      <div className="flex items-center mb-6">
        {event.discountPercentage === 0 ? (
          <span className="text-xl font-bold text-primary-900">
            ₦{event.price?.toLocaleString()}
          </span>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-primary-900">
              ₦{event.amount?.toLocaleString()}
            </span>
            <span className="text-sm text-neutral-500 line-through">
              ₦{event.price?.toLocaleString()}
            </span>
            <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-semibold rounded-full">
              {event.discountPercentage}% Off
            </span>
          </div>
        )}
      </div>

      <Link
        to={
          event.category === "TrainingSchool"
            ? `/SolutionForm/${event.slug}`
            : `/SolutionFormCS/${event.slug}`
        }
        className="group relative inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-primary-500 rounded-lg border border-secondary-500/20 shadow-md transition-all duration-300 ease-out hover:bg-transparent hover:text-primary-500 hover:border-2 hover:border-secondary-500 hover:shadow-xl hover:-translate-y-1 focus:ring-4 focus:outline-none focus:ring-secondary-500/30 mt-auto self-start overflow-hidden">
        {/* Background overlay for smooth transition */}
        <div className="absolute inset-0 bg-primary-500 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0 rounded-lg"></div>

        <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
          Learn More
        </span>

        <svg
          className="w-4 h-4 ml-2 relative z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-secondary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
      </Link>
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-secondary-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    </div>
  </div>
);

export const SolutionConsultingCard = ({ event }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full relative border border-primary-100 hover:border-primary-200 group">
    <Link to={`/SolutionForm/${event.slug}`}>
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-cover hover:scale-105 transition-all duration-500 group-hover:brightness-110"
          src={`${event?.image}`}
          alt={event.title}
          style={{ minHeight: "15rem" }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>

    <div className="p-6 flex flex-col flex-grow">
      {/* Category Label */}
      <span className="text-xs text-primary-900 uppercase mb-2 tracking-wider font-medium">
        {event?.category === "TrainingSchool"
          ? "Training School"
          : "Consulting Service"}
      </span>

      <h5 className="mb-3 text-2xl mid:text-xl font-bold tracking-tight text-primary-900 first-letter:uppercase leading-tight group-hover:text-primary-800 transition-colors duration-300">
        {event.title}
      </h5>

      <p className="mb-4 text-sm text-neutral-600 line-clamp-2 flex-grow leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
        {truncateText(stripHtmlTags(event.trainingDesc || event.content), 80)}
      </p>

      <Link
        to={
          event.category === "TrainingSchool"
            ? `/SolutionForm/${event.slug}`
            : `/SolutionFormCS/${event.slug}`
        }
        className="group relative inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-primary-500 rounded-lg border border-secondary-500/20 shadow-md transition-all duration-300 ease-out hover:bg-transparent hover:text-primary-500 hover:border-2 hover:border-secondary-500 hover:shadow-xl hover:-translate-y-1 focus:ring-4 focus:outline-none focus:ring-secondary-500/30 mt-auto self-start overflow-hidden">
        <span>Learn More</span>
        <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-secondary-500/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    </div>
  </div>
);
