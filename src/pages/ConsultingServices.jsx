import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import UsePaginatedSolutions from "../components/tools/usePagination";
import { SolutionConsultingCard } from "../components/SolutionCard";
import Pagination from "../components/tools/pagination";
import { ChevronDown, ChevronUp, Star, Book, Users, Award } from "lucide-react";

const ConsultingQAndA = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const qaData = [
    {
      question:
        "What types of organizations benefit from Credulen’s consulting services?",
      answer:
        "Our consulting services are tailored for businesses of all sizes, from startups to large enterprises, across industries like finance, healthcare, and technology. We specialize in helping organizations leverage data, blockchain, and AI to drive innovation and growth.",
    },
    {
      question: "How does Credulen approach data and AI integration?",
      answer:
        "We follow a strategic, phased approach that includes assessing your current infrastructure, identifying opportunities for AI and data integration, and implementing solutions that align with your business goals. Our team ensures seamless adoption with minimal disruption.",
    },
    {
      question: "Can Credulen help with blockchain strategy development?",
      answer:
        "Yes! We provide end-to-end blockchain consulting, from strategy development to implementation. Our experts help you identify use cases, design secure systems, and integrate blockchain technology to enhance transparency and efficiency.",
    },
    {
      question:
        "What outcomes can I expect from Credulen’s consulting services?",
      answer:
        "Our goal is to deliver measurable value, including improved operational efficiency, enhanced decision-making through data insights, and a stronger competitive edge. We focus on sustainable, long-term growth for your organization.",
    },
  ];

  return (
    <div className="py-16 bg-blue-50 rounded-xl">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-800 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {qaData.map((qa, index) => (
            <div
              key={index}
              className="border border-blue-200 rounded-lg bg-white transition-all duration-300">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none hover:bg-blue-100 transition-colors">
                <h3 className="text-lg font-semibold text-blue-800">
                  {qa.question}
                </h3>
                {openQuestion === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              {openQuestion === index && (
                <div className="px-6 py-4 border-t border-blue-200">
                  <p className="text-gray-600">{qa.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Why Choose Credulen Component
const ConsultingWhyChooseCredulen = () => {
  const whyChooseData = [
    {
      icon: Star,
      title: "Expert Consultants",
      description:
        "Work with industry leaders who bring deep expertise in data, blockchain, and AI strategies.",
    },
    {
      icon: Book,
      title: "Tailored Solutions",
      description:
        "Receive customized strategies that address your unique business challenges and goals.",
    },
    {
      icon: Users,
      title: "Collaborative Approach",
      description:
        "Partner with a team that works closely with you to ensure successful implementation.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description:
        "Benefit from our track record of delivering measurable outcomes and business growth.",
    },
  ];

  return (
    <div className="py-16 bg-gray-10 rounded-xl text-lime-950 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Choose Credulen Courses?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseData.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <item.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-lime-950">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main ConsultingServices Component
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
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        {/* Consulting Services Section */}
        <div className="pb-16">
          <h2 className="text-2xl md:text-3xl font-bold">
            Consulting Services
          </h2>
          <p className="mb-10">
            <span className="font-medium mr-1">
              Data, Blockchain & AI Integration and Strategy:
            </span>
            We offer expert consulting to help organizations integrate data,
            blockchain, and AI technologies seamlessly. Our strategic guidance
            ensures that your technology investments drive maximum value
            creation and business growth.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-16 mb-5">
            Explore Our Consulting Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {solutions.length > 0 ? (
              solutions.map((event) => (
                <SolutionConsultingCard key={event._id} event={event} />
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                No consulting service solutions available.
              </p>
            )}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* Why Choose Credulen Section */}
        <ConsultingWhyChooseCredulen />

        {/* Q&A Section */}
        <ConsultingQAndA />
      </div>
    </div>
  );
};

export default ConsultingServices;
