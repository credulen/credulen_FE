import React from "react";
import { CircularProgress } from "@mui/material";
import UsePaginatedSolutions from "../components/tools/usePagination";
import { SolutionCard } from "../components/SolutionCard";
import Pagination from "../components/tools/pagination";

const TrainingSchool = () => {
  const { solutions, isLoading, error, pagination, handlePageChange } =
    UsePaginatedSolutions("TrainingSchool");

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
        <h2 className="text-xl font-medium">Training School</h2>
        <p className="mb-10">
          <span className="font-medium mr-1">
            Data Science & Engineering for Professionals:
          </span>
          Our comprehensive training programs provide professionals with the
          skills needed to excel in data science and engineering. Learn from
          industry experts and gain practical experience through hands-on
          projects. <br />
          <span className="font-medium mr-1">
            Using Generative AI to Supercharge Productivity:
          </span>
          Discover how to leverage Generative AI to enhance your productivity as
          an individual or organization. Our training covers the latest AI tools
          and techniques to help you stay ahead of the curve.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.length > 0 ? (
            solutions.map((event) => (
              <SolutionCard key={event._id} event={event} />
            ))
          ) : (
            <p>No training school solutions available.</p>
          )}
        </div>

        {pagination.totalPages > 1 && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export default TrainingSchool;
