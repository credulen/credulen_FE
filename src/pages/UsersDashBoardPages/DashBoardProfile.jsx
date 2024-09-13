import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfileById,
  updateProfile,
  deleteAccount,
} from "../../features/Users/userAction";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import Spinner from "../../components/tools/Spinner";
import { resetSuccess } from "../../features/Users/UserSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashBoardProfile() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Deleteopen, setDeleteOpen] = React.useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { profile, loading, success, error } = useSelector(
    (state) => state.profiles
  );
  const userId = userInfo?.user._id;
  console.log(userInfo);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();

  const DeleteOpen = () => {
    setDeleteOpen(true);
  };
  const DeleteClose = () => {
    setDeleteOpen(false);
  };

  // Fetch profile on component mount
  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        email: profile.email || "",
        password: "", // Do not prefill password
      });

      if (profile.image) {
        setImagePreview(`${backendURL}/uploads/${profile.image}`);
      }
    }
  }, [profile, backendURL]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append("username", formData.username);
    updateData.append("email", formData.email);
    updateData.append("password", formData.password);
    if (selectedFile) {
      updateData.append("image", selectedFile);
    }
    if (userId) {
      dispatch(updateProfile({ userId, formData: updateData }));
      toast.success("Profile updated successfully!");
      dispatch(resetSuccess());
    } else {
      console.error("User ID is undefined");
    }

    // Log FormData entries
    for (let [key, value] of updateData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  const handleDelete = () => {
    if (userId) {
      dispatch(deleteAccount(userId))
        .then(() => {
          toast.success("Account deleted successfully!");
        })
        .catch(() => {
          toast.error("Failed to delete account.");
        });
    } else {
      console.error("User ID is undefined");
    }
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      {/* Image */}
      <div>
        <div className="col-span-full mx-auto text-center items-center align-middle">
          <label
            htmlFor="cover-photo"
            className="block text-xl font-bold leading-6 text-gray-900"
          >
            My profile
          </label>
          <div className="mt-1 flex justify-center rounded-lg px-6 pt-10">
            <div className="relative text-center">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="h-[15rem] w-[15rem] rounded-full object-cover border-4 border-white"
                  />
                  <label
                    htmlFor="file-upload"
                    className="absolute bottom-0 right-4 cursor-pointer h-12 w-12 bg-white rounded-full flex justify-center items-center border-2 border-white"
                  >
                    <MdOutlineAddAPhoto
                      aria-hidden="true"
                      className="h-8 w-8 text-gray-500"
                    />
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </label>
                </>
              ) : (
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer h-40 w-40 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-full"
                >
                  <BsPersonBoundingBox
                    aria-hidden="true"
                    className="h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="md:px-[5rem] p-16 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="********"
            />
          </div>

          <div className=" flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[30%]   py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {/* DELETING MODAL STARTS HERE */}
      <Button>
        <React.Fragment>
          <button
            onClick={DeleteOpen}
            href="#"
            className="px-2  first-letter:uppercase  pt-[10rem] text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition ease-in-out duration-200 transform hover:scale-110 hover:text-red-600 underline"
          >
            Delete Account
          </button>
          {/* </Button> */}
          <Dialog
            open={Deleteopen}
            onClose={DeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Confirm delete or cancel
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={DeleteClose}>
                <IoClose
                  size={24}
                  className="text-red-500  border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
                />
              </Button>
              <Button onClick={handleDelete}>
                <AiTwotoneDelete
                  size={24}
                  className="text-red-500  border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
                />
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </Button>
      {/* DELETING MODAL Ends HERE */}
    </div>
  );
}

export default DashBoardProfile;
