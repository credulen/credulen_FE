const Conferences = () => {
  return (
    <div className="md:mt-32 mt-36 md:px-[5rem] px-4">
      <div className="pb-20">
        <h1 className="text-3xl font-semibold">Events You will Love</h1>

        <div className="flex justify-center">
          <a
            href="#"
            class="block p-6 w-60 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-12"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              Coming Soon
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-center">
              Stay Tuned...
            </p>
          </a>
        </div>

        <div className="pt-20">
          <hr class="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <h1 className="text-2xl font-semibold">Past Events</h1>
          <hr class="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
        </div>

        <div className="flex justify-center">
          <a
            href="#"
            class="block p-6 w-60 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-12"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              Coming Soon
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-center">
              Stay Tuned...
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Conferences;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import EventBusyIcon from "@mui/icons-material/EventBusy";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// const stripHtmlTags = (content) => {
//   return content.replace(/<\/?[^>]+(>|$)/g, "");
// };

// const WebinarCard = ({ event }) => (
//   <div className=" bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
//     <img
//       className="w-full h-48 object-cover"
//       src={`${backendURL}${event?.image}`}
//       alt={event.title}
//       style={{ minHeight: "15rem" }}
//     />
//     <div className="p-4">
//       <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 truncat first-letter:uppercase">
//         {event.title}
//       </h5>
//       <p className="mb-3 text-sm text-gray-700 line-clamp-3">
//         {stripHtmlTags(event.content)}
//       </p>
//       <Link
//         to={`/event/${event.slug}`}
//         className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
//       >
//         Read more
//         <svg
//           className="w-3.5 h-3.5 ms-2"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 14 10"
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

// const Conferences = () => {
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);

//   useEffect(() => {
//     fetchWebinars();
//   }, []);

//   const fetchWebinars = async () => {
//     try {
//       const response = await fetch(`${backendURL}/api/getEvents`);
//       const data = await response.json();

//       const webinars = Array.isArray(data.events)
//         ? data.events.filter((event) => event.eventType === "conference")
//         : [];

//       const currentDate = new Date();
//       const upcoming = webinars.filter(
//         (event) => new Date(event.date) > currentDate
//       );
//       const past = webinars.filter(
//         (event) => new Date(event.date) <= currentDate
//       );

//       setUpcomingEvents(upcoming);
//       setPastEvents(past);
//     } catch (error) {
//       console.error("Error fetching webinars:", error);
//       setUpcomingEvents([]);
//       setPastEvents([]);
//     }
//   };

//   return (
//     <div className=" mt-[3rem] container mx-auto px-4 py-8 md:py-16">
//       <div className="mb-24">
//         <div className="flex items-center mb-6">
//           <EventAvailableIcon className="text-blue-600 mr-2" />
//           <h2 className="text-2xl font-medium">Events You will Love</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {upcomingEvents.map((event) => (
//             <WebinarCard key={event.id} event={event} />
//           ))}
//         </div>
//       </div>
//       {/* Horizontal line to separate sections */}
//       <hr className="my-8 border-t border-gray-300" />
//       <div>
//         <div className="flex items-center mb-6">
//           <EventBusyIcon className="text-blue-600 mr-2" />
//           <h2 className="text-2xl font-medium">Past Events</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pastEvents.map((event) => (
//             <WebinarCard key={event.id} event={event} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Conferences;
