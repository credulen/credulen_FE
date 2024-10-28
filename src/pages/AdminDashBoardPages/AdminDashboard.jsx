// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { TextInput, Label, Button, Card } from "flowbite-react";
// import { HiOutlineSearch, HiOutlineUserCircle } from "react-icons/hi";
// import { motion } from "framer-motion";
// import { FaBriefcase } from "react-icons/fa";
// import {
//   HiAnnotation,
//   HiArrowNarrowUp,
//   HiDocumentText,
//   HiOutlineUserGroup,
// } from "react-icons/hi";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// const AdminDashboard = () => {
//   const backendURL = import.meta.env.VITE_BACKEND_URL;
//   const [users, setUsers] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [totalComments, setTotalComments] = useState(0);
//   const [lastMonthUsers, setLastMonthUsers] = useState(0);
//   const [lastMonthPosts, setLastMonthPosts] = useState(0);
//   const [lastMonthComments, setLastMonthComments] = useState(0);
//   const { userInfo } = useSelector((state) => state.auth);
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredUsers = users.filter((user) =>
//     user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // const res = await fetch("/api/user/getusers?limit=5");
//         const res = await fetch(`${backendURL}/api/getUsers`);
//         const data = await res.json();
//         if (res.ok) {
//           setUsers(data.users);
//           setTotalUsers(data.totalUsers);
//           setLastMonthUsers(data.lastMonthUsers);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("/api/post/getposts?limit=5");
//         const data = await res.json();
//         if (res.ok) {
//           setPosts(data.posts);
//           setTotalPosts(data.totalPosts);
//           setLastMonthPosts(data.lastMonthPosts);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     const fetchComments = async () => {
//       try {
//         const res = await fetch("/api/comment/getcomments?limit=5");
//         const data = await res.json();
//         if (res.ok) {
//           setComments(data.comments);
//           setTotalComments(data.totalComments);
//           setLastMonthComments(data.lastMonthComments);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     if (userInfo) {
//       fetchUsers();
//       fetchPosts();
//       fetchComments();
//     }
//   }, [userInfo]);

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));

//   function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }

//   const rows = [
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//     createData("Eclair", 262, 16.0, 24, 6.0),
//     createData("Cupcake", 305, 3.7, 67, 4.3),
//     createData("Gingerbread", 356, 16.0, 49, 3.9),
//   ];
//   return (
//     <>
//       <div className="flex flex-wrap gap-6 justify-center mb-12">
//         <div className="flex flex-col p-4 bg-white dark:bg-slate-800 shadow-lg border border-purple rounded-md w-full sm:w-80 md:w-72 lg:w-64">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
//               <p className="text-2xl font-semibold">{totalUsers}</p>
//             </div>
//             <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span className="text-green-500 flex items-center">
//               <HiArrowNarrowUp />
//               {lastMonthUsers}
//             </span>
//             <div>Last month</div>
//           </div>
//         </div>

//         <div className="flex flex-col p-4 bg-white dark:bg-slate-800 shadow-lg border border-purple rounded-md w-full sm:w-80 md:w-72 lg:w-64">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="text-gray-500 text-md uppercase">
//                 Total Comments
//               </h3>
//               <p className="text-2xl font-semibold">{totalComments}</p>
//             </div>
//             <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span className="text-green-500 flex items-center">
//               <HiArrowNarrowUp />
//               {lastMonthComments}
//             </span>
//             <div>Last month</div>
//           </div>
//         </div>
//         <div className="flex flex-col p-4 bg-white dark:bg-slate-800 shadow-lg border border-purple rounded-md w-full sm:w-80 md:w-72 lg:w-64">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
//               <p className="text-2xl font-semibold">{totalPosts}</p>
//             </div>
//             <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span className="text-green-500 flex items-center">
//               <HiArrowNarrowUp />
//               {lastMonthPosts}
//             </span>
//             <div>Last month</div>
//           </div>
//         </div>
//       </div>{" "}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//               <StyledTableCell align="right">Calories</StyledTableCell>
//               <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//               <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//               <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <StyledTableRow key={row.name}>
//                 <StyledTableCell component="th" scope="row">
//                   {row.name}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.calories}</StyledTableCell>
//                 <StyledTableCell align="right">{row.fat}</StyledTableCell>
//                 <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                 <StyledTableCell align="right">{row.protein}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TextInput, Label, Button, Card } from "flowbite-react";
import { HiOutlineSearch, HiOutlineUserCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AdminDashboard = () => {
  const backendURL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:3001";
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${backendURL}/api/getUsers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userInfo) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [userInfo]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontWeight: "bold", // Bold font for table headers
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontWeight: "normal", // Normal font for table body, you can change to 'bold' if needed
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center mb-12 overflow-x-hidden">
        <div className="flex flex-col p-4 bg-white dark:bg-slate-800 shadow-lg border border-purple rounded-md w-full sm:w-80 md:w-72 lg:w-64">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl font-semibold">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div>Last month</div>
          </div>
        </div>

        <div className="flex flex-col p-4 bg-white dark:bg-slate-800 shadow-lg border border-purple rounded-md w-full sm:w-80 md:w-72 lg:w-64">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl font-semibold">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div>Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-4 bg-white dark:bg-slate-800 shadow-lg border border-purple rounded-md w-full sm:w-80 md:w-72 lg:w-64">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl font-semibold">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div>Last month</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
