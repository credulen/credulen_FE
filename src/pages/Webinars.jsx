// import React from "react";
// import { SmallBlogCards } from "../components/Cards";

// const Webinars = () => {
//   return (
//     <div className="md:mt-32 mt-36 md:px-[5rem] px-4">
//       <div className="pb-20">
//         <h1 className="text-3xl font-semibold">Credulen Webinars</h1>
//         <p className="mt-3">
//           Elevate your expertise with Credulen Webinars! Empowering c-suite
//           leaders, senior managers, developers, and tech enthusiasts with
//           cutting-edge insights, news, and education on Big Data, AI, and
//           Blockchain. Stay ahead of the curve – join us on the innovation
//           journey!
//         </p>
//       </div>

//       <div className="pb-20">
//         <h2 className="text-2xl font-medium">Upcoming Webinars</h2>
//         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-12 my-5">
//           <SmallBlogCards />
//           <SmallBlogCards />
//           <SmallBlogCards />

//           <SmallBlogCards />
//           <SmallBlogCards />
//           <SmallBlogCards />
//         </div>
//       </div>

//       <div className="">
//         <h2 className="text-2xl font-medium">On Demand Webinars</h2>
//         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-12 my-5">
//           <SmallBlogCards />
//           <SmallBlogCards />
//           <SmallBlogCards />

//           <SmallBlogCards />
//           <SmallBlogCards />
//           <SmallBlogCards />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Webinars;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable"; // Upcoming Event Icon
// import EventBusyIcon from "@mui/icons-material/EventBusy"; // Past Event Icon

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// const stripHtmlTags = (content) => {
//   return content.replace(/<\/?[^>]+(>|$)/g, "");
// };

// const Webinars = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch(`${backendURL}/api/getEvents`);
//       const data = await response.json();

//       const webinarPosts = Array.isArray(data.events)
//         ? data.events.filter((event) => event.eventType === "webinar")
//         : [];

//       console.log(webinarPosts);
//       setEvents(webinarPosts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setEvents([]);
//     }
//   };

//   return (
//     <div className="md:mt-32 mt-36 md:px-[5rem] px-4">
//       <div className="pb-20">
//         <h1 className="text-3xl font-semibold">Credulen Webinars</h1>
//         <p className="mt-3">
//           Elevate your expertise with Credulen Webinars! Empowering c-suite
//           leaders, senior managers, developers, and tech enthusiasts with
//           cutting-edge insights, news, and education on Big Data, AI, and
//           Blockchain. Stay ahead of the curve – join us on the innovation
//           journey!
//         </p>
//       </div>

//       <div className="pb-20">
//         <div className="flex mb-[3rem]">
//           <EventAvailableIcon
//             style={{ fontSize: 25, marginTop: 5, marginRight: 5 }}
//           />
//           <h2 className="text-2xl font-medium">Upcoming Webinars</h2>
//         </div>
//         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 my-5">
//           {events.slice(0, 3).map((event, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg overflow-hidden shadow-md"
//             >
//               <img
//                 className="w-full h-48 object-cover"
//                 src={`${backendURL}${event?.image}`}
//                 alt={event.title}
//                 style={{ minHeight: "15rem" }}
//               />
//               <div className="p-4">
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                   {event.title}
//                 </h5>
//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                   {stripHtmlTags(event.content).length > 100
//                     ? `${stripHtmlTags(event.content).substring(0, 100)}...`
//                     : stripHtmlTags(event.content)}
//                 </p>

//                 <Link
//                   to={`/webinar/${event.id}`}
//                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-btColour rounded-lg hover:bg-btColour focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-btColour dark:hover:bg-btColour dark:focus:ring-btColour"
//                 >
//                   Read more
//                   <svg
//                     className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 10"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 5h12m0 0L9 1m4 4L9 9"
//                     />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h2 className="text-2xl font-medium">On Demand Webinars</h2>
//         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-12 my-5">
//           {/* On Demand Webinars code */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Webinars;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";

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

const WebinarCard = ({ event }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-95 flex flex-col h-full">
    <img
      className="w-full h-48 object-cover"
      src={`${backendURL}${event?.image}`}
      alt={event.title}
      style={{ minHeight: "15rem" }}
    />
    <div className="p-4 flex flex-col flex-grow">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900  first-letter:uppercase">
        {event.title}
      </h5>
      <p className="mb-3 text-sm text-gray-700 line-clamp-3 flex-grow">
        {truncateText(stripHtmlTags(event.content), 100)}
      </p>
      <Link
        to={`/event/${event.slug}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-btColour rounded-lg   focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:text-btColour hover:bg-white hover:border-btColour hover:border-2 hover:font-semibold"
      >
        Read more
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

const Webinars = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      const response = await fetch(`${backendURL}/api/getEvents`);
      const data = await response.json();

      const webinars = Array.isArray(data.events)
        ? data.events.filter((event) => event.eventType === "webinar")
        : [];

      const currentDate = new Date();
      const upcoming = webinars.filter(
        (event) => new Date(event.date) > currentDate
      );
      const past = webinars.filter(
        (event) => new Date(event.date) <= currentDate
      );

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (error) {
      console.error("Error fetching webinars:", error);
      setUpcomingEvents([]);
      setPastEvents([]);
    }
  };

  return (
    <div className=" mt-[3rem] container mx-auto px-4 py-8 md:py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold mb-4">Credulen Webinars</h1>
        <p className="text-gray-600">
          Elevate your expertise with Credulen Webinars! Empowering c-suite
          leaders, senior managers, developers, and tech enthusiasts with
          cutting-edge insights, news, and education on Big Data, AI, and
          Blockchain. Stay ahead of the curve – join us on the innovation
          journey!
        </p>
      </div>

      <div className="mb-24">
        <div className="flex items-center mb-6">
          <EventAvailableIcon className="text-btColour mr-2" />
          <h2 className="text-2xl font-medium">Upcoming Webinars</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <WebinarCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      {/* Horizontal line to separate sections */}
      <hr className="my-8 border-t border-gray-300" />
      <div>
        <div className="flex items-center mb-6">
          <EventBusyIcon className="text-btColour mr-2" />
          <h2 className="text-2xl font-medium">On Demand Webinars</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((event) => (
            <WebinarCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Webinars;
