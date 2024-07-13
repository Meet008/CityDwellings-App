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
  updateRentalApplicationStatusRequest,
} from "./userSlice";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const RentalApplicationsPage = () => {
  const dispatch = useDispatch();
  const { propertyId } = useParams();
  const { applications, isLoading } = useSelector((state) => state.user);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [applicationToUpdate, setApplicationToUpdate] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchRentalApplicationsRequest({ propertyId }));
  }, [dispatch, propertyId]);

  const handleUpdateApplicationStatus = (application, status) => {
    setApplicationToUpdate(application);
    setUpdateStatus(status);
    setConfirmDialogOpen(true);
  };

  const handleConfirmUpdate = () => {
    dispatch(
      updateRentalApplicationStatusRequest({
        applicationId: applicationToUpdate._id,
        status: updateStatus,
      })
    );
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
        Rental Applications -{" "}
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
        <div className="text-center ">
          <div className="mb-3 mt-20">
            <img
              src="/assets/images/no-data.png"
              style={{ width: "200px" }}
              alt="No Data Found"
            />
          </div>
          <label>No Applications Recieved</label>
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
                        {application.previous_addresses}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 2, color: "#2c3e50" }}
                      >
                        Financial Information
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        <strong>Bank Account Name:</strong>{" "}
                        {application.bank_account_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        <strong>Account Type:</strong>{" "}
                        {application.account_type}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        <strong>IFSC Code:</strong> {application.ifsc_code}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        <strong>Reason For Moving:</strong>{" "}
                        {application.reason_for_moving}
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
                          handleUpdateApplicationStatus(application, "approved")
                        }
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleUpdateApplicationStatus(application, "rejected")
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

export default RentalApplicationsPage;
