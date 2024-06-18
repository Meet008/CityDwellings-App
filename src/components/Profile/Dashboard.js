import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { DatePicker, Select } from "antd";
import React, { useState } from "react";
import Chart from "react-apexcharts";
const { RangePicker } = DatePicker;
const Dashboard = () => {
  // id Pass admin@city.com
  // Mock data (replace with actual data fetching logic)
  const occupancyRate = 82; // in percentage
  const rentalYield = 5.2; // in percentage
  const averageRentPrice = 2200; // per month
  const averageSalePrice = 550000; // per property
  const marketTrend = "Upward"; // Example trend indicator

  const [city, setCity] = useState("ahmedabad");
  const [series, setSeries] = useState([
    {
      name: "Total Profit",
      data: [50, 20, 2, 15, 67, 24, 90],
    },
    {
      name: "Sold Properties",
      data: [10, 4, 2, 16, 32, 78, 21],
    },
  ]);
  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    colors: ["#1976d2", "#f07917"],

    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  };
  const pieSeries = [44, 55, 13];
  const pieChartOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Total Properties", "Properties Rented", "Properties Sold"],
    colors: ["#1976d2", "#f07917", "#789f57"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <>
      <div style={{ border: "1px solid transparent" }}>
        <div
          className="row px-0 mx-0"
          style={{
            borderBottom: "1px dashed grey",
            display: "flex",
            padding: "9px",
            // borderRadius: "6px",
          }}
        >
          <div style={{ width: "250px" }}>
            <RangePicker size="large" style={{ width: "100%" }} />
          </div>
          <div style={{ width: "200px" }}>
            <Select
              style={{ width: "100%" }}
              size="large"
              placeholder="Select City"
              value={city}
              onChange={(e) => {
                setCity(e);
                // Make api call when city change
              }}
              options={[
                { label: "Ahmedabad", value: "ahmedabad" },
                { label: "Surat", value: "surat" },
                { label: "Baroda", value: "baroda" },
              ]}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <div
              style={{
                border: "1px solid #c89851",
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
                background: "#f8f2e8",
              }}
              className="p-2"
            >
              <div className="me-2">
                <img
                  src="/assets/images/residential.png"
                  style={{ width: "30px" }}
                />
              </div>
              <div>
                <div>
                  <label style={{ fontWeight: "bold" }}>Total Commercial</label>
                </div>
                <div>{"200"}</div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div
              style={{
                border: "1px solid #5c5cf5",
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
                background: "#e3e3ff",
              }}
              className="p-2"
            >
              <div className="me-2">
                <img src="/assets/images/house.png" style={{ width: "30px" }} />
              </div>
              <div>
                <div>
                  <label style={{ fontWeight: "bold" }}>
                    Total Residential
                  </label>
                </div>
                <div>{"200"}</div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div
              style={{
                border: "1px solid #4aad4a",
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
                background: "#d9ecd9",
              }}
              className="p-2"
            >
              <div className="me-2">
                <img src="/assets/images/land.png" style={{ width: "30px" }} />
              </div>
              <div>
                <div>
                  <label style={{ fontWeight: "bold" }}>Total Land</label>
                </div>
                <div>{"200"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-0 mx-0 mt-4">
          <div
            className="col-12 "
            style={{
              border: "1px solid #cbcbcb",
              background: "#f3f3f3",
              borderRadius: "6px",
            }}
          >
            {" "}
            <div className="row mt-3 mx-0 px-0">
              <div
                className="col-12 p-3"
                style={{ borderBottom: "1px dashed grey" }}
              >
                <label style={{ fontWeight: "bold" }}>Booking Status</label>
              </div>
              <div className="col-12">
                <Chart
                  options={options}
                  series={series}
                  type="area"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row px-0 mx-0 mt-4">
          <div
            className="col-12 col-lg-6"
            style={{
              border: "1px solid #cbcbcb",
              background: "#f3f3f3",
              borderRadius: "6px",
            }}
          >
            <div className="row mt-3 mx-0 px-0">
              <div
                className="col-12 p-3"
                style={{ borderBottom: "1px dashed grey" }}
              >
                <label style={{ fontWeight: "bold" }}>Booking Status</label>
              </div>
              <div className="col-12">
                <Chart
                  options={pieChartOptions}
                  series={pieSeries}
                  type="pie"
                  height={350}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div
              className="row mx-0 px-0"
              // style={{
              //   border: "1px solid #cbcbcb",
              //   background: "#f3f3f3",
              //   borderRadius: "6px",
              // }}
            >
              <div
                className="col-12 p-3"
                style={{ borderBottom: "1px dashed grey" }}
              >
                <label style={{ fontWeight: "bold" }}>Lattest Sales</label>
              </div>
              <div className="col-12"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Umangi */}
      {/* <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Occupancy Rate
              </Typography>
              <Typography variant="h4">{occupancyRate}%</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Rental Yield
              </Typography>
              <Typography variant="h4">{rentalYield}%</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Average Rent Price
              </Typography>
              <Typography variant="h4">£{averageRentPrice}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Average Sale Price
              </Typography>
              <Typography variant="h4">£{averageSalePrice}</Typography>
            </Paper>
          </Grid>

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
      </Box> */}
    </>
  );
};

export default Dashboard;
