// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { CalendarCheck, CalendarX2, Filter } from "lucide-react";
// import { CircularProgress, TextField } from "@mui/material";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

// function truncateText(text, maxLength) {
//   return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
// }

// const PodcastCard = ({ event }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-95 flex flex-col h-full border border-primary-100 hover:border-primary-200">
//     <img
//       className="w-full h-48 object-cover"
//       src={`${event?.image}`}
//       alt={event.title}
//       style={{ minHeight: "15rem" }}
//     />
//     <div className="p-4 flex flex-col flex-grow">
//       <h5 className="mb-2 text-xl font-bold tracking-tight text-primary-900 first-letter:uppercase">
//         {event.title}
//       </h5>
//       <p className="mb-3 text-sm text-neutral-600 line-clamp-3 flex-grow">
//         {truncateText(stripHtmlTags(event.content), 100)}
//       </p>
//       <Link
//         to={`/event/${event.slug}`}
//         className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-secondary-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-secondary-500/30 transition-all duration-300 mt-auto self-start hover:shadow-lg hover:-translate-y-0.5 group">
//         Listen now
//         <svg
//           className="w-3.5 h-3.5 ms-2 group-hover:translate-x-1 transition-transform duration-300"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 14 10">
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

// const Podcasts = () => {
//   const [podcasts, setPodcasts] = useState([]);
//   const [filteredPodcasts, setFilteredPodcasts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const subCategories = useMemo(
//     () => [
//       { value: "all", label: "All Categories" },
//       { value: "podcast", label: "Podcast" },
//       { value: "keynote", label: "Keynote" },
//       { value: "panel", label: "Panel" },
//       { value: "training", label: "Training" },
//       { value: "networking", label: "Networking" },
//       { value: "other", label: "Other" },
//     ],
//     []
//   );

//   useEffect(() => {
//     fetchPodcasts();
//   }, []);

//   const fetchPodcasts = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${backendURL}/api/getEvents`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch podcasts");
//       }
//       const data = await response.json();

//       const podcastsData = Array.isArray(data.events)
//         ? data.events.filter((event) => event.eventType === "podcast")
//         : [];
//       setPodcasts(podcastsData);
//       setFilteredPodcasts(podcastsData); // Initial filter
//     } catch (error) {
//       setError(error.message);
//       console.error("Error fetching podcasts:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const applyFilters = useMemo(() => {
//     let result = [...podcasts];

//     // Filter by search term
//     if (searchTerm) {
//       result = result.filter(
//         (event) =>
//           event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           stripHtmlTags(event.content)
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by category
//     if (selectedCategory !== "all") {
//       result = result.filter((event) => event.subCategory === selectedCategory);
//     }

//     // Filter by type (upcoming/past/all)
//     const currentDate = new Date();
//     if (filterType === "upcoming") {
//       result = result.filter((event) => new Date(event.date) > currentDate);
//     } else if (filterType === "past") {
//       result = result.filter((event) => new Date(event.date) <= currentDate);
//     }

//     return result;
//   }, [podcasts, searchTerm, selectedCategory, filterType]);

//   const LoadingSpinner = useMemo(
//     () => (
//       <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//         <CircularProgress size={40} sx={{ color: "#1A3C34" }} />
//       </div>
//     ),
//     []
//   );

//   if (isLoading) {
//     return LoadingSpinner;
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-primary-900">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="mt-[3rem] container mx-auto px-4 py-8 md:py-16 lg:px-12 flex">
//       {/* Sidebar */}
//       <aside className="w-64 pr-6">
//         <h3 className="text-lg font-medium text-primary-900 mb-4">
//           Categories
//         </h3>
//         <div className="space-y-2">
//           {subCategories.map((category) => (
//             <button
//               key={category.value}
//               onClick={() => setSelectedCategory(category.value)}
//               className={`w-full text-left px-3 py-2 rounded-md ${
//                 selectedCategory === category.value
//                   ? "bg-primary-100 text-primary-900"
//                   : "text-neutral-700 hover:bg-neutral-100"
//               }`}>
//               {category.label}
//             </button>
//           ))}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold text-primary-900">
//             Credulen Podcasts
//           </h1>
//           <div className="flex items-center space-x-4">
//             <TextField
//               label="Search Podcasts"
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 style: { color: "#3B4A54" }, // neutral-700
//               }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
//                   "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
//                   "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
//                 },
//               }}
//               size="small"
//             />
//             <button
//               onClick={() =>
//                 setFilterType((prev) =>
//                   prev === "all"
//                     ? "upcoming"
//                     : prev === "upcoming"
//                     ? "past"
//                     : "all"
//                 )
//               }
//               className="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-secondary-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-secondary-500/30 transition-all duration-300">
//               <Filter className="mr-2 w-4 h-4" />
//               {filterType === "all"
//                 ? "All"
//                 : filterType === "upcoming"
//                 ? "Upcoming"
//                 : "Past"}
//             </button>
//           </div>
//         </div>
//         <p className="mt-3 text-neutral-700 mb-6">
//           Dive into the world of innovation with Credulen Podcasts! Join
//           industry leaders, tech experts, and thought leaders as they share
//           insights on Big Data, AI, Blockchain, and more. Tune in to stay
//           informed and inspired on your innovation journey!
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {applyFilters.length > 0 ? (
//             applyFilters.map((event) => (
//               <PodcastCard key={event._id} event={event} />
//             ))
//           ) : (
//             <p className="text-neutral-600 col-span-full text-center">
//               No podcasts available matching your criteria.
//             </p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Podcasts;

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  CalendarX2,
  Filter,
  ChevronDown,
  Search,
  Play,
  Globe,
  Briefcase,
  Users,
  MoreHorizontal,
} from "lucide-react";
import { CircularProgress, TextField } from "@mui/material";
import Spinner2 from "../components/tools/Spinner2";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const PodcastCard = ({ event }) => (
  <div className="group bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full border border-primary-100 hover:border-primary-500 relative">
    {/* Image Container with Overlay */}
    <div className="relative overflow-hidden">
      <img
        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        src={`${event?.image}`}
        alt={event.title}
        style={{ minHeight: "12rem" }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-6 h-6 text-secondary-500 ml-1" />
        </div>
      </div>
    </div>

    <div className="p-3 flex flex-col flex-grow">
      <h5 className="mb-3 text-xl font-bold tracking-tight text-primary-900 first-letter:uppercase line-clamp-2 group-hover:text-secondary-500 transition-colors duration-300">
        {event.title}
      </h5>
      <p className="mb-4 text-sm text-neutral-600 line-clamp-3 flex-grow leading-relaxed">
        {truncateText(stripHtmlTags(event.content), 120)}
      </p>

      {/* Date Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 transition-colors duration-300">
          {new Date(event.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <Link
        to={`/event/${event.slug}`}
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary-500 hover:from-secondary-500 hover:to-secondary-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-200 transition-all duration-300 mt-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group/btn">
        <Play className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
        View More
      </Link>
    </div>
  </div>
);

// Custom Dropdown Component
const CustomDropdown = ({ value, onChange, options, label, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2.5 text-sm font-medium text-primary-700 bg-white border border-primary-200 rounded-lg hover:bg-primary-50 focus:ring-4 focus:outline-none focus:ring-primary-200 transition-all duration-300 shadow-sm hover:shadow-md min-w-[140px] justify-between">
        <div className="flex items-center">
          {Icon && <Icon className="mr-2 w-4 h-4" />}
          {selectedOption?.label}
        </div>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-primary-200 rounded-xl shadow-xl z-20 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center ${
                  value === option.value
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-neutral-700 hover:bg-primary-50"
                }`}>
                {option.icon && <option.icon className="mr-3 w-4 h-4" />}
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const subCategories = useMemo(
    () => [
      { value: "all", label: "All Categories", icon: Filter }, // still works well for "all"
      { value: "General", label: "General", icon: Globe }, // "global/general" context
      { value: "Executive (B2B)", label: "Executive (B2B)", icon: Briefcase }, // business focus
      { value: "others", label: "Others", icon: MoreHorizontal }, // catch-all category
    ],
    []
  );

  const filterOptions = useMemo(
    () => [
      { value: "all", label: "All Podcasts", icon: Filter },
      { value: "upcoming", label: "Upcoming", icon: CalendarCheck },
      { value: "past", label: "Past Podcasts", icon: CalendarX2 },
    ],
    []
  );

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${backendURL}/api/getEvents`);
      if (!response.ok) {
        throw new Error("Failed to fetch podcasts");
      }
      const data = await response.json();

      const podcastsData = Array.isArray(data.events)
        ? data.events.filter((event) => event.eventType === "podcast")
        : [];
      setPodcasts(podcastsData);
      setFilteredPodcasts(podcastsData);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching podcasts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = useMemo(() => {
    let result = [...podcasts];

    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stripHtmlTags(event.content)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((event) => event.subCategory === selectedCategory);
    }

    const currentDate = new Date();
    if (filterType === "upcoming") {
      result = result.filter((event) => new Date(event.date) > currentDate);
    } else if (filterType === "past") {
      result = result.filter((event) => new Date(event.date) <= currentDate);
    }

    return result;
  }, [podcasts, searchTerm, selectedCategory, filterType]);

  const LoadingSpinner = useMemo(
    () => (
      <>
        <Spinner2 />
      </>
    ),
    []
  );

  if (isLoading) {
    return LoadingSpinner;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-primary-900">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-16 lg:px-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4 bg-gradient-to-r from-primary-500 to-primary-900 bg-clip-text ">
            Credulen Podcasts
          </h1>
          <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl">
            Dive into the world of innovation with Credulen Podcasts! Join
            industry leaders, tech experts, and thought leaders as they share
            insights on Big Data, AI, Blockchain, and more. Tune in to stay
            informed and inspired on your innovation journey!
          </p>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white/70 backdrop-blur-sm border border-primary-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex-1 relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                  <TextField
                    placeholder="Search podcasts..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      style: {
                        color: "#3B4A54",
                        paddingLeft: "2.5rem",
                      },
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "2.5rem",
                        "& fieldset": { borderColor: "#D8E0E8" },
                        "&:hover fieldset": { borderColor: "#1A3C34" },
                        "&.Mui-focused fieldset": { borderColor: "#1A3C34" },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-3 text-primary-500">
                <CustomDropdown
                  value={filterType}
                  onChange={setFilterType}
                  options={filterOptions}
                  label="Filter by Time"
                  icon={Filter}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-neutral-600 font-medium">
                Showing {applyFilters.length} of {podcasts.length} podcasts
              </p>
            </div>

            {/* Podcast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applyFilters.length > 0 ? (
                applyFilters.map((event) => (
                  <PodcastCard key={event._id} event={event} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white/70 backdrop-blur-sm border border-primary-100 rounded-2xl p-8 max-w-md mx-auto">
                    <div className="text-neutral-400 mb-4">
                      <Filter className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-neutral-600 font-medium mb-2">
                      No podcasts found
                    </p>
                    <p className="text-sm text-neutral-500">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-72 hidden lg:block">
            <div className="sticky top-8">
              <div className="bg-white/70 backdrop-blur-sm border border-primary-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold text-primary-900 mb-6 flex items-center">
                  <Filter className="mr-2 w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {subCategories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center group ${
                        selectedCategory === category.value
                          ? "bg-primary-50 text-primary-500 shadow-sm border border-primary-200"
                          : "text-neutral-700 hover:bg-primary-50 hover:shadow-sm"
                      }`}>
                      <category.icon className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="mt-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-primary-500 hover:from-secondary-500 hover:to-secondary-600 transition-all duration-300">
                <h4 className="font-semibold mb-2">Podcast Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Podcasts:</span>
                    <span className="font-semibold">{podcasts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Filtered Results:</span>
                    <span className="font-semibold">{applyFilters.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
