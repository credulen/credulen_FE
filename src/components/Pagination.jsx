// const Pagination = () => {
//   return (
//     <nav aria-label="Page navigation example">
//       <ul class="flex items-center justify-center -space-x-px h-10 text-base">
//         <li>
//           <a
//             href="#"
//             class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             <span class="sr-only">Previous</span>
//             <svg
//               class="w-3 h-3 rtl:rotate-180"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 6 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 1 1 5l4 4"
//               />
//             </svg>
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             1
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             2
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             aria-current="page"
//             class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
//           >
//             3
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             4
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             5
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             <span class="sr-only">Next</span>
//             <svg
//               class="w-3 h-3 rtl:rotate-180"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 6 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 9 4-4-4-4"
//               />
//             </svg>
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;
import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          minWidth: "40px",
          p: 0,
          color: currentPage === 1 ? "grey" : "inherit",
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          sx={{
            mx: 0.5,
            minWidth: "40px",
            backgroundColor: currentPage === number ? "#2b4b5e" : "transparent",
            color: currentPage === number ? "white" : "inherit",
            "&:hover": {
              backgroundColor:
                currentPage === number ? "#2b4b5e" : "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          {number}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          minWidth: "40px",
          p: 0,
          color: currentPage === totalPages ? "grey" : "inherit",
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </Button>
    </Box>
  );
};

export default Pagination;
