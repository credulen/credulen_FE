 import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import NoResult from "../assets/noResult.png";
import Pagination from "./Pagination"; // Import the new Pagination component

const backendURL = import.meta.env.VITE_BACKEND_URL;

// ... (FilterSection and NoResultsMessage components remain the same)

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9); // Adjust this value as needed

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${backendURL}/api/getPosts`);
      const data = await response.json();
      console.log(data);
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const categories = [...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    // ... (filtering logic remains the same)
  });

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ... (stripHtmlTags and trimContent functions remain the same)

  return (
    <section className="mt-24">
      <Box sx={{ padding: 3 }}>
        {/* ... (search input and filters remain the same) */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            {currentPosts.length > 0 ? (
              <Grid container spacing={3}>
                {currentPosts.map((post) => (
                  // ... (post card rendering remains the same)
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
            <FilterSection
              categories={categories}
              onCategoryChange={setSelectedCategory}
              onTimeFilterChange={setTimeFilter}
            />
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default BlogList;