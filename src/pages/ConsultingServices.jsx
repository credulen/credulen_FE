import React from "react";
import { CircularProgress } from "@mui/material";
import UsePaginatedSolutions from "../components/tools/usePagination";
import SolutionCard from "../components/SolutionCard";
import Pagination from "../components/tools/pagination";

const ConsultingServices = () => {
  const { solutions, isLoading, error, pagination, handlePageChange } =
    UsePaginatedSolutions("ConsultingService");

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <CircularProgress size={40} className="text-btColour" />
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {solutions.length > 0 ? (
            solutions.map((event) => (
              <SolutionCard key={event._id} event={event} />
            ))
          ) : (
            <p>No consulting service solutions available.</p>
          )}
        </div>

        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ConsultingServices;
