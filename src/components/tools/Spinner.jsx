import React, { useState, useEffect } from "react";

export default function Spinner() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Credulen";

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;

    const typewriter = setInterval(
      () => {
        if (!isDeleting) {
          // Typing phase
          if (currentIndex < fullText.length) {
            setText(fullText.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            // Wait a bit before starting to delete
            setTimeout(() => {
              isDeleting = true;
            }, 2000);
          }
        } else {
          // Deleting phase
          if (currentIndex > 0) {
            setText(fullText.slice(0, currentIndex - 1));
            currentIndex--;
          } else {
            isDeleting = false;
          }
        }
      },
      isDeleting ? 100 : 200
    );

    return () => clearInterval(typewriter);
  }, []);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorBlink);
  }, []);

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-neutral-50">
    //   <div className="text-center">
    //     {/* Typewriter Text */}
    //     <div className="text-2xl md:text-3xl font-bold text-primary-500 tracking-wider relative">
    //       {text}
    //       <span
    //         className={`inline-block w-1 h-12 ml-1 bg-primary-500 transition-opacity duration-100 ${
    //           showCursor ? "opacity-100" : "opacity-0"
    //         }`}></span>
    //     </div>

    //     {/* Loading message */}
    //     <p className="mt-6 text-neutral-500 text-sm">
    //       Loading your requesated page...
    //     </p>
    //   </div>
    // </div>

    // <div className="flex justify-center items-center h-screen">
    <div className="fixed inset-0 flex items-center justify-center bg-primary-50 bg-opacity-50 z-50 h-screen">
      <svg
        className="animate-spin h-8 w-8 text-primary-900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
}
