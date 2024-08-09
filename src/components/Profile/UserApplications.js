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
  Tabs,
  Tab,
} from "@mui/material";
import {
  fetchUserRentApplicationsRequest,
  deleteApplicationRequest,
  setFormData,
} from "../RentSaleComponents/RentalFormSlice";
import {
  fetchUserPurchaseApplicationsRequest,
  deletePurchaseApplicationRequest,
  setFormData as setPurchaseFormData,
} from "../RentSaleComponents/PurchaseFormSlice";
import moment from "moment";

import Navigation from "../../components/Navigation";
import RentalForm from "../RentSaleComponents/RentalForm";
import PurchaseForm from "../RentSaleComponents/PurchaseForm";

const UserApplications = () => {
  const dispatch = useDispatch();
  const rentalForm = useSelector((state) => state.rentalForm);
  const purchaseForm = useSelector((state) => state.purchaseForm);

  const { applications: rentApplications, isLoading: isLoadingRent } =
    rentalForm;
  const { applications: purchaseApplications, isLoading: isLoadingPurchase } =
    purchaseForm;

  const [openForm, setOpenForm] = useState(false);
  const [currentFormData, setCurrentFormData] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formId, setFormId] = useState(null);
  const [tabValue, setTabValue] = useState(0); // 0 for Rental, 1 for Purchase

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (tabValue === 0) {
      dispatch(fetchUserRentApplicationsRequest({ userId }));
    } else {
      dispatch(fetchUserPurchaseApplicationsRequest({ userId }));
    }
  }, [dispatch, userId, tabValue]);

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentFormData(null);
  };

  const handleOpenForm = (application) => {
    setCurrentFormData(application);
    if (tabValue === 0) {
      dispatch(setFormData(application));
    } else {
      dispatch(setPurchaseFormData(application));
    }
    setOpenForm(true);
  };

  const handleDelete = (formId) => {
    setFormId(formId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (tabValue === 0) {
      dispatch(deleteApplicationRequest({ formId }));
    } else {
      dispatch(deletePurchaseApplicationRequest({ formId }));
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const applications = tabValue === 0 ? rentApplications : purchaseApplications;
  const isLoading = tabValue === 0 ? isLoadingRent : isLoadingPurchase;

  const convertUTCtoLocalDate = (utcDate) => {
   
    return moment.utc(utcDate).local().format("YYYY-MM-DD");
  };

  const formattedDateOfBirth = (dateString) => {
    return convertUTCtoLocalDate(dateString);
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

        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Rental Applications" />
          <Tab label="Purchase Applications" />
        </Tabs>

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
            {tabValue === 0
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
                              sx={{
                                fontWeight: "bold",
                                mb: 2,
                                color: "#2c3e50",
                              }}
                            >
                              Personal Information
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              <strong>Full Name:</strong>{" "}
                              {application.full_name}
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
                              {formattedDateOfBirth(application.date_of_birth)}
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
                              sx={{
                                fontWeight: "bold",
                                mb: 2,
                                color: "#2c3e50",
                              }}
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
                              sx={{
                                fontWeight: "bold",
                                mb: 2,
                                color: "#2c3e50",
                              }}
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
                                onClick={() => handleOpenForm(application)}
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
                              sx={{
                                fontWeight: "bold",
                                mb: 2,
                                color: "#2c3e50",
                              }}
                            >
                              Personal Information
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              <strong>Full Name:</strong>{" "}
                              {application.full_name}
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
                              {formattedDateOfBirth(application.date_of_birth)}
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
                              sx={{
                                fontWeight: "bold",
                                mb: 2,
                                color: "#2c3e50",
                              }}
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
                              <strong>Job Title:</strong>{" "}
                              {application.job_title}
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
                                sx={{ mr: 1 }}
                                onClick={() => handleOpenForm(application)}
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

        {tabValue === 0 ? (
          <RentalForm
            open={openForm}
            handleClose={handleCloseForm}
            propertyId={currentFormData?._id}
            initialData={currentFormData}
          />
        ) : (
          <PurchaseForm
            open={openForm}
            handleClose={handleCloseForm}
            propertyId={currentFormData?._id}
            initialData={currentFormData}
          />
        )}
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
