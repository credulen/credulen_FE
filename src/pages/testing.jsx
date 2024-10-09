import React from "react";
import { SmallBlogCards } from "../components/Cards";

const Solutions = () => {
  return (
    <div className="md:mt-32 mt-36 md:px-[5rem] px-4">
      <div className="pb-12">
        <h1 className="text-2xl font-semibold">Solutions</h1>
        <p className="mt-3">
          Credulen offers specialized training and consulting services designed
          to equip you with the skills and strategies needed to excel in a
          technology-driven world.
        </p>
      </div>

      <div className="pb-12">
        <h2 className="text-xl font-medium">Training School</h2>
        <p className="mb-10">
          Data Science & Engineering for Professionals: "Our comprehensive
          training programs provide professionals with the skills needed to
          excel in data science and engineering. Learn from industry experts and
          gain practical experience through hands-on projects. " Using
          Generative AI to Supercharge Productivity: "Discover how to leverage
          Generative AI to enhance your productivity as an individual or
          organization. Our training covers the latest AI tools and techniques
          to help you stay ahead of the curve.
        </p>
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
        <h2 className="text-xl font-medium">Consulting Services</h2>
        <p className="mb-10">
          Data, Blockchain & AI Integration and Strategy: "We offer expert
          consulting to help organizations integrate data, blockchain, and AI
          technologies seamlessly. Our strategic guidance ensures that your
          technology investments drive maximum value creation and business
          growth.
        </p>
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

export default Solutions;
