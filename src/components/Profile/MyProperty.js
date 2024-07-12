import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import MyPropertyItems from "./MyPropertyItems";
import { fetchPropertiesRequest, deletePropertyRequest } from "./userSlice";
import { useNavigate } from "react-router-dom";

const PropertyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties, isLoading } = useSelector((state) => state.user);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchPropertiesRequest());
  }, [dispatch]);

  const handleEditProperty = (propertyId) => {
    navigate(`/profile/edit-property/${propertyId}`);
  };

  const handleDeleteProperty = (propertyId) => {
    setPropertyToDelete(propertyId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deletePropertyRequest({ propertyId: propertyToDelete }));
    setConfirmDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setPropertyToDelete(null);
    setConfirmDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Properties -{" "}
        {properties && properties.length > 0 ? properties.length : 0}
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid>
          {properties.length === 0 && !isLoading && (
            <div className="text-center ">
              <div className="mb-3">
                <img
                  src="/assets/images/no-data.png"
                  style={{ width: "200px" }}
                  alt="No Data Found"
                />
              </div>
              <label>No Properties Found</label>
              <div className="mt-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    navigate("/profile/add-property");
                  }}
                >
                  Add Properties
                </button>
              </div>
            </div>
          )}
          {properties.map((property) => (
            <Grid item xs={12} key={property._id}>
              <MyPropertyItems
                itemURL="profile/"
                itemId={property._id}
                itemTitle={property.title}
                itemAddress={property.address}
                itemPrice={property.price}
                itemShortDescription={property.description}
                itemBedrooms={property.bedrooms}
                itemBathrooms={property.bathrooms}
                itemLivingrooms={property.livingrooms || 1}
                itemStatus={property.status}
                itemUpdatedAt={property.updatedAt}
                expiryDate={property.expiryDate}
                itemImg={
                  property.images && property.images.length > 0
                    ? property.images[0]
                    : null
                }
                handleEditProperty={handleEditProperty}
                handleDeleteProperty={() => handleDeleteProperty(property._id)}
                applicationCount={
                  (property.buyingApplications?.length || 0) +
                  (property.rentalApplications?.length || 0)
                }
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={confirmDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertyPage;
