import React from "react";
import { SmallBlogCards } from "../components/Cards";

const Webinars = () => {
  return (
    <div className="md:mt-32 mt-36 md:px-[5rem] px-4">
      <div className="pb-20">
        <h1 className="text-3xl font-semibold">Credulen Webinars</h1>
        <p className="mt-3">
          Elevate your expertise with Credulen Webinars! Empowering c-suite
          leaders, senior managers, developers, and tech enthusiasts with
          cutting-edge insights, news, and education on Big Data, AI, and
          Blockchain. Stay ahead of the curve – join us on the innovation
          journey!
        </p>
      </div>

      <div className="pb-20">
        <h2 className="text-2xl font-medium">Upcoming Webinars</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-12 my-5">
          <SmallBlogCards />
          <SmallBlogCards />
          <SmallBlogCards />

          <SmallBlogCards />
          <SmallBlogCards />
          <SmallBlogCards />
        </div>
      </div>

      <div className="">
        <h2 className="text-2xl font-medium">On Demand Webinars</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-12 my-5">
          <SmallBlogCards />
          <SmallBlogCards />
          <SmallBlogCards />

          <SmallBlogCards />
          <SmallBlogCards />
          <SmallBlogCards />
        </div>
      </div>
    </div>
  );
};

export default Webinars;
