// import React, { useState } from "react";
// import { CircularProgress } from "@mui/material";
// import UsePaginatedSolutions from "../components/tools/usePagination";
// import { SolutionCard } from "../components/SolutionCard";
// import Pagination from "../components/tools/pagination";
// import { ChevronDown, ChevronUp, Star, Book, Users, Award } from "lucide-react";

// // Q&A Component
// const QAndA = () => {
//   const [openQuestion, setOpenQuestion] = useState(null);

//   const toggleQuestion = (index) => {
//     setOpenQuestion(openQuestion === index ? null : index);
//   };

//   const qaData = [
//     {
//       question: "Who can enroll in Credulen Training School programs?",
//       answer:
//         "Our programs are designed for professionals, students, and enthusiasts at all levels. Whether you're a beginner or an experienced practitioner, our courses cater to a wide range of skill levels in data science, engineering, and AI.",
//     },
//     {
//       question: "What is the duration of the training programs?",
//       answer:
//         "Most programs span between 12 to 20 weeks, depending on the course intensity. Each course includes a flexible schedule, allowing you to learn at your own pace with access to materials 24/7.",
//     },
//     {
//       question: "Will I receive a certificate after completing a course?",
//       answer:
//         "Yes! Upon successful completion, you’ll earn a Credulen Certificate, recognized by industry professionals, to showcase your skills and enhance your career.",
//     },
//     {
//       question: "Are the courses fully online?",
//       answer:
//         "Absolutely. All Credulen Training School programs are 100% online, offering you the flexibility to learn from anywhere in the world.",
//     },
//   ];

//   return (
//     <div className="py-16 bg-blue-50 rounded-xl">
//       <div className="max-w-4xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-blue-800 mb-10 text-center">
//           Frequently Asked Questions
//         </h2>
//         <div className="space-y-4">
//           {qaData.map((qa, index) => (
//             <div
//               key={index}
//               className="border border-blue-200 rounded-lg bg-white transition-all duration-300">
//               <button
//                 onClick={() => toggleQuestion(index)}
//                 className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none hover:bg-blue-100 transition-colors">
//                 <h3 className="text-lg font-semibold text-blue-800">
//                   {qa.question}
//                 </h3>
//                 {openQuestion === index ? (
//                   <ChevronUp className="w-5 h-5 text-blue-600" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-blue-600" />
//                 )}
//               </button>
//               {openQuestion === index && (
//                 <div className="px-6 py-4 border-t border-blue-200">
//                   <p className="text-gray-600">{qa.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Why Choose Credulen Component
// const WhyChooseCredulen = () => {
//   const whyChooseData = [
//     {
//       icon: Star,
//       title: "Expert Instructors",
//       description:
//         "Learn from industry leaders with years of experience in data science, engineering, and AI.",
//     },
//     {
//       icon: Book,
//       title: "Hands-On Learning",
//       description:
//         "Gain practical skills through real-world projects and interactive exercises.",
//     },
//     {
//       icon: Users,
//       title: "Supportive Community",
//       description:
//         "Join a network of learners and professionals for collaboration and support.",
//     },
//     {
//       icon: Award,
//       title: "Recognized Certification",
//       description:
//         "Earn a Credulen Certificate to boost your career and credibility.",
//     },
//   ];

//   return (
//     <div className="py-16 bg-gray-10 rounded-xl text-lime-950 ">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-12 text-center">
//           Why Choose Credulen Courses?
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {whyChooseData.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
//               <item.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
//               <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//               <p className="text-sm text-lime-950">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main TrainingSchool Component
// const TrainingSchool = () => {
//   const { solutions, isLoading, error, pagination, handlePageChange } =
//     UsePaginatedSolutions("TrainingSchool");

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//         <CircularProgress size={40} className="text-teal-600" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-12 text-center">
//         <div className="bg-red-50 p-6 rounded-lg">
//           <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}

//         <div className="pb-12">
//           <h1 className="text-3xl font-bold text-gray-800">Training School</h1>

//           <p className="mb-10">
//             <span className="font-medium mr-1">
//               Data Science & Engineering for Professionals:
//             </span>
//             Our comprehensive training programs provide professionals with the
//             skills needed to excel in data science and engineering. Learn from
//             industry experts and gain practical experience through hands-on
//             projects. <br />
//             <span className="font-medium mr-1">
//               Using Generative AI to Supercharge Productivity:
//             </span>
//             Discover how to leverage Generative AI to enhance your productivity
//             as an individual or organization. Our training covers the latest AI
//             tools and techniques to help you stay ahead of the curve.
//           </p>
//         </div>

//         {/* Solutions Grid */}
//         <div className="pb-16">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-8">
//             Explore Our Training Programs
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {solutions.length > 0 ? (
//               solutions.map((event) => (
//                 <SolutionCard key={event._id} event={event} />
//               ))
//             ) : (
//               <p className="text-gray-600 col-span-full text-center">
//                 No training school solutions available.
//               </p>
//             )}
//           </div>

//           {pagination.totalPages > 1 && (
//             <div className="mt-12 flex justify-center">
//               <Pagination
//                 pagination={pagination}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           )}
//         </div>

//         {/* Why Choose Credulen Section */}
//         <WhyChooseCredulen />
//         {/* Q&A Section */}
//         <QAndA />
//       </div>
//     </div>
//   );
// };

// export default TrainingSchool;
import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import UsePaginatedSolutions from "../components/tools/usePagination";
import { SolutionCard } from "../components/SolutionCard";
import Pagination from "../components/tools/pagination";
import { ChevronDown, ChevronUp, Star, Book, Users, Award } from "lucide-react";
import Spinner2 from "../components/tools/Spinner2";

// Q&A Component
const QAndA = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const qaData = [
    {
      question: "Who can enroll in Credulen Training School programs?",
      answer:
        "Our programs are designed for professionals, students, and enthusiasts at all levels. Whether you're a beginner or an experienced practitioner, our courses cater to a wide range of skill levels in data science, engineering, and AI.",
    },
    {
      question: "What is the duration of the training programs?",
      answer:
        "Most programs span between 12 to 20 weeks, depending on the course intensity. Each course includes a flexible schedule, allowing you to learn at your own pace with access to materials 24/7.",
    },
    {
      question: "Will I receive a certificate after completing a course?",
      answer:
        "Yes! Upon successful completion, you'll earn a Credulen Certificate, recognized by industry professionals, to showcase your skills and enhance your career.",
    },
    {
      question: "Are the courses fully online?",
      answer:
        "Absolutely. All Credulen Training School programs are 100% online, offering you the flexibility to learn from anywhere in the world.",
    },
  ];

  return (
    <div className="py-16 bg-primary-50 rounded-xl">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {qaData.map((qa, index) => (
            <div
              key={index}
              className="border border-primary-200 rounded-lg bg-white transition-all duration-300">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none hover:bg-primary-50 transition-colors">
                <h3 className="text-lg font-semibold text-primary-900">
                  {qa.question}
                </h3>
                {openQuestion === index ? (
                  <ChevronUp className="w-5 h-5 text-secondary-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-secondary-500" />
                )}
              </button>
              {openQuestion === index && (
                <div className="px-6 py-4 border-t border-primary-200">
                  <p className="text-neutral-600">{qa.answer}</p>
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
const WhyChooseCredulen = () => {
  const whyChooseData = [
    {
      icon: Star,
      title: "Expert Instructors",
      description:
        "Learn from industry leaders with years of experience in data science, engineering, and AI.",
    },
    {
      icon: Book,
      title: "Hands-On Learning",
      description:
        "Gain practical skills through real-world projects and interactive exercises.",
    },
    {
      icon: Users,
      title: "Supportive Community",
      description:
        "Join a network of learners and professionals for collaboration and support.",
    },
    {
      icon: Award,
      title: "Recognized Certification",
      description:
        "Earn a Credulen Certificate to boost your career and credibility.",
    },
  ];

  return (
    <div className="py-16 bg-primary-50 rounded-xl text-primary-900 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary-900">
          Why Choose Credulen Courses?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseData.map((item, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 border border-primary-100/50">
              <item.icon className="w-12 h-12 mx-auto mb-4 text-secondary-500" />
              <h3 className="text-lg font-semibold mb-2 text-primary-900">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main TrainingSchool Component
const TrainingSchool = () => {
  const { solutions, isLoading, error, pagination, handlePageChange } =
    UsePaginatedSolutions("TrainingSchool");

  if (isLoading) {
    return (
      <>
        <Spinner2 />
      </>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="pb-12">
          <h1 className="text-3xl font-bold text-primary-900">
            Training School
          </h1>

          <p className="mb-10 text-neutral-700">
            <span className="font-medium text-primary-900 mr-1">
              Data Science & Engineering for Professionals:
            </span>
            Our comprehensive training programs provide professionals with the
            skills needed to excel in data science and engineering. Learn from
            industry experts and gain practical experience through hands-on
            projects. <br />
            <span className="font-medium text-primary-900 mr-1">
              Using Generative AI to Supercharge Productivity:
            </span>
            Discover how to leverage Generative AI to enhance your productivity
            as an individual or organization. Our training covers the latest AI
            tools and techniques to help you stay ahead of the curve.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="pb-16">
          <h2 className="text-2xl font-semibold text-primary-900 mb-8">
            Explore Our Training Programs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.length > 0 ? (
              solutions.map((event) => (
                <SolutionCard key={event._id} event={event} />
              ))
            ) : (
              <p className="text-neutral-600 col-span-full text-center">
                No training school solutions available.
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
        <WhyChooseCredulen />
        {/* Q&A Section */}
        <QAndA />
      </div>
    </div>
  );
};

export default TrainingSchool;
