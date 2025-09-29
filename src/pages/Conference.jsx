import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, CalendarX2 } from "lucide-react";
import { CircularProgress } from "@mui/material";
import Spinner2 from "../components/tools/Spinner2";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const WebinarCard = ({ event }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-95 flex flex-col h-full border border-primary-100 hover:border-primary-200">
    <img
      className="w-full h-48 object-cover"
      src={`${event?.image}`}
      alt={event.title}
      style={{ minHeight: "15rem" }}
    />
    <div className="p-4 flex flex-col flex-grow">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-primary-900 first-letter:uppercase">
        {event.title}
      </h5>
      <p className="mb-3 text-sm text-neutral-600 line-clamp-3 flex-grow">
        {truncateText(stripHtmlTags(event.content), 100)}
      </p>
      <Link
        to={`/event/${event.slug}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-900 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-secondary-500/30 transition-all duration-300 mt-auto self-start hover:from-secondary-600 hover:to-secondary-700 hover:text-primary-50 hover:shadow-lg hover:-translate-y-0.5 group">
        Read more
        <svg
          className="w-3.5 h-3.5 ms-2 group-hover:translate-x-1 transition-transform duration-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10">
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

const Conferences = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${backendURL}/api/getEvents`);
      if (!response.ok) {
        throw new Error("Failed to fetch conferences");
      }
      const data = await response.json();

      const conferences = Array.isArray(data.events)
        ? data.events.filter((event) => event.eventType === "conference")
        : [];

      const currentDate = new Date();
      const upcoming = conferences.filter(
        (event) => new Date(event.date) > currentDate
      );
      const past = conferences.filter(
        (event) => new Date(event.date) <= currentDate
      );

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching conferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <CircularProgress size={40} className="text-secondary-500" />
      </div>
    ),
    []
  );

  if (isLoading) {
    return (
      <>
        <Spinner2 />
      </>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-primary-900">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="mt-[3rem] container mx-auto px-4 py-8 md:py-16 lg:px-12">
      <div className="pb-12">
        <h1 className="text-2xl font-semibold text-primary-900">Conferences</h1>
        <p className="mt-3 text-neutral-700">
          Join us for immersive conferences that bring together industry
          leaders, innovators, and experts. Experience hands-on workshops,
          engaging presentations, and valuable networking opportunities in the
          fields of Big Data, AI, and Blockchain.
        </p>
      </div>

      <div className="pb-12">
        <div className="flex items-center mb-6">
          <CalendarCheck className="text-secondary-500 mr-2 w-5 h-5" />
          <h2 className="text-xl font-medium text-primary-900">
            Events You Will Love
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <WebinarCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-neutral-600 col-span-full text-center">
              No upcoming conferences available.
            </p>
          )}
        </div>
      </div>

      <hr className="my-8 border-t border-primary-200" />

      <div className="mt-24">
        <div className="flex items-center mb-6">
          <CalendarX2 className="text-secondary-500 mr-2 w-5 h-5" />
          <h2 className="text-xl font-medium text-primary-900">Past Events</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <WebinarCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-neutral-600 col-span-full text-center">
              No past conferences available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conferences;
