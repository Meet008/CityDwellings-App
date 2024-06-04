// import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import Avatar from "@mui/material/Avatar";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import cardsItems from "../assets/cardsItems";
// import CardItem from "../components/MultiItemsCarousel/CardItem";

// const UserProfileContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   backgroundColor: "#2c3e50",
//   color: theme.palette.common.white,
//   [theme.breakpoints.down("sm")]: {
//     padding: theme.spacing(2),
//   },
//   borderRadius: theme.spacing(2),
// }));

// const AvatarContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: theme.spacing(2),
// }));

// const UserProfile = () => {
//   const [userData, setUserData] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "123-456-7890",
//     address: "123 Main St, Anytown USA",
//   });
//   const [editing, setEditing] = useState(false);

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleSave = () => {
//     setEditing(false);
//     // Save the updated user data to the server or local storage
//   };

//   const handleCancel = () => {
//     setEditing(false);
//     // Reset the user data to the original values
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevUserData) => ({
//       ...prevUserData,
//       [name]: value,
//     }));
//   };

//   return (
//     <UserProfileContainer>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={4}>
//           <AvatarContainer>
//             <Avatar
//               alt={userData.name}
//               src="/static/images/avatar.jpg"
//               sx={{ width: 120, height: 120, border: "4px solid #ecf0f1" }}
//             />
//           </AvatarContainer>
//         </Grid>
//         <Grid item xs={12} sm={8}>
//           <Typography variant="h5" gutterBottom>
//             {editing ? (
//               <TextField
//                 name="name"
//                 value={userData.name}
//                 onChange={handleInputChange}
//                 fullWidth
//                 InputProps={{
//                   style: { color: "white" },
//                 }}
//                 InputLabelProps={{
//                   style: { color: "white" },
//                 }}
//               />
//             ) : (
//               userData.name
//             )}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Email:{" "}
//             {editing ? (
//               <TextField
//                 name="email"
//                 value={userData.email}
//                 onChange={handleInputChange}
//                 fullWidth
//                 InputProps={{
//                   style: { color: "white" },
//                 }}
//                 InputLabelProps={{
//                   style: { color: "white" },
//                 }}
//               />
//             ) : (
//               userData.email
//             )}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Phone:{" "}
//             {editing ? (
//               <TextField
//                 name="phone"
//                 value={userData.phone}
//                 onChange={handleInputChange}
//                 fullWidth
//                 InputProps={{
//                   style: { color: "white" },
//                 }}
//                 InputLabelProps={{
//                   style: { color: "white" },
//                 }}
//               />
//             ) : (
//               userData.phone
//             )}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Address:{" "}
//             {editing ? (
//               <TextField
//                 name="address"
//                 value={userData.address}
//                 onChange={handleInputChange}
//                 fullWidth
//                 InputProps={{
//                   style: { color: "white" },
//                 }}
//                 InputLabelProps={{
//                   style: { color: "white" },
//                 }}
//               />
//             ) : (
//               userData.address
//             )}
//           </Typography>
//           {editing ? (
//             <Box display="flex" justifyContent="flex-end" mt={2}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<SaveIcon />}
//                 onClick={handleSave}
//                 sx={{ mr: 1 }}
//               >
//                 Save
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 startIcon={<CancelIcon />}
//                 onClick={handleCancel}
//                 sx={{ color: "white", borderColor: "white" }}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           ) : (
//             <IconButton
//               color="primary"
//               onClick={handleEdit}
//               sx={{ alignSelf: "flex-end", mt: 2, color: "white" }}
//             >
//               <EditIcon />
//             </IconButton>
//           )}
//         </Grid>
//       </Grid>
//       <Box mt={3} textAlign="center">
//         <Box sx={{ marginBottom: "5%" }}>
//           <Typography variant="h3" gutterBottom>
//             My Listings
//           </Typography>
//         </Box>
//         <Grid container spacing={2}>
//           {cardsItems.map((item, i) => (
//             <Grid item xs={12} sm={6} md={4} key={i}>
//               <CardItem
//                 item={item}
//                 title={item.title}
//                 address={item.address}
//                 price={item.price}
//                 image={item.img}
//                 url={item.url}
//                 itemBedrooms={item.bedrooms}
//                 itemBathrooms={item.bathrooms}
//                 itemLivingrooms={item.livingrooms}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </UserProfileContainer>
//   );
// };

// export default UserProfile;

{
  /* <Dialog open={isAddingProperty} onClose={() => setIsAddingProperty(false)}>
  <DialogTitle>Add Property</DialogTitle>
  <DialogContent>
    <TextField
      fullWidth
      label="Title"
      name="title"
      value={newProperty.title}
      onChange={handlePropertyChange}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      label="Description"
      name="description"
      value={newProperty.description}
      onChange={handlePropertyChange}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      label="Price"
      name="price"
      value={newProperty.price}
      onChange={handlePropertyChange}
      sx={{ mb: 2 }}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsAddingProperty(false)}>Cancel</Button>
    <Button onClick={handleAddProperty} variant="contained" color="primary">
      Add
    </Button>
  </DialogActions>
</Dialog>; */
}
