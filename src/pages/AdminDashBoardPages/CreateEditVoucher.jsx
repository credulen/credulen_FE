// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   Box,
//   CircularProgress,
//   Snackbar,
//   InputLabel,
//   FormControl,
//   FormControlLabel,
//   Checkbox,
//   Chip,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import dayjs from "dayjs";
// import MuiAlert from "@mui/material/Alert";
// import { IoArrowBack } from "react-icons/io5";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function CreateEditVoucher() {
//   const { id } = useParams(); // For edit mode
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     code: "",
//     discountType: "percentage",
//     discountValue: "",
//     expiryDate: null,
//     usageLimit: 0,
//     oncePerUser: false,
//     applicableItems: [], // Array of solution IDs
//     applicableEmails: [], // Array of email strings
//     minCartAmount: 0,
//     forNewUsers: false,
//   });
//   const [newEmail, setNewEmail] = useState(""); // Temporary state for new email input
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     if (id) {
//       // Fetch voucher by ID
//       fetch(`${backendURL}/api/getVoucherById/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setFormData({
//             code: data.code,
//             discountType: data.discountType,
//             discountValue: data.discountValue.toString(),
//             expiryDate: dayjs(data.expiryDate),
//             usageLimit: data.usageLimit,
//             oncePerUser: data.oncePerUser,
//             applicableItems: data.applicableItems.map((item) => item._id), // Array of IDs
//             applicableEmails: data.applicableEmails || [], // Array of emails
//             minCartAmount: data.minCartAmount,
//             forNewUsers: data.forNewUsers,
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching voucher:", error);
//           showSnackbar("Failed to fetch voucher", "error");
//         });
//     }
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleArrayInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//         .split(",")
//         .map((item) => item.trim())
//         .filter(Boolean),
//     });
//   };

//   const handleDateChange = (date) => {
//     setFormData({ ...formData, expiryDate: date });
//   };

//   const handleNewEmailChange = (e) => {
//     setNewEmail(e.target.value);
//   };

//   const addEmail = () => {
//     const email = newEmail.trim();
//     if (
//       email &&
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
//       !formData.applicableEmails.includes(email.toLowerCase())
//     ) {
//       setFormData({
//         ...formData,
//         applicableEmails: [...formData.applicableEmails, email.toLowerCase()],
//       });
//       setNewEmail(""); // Clear input after adding
//     } else {
//       showSnackbar("Please enter a valid and unique email", "error");
//     }
//   };

//   const removeEmail = (emailToRemove) => {
//     setFormData({
//       ...formData,
//       applicableEmails: formData.applicableEmails.filter(
//         (email) => email !== emailToRemove
//       ),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.code || !formData.discountValue || !formData.expiryDate) {
//       showSnackbar("Required fields are missing", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         expiryDate: formData.expiryDate.toDate(), // Convert dayjs to Date
//         applicableItems: formData.applicableItems,
//         applicableEmails: formData.applicableEmails, // Already an array
//       };

//       let response;
//       if (id) {
//         response = await fetch(`${backendURL}/api/updateVoucher/${id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       } else {
//         response = await fetch(`${backendURL}/api/createVoucher`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       }

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save voucher");
//       }

//       showSnackbar(
//         id ? "Voucher updated successfully" : "Voucher created successfully",
//         "success"
//       );
//       setTimeout(() => navigate("/DashBoard/Admin/AdminVoucherList"), 2000);
//     } catch (error) {
//       showSnackbar(error.message || "Failed to save voucher", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <button
//         onClick={handleBackClick}
//         className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
//         <IoArrowBack className="mr-2" size={24} />
//         Back
//       </button>
//       <Box className="p-3 max-w-3xl mx-auto min-h-screen">
//         <h1 className="text-center text-3xl my-7 font-semibold">
//           {id ? "Edit Voucher" : "Create Voucher"}
//         </h1>
//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           <TextField
//             label="Voucher Code (e.g., TECH50)"
//             required
//             name="code"
//             value={formData.code}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <FormControl fullWidth>
//             <InputLabel>Discount Type</InputLabel>
//             <Select
//               name="discountType"
//               value={formData.discountType}
//               onChange={handleInputChange}
//               label="Discount Type">
//               <MenuItem value="percentage">Percentage (%)</MenuItem>
//               <MenuItem value="fixed">Fixed Amount (₦)</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Discount Value (e.g., 50 for 50% or 2000 for ₦2000)"
//             required
//             type="number"
//             name="discountValue"
//             value={formData.discountValue}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <DatePicker
//             label="Expiry Date"
//             value={formData.expiryDate}
//             onChange={handleDateChange}
//             renderInput={(params) => (
//               <TextField {...params} required fullWidth />
//             )}
//           />
//           <TextField
//             label="Usage Limit (0 for unlimited)"
//             type="number"
//             name="usageLimit"
//             value={formData.usageLimit}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={formData.oncePerUser}
//                 onChange={handleInputChange}
//                 name="oncePerUser"
//               />
//             }
//             label="Once per user?"
//           />
//           <TextField
//             label="Applicable Items (comma-separated Solution IDs, empty for all)"
//             name="applicableItems"
//             value={formData.applicableItems.join(", ")}
//             onChange={handleArrayInputChange}
//             fullWidth
//           />
//           <Box>
//             <TextField
//               label="Add Applicable Email"
//               value={newEmail}
//               onChange={handleNewEmailChange}
//               onKeyPress={(e) => e.key === "Enter" && addEmail()} // Add on Enter key
//               fullWidth
//               helperText="Press Enter or click Add to include an email"
//             />
//             <Button
//               variant="outlined"
//               onClick={addEmail}
//               style={{ marginTop: "8px" }}
//               disabled={
//                 !newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
//               }>
//               Add Email
//             </Button>
//             <Box sx={{ mt: 2 }}>
//               {formData.applicableEmails.map((email, index) => (
//                 <Chip
//                   key={index}
//                   label={email}
//                   onDelete={() => removeEmail(email)}
//                   style={{ margin: "4px" }}
//                 />
//               ))}
//             </Box>
//           </Box>
//           <TextField
//             label="Minimum Cart Amount (₦)"
//             type="number"
//             name="minCartAmount"
//             value={formData.minCartAmount}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={loading}>
//             {loading ? (
//               <CircularProgress size={24} />
//             ) : id ? (
//               "Update Voucher"
//             ) : (
//               "Create Voucher"
//             )}
//           </Button>
//         </form>
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}>
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity={snackbar.severity}
//             sx={{ width: "100%" }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </LocalizationProvider>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Snackbar,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import MuiAlert from "@mui/material/Alert";
import { IoArrowBack } from "react-icons/io5";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateEditVoucher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    expiryDate: null,
    usageLimit: 0,
    oncePerUser: false,
    applicableItems: [],
    applicableEmails: [],
    minCartAmount: 0,
    forNewUsers: false,
  });
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (id) {
      fetch(`${backendURL}/api/getVoucherById/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            code: data.code,
            discountType: data.discountType,
            discountValue: data.discountValue.toString(),
            expiryDate: dayjs(data.expiryDate),
            usageLimit: data.usageLimit,
            oncePerUser: data.oncePerUser,
            applicableItems: data.applicableItems.map((item) => item._id),
            applicableEmails: data.applicableEmails || [],
            minCartAmount: data.minCartAmount,
            forNewUsers: data.forNewUsers,
          });
        })
        .catch((error) => {
          console.error("Error fetching voucher:", error);
          showSnackbar("Failed to fetch voucher", "error");
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, expiryDate: date });
  };

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const addEmail = () => {
    const email = newEmail.trim();
    if (
      email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      !formData.applicableEmails.includes(email.toLowerCase())
    ) {
      setFormData({
        ...formData,
        applicableEmails: [...formData.applicableEmails, email.toLowerCase()],
      });
      setNewEmail("");
    } else {
      showSnackbar("Please enter a valid and unique email", "error");
    }
  };

  const removeEmail = (emailToRemove) => {
    setFormData({
      ...formData,
      applicableEmails: formData.applicableEmails.filter(
        (email) => email !== emailToRemove
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code || !formData.discountValue || !formData.expiryDate) {
      showSnackbar("Required fields are missing", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        expiryDate: formData.expiryDate.toDate(),
        applicableItems: formData.applicableItems,
        applicableEmails: formData.applicableEmails,
      };

      let response;
      if (id) {
        response = await fetch(`${backendURL}/api/updateVoucher/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${backendURL}/api/createVoucher`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save voucher");
      }

      showSnackbar(
        id ? "Voucher updated successfully" : "Voucher created successfully",
        "success"
      );
      setTimeout(() => navigate("/DashBoard/Admin/AdminVoucherList"), 2000);
    } catch (error) {
      showSnackbar(error.message || "Failed to save voucher", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="flex items-center text-primary-500 hover:text-primary-900 transition-colors duration-200">
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>

      <Box className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold text-primary-500">
          {id ? "Edit Voucher" : "Create Voucher"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            label="Voucher Code (e.g., TECH50)"
            required
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Discount Type</InputLabel>
            <Select
              name="discountType"
              value={formData.discountType}
              onChange={handleInputChange}
              label="Discount Type">
              <MenuItem value="percentage">Percentage (%)</MenuItem>
              <MenuItem value="fixed">Fixed Amount (₦)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Discount Value (e.g., 50 for 50% or 2000 for ₦2000)"
            required
            type="number"
            name="discountValue"
            value={formData.discountValue}
            onChange={handleInputChange}
            fullWidth
          />

          <DatePicker
            label="Expiry Date"
            value={formData.expiryDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} required fullWidth />
            )}
          />

          <TextField
            label="Usage Limit (0 for unlimited)"
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleInputChange}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.oncePerUser}
                onChange={handleInputChange}
                name="oncePerUser"
              />
            }
            label="Once per user?"
          />

          <TextField
            label="Applicable Items (comma-separated Solution IDs, empty for all)"
            name="applicableItems"
            value={formData.applicableItems.join(", ")}
            onChange={handleArrayInputChange}
            fullWidth
          />

          <Box>
            <TextField
              label="Add Applicable Email"
              value={newEmail}
              onChange={handleNewEmailChange}
              onKeyPress={(e) => e.key === "Enter" && addEmail()}
              fullWidth
              helperText="Press Enter or click Add to include an email"
            />
            <button
              type="button"
              onClick={addEmail}
              disabled={
                !newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
              }
              className="mt-2 px-4 py-2 rounded-md border border-primary-500 text-primary-500 hover:bg-primary-50 disabled:opacity-50">
              Add Email
            </button>

            <Box sx={{ mt: 2 }}>
              {formData.applicableEmails.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  onDelete={() => removeEmail(email)}
                  style={{ margin: "4px" }}
                />
              ))}
            </Box>
          </Box>

          <TextField
            label="Minimum Cart Amount (₦)"
            type="number"
            name="minCartAmount"
            value={formData.minCartAmount}
            onChange={handleInputChange}
            fullWidth
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-500 hover:bg-primary-900 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50">
            {loading ? (
              <CircularProgress size={24} className="text-white" />
            ) : id ? (
              "Update Voucher"
            ) : (
              "Create Voucher"
            )}
          </button>
        </form>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}>
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}
