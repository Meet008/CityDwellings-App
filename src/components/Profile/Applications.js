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
  Card,
  CardContent,
  CardActions,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  fetchRentalApplicationsRequest,
  updateApplicationStatusRequest,
  fetchPurchaseApplicationsRequest,
} from "./userSlice";

import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const { propertyId, purchaseApplications } = useParams();

  const { applications, isLoading } = useSelector((state) => state.user);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [applicationToUpdate, setApplicationToUpdate] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState("loading");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    console.log("useEffect triggered");

    if (!propertyId || !purchaseApplications) {
      console.error("propertyId or purchaseApplications is missing");
      return;
    }

    setLoadingFlag("loading");
    const isPurchase = purchaseApplications === "true";

    if (isPurchase) {
      dispatch(fetchPurchaseApplicationsRequest({ propertyId }));
    } else {
      dispatch(fetchRentalApplicationsRequest({ propertyId }));
    }
  }, [dispatch, propertyId, purchaseApplications]);

  useEffect(() => {
    if (!isLoading) {
      console.log("came in false loading");
      if (applications.length === 0) {
        setLoadingFlag("noApplications");
      } else {
        console.log("set loaded");
        setLoadingFlag("loaded");
      }
    }
  }, [applications, isLoading]);

  const handleUpdateApplicationStatus = (application, status) => {
    setApplicationToUpdate(application);
    setUpdateStatus(status);
    setConfirmDialogOpen(true);
  };

  const handleConfirmUpdate = () => {
    if (purchaseApplications === "false") {
      dispatch(
        updateApplicationStatusRequest({
          applicationId: applicationToUpdate._id,
          status: updateStatus,
          isPurchase: false,
        })
      );
    } else {
      dispatch(
        updateApplicationStatusRequest({
          applicationId: applicationToUpdate._id,
          status: updateStatus,
          isPurchase: true,
        })
      );
    }

    setConfirmDialogOpen(false);
  };

  const handleCancelUpdate = () => {
    setApplicationToUpdate(null);
    setUpdateStatus(null);
    setConfirmDialogOpen(false);
  };

  return (
    <Box
      sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#3f51b5" }}
      >
        {purchaseApplications === "true"
          ? `Purchase Applications - ${applications ? applications.length : 0}`
          : `Rental Applications - ${applications ? applications.length : 0}`}
      </Typography>

      {loadingFlag === "loading" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      ) : loadingFlag === "noApplications" ? (
        <div className="text-center ">
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
          {purchaseApplications === "false"
            ? applications.map((application) => (
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
                                <Divider />
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

                    <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                      {application.status === "pending" ? (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              handleUpdateApplicationStatus(
                                application,
                                "approved"
                              )
                            }
                            sx={{ mr: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleUpdateApplicationStatus(
                                application,
                                "rejected"
                              )
                            }
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Button variant="contained" disabled={true}>
                          {application.status}
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : applications.map((application) => (
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
                            <strong>Identification Number:</strong>{" "}
                            {application.identification_number}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Marital Status:</strong>{" "}
                            {application.marital_status}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Dependents:</strong>{" "}
                            {application.dependents}
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
                            <strong>Employer Name:</strong>{" "}
                            {application.employer_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Employer Address:</strong>{" "}
                            {application.employer_address}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Job Title:</strong> {application.job_title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Monthly Income:</strong>{" "}
                            {application.monthly_income}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Employment Duration:</strong>{" "}
                            {application.employment_duration}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Employer Contact:</strong>{" "}
                            {application.employer_contact}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              mb: 2,
                              color: "#2c3e50",
                            }}
                          >
                            Financial Information
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Credit Score:</strong>{" "}
                            {application.credit_score}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Current Debts:</strong>{" "}
                            {application.current_debts}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Proof of Income:</strong>{" "}
                            {application.proof_of_income}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Proof of Funds:</strong>{" "}
                            {application.proof_of_funds}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 4 }}
                          >
                            <strong>Pre-approval Letter:</strong>{" "}
                            {application.pre_approval_letter}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              mb: 2,
                              color: "#2c3e50",
                            }}
                          >
                            Offer Details
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Offer Price:</strong>{" "}
                            {application.offer_price}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Down Payment Amount:</strong>{" "}
                            {application.down_payment_amount}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Mortgage Amount:</strong>{" "}
                            {application.mortgage_amount}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Preferred Closing Date:</strong>{" "}
                            {new Date(
                              application.preferred_closing_date
                            ).toLocaleDateString()}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            <strong>Contingencies:</strong>{" "}
                            {application.contingencies}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      mt={2}
                    >
                      <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                        {application.status === "pending" ? (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleUpdateApplicationStatus(
                                  application,
                                  "approved"
                                )
                              }
                              sx={{ mr: 1 }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleUpdateApplicationStatus(
                                  application,
                                  "rejected"
                                )
                              }
                            >
                              Reject
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

      <Dialog open={confirmDialogOpen} onClose={handleCancelUpdate}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {updateStatus} this application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelUpdate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationsPage;
