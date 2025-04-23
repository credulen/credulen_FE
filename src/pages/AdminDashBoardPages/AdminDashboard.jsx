// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useSelector } from "react-redux";
// import {
//   HiAnnotation,
//   HiDocumentText,
//   HiArrowNarrowUp,
//   HiLightBulb,
//   HiMail,
//   HiUser,
//   HiArrowNarrowDown,
//   HiTrendingUp,
//   HiCalendar,
// } from "react-icons/hi";
// import { Line } from "react-chartjs-2";
// import { CircularProgress } from "@mui/material";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const AdminDashboard = () => {
//   const backendURL =
//     import.meta.env.MODE === "production"
//       ? import.meta.env.VITE_BACKEND_URL
//       : "http://localhost:3001";

//   const [stats, setStats] = useState({
//     users: { total: 0, lastMonth: 0, data: [] },
//     comments: { total: 0, lastMonth: 0, data: [] },
//     posts: { total: 0, lastMonth: 0, data: [] },
//     solutions: { total: 0, lastMonth: 0, data: [] },
//     subscribers: {
//       total: 0,
//       weekly: 0,
//       monthly: 0,
//       prevMonth: 0,
//       weeklyBreakdown: [],
//       monthlyBreakdown: [],
//       growthRate: { monthly: 0 },
//     },
//   });
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState("week");
//   const { userInfo } = useSelector((state) => state.auth);

//   const fetchData = useCallback(
//     async (endpoint) => {
//       try {
//         const res = await fetch(`${backendURL}/api/${endpoint}`);
//         return res.ok ? await res.json() : null;
//       } catch (error) {
//         console.error(`Error fetching ${endpoint}:`, error);
//         return null;
//       }
//     },
//     [backendURL]
//   );

//   const fetchAllStats = useCallback(async () => {
//     const endpoints = {
//       users: "getUsers",
//       posts: "getPosts?limit=5",
//       comments: "getComments?limit=5",
//       solutions: "getAllSolutions?limit=5",
//       subscribers: "getNewsletterSubscribers",
//     };

//     const results = await Promise.all(
//       Object.entries(endpoints).map(async ([key, endpoint]) => {
//         const data = await fetchData(endpoint);
//         return [key, data];
//       })
//     );

//     setStats((prevStats) => {
//       const newStats = { ...prevStats };
//       results.forEach(([key, data]) => {
//         if (data) {
//           if (key === "subscribers") {
//             const subscriberStats = {
//               total: data.data.totalSubscribers || 0,
//               weekly: data.data.weeklySubscribers || 0,
//               monthly: data.data.monthlySubscribers || 0,
//               prevMonth: data.data.prevMonthSubscribers || 0,
//               weeklyBreakdown: data.data.weeklyBreakdown || [],
//               monthlyBreakdown: data.data.monthlyBreakdown || [],
//               growthRate: data.data.growthRate || { monthly: 0 },
//             };
//             newStats[key] = subscriberStats;
//           } else {
//             newStats[key] = {
//               total:
//                 data[`total${key.charAt(0).toUpperCase() + key.slice(1)}`] || 0,
//               lastMonth: data.lastMonth || 0,
//               data: data[key] || [],
//             };
//           }
//         }
//       });
//       return newStats;
//     });
//   }, [fetchData]);

//   useEffect(() => {
//     if (userInfo) {
//       setLoading(true);
//       fetchAllStats().finally(() => setLoading(false));
//     }
//   }, [userInfo, fetchAllStats]);

//   const LoadingSpinner = useMemo(
//     () => (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//         <CircularProgress size={40} className="text-blue-600" />
//       </div>
//     ),
//     []
//   );

//   const StatCard = ({ title, value, change, icon: Icon, color }) => (
//     <div className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//             {title}
//           </p>
//           <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
//           <div className="mt-2 flex items-center">
//             <span
//               className={`inline-flex items-center text-sm font-medium ${
//                 change >= 0 ? "text-green-600" : "text-red-600"
//               }`}>
//               {change >= 0 ? (
//                 <HiArrowNarrowUp className="h-4 w-4" />
//               ) : (
//                 <HiArrowNarrowDown className="h-4 w-4" />
//               )}
//               {Math.abs(change)}% from last month
//             </span>
//           </div>
//         </div>
//         <div className={`p-3 rounded-lg bg-${color}-100`}>
//           <Icon className={`h-6 w-6 text-${color}-600`} />
//         </div>
//       </div>
//     </div>
//   );

//   const SubscriberStats = () => {
//     const growthRate = stats.subscribers.growthRate.monthly;
//     const isGrowthPositive = growthRate > 0;
//     const growthDisplay =
//       growthRate === "Infinity"
//         ? "∞"
//         : `${Math.abs(parseFloat(growthRate)).toFixed(1)}%`;
//     return (
//       <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow ">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex-1">
//             <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
//               Newsletter Subscribers
//             </h3>
//             <p className="text-3xl font-semibold mt-2">
//               {stats.subscribers.total}
//             </p>
//           </div>
//           <div className="bg-blue-600 p-4 rounded-full shadow-lg">
//             <HiMail className="text-white text-xl" />
//           </div>
//         </div>
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
//               <div className="flex items-center gap-2 mb-1">
//                 <HiCalendar className="text-blue-500" />
//                 <span className="text-sm text-gray-600 dark:text-gray-300">
//                   This Week
//                 </span>
//               </div>
//               <p className="text-lg font-semibold">
//                 {stats.subscribers.weekly}
//               </p>
//             </div>
//             <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
//               <div className="flex items-center gap-2 mb-1">
//                 <HiTrendingUp className="text-blue-500" />
//                 <span className="text-sm text-gray-600 dark:text-gray-300">
//                   This Month
//                 </span>
//               </div>
//               <p className="text-lg font-semibold">
//                 {stats.subscribers.monthly}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
//             <span
//               className={`flex items-center gap-1 ${
//                 isGrowthPositive ? "text-green-500" : "text-red-500"
//               }`}>
//               {isGrowthPositive ? <HiArrowNarrowUp /> : <HiArrowNarrowDown />}
//               {growthDisplay}
//             </span>
//             <span className="text-gray-500">Monthly Growth</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const SubscriberChart = useMemo(() => {
//     const breakdownData =
//       (timeRange === "week"
//         ? stats.subscribers.weeklyBreakdown
//         : stats.subscribers.monthlyBreakdown) || [];

//     if (!breakdownData.length) {
//       return (
//         <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-slate-800 shadow-lg border border-gray-200 rounded-lg">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-gray-500 text-md uppercase">
//               Subscriber Growth
//             </h3>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setTimeRange("week")}
//                 className={`px-3 py-1 rounded-md text-sm ${
//                   timeRange === "week"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-600"
//                 }`}>
//                 Week
//               </button>
//               <button
//                 onClick={() => setTimeRange("month")}
//                 className={`px-3 py-1 rounded-md text-sm ${
//                   timeRange === "month"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-600"
//                 }`}>
//                 Month
//               </button>
//             </div>
//           </div>
//           <div className="h-[300px] flex items-center justify-center text-gray-500">
//             No data available for this period
//           </div>
//         </div>
//       );
//     }

//     const data = {
//       labels: breakdownData.map((item) => {
//         const date = new Date(item._id);
//         return timeRange === "week"
//           ? date.toLocaleDateString("en-US", {
//               weekday: "short",
//               month: "short",
//               day: "numeric",
//             })
//           : date.toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             });
//       }),
//       datasets: [
//         {
//           label: "New Subscribers",
//           data: breakdownData.map((item) => item.count),
//           fill: true,
//           backgroundColor: "rgba(59, 130, 246, 0.1)",
//           borderColor: "rgb(59, 130, 246)",
//           tension: 0.4,
//         },
//       ],
//     };

//     const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: false,
//         },
//         tooltip: {
//           mode: "index",
//           intersect: false,
//           callbacks: {
//             title: (tooltipItems) => {
//               const date = new Date(
//                 breakdownData[tooltipItems[0].dataIndex]._id
//               );
//               return date.toLocaleDateString("en-US", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               });
//             },
//           },
//         },
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           ticks: {
//             precision: 0,
//           },
//         },
//       },
//     };

//     return (
//       <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-slate-800 shadow-lg border border-gray-200 rounded-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-gray-500 text-md uppercase">Subscriber Growth</h3>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setTimeRange("week")}
//               className={`px-3 py-1 rounded-md text-sm ${
//                 timeRange === "week"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-600"
//               }`}>
//               Week
//             </button>
//             <button
//               onClick={() => setTimeRange("month")}
//               className={`px-3 py-1 rounded-md text-sm ${
//                 timeRange === "month"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-600"
//               }`}>
//               Month
//             </button>
//           </div>
//         </div>
//         <div className="h-[300px]">
//           <Line data={data} options={options} />
//         </div>
//       </div>
//     );
//   }, [
//     stats.subscribers.weeklyBreakdown,
//     stats.subscribers.monthlyBreakdown,
//     timeRange,
//   ]);

//   if (loading) return LoadingSpinner;

//   return (
//     <div className="p-4 max-w-[1600px] mx-auto mid:mt-20">
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
//         <StatCard
//           title="Total Users"
//           stats={stats.users}
//           icon={HiUser}
//           bgColor="bg-teal-600"
//         />
//         <StatCard
//           title="Total Comments"
//           stats={stats.comments}
//           icon={HiAnnotation}
//           bgColor="bg-indigo-600"
//         />
//         <StatCard
//           title="Total Blog_Posts"
//           stats={stats.posts}
//           icon={HiDocumentText}
//           bgColor="bg-lime-600"
//         />
//         <StatCard
//           title="Total Solution_Posts"
//           stats={stats.solutions}
//           icon={HiLightBulb}
//           bgColor="bg-amber-600"
//         />
//       </div> */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           title="Total Users"
//           value={stats.users.total}
//           change={stats.users.lastMonth}
//           icon={HiUser}
//           color="teal"
//         />
//         <StatCard
//           title="Total Comments"
//           value={stats.comments.total}
//           change={stats.comments.lastMonth}
//           icon={HiAnnotation}
//           color="indigo"
//         />
//         <StatCard
//           title="Blog Posts"
//           value={stats.posts.total}
//           change={stats.posts.lastMonth}
//           icon={HiDocumentText}
//           color="lime"
//         />
//         <StatCard
//           title="Solution Posts"
//           value={stats.solutions.total}
//           change={stats.solutions.lastMonth}
//           icon={HiLightBulb}
//           color="amber"
//         />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
//         <SubscriberStats />
//         <div className="lg:col-span-2">{SubscriberChart}</div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiDocumentText,
  HiArrowNarrowUp,
  HiLightBulb,
  HiMail,
  HiUser,
  HiArrowNarrowDown,
  HiTrendingUp,
  HiCalendar,
} from "react-icons/hi";
import { Line } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const backendURL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:3001";

  const [stats, setStats] = useState({
    users: {
      total: 0,
      lastMonth: 0,
      data: [],
      weeklyBreakdown: [],
      monthlyBreakdown: [],
    },
    comments: {
      total: 0,
      lastMonth: 0,
      data: [],
      weeklyBreakdown: [],
      monthlyBreakdown: [],
    },
    posts: {
      total: 0,
      lastMonth: 0,
      data: [],
      weeklyBreakdown: [],
      monthlyBreakdown: [],
    },
    solutions: {
      total: 0,
      lastMonth: 0,
      data: [],
      weeklyBreakdown: [],
      monthlyBreakdown: [],
    },
    subscribers: {
      total: 0,
      weekly: 0,
      monthly: 0,
      prevMonth: 0,
      weeklyBreakdown: [],
      monthlyBreakdown: [],
      growthRate: { monthly: 0 },
    },
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const { userInfo } = useSelector((state) => state.auth);

  const fetchData = useCallback(
    async (endpoint) => {
      try {
        const res = await fetch(`${backendURL}/api/${endpoint}`);
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
        return await res.json();
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
      }
    },
    [backendURL]
  );

  const fetchAllStats = useCallback(async () => {
    setLoading(true);
    const endpoints = {
      users: "getUsers",
      comments: "getComments?limit=5",
      posts: "getPosts?limit=5",
      solutions: "getAllSolutions?pageSize=6",
      subscribers: "getNewsletterSubscribers",
    };

    const results = await Promise.all(
      Object.entries(endpoints).map(async ([key, endpoint]) => {
        const data = await fetchData(endpoint);
        return [key, data];
      })
    );

    setStats((prevStats) => {
      const newStats = { ...prevStats };
      results.forEach(([key, data]) => {
        if (data) {
          if (key === "subscribers" && data.success) {
            newStats.subscribers = {
              total: data.data.totalSubscribers || 0,
              weekly: data.data.weeklySubscribers || 0,
              monthly: data.data.monthlySubscribers || 0,
              prevMonth: data.data.prevMonthSubscribers || 0,
              weeklyBreakdown: data.data.weeklyBreakdown || [],
              monthlyBreakdown: data.data.monthlyBreakdown || [],
              growthRate: data.data.growthRate || { monthly: 0 },
            };
          } else if (key === "users" && data.success) {
            newStats.users = {
              total: data.data.totalUsers || 0,
              lastMonth: data.data.lastMonthUsers || 0,
              data: data.data.users || [],
              weeklyBreakdown: data.data.weeklyBreakdown || [],
              monthlyBreakdown: data.data.monthlyBreakdown || [],
            };
          } else if (key === "comments") {
            newStats.comments = {
              total: data.totalComments || 0,
              lastMonth: data.lastMonthComments || 0,
              data: data.comments || [],
              weeklyBreakdown: data.weeklyBreakdown || [],
              monthlyBreakdown: data.monthlyBreakdown || [],
            };
          } else if (key === "posts") {
            newStats.posts = {
              total: data.totalPosts || 0,
              lastMonth: data.lastMonthPosts || 0,
              data: data.posts || [],
              weeklyBreakdown: data.weeklyBreakdown || [],
              monthlyBreakdown: data.monthlyBreakdown || [],
            };
          } else if (key === "solutions") {
            newStats.solutions = {
              total: data.pagination?.totalCount || 0,
              lastMonth: data.lastMonthSolutions || 0,
              data: data.solutions || [],
              weeklyBreakdown: data.weeklyBreakdown || [],
              monthlyBreakdown: data.monthlyBreakdown || [],
            };
          }
        }
      });
      return newStats;
    });
    setLoading(false);
  }, [fetchData]);

  useEffect(() => {
    if (userInfo) {
      fetchAllStats();
    }
  }, [userInfo, fetchAllStats]);

  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <CircularProgress size={40} className="text-blue-600" />
      </div>
    ),
    []
  );

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          <div className="mt-2 flex items-center">
            <span
              className={`inline-flex items-center text-sm font-medium ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}>
              {change >= 0 ? (
                <HiArrowNarrowUp className="h-4 w-4" />
              ) : (
                <HiArrowNarrowDown className="h-4 w-4" />
              )}
              {Math.abs(change)}% from last month
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const SubscriberStats = () => {
    const growthRate = stats.subscribers.growthRate.monthly;
    const isGrowthPositive = growthRate > 0;
    const growthDisplay =
      growthRate === "Infinity"
        ? "∞"
        : `${Math.abs(parseFloat(growthRate)).toFixed(1)}%`;
    return (
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
              Newsletter Subscribers
            </h3>
            <p className="text-3xl font-semibold mt-2">
              {stats.subscribers.total}
            </p>
          </div>
          <div className="bg-blue-600 p-4 rounded-full shadow-lg">
            <HiMail className="text-white text-xl" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <HiCalendar className="text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  This Week
                </span>
              </div>
              <p className="text-lg font-semibold">
                {stats.subscribers.weekly}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <HiTrendingUp className="text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  This Month
                </span>
              </div>
              <p className="text-lg font-semibold">
                {stats.subscribers.monthly}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
            <span
              className={`flex items-center gap-1 ${
                isGrowthPositive ? "text-green-500" : "text-red-500"
              }`}>
              {isGrowthPositive ? <HiArrowNarrowUp /> : <HiArrowNarrowDown />}
              {growthDisplay}
            </span>
            <span className="text-gray-500">Monthly Growth</span>
          </div>
        </div>
      </div>
    );
  };

  const GrowthChart = ({ title, breakdownData, color }) => {
    if (!breakdownData.length) {
      return (
        <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-slate-800 shadow-lg border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 text-md uppercase">{title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeRange === "week"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                Week
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-3 py-1 rounded-md text-sm ${
                  timeRange === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                Month
              </button>
            </div>
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No data available for this period
          </div>
        </div>
      );
    }

    const data = {
      labels: breakdownData.map((item) => {
        const date = new Date(item._id);
        return timeRange === "week"
          ? date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })
          : date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
      }),
      datasets: [
        {
          label: title,
          data: breakdownData.map((item) => item.count),
          fill: true,
          backgroundColor: `rgba(${color}, 0.1)`,
          borderColor: `rgb(${color})`,
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            title: (tooltipItems) => {
              const date = new Date(
                breakdownData[tooltipItems[0].dataIndex]._id
              );
              return date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            },
          },
        },
      },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
      },
    };

    return (
      <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-slate-800 shadow-lg border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-500 text-md uppercase">{title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}>
              Week
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}>
              Month
            </button>
          </div>
        </div>
        <div className="h-[300px]">
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };

  if (loading) return LoadingSpinner;

  return (
    <div className="p-4 max-w-[1600px] mx-auto mid:mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.users.total}
          change={stats.users.lastMonth}
          icon={HiUser}
          color="teal"
        />
        <StatCard
          title="Total Comments"
          value={stats.comments.total}
          change={stats.comments.lastMonth}
          icon={HiAnnotation}
          color="indigo"
        />
        <StatCard
          title="Blog Posts"
          value={stats.posts.total}
          change={stats.posts.lastMonth}
          icon={HiDocumentText}
          color="lime"
        />
        <StatCard
          title="Solution Posts"
          value={stats.solutions.total}
          change={stats.solutions.lastMonth}
          icon={HiLightBulb}
          color="amber"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <SubscriberStats />
        <div className="lg:col-span-2">
          <GrowthChart
            title="Subscriber Growth"
            breakdownData={
              timeRange === "week"
                ? stats.subscribers.weeklyBreakdown
                : stats.subscribers.monthlyBreakdown
            }
            color="59, 130, 246"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <GrowthChart
          title="User Growth"
          breakdownData={
            timeRange === "week"
              ? stats.users.weeklyBreakdown
              : stats.users.monthlyBreakdown
          }
          color="45, 212, 191"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
