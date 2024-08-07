import React from "react";
import { BigBlogCards, SmallBlogCards } from "../components/Cards";
import { Categories, LatestPosts } from "../components/GroupListItems";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Blog = () => {
  return (
    <div className="md:mt-48 mt-36 md:px-[5rem] px-4">
      <Search />

      <div className="md:flex gap-12 my-5">
        <div className="md:w-[70%]">
          <BigBlogCards />

          {/* small card 1 */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 my-10">
            <SmallBlogCards />
            <SmallBlogCards />
            <SmallBlogCards />

            <SmallBlogCards />
            <SmallBlogCards />
            <SmallBlogCards />
          </div>

          <Pagination />
        </div>

        <div className="md:w-[30%]">
          <div className="mb-10">
            <Categories />
          </div>

          <div>
            <LatestPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
