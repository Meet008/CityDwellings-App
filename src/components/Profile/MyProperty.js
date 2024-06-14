import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import MyPropertyItems from "./MyPropertyItems";
import { fetchPropertiesRequest } from "./userSlice";

const PropertyPage = () => {
  const dispatch = useDispatch();
  const { properties, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchPropertiesRequest());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Properties
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {properties.map((property) => (
            <MyPropertyItems
              key={property._id}
              itemURL="profile/"
              itemId={property._id}
              itemTitle={property.title}
              itemAddress={property.address}
              itemPrice={property.price}
              itemShortDescription={property.description}
              itemBedrooms={property.bedrooms}
              itemBathrooms={property.bathrooms}
              itemLivingrooms={property.livingrooms || 1} // Default to 1 if not provided
              itemImg={property.images[0]}
            />
          ))}
          {properties.length === 0 && !isLoading && (
            <Typography variant="body1">No properties found.</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default PropertyPage;
