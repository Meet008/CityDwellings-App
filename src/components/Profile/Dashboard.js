import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

const Dashboard = () => {
  // Mock data (replace with actual data fetching logic)
  const occupancyRate = 82; // in percentage
  const rentalYield = 5.2; // in percentage
  const averageRentPrice = 2200; // per month
  const averageSalePrice = 550000; // per property
  const marketTrend = "Upward"; // Example trend indicator

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Occupancy Rate */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Occupancy Rate
            </Typography>
            <Typography variant="h4">{occupancyRate}%</Typography>
          </Paper>
        </Grid>

        {/* Rental Yield */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Rental Yield
            </Typography>
            <Typography variant="h4">{rentalYield}%</Typography>
          </Paper>
        </Grid>

        {/* Average Rent Price */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Average Rent Price
            </Typography>
            <Typography variant="h4">£{averageRentPrice}</Typography>
          </Paper>
        </Grid>

        {/* Average Sale Price */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Average Sale Price
            </Typography>
            <Typography variant="h4">£{averageSalePrice}</Typography>
          </Paper>
        </Grid>

        {/* Market Trend */}
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Trend
              </Typography>
              <Typography variant="h5" color="primary">
                {marketTrend}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
