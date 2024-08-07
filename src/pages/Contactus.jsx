import React from "react";
import { ContactUsForm } from "../components/Forms";

const ContactUs = () => {
  return (
    <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 md:mx-[30rem] mx-[1rem] rounded-xl">
      <h2 className="mb-10 flex justify-center">
        Have any Questions? Contact Us
      </h2>
      <ContactUsForm />
    </div>
  );
};

export default ContactUs;
