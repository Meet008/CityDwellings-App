import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  fetchUserApplicationsRequest,
  deleteApplicationRequest,
  setFormData,
} from "../RentSaleComponents/RentalFormSlice";
import Navigation from "../../components/Navigation";
import RentalForm from "../RentSaleComponents/RentalForm";

const UserApplications = () => {
  const dispatch = useDispatch();
  const { applications, isLoading } = useSelector((state) => state.rentalForm);

  const [openRentalForm, setOpenRentalForm] = useState(false);
  const [currentFormData, setCurrentFormData] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formId, setFormId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    dispatch(fetchUserApplicationsRequest({ userId }));
  }, [dispatch, userId]);

  const handleCloseRentalForm = () => {
    setOpenRentalForm(false);
    setCurrentFormData(null);
  };

  const handleOpenRentalForm = (application) => {
    setCurrentFormData(application);
    dispatch(setFormData(application));
    setOpenRentalForm(true);
  };

  const handleDelete = (formId) => {
    setFormId(formId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteApplicationRequest({ formId }));
    setConfirmDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <>
      <Navigation />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", color: "#3f51b5" }}
        >
          Total Applications -{" "}
          {applications.length > 0 ? applications.length : 0}
        </Typography>

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
          >
            <CircularProgress />
          </Box>
        ) : applications.length === 0 && !isLoading ? (
          <div className="text-center">
            <div className="mb-3 mt-20">
              <img
                src="/assets/images/no-data.png"
                style={{ width: "200px" }}
                alt="No Data Found"
              />
            </div>
            <label>No Applications Received</label>
          </div>
        ) : (
          <Grid container spacing={3}>
            {applications.map((application) => (
              <Grid item xs={12} key={application._id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    boxShadow: 3,
                    mb: 2,
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      border: "1px solid #e0e0e0",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2, color: "#2c3e50" }}
                        >
                          Personal Information
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Full Name:</strong> {application.full_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Phone:</strong> {application.phone_number}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Email:</strong> {application.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Date of Birth:</strong>{" "}
                          {new Date(
                            application.date_of_birth
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Driver's License Number:</strong>{" "}
                          {application.driver_license_number}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2, color: "#2c3e50" }}
                        >
                          Residential History
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Current Address:</strong>{" "}
                          {application.current_address}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Previous Addresses:</strong>{" "}
                          {application.previous_addresses.map((address) => (
                            <div key={address._id}>
                              <p>
                                <strong>Address:</strong> {address.address}
                              </p>
                              <p>
                                <strong>Landlord Name:</strong>{" "}
                                {address.landlord_name}
                              </p>
                              <p>
                                <strong>Landlord Contact:</strong>{" "}
                                {address.landlord_contact}
                              </p>
                              <p>
                                <strong>Duration of Residence:</strong>{" "}
                                {address.duration_of_residence}
                              </p>
                              <p>
                                <strong>Reason for Leaving:</strong>{" "}
                                {address.reason_for_leaving}
                              </p>
                            </div>
                          ))}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 2, color: "#2c3e50" }}
                        >
                          Stay Duration
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {application.minimum_stay}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      p: 2,
                    }}
                  >
                    <CardActions>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        fontWeight="bold"
                      >
                        Status:{" "}
                        {application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)}
                      </Typography>
                    </CardActions>

                    <CardActions>
                      {application.status === "pending" ? (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            sx={{ mr: 1 }}
                            onClick={() => handleOpenRentalForm(application)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(application._id)}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <Button variant="contained" disabled={true}>
                          {application.status}
                        </Button>
                      )}
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <RentalForm
          open={openRentalForm}
          handleClose={handleCloseRentalForm}
          propertyId={currentFormData?._id}
          initialData={currentFormData}
        />
        <Dialog open={confirmDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this application?
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
    </>
  );
};

export default UserApplications;
