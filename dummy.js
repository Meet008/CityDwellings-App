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

// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import UserInfo from "./UserInfo";
// import SideDrawer from "./SideDrawer";
// import { useMediaQuery } from "@mui/material";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function MiniDrawer() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
//   const [open, setOpen] = React.useState(!isSmallScreen);

//   React.useEffect(() => {
//     setOpen(!isSmallScreen);
//   }, [isSmallScreen]);

//   const handleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       {isSmallScreen && (
//         <AppBar position="fixed" open={open}>
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawer }
//               edge="start"
//               sx={{
//                 marginRight: 5,
//                 ...(open && { display: "none" }),
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Responsive Drawer
//             </Typography>
//           </Toolbar>
//         </AppBar>
//       )}
//       <Drawer variant={isSmallScreen ? "temporary" : "permanent"} open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawer}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <SideDrawer open={open} />
//         <Divider />
//         <List>
//           {["Profile", "My Listings", "Logout"].map((text, index) => (
//             <ListItem key={text} disablePadding sx={{ display: "block" }}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <UserInfo />
//       </Box>
//     </Box>
//   );
// }

// import React, { useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   FormControl,
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { addPropertyRequest } from "./userSlice";

// const AddProperty = () => {
//   const fileRef = useRef(null);
//   const { isLoading, user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [imagesForDisplay, setImagesForDisplay] = useState([]);
//   const [formValues, setFormValues] = useState({
//     title: "",
//     description: "",
//     address: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     listingType: "apartments",
//     category: "rent",
//     price: 70,
//     bedrooms: 1,
//     bathrooms: 1,
//     furnished: false,
//     parking: false,
//     area: 50,
//     yearBuilt: 2020,
//     images: [],
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const { files } = e.target;
//     const selectedImages = Array.from(files);
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       images: selectedImages,
//     }));
//     const imagePreviews = selectedImages.map((image) =>
//       URL.createObjectURL(image)
//     );
//     setImagesForDisplay(imagePreviews);
//   };

//   const validate = () => {
//     let errors = {};
//     if (!formValues.title) errors.title = "Title is required";
//     if (!formValues.description) errors.description = "Description is required";
//     if (!formValues.address) errors.address = "Address is required";
//     if (!formValues.city) errors.city = "City is required";
//     if (!formValues.state) errors.state = "State is required";
//     if (!formValues.postalCode) errors.postalCode = "Postal Code is required";
//     if (!formValues.price || formValues.price <= 0)
//       errors.price = "Price must be positive";
//     if (!formValues.bedrooms || formValues.bedrooms <= 0)
//       errors.bedrooms = "Bedrooms must be positive";
//     if (!formValues.bathrooms || formValues.bathrooms <= 0)
//       errors.bathrooms = "Bathrooms must be positive";
//     if (!formValues.area || formValues.area <= 0)
//       errors.area = "Area must be positive";
//     if (
//       !formValues.yearBuilt ||
//       formValues.yearBuilt <= 0 ||
//       !Number.isInteger(Number(formValues.yearBuilt))
//     )
//       errors.yearBuilt = "Year Built must be a positive integer";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!user || !user._id) {
//       toast.error("User not authenticated");
//       return;
//     }

//     if (!validate()) return;

//     const propertyData = new FormData();
//     for (const key in formValues) {
//       if (key === "images") {
//         formValues[key].forEach((image) => {
//           propertyData.append("images", image);
//         });
//       } else {
//         propertyData.append(key, formValues[key]);
//       }
//     }

//     propertyData.append("ownerId", user._id);

//     dispatch(addPropertyRequest({ formData: propertyData, navigate }));
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom align="center">
//           Add Property
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               fullWidth
//               label="Title"
//               name="title"
//               value={formValues.title}
//               onChange={handleChange}
//               error={Boolean(formErrors.title)}
//               helperText={formErrors.title}
//               variant="outlined"
//               required
//             />
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               fullWidth
//               label="Description"
//               name="description"
//               value={formValues.description}
//               onChange={handleChange}
//               error={Boolean(formErrors.description)}
//               helperText={formErrors.description}
//               variant="outlined"
//               multiline
//               rows={4}
//               required
//             />
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               fullWidth
//               label="Address"
//               name="address"
//               value={formValues.address}
//               onChange={handleChange}
//               error={Boolean(formErrors.address)}
//               helperText={formErrors.address}
//               variant="outlined"
//               required
//             />
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               fullWidth
//               label="City"
//               name="city"
//               value={formValues.city}
//               onChange={handleChange}
//               error={Boolean(formErrors.city)}
//               helperText={formErrors.city}
//               variant="outlined"
//               required
//             />
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               fullWidth
//               label="State"
//               name="state"
//               value={formValues.state}
//               onChange={handleChange}
//               error={Boolean(formErrors.state)}
//               helperText={formErrors.state}
//               variant="outlined"
//               required
//             />
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               fullWidth
//               label="Postal Code"
//               name="postalCode"
//               value={formValues.postalCode}
//               onChange={handleChange}
//               error={Boolean(formErrors.postalCode)}
//               helperText={formErrors.postalCode}
//               variant="outlined"
//               required
//             />
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <input
//               hidden
//               type="file"
//               ref={fileRef}
//               name="images"
//               onChange={handleImageChange}
//               multiple
//             />
//             <Box
//               sx={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: 2,
//                 mt: 2,
//               }}
//             >
//               {imagesForDisplay.map((image, index) => (
//                 <Box key={index} sx={{ width: 100 }}>
//                   <img
//                     src={image}
//                     alt={`Image ${index + 1}`}
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       borderRadius: 4,
//                     }}
//                   />
//                 </Box>
//               ))}
//             </Box>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={() => fileRef.current.click()}
//               sx={{ mt: 1 }}
//             >
//               Select Images
//             </Button>
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Type</InputLabel>
//               <Select
//                 name="listingType"
//                 value={formValues.listingType}
//                 onChange={handleChange}
//                 label="Type"
//               >
//                 <MenuItem value="houses">Houses</MenuItem>
//                 <MenuItem value="apartments">Apartments</MenuItem>
//                 <MenuItem value="offices">Offices</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Category</InputLabel>
//               <Select
//                 name="category"
//                 value={formValues.category}
//                 onChange={handleChange}
//                 label="Category"
//               >
//                 <MenuItem value="rent">Rent</MenuItem>
//                 <MenuItem value="sale">Sale</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
//             <TextField
//               label="Price"
//               name="price"
//               type="number"
//               value={formValues.price}
//               onChange={handleChange}
//               error={Boolean(formErrors.price)}
//               helperText={formErrors.price}
//               variant="outlined"
//               required
//               sx={{ flex: 1, mr: 2 }}
//             />

//             <TextField
//               label="Bedrooms"
//               name="bedrooms"
//               type="number"
//               value={formValues.bedrooms}
//               onChange={handleChange}
//               error={Boolean(formErrors.bedrooms)}
//               helperText={formErrors.bedrooms}
//               variant="outlined"
//               required
//               sx={{ flex: 1, mr: 2 }}
//             />

//             <TextField
//               label="Bathrooms"
//               name="bathrooms"
//               type="number"
//               value={formValues.bathrooms}
//               onChange={handleChange}
//               error={Boolean(formErrors.bathrooms)}
//               helperText={formErrors.bathrooms}
//               variant="outlined"
//               required
//               sx={{ flex: 1 }}
//             />
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               fullWidth
//               label="Area (sq meters)"
//               name="area"
//               type="number"
//               value={formValues.area}
//               onChange={handleChange}
//               error={Boolean(formErrors.area)}
//               helperText={formErrors.area}
//               variant="outlined"
//               required
//             />
//           </Box>
//           <Box sx={{ mb: 3 }}>
//             <TextField
//               fullWidth
//               label="Year Built"
//               name="yearBuilt"
//               type="number"
//               value={formValues.yearBuilt}
//               onChange={handleChange}
//               error={Boolean(formErrors.yearBuilt)}
//               helperText={formErrors.yearBuilt}
//               variant="outlined"
//               required
//             />
//           </Box>
//           <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="furnished"
//                   checked={formValues.furnished}
//                   onChange={handleChange}
//                 />
//               }
//               label="Furnished"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="parking"
//                   checked={formValues.parking}
//                   onChange={handleChange}
//                 />
//               }
//               label="Parking"
//             />
//           </Box>
//           <Box sx={{ textAlign: "center", mt: 4 }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={isLoading}
//               startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
//             >
//               {isLoading ? "Loading..." : "Add Property"}
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default AddProperty;
