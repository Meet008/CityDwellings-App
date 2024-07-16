import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { fetchUserApplicationsRequest } from "./userSlice";
import Navigation from "../../components/Navigation";

const UserApplications = () => {
  const dispatch = useDispatch();
  const { applications, isLoading } = useSelector((state) => state.user);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    dispatch(fetchUserApplicationsRequest({ userId }));
  }, [dispatch, userId]);

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
                          sx={{
                            fontWeight: "bold",
                            mb: 2,
                            color: "#2c3e50",
                          }}
                        >
                          Property Details
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Title:</strong> {application.property.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          <strong>Address:</strong>{" "}
                          {application.property.address}
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
                    <Typography variant="body1" color="textSecondary">
                      Status:{" "}
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default UserApplications;
