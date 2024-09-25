 import React, { useState } from "react";
 import {
   Typography,
   Box,
   TextField,
   IconButton,
   Avatar,
   List,
   ListItem,
   Button,
   Menu,
   MenuItem,
 } from "@mui/material";
 import { ThumbUp, Edit, Delete, MoreVert } from "@mui/icons-material";
 import { formatDistanceToNow } from "date-fns";

 const CommentSection = ({
   comments,
   currentUser,
   handleCommentEdit,
   handleCommentDelete,
   handleCommentLike,
   backendURL,
 }) => {
   const [editingCommentId, setEditingCommentId] = useState(null);
   const [editedCommentContent, setEditedCommentContent] = useState("");
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedCommentId, setSelectedCommentId] = useState(null);
   const [showAllComments, setShowAllComments] = useState(false);

   const handleMenuOpen = (event, commentId) => {
     setAnchorEl(event.currentTarget);
     setSelectedCommentId(commentId);
   };

   const handleMenuClose = () => {
     setAnchorEl(null);
     setSelectedCommentId(null);
   };

   const handleEditClick = (comment) => {
     setEditingCommentId(comment._id);
     setEditedCommentContent(comment.content);
     handleMenuClose();
   };

   const handleDeleteClick = (commentId) => {
     handleCommentDelete(commentId);
     handleMenuClose();
   };

   const handleCancelEdit = () => {
     setEditingCommentId(null);
     setEditedCommentContent("");
   };

   const toggleShowAllComments = () => {
     setShowAllComments(!showAllComments);
   };

   const displayedComments = showAllComments ? comments : comments.slice(0, 5);

   return (
     <>
       <List>
         {displayedComments.map((comment) => (
           <ListItem
             key={comment._id}
             sx={{
               flexDirection: "column",
               alignItems: "flex-start",
               mb: 2,
               p: 2,
               bgcolor: "background.paper",
               borderRadius: 1,
               border: "1px solid gray",
             }}
           >
             <Box
               sx={{
                 display: "flex",
                 justifyContent: "space-between",
                 width: "100%",
                 mb: 1,
               }}
             >
               <Box sx={{ display: "flex", alignItems: "center" }}>
                 <Avatar
                   src={
                     comment.userId?.image
                       ? `${backendURL}/uploads/${comment.userId.image}`
                       : "/default-avatar.jpg"
                   }
                   alt={comment.userId?.username || "Anonymous"}
                   sx={{ width: 32, height: 32, mr: 1 }}
                 />
                 <Typography variant="subtitle2">
                   {comment.userId?.username || "Anonymous"}
                 </Typography>
               </Box>
               {(currentUser.userInfo.user._id === comment.userId._id ||
                 currentUser.userInfo.user.isAdmin) && (
                 <IconButton
                   size="small"
                   onClick={(event) => handleMenuOpen(event, comment._id)}
                 >
                   <MoreVert />
                 </IconButton>
               )}
             </Box>

             {editingCommentId === comment._id ? (
               <Box sx={{ width: "100%" }}>
                 <TextField
                   fullWidth
                   multiline
                   rows={3}
                   value={editedCommentContent}
                   onChange={(e) => setEditedCommentContent(e.target.value)}
                   variant="outlined"
                   sx={{ mb: 1 }}
                 />
                 <Button
                   onClick={() =>
                     handleCommentEdit(comment._id, editedCommentContent)
                   }
                   sx={{ mr: 1 }}
                 >
                   Save
                 </Button>
                 <Button onClick={handleCancelEdit}>Cancel</Button>
               </Box>
             ) : (
               <Typography variant="body1" sx={{ mb: 1, width: "100%" }}>
                 {comment.content}
               </Typography>
             )}

             <Box
               sx={{
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "space-between",
                 width: "100%",
               }}
             >
               <Box sx={{ display: "flex", alignItems: "center" }}>
                 <IconButton
                   onClick={() => handleCommentLike(comment._id)}
                   size="small"
                 >
                   <ThumbUp
                     color={
                       comment.likes.includes(currentUser.userInfo.user._id)
                         ? "primary"
                         : "inherit"
                     }
                     fontSize="small"
                   />
                 </IconButton>
                 <Typography variant="caption" sx={{ ml: 1 }}>
                   {comment.likes.length} likes
                 </Typography>
               </Box>
               <Typography variant="caption" color="text.secondary">
                 {formatDistanceToNow(new Date(comment.createdAt), {
                   addSuffix: true,
                 })}
               </Typography>
             </Box>
           </ListItem>
         ))}
       </List>

       {comments.length > 5 && (
         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
           <Button onClick={toggleShowAllComments}>
             {showAllComments ? "Show Less" : "Show More"}
           </Button>
         </Box>
       )}

       <Menu
         anchorEl={anchorEl}
         open={Boolean(anchorEl)}
         onClose={handleMenuClose}
       >
         <MenuItem
           onClick={() =>
             handleEditClick(comments.find((c) => c._id === selectedCommentId))
           }
         >
           <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
         </MenuItem>
         <MenuItem onClick={() => handleDeleteClick(selectedCommentId)}>
           <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
         </MenuItem>
       </Menu>
     </>
   );
 };

 export default CommentSection;