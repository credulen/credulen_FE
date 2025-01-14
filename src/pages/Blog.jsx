// import React from "react";
// import { BigBlogCards, SmallBlogCards } from "../components/Cards";
// import { Categories, LatestPosts } from "../components/GroupListItems";
// import Search from "../components/Search";
// import Pagination from "../components/Pagination";

// const Blog = () => {
//   return (
//     <div className="md:mt-48 mt-36 md:px-[5rem] px-4">
//       <Search />

//       <div className="md:flex gap-12 my-5">
//         <div className="md:w-[70%]">
//           <BigBlogCards />

//           {/* small card 1 */}
//           <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 my-10">
//             <SmallBlogCards />
//             <SmallBlogCards />
//             <SmallBlogCards />

//             <SmallBlogCards />
//             <SmallBlogCards />
//             <SmallBlogCards />
//           </div>

//           <Pagination />
//         </div>

//         <div className="md:w-[30%]">
//           <div className="mb-10">
//             <Categories />
//           </div>

//           <div>
//             <LatestPosts />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   TextField,
//   Avatar,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   CircularProgress,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { TextInput } from "flowbite-react";
// import { HiOutlineSearch } from "react-icons/hi";
// import NoResult from "../assets/noResult.png";
// import Pagination from "../components/Pagination";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const stripHtmlTags = (content) => content.replace(/<[^>]*>/g, "");

// const trimContent = (content, length = 100) => {
//   const strippedContent = stripHtmlTags(content);
//   return strippedContent.length > length
//     ? strippedContent.substring(0, length) + "..."
//     : strippedContent;
// };

// const FilterSection = React.memo(
//   ({ categories, onCategoryChange, onTimeFilterChange }) => {
//     return (
//       <Box
//         sx={{
//           p: 0,
//           borderRadius: 2,
//           width: "100%",
//           maxWidth: { md: "300px" },
//           zIndex: { md: 1000 },
//         }}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={12}>
//             <FormControl fullWidth size="small">
//               <InputLabel id="category-select-label">Category</InputLabel>
//               <Select
//                 labelId="category-select-label"
//                 id="category-select"
//                 label="Category"
//                 onChange={(e) => onCategoryChange(e.target.value)}
//                 defaultValue=""
//               >
//                 <MenuItem value="">All Categories</MenuItem>
//                 {categories.map((category) => (
//                   <MenuItem key={category} value={category}>
//                     {category}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6} md={12}>
//             <FormControl fullWidth size="small">
//               <InputLabel id="time-filter-label">Time Filter</InputLabel>
//               <Select
//                 labelId="time-filter-label"
//                 id="time-filter"
//                 label="Time Filter"
//                 onChange={(e) => onTimeFilterChange(e.target.value)}
//                 defaultValue="all"
//               >
//                 <MenuItem value="all">All Time</MenuItem>
//                 <MenuItem value="today">Today</MenuItem>
//                 <MenuItem value="thisWeek">This Week</MenuItem>
//                 <MenuItem value="thisMonth">This Month</MenuItem>
//                 <MenuItem value="thisYear">This Year</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Box>
//     );
//   }
// );

// const NoResultsMessage = React.memo(() => (
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       width: "70%",
//       height: "100vh",
//       margin: "0 auto",
//     }}
//   >
//     <img
//       src={NoResult}
//       alt="No results found"
//       style={{ marginBottom: "1rem" }}
//       loading="lazy"
//     />
//   </Box>
// ));

// const LoadingSpinner = React.memo(() => (
//   <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//     <CircularProgress size={40} className="text-btColour" />
//   </div>
// ));

// // Fixed BlogPost component with proper hook usage
// const BlogPost = React.memo(({ post }) => {
//   const navigate = useNavigate(); // Hook is now inside the component

//   const handleClick = () => {
//     navigate(`/post/${post.slug}`);
//   };

//   return (
//     <Grid item xs={12} sm={6} lg={4}>
//       <Card
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <CardMedia
//           component="img"
//           sx={{
//             width: "100%",
//             height: 250,
//             objectFit: "cover",
//           }}
//           image={`${backendURL}${post.image}`}
//           alt={post.title}
//           loading="lazy"
//         />
//         <CardContent sx={{ flexGrow: 1, p: 1 }}>
//           <Typography
//             gutterBottom
//             variant="h5"
//             fontSize="24px"
//             component="div"
//             fontWeight="600"
//             color="#201F1F"
//             className="transition-all duration-300 hover:text-btColour cursor-pointer"
//             onClick={handleClick}
//           >
//             {trimContent(post.title, 40)}
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{
//               color: "#201F1F",
//               fontSize: "14px",
//               lineHeight: 1.5,
//             }}
//           >
//             {trimContent(post.content, 100)}
//           </Typography>
//         </CardContent>
//         <Box sx={{ p: 1 }}>
//           <Link
//             to={`/post/${post.slug}`}
//             className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-btColour rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:text-btColour hover:bg-white hover:border-btColour hover:border-2 hover:font-semibold"
//           >
//             Read more
//             <svg
//               className="w-3.5 h-3.5 ms-2"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 5h12m0 0L9 1m4 4L9 9"
//               />
//             </svg>
//           </Link>
//         </Box>
//       </Card>
//     </Grid>
//   );
// });

// const BlogList = () => {
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(6);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${backendURL}/api/getPosts`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch posts");
//       }
//       const data = await response.json();
//       setPosts(data.posts || []);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const categories = useMemo(
//     () => [...new Set(posts.map((post) => post.category))],
//     [posts]
//   );

//   const filteredPosts = useMemo(() => {
//     return posts.filter((post) => {
//       const matchesSearch = post.title
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory === "" || post.category === selectedCategory;

//       let matchesTimeFilter = true;
//       const postDate = moment(post.createdAt);
//       const now = moment();

//       switch (timeFilter) {
//         case "today":
//           matchesTimeFilter = postDate.isSame(now, "day");
//           break;
//         case "thisWeek":
//           matchesTimeFilter = postDate.isSame(now, "week");
//           break;
//         case "thisMonth":
//           matchesTimeFilter = postDate.isSame(now, "month");
//           break;
//         case "thisYear":
//           matchesTimeFilter = postDate.isSame(now, "year");
//           break;
//         default:
//           matchesTimeFilter = true;
//       }

//       return matchesSearch && matchesCategory && matchesTimeFilter;
//     });
//   }, [posts, searchTerm, selectedCategory, timeFilter]);

//   const currentPosts = useMemo(() => {
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
//   }, [filteredPosts, currentPage, postsPerPage]);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <section className="mt-24">
//       <Box sx={{ padding: 3 }}>
//         <div className="mb-4 ml-[-2.6rem]">
//           <TextInput
//             id="search"
//             type="text"
//             icon={HiOutlineSearch}
//             placeholder="Search post"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="placeholder-gray-700 placeholder:text-base placeholder:m-10 md:w-[20rem] rounded-md pl-10"
//           />
//         </div>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={9}>
//             {currentPosts.length > 0 ? (
//               <Grid container spacing={3}>
//                 {currentPosts.map((post) => (
//                   <BlogPost key={post._id} post={post} />
//                 ))}
//               </Grid>
//             ) : (
//               <NoResultsMessage />
//             )}

//             <Pagination
//               currentPage={currentPage}
//               totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
//               onPageChange={paginate}
//             />
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             md={3}
//             sx={{ display: { xs: "none", md: "block" } }}
//           >
//             <FilterSection
//               categories={categories}
//               onCategoryChange={setSelectedCategory}
//               onTimeFilterChange={setTimeFilter}
//             />
//           </Grid>
//         </Grid>
//       </Box>
//     </section>
//   );
// };

// export default BlogList;

// const SidebarSection = ({ title, items, onItemClick, activeItem }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-white bg-[#2B4B5E] p-4 text-lg font-semibold mb-0 rounded-t-lg">
//         {title}
//       </h2>
//       <div className="border border-t-0 border-[#2B4B5E] rounded-b-lg overflow-hidden">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => onItemClick?.(item)}
//             className={`p-4 cursor-pointer transition-all duration-300 border-b border-[#2B4B5E] last:border-b-0
//               ${
//                 activeItem === item
//                   ? "bg-[#2B4B5E] text-white"
//                   : "hover:bg-[#2B4B5E] hover:text-white"
//               }
//             `}
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export const BlogSidebar = ({
//   posts,
//   categories,
//   onCategoryChange,
//   selectedCategory,
// }) => {
//   // Get last 5 recent posts
//   const recentPosts = posts
//     .slice()
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5)
//     .map((post) => post.title);

//   return (
//     <div className="w-full">
//       <SidebarSection title="Recent Posts" items={recentPosts} />
//       <SidebarSection
//         title="Categories"
//         items={categories}
//         onItemClick={onCategoryChange}
//         activeItem={selectedCategory}
//       />
//     </div>
//   );
// };

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { TextInput } from "flowbite-react";
// import { HiOutlineSearch } from "react-icons/hi";
// import NoResult from "../assets/noResult.png";
// import Pagination from "../components/Pagination";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const stripHtmlTags = (content) => content.replace(/<[^>]*>/g, "");

// const trimContent = (content, length = 100) => {
//   const strippedContent = stripHtmlTags(content);
//   return strippedContent.length > length
//     ? strippedContent.substring(0, length) + "..."
//     : strippedContent;
// };

// // const BlogSidebar = ({
// //   posts,
// //   categories,
// //   onCategoryChange,
// //   selectedCategory,
// // }) => {
// //   // Get last 5 recent posts
// //   const recentPosts = posts
// //     .slice()
// //     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
// //     .slice(0, 5)
// //     .map((post) => post.title);

// //   return (
// //     <div className="w-full">
// //       <SidebarSection title="Recent Posts" items={recentPosts} />
// //       <SidebarSection
// //         title="Categories"
// //         items={categories}
// //         onItemClick={onCategoryChange}
// //         activeItem={selectedCategory}
// //       />
// //     </div>
// //   );
// // };

// const SidebarSection = ({
//   title,
//   items,
//   onItemClick,
//   activeItem,
//   isPostSection = false,
// }) => {
//   const navigate = useNavigate();

//   const handleClick = (item) => {
//     if (isPostSection) {
//       // Find the post slug by matching the title
//       const post = items.find((post) => post.title === item);
//       if (post) {
//         navigate(`/post/${post.slug}`);
//       }
//     } else {
//       onItemClick?.(item);
//     }
//   };

//   return (
//     <div className="mb-8">
//       <h2 className="text-white bg-[#2B4B5E] p-4 text-lg font-semibold mb-0 rounded-t-lg">
//         {title}
//       </h2>
//       <div className="border border-t-0 border-[#2B4B5E] rounded-b-lg overflow-hidden">
//         {isPostSection
//           ? items.map((post, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleClick(post.title)}
//                 className="px-4 py-2 cursor-pointer transition-all duration-300 border-b border-[#2B4B5E] last:border-b-0 hover:bg-[#2B4B5E] hover:text-white"
//               >
//                 {post.title}
//               </div>
//             ))
//           : items.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleClick(item)}
//                 className={`px-4 py-2 cursor-pointer transition-all duration-300 border-b border-[#2B4B5E] last:border-b-0
//                   ${
//                     activeItem === item
//                       ? "bg-[#2B4B5E] text-white"
//                       : "hover:bg-[#2B4B5E] hover:text-white"
//                   }
//                 `}
//               >
//                 {item}
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// const BlogSidebar = ({
//   posts,
//   categories,
//   onCategoryChange,
//   selectedCategory,
// }) => {
//   // Get last 5 recent posts with their slugs
//   const recentPosts = posts
//     .slice()
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 5)
//     .map((post) => ({
//       title: post.title,
//       slug: post.slug,
//     }));

//   return (
//     <div className="w-full">
//       <SidebarSection
//         title="Recent Posts"
//         items={recentPosts}
//         isPostSection={true}
//       />
//       <SidebarSection
//         title="Categories"
//         items={categories}
//         onItemClick={onCategoryChange}
//         activeItem={selectedCategory}
//         isPostSection={false}
//       />
//     </div>
//   );
// };

// const NoResultsMessage = React.memo(() => (
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       width: "70%",
//       height: "100vh",
//       margin: "0 auto",
//     }}
//   >
//     <img
//       src={NoResult}
//       alt="No results found"
//       style={{ marginBottom: "1rem" }}
//       loading="lazy"
//     />
//   </Box>
// ));

// const LoadingSpinner = React.memo(() => (
// <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//   <CircularProgress size={40} className="text-btColour" />
// </div>
// ));

// const BlogPost = React.memo(({ post }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/post/${post.slug}`);
//   };

//   return (
//     <Grid item xs={12} sm={6} lg={4}>
//       <Card
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <CardMedia
//           component="img"
//           sx={{
//             width: "100%",
//             height: 250,
//             objectFit: "cover",
//           }}
//           image={`${backendURL}${post.image}`}
//           alt={post.title}
//           loading="lazy"
//         />
//         <CardContent sx={{ flexGrow: 1, p: 1 }}>
//           <Typography
//             gutterBottom
//             variant="h5"
//             fontSize="24px"
//             component="div"
//             fontWeight="600"
//             color="#201F1F"
//             className="transition-all duration-300 hover:text-btColour cursor-pointer"
//             onClick={handleClick}
//           >
//             {trimContent(post.title, 40)}
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{
//               color: "#201F1F",
//               fontSize: "14px",
//               lineHeight: 1.5,
//             }}
//           >
//             {trimContent(post.content, 100)}
//           </Typography>
//         </CardContent>
//         <Box sx={{ p: 1 }}>
//           <Link
//             to={`/post/${post.slug}`}
//             className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-btColour rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:text-btColour hover:bg-white hover:border-btColour hover:border-2 hover:font-semibold"
//           >
//             Read more
//             <svg
//               className="w-3.5 h-3.5 ms-2"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 5h12m0 0L9 1m4 4L9 9"
//               />
//             </svg>
//           </Link>
//         </Box>
//       </Card>
//     </Grid>
//   );
// });

// const BlogList = () => {
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(6);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${backendURL}/api/getPosts`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch posts");
//       }
//       const data = await response.json();
//       setPosts(data.posts || []);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const categories = useMemo(
//     () => [...new Set(posts.map((post) => post.category))],
//     [posts]
//   );

//   const filteredPosts = useMemo(() => {
//     return posts.filter((post) => {
//       const matchesSearch = post.title
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory === "" || post.category === selectedCategory;

//       return matchesSearch && matchesCategory;
//     });
//   }, [posts, searchTerm, selectedCategory]);

//   const currentPosts = useMemo(() => {
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
//   }, [filteredPosts, currentPage, postsPerPage]);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category === selectedCategory ? "" : category);
//     setCurrentPage(1);
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <section className="mt-24">
//       <Box sx={{ padding: 3 }}>
//         <div className="mb-4 ml-[-2.6rem]">
//           <TextInput
//             id="search"
//             type="text"
//             icon={HiOutlineSearch}
//             placeholder="Search post"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="placeholder-gray-700 placeholder:text-base placeholder:m-10 md:w-[20rem] rounded-md pl-10"
//           />
//         </div>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={9}>
//             {currentPosts.length > 0 ? (
//               <Grid container spacing={3}>
//                 {currentPosts.map((post) => (
//                   <BlogPost key={post._id} post={post} />
//                 ))}
//               </Grid>
//             ) : (
//               <NoResultsMessage />
//             )}

//             <Pagination
//               currentPage={currentPage}
//               totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
//               onPageChange={paginate}
//             />
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             md={3}
//             sx={{ display: { xs: "none", md: "block" } }}
//           >
//             <BlogSidebar
//               posts={posts}
//               categories={categories}
//               onCategoryChange={handleCategoryChange}
//               selectedCategory={selectedCategory}
//             />
//           </Grid>
//         </Grid>
//       </Box>
//     </section>
//   );
// };

// export default BlogList;

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import moment from "moment";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import NoResult from "../assets/noResult.png";
import Pagination from "../components/Pagination";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const stripHtmlTags = (content) => content.replace(/<[^>]*>/g, "");

const trimContent = (content, length = 100) => {
  const strippedContent = stripHtmlTags(content);
  return strippedContent.length > length
    ? strippedContent.substring(0, length) + "..."
    : strippedContent;
};

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SidebarSection = ({
  title,
  items,
  onItemClick,
  activeItem,
  isPostSection = false,
}) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (isPostSection) {
      // Find the post slug by matching the title
      const post = items.find((post) => post.title === item);
      if (post) {
        navigate(`/post/${post.slug}`);
      }
    } else {
      onItemClick?.(item);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-white bg-[#2B4B5E] p-4 text-lg font-semibold mb-0 rounded-t-lg">
        {title}
      </h2>
      <div className="border border-t-0 border-[#2B4B5E] rounded-b-lg overflow-hidden">
        {isPostSection
          ? items.map((post, index) => (
              <div
                key={index}
                onClick={() => handleClick(post.title)}
                className="px-4 py-2 cursor-pointer transition-all duration-300 border-b border-[#2B4B5E] last:border-b-0 hover:bg-[#2B4B5E] hover:text-white"
              >
                {post.title}
              </div>
            ))
          : items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item)}
                className={`px-4 py-2 cursor-pointer transition-all duration-300 border-b border-[#2B4B5E] last:border-b-0
                  ${
                    activeItem === item
                      ? "bg-[#2B4B5E] text-white"
                      : "hover:bg-[#2B4B5E] hover:text-white"
                  }
                `}
              >
                {item}
              </div>
            ))}
      </div>
    </div>
  );
};

const NoResultsMessage = React.memo(() => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "70%",
      height: "100vh",
      margin: "0 auto",
    }}
  >
    <img
      src={NoResult}
      alt="No results found"
      style={{ marginBottom: "1rem" }}
      loading="lazy"
    />
  </Box>
));

const LoadingSpinner = React.memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <CircularProgress size={40} className="text-btColour" />
  </div>
));

const BlogPost = React.memo(({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.slug}`);
  };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: 250,
            objectFit: "cover",
          }}
          image={`${post.image}`}
          alt={post.title}
          loading="lazy"
        />

        <CardContent sx={{ flexGrow: 1, p: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            fontSize="24px"
            component="div"
            fontWeight="600"
            color="#201F1F"
            className="transition-all duration-300 hover:text-btColour cursor-pointer"
            onClick={handleClick}
          >
            {trimContent(post.title, 40)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#201F1F",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            {trimContent(post.content, 100)}
          </Typography>
        </CardContent>
        <Box sx={{ p: 1 }}>
          <Link
            to={`/post/${post.slug}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-btColour rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:text-btColour hover:bg-white hover:border-btColour hover:border-2 hover:font-semibold"
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
        </Box>
      </Card>
    </Grid>
  );
});

const BlogSidebar = React.memo(
  ({ posts, categories, onCategoryChange, selectedCategory }) => {
    // Get last 5 recent posts with their slugs
    const recentPosts = posts
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((post) => ({
        title: post.title,
        slug: post.slug,
      }));

    return (
      <div className="w-full">
        <SidebarSection
          title="Recent Posts"
          items={recentPosts}
          isPostSection={true}
        />
        <SidebarSection
          title="Categories"
          items={categories}
          onItemClick={onCategoryChange}
          activeItem={selectedCategory}
          isPostSection={false}
        />
      </div>
    );
  }
);

const BlogList = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const categoryFromQuery = query.get("category");
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromQuery || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/getPosts`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, debouncedSearchTerm, selectedCategory]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage, postsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-lg text-red-600">{error}</div>;
  }

  return (
    <section className="mt-24">
      <Box sx={{ padding: 3 }}>
        <div className="mb-4 ml-[-2.6rem]">
          <TextInput
            id="search"
            type="text"
            icon={HiOutlineSearch}
            placeholder="Search post"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="placeholder-gray-700 placeholder:text-base placeholder:m-10 md:w-[20rem] rounded-md pl-10"
          />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            {currentPosts.length > 0 ? (
              <Grid container spacing={3}>
                {currentPosts.map((post) => (
                  <BlogPost key={post._id} post={post} />
                ))}
              </Grid>
            ) : (
              <NoResultsMessage />
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
              onPageChange={paginate}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <BlogSidebar
              posts={posts}
              categories={categories}
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default BlogList;
