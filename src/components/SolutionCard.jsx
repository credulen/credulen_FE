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
  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg flex flex-col h-full relative">
    <Link to={`/SolutionForm/${event.slug}`}>
      <img
        className="w-full h-48 object-cover hover:scale-105 transition-all duration-500 "
        src={`${event?.image}`}
        alt={event.title}
        style={{ minHeight: "15rem" }}
      />
    </Link>

    <div className="p-4 flex flex-col flex-grow">
      {/* Category Label */}
      <span className="text-xs text-gray-500 uppercase mb-1">
        {event?.category === "TrainingSchool"
          ? "Training school"
          : "Consulting service"}
      </span>

      <h5 className="mb-2 text-3xl mid:text-2xl font-bold tracking-tight text-gray-900 first-letter:uppercase">
        {event.title}
      </h5>
      <p className="mb-3 text-sm text-gray-600 line-clamp-2 flex-grow">
        {truncateText(stripHtmlTags(event.trainingDesc || event.content), 80)}
      </p>
      {/* Price and Discount */}
      <div className="flex items-center mb-3">
        {event.discountPercentage === 0 ? (
          <span className="text-xl font-bold text-teal-700">
            ₦{event.price?.toLocaleString()}
          </span>
        ) : (
          <>
            <span className="text-xl font-bold text-teal-700 mr-2">
              ₦{event.amount?.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₦{event.price?.toLocaleString()}
            </span>
            <span className="ml-2 text-xs text-red-500 font-semibold">
              {event.discountPercentage}% Disc.
            </span>
          </>
        )}
      </div>

      <Link
        to={
          event.category === "TrainingSchool"
            ? `/SolutionForm/${event.slug}`
            : `/SolutionFormCS/${event.slug}`
        }
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 duration-300 mt-auto self-start transition-all hover:scale-105">
        More Details
      </Link>
    </div>
  </div>
);
export const SolutionConsultingCard = ({ event }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg flex flex-col h-full relative">
    <Link to={`/SolutionForm/${event.slug}`}>
      <img
        className="w-full h-48 object-cover hover:scale-105 transition-all duration-500 "
        src={`${event?.image}`}
        alt={event.title}
        style={{ minHeight: "15rem" }}
      />
    </Link>

    <div className="p-4 flex flex-col flex-grow">
      {/* Category Label */}
      <span className="text-xs text-gray-500 uppercase mb-1">
        {event?.category === "TrainingSchool"
          ? "Training school"
          : "Consulting service"}
      </span>

      <h5 className="mb-2 text-3xl mid:text-2xl font-bold tracking-tight text-gray-900 first-letter:uppercase">
        {event.title}
      </h5>
      <p className="mb-3 text-sm text-gray-600 line-clamp-2 flex-grow">
        {truncateText(stripHtmlTags(event.trainingDesc || event.content), 80)}
      </p>

      <Link
        to={
          event.category === "TrainingSchool"
            ? `/SolutionForm/${event.slug}`
            : `/SolutionFormCS/${event.slug}`
        }
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 duration-300 mt-auto self-start transition-all hover:scale-105">
        More Details
      </Link>
    </div>
  </div>
);
