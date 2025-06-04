import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  Mail,
  MessageSquare,
  User,
  Send,
  Phone,
  HelpCircle,
} from "lucide-react";
import { Snackbar, Alert } from "@mui/material";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      message: "",
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const templateParams = {
        to_name: "Credulen",
        from_name: formData.fullName,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(
        "service_mfruavt",
        "template_cst1uc9",
        templateParams,
        "9Tp4XEvOsWGi69ktz"
      );
      setSnackbar({
        open: true,
        message: "Message sent successfully! 📧",
        severity: "success",
      });
      resetForm();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      href: "mailto:contact@example.com",
      label: "Email us",
    },
    {
      icon: Phone,
      href: "tel:+1234567890",
      label: "Call us",
    },
    {
      icon: MessageSquare,
      href: "https://wa.me/1234567890",
      label: "Chat with us",
    },
  ];

  const InputField = ({ icon: Icon, id, type = "text", ...props }) => (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {props.placeholder}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-hover:text-btColour">
          <Icon className="h-5 w-5 text-gray-400 group-hover:text-btColour transition-colors duration-200" />
        </div>
        <input
          id={id}
          type={type}
          value={formData[id]}
          onChange={handleChange}
          className="appearance-none block w-full h-[50px] px-4 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm hover:border-btColour transition-all duration-200"
          required
          {...props}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className=" max-w-xl mid:px-8 mid:mx-6 w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <HelpCircle className="h-12 w-12 text-btColour animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Have any Questions?
          </h2>
          <p className="text-gray-600 text-lg">
            Get in touch with us and we'll help you out
          </p>
          <div className="flex justify-center space-x-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.href}
                  className="group relative"
                  target="_blank"
                  rel="noopener noreferrer">
                  <Icon className="h-6 w-6 text-gray-500 hover:text-btColour transition-colors duration-200 transform hover:scale-110" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-gray-500">
                    {method.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <form className="mt-12 space-y-6" onSubmit={sendEmail}>
          <div className="space-y-6">
            <InputField
              icon={User}
              id="fullName"
              placeholder="What's your full name?"
            />
            <InputField
              icon={Mail}
              id="email"
              type="email"
              placeholder="Your email address?"
            />
            <div className="w-full">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <div className="relative group">
                <div className="absolute top-4 left-4 pointer-events-none transition-colors duration-200 group-hover:text-btColour">
                  <MessageSquare className="h-5 w-5 text-gray-400 group-hover:text-btColour transition-colors duration-200" />
                </div>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="appearance-none block w-full h-[120px] px-4 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm hover:border-btColour transition-all duration-200"
                  placeholder="Type your question or request!"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1e293b]  hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btColour transition-all duration-300 ease-in-out disabled:opacity-70 transform hover:scale-[1.02]">
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>
        </form>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactUs;
