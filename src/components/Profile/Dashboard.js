import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { DatePicker, Popover, Select, Table, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
const Dashboard = () => {
  // id Pass admin@city.com
  // Mock data (replace with actual data fetching logic)
  const occupancyRate = 82; // in percentage
  const rentalYield = 5.2; // in percentage
  const averageRentPrice = 2200; // per month
  const averageSalePrice = 550000; // per property
  const marketTrend = "Upward"; // Example trend indicator
  const navigate = useNavigate();
  const [review_list, set_review_list] = useState([
    {
      id: 29,
      user_id: 194,

      review: "Excellent",
      suggestion: null,
      created_at: 1717156983,
      updated_at: 1717156983,
      user_name: "excellent ",
    },
    {
      id: 28,
      user_id: 186,

      review: "Average",
      suggestion: null,
      created_at: 1713049550,
      updated_at: 1713049550,
      user_name: "fikkobemli@gufum.com",
    },
    {
      id: 27,
      user_id: 182,

      review: "Poor",
      suggestion: null,
      created_at: 1710666750,
      updated_at: 1710666750,
      user_name: "Dieter",
    },
    {
      id: 26,
      user_id: 84,

      review: "Poor",
      suggestion: "absolutely nothing was working after spending £30",
      created_at: 1706906292,
      updated_at: 1706906292,
      user_name: "Ben Jones",
    },
    {
      id: 25,
      user_id: 92,

      review: "Poor",
      suggestion: "the profit  is massively wrong for this asin\nB0CH3SRR3L",
      created_at: 1699264519,
      updated_at: 1699264519,
      user_name: "Eamonn",
    },
    {
      id: 24,
      user_id: 81,

      review: "Poor",
      suggestion: null,
      created_at: 1697890859,
      updated_at: 1697890859,
      user_name: "amit",
    },
    {
      id: 23,
      user_id: 63,

      review: "Poor",
      suggestion: null,
      created_at: 1694847697,
      updated_at: 1694847697,
      user_name: "vraj",
    },
    {
      id: 22,
      user_id: 21,
      title: "My List",
      review: "Excellent",
      suggestion: null,
      created_at: 1692458930,
      updated_at: 1692458930,
      user_name: "Shashi Patel",
    },
    {
      id: 21,
      user_id: 43,

      review: "Poor",
      suggestion: null,
      created_at: 1689875225,
      updated_at: 1689875225,
      user_name: "Esat",
    },
    {
      id: 20,
      user_id: 39,

      review: null,
      suggestion:
        "Hi,\nI have still facing 404 issue in this module. Can you please update this issue ASAP.",
      created_at: 1689597210,
      updated_at: 1689597210,
      user_name: "Aaqib",
    },
  ]);
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
    noData: {
      text: "No Data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
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
    noData: {
      text: "No Data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
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

  const reviewListColor = {
    Excellent: "success",
    Good: "processing",
    Average: "warning",
    Poor: "error",
  };
  const reviewListColorIcon = {
    Excellent: "#52c41a",
    Good: "#1677ff",
    Average: "#faad14",
    Poor: "#ff4d4f",
  };

  const reviewColumns = [
    {
      title: "Sr.No.",
      width: 80,
      ellipsis: true,
      render: (_, __, i) => {
        return <span>{1 + i}</span>;
      },
    },
    {
      title: "Date",
      width: 220,
      // ellipsis: true,
      render: (text) => {
        return (
          <div>
            <span>
              {moment(new Date(text.updated_at * 1000)).format(
                "MMM DD, YYYY hh:mm A"
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: "User Name",
      width: 200,
      // ellipsis: true,
      render: (text) => {
        return <b>{text?.user_name || "N/A"}</b>;
      },
    },
    {
      title: "Feedback",
      width: 130,
      // ellipsis: false,
      render: (text) => {
        if (!text?.review) {
          return "-";
        }
        return <Tag color={reviewListColor[text?.review]}>{text?.review}</Tag>;
      },
    },

    {
      title: "User Comment",
      width: 600,
      // ellipsis: false,
      render: (text) => {
        if (!text.suggestion) {
          return "-";
        }
        return (
          <Popover
            placement="right"
            title=""
            getPopupContainer={(triger) => triger.parentNode}
            content={
              <div
                style={{
                  maxWidth: "400px",
                  wordBreak: "break-word",
                  minHeight: "20px",
                  maxHeight: "100px",
                  overflow: "auto",
                }}
              >
                {text?.suggestion}
              </div>
            }
            trigger="click"
          >
            <div className="actionIcon">{text?.suggestion}</div>
          </Popover>
        );
      },
    },
  ];
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
          <div className="col-12 col-md-6 col-lg-4 mt-2">
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
                {/* add you state with total Commercial key insted of 200 m if key have null or "" value then 0 will be set automatically and saame for all 2 header card */}
                <div>{"200" || 0}</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-2">
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
                <div>{"200" || 0}</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-2">
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
                <div>{"200" || 0}</div>
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
              <div className="text-center">
                <img
                  src="/assets/images/no-data.png"
                  style={{ width: "200px" }}
                />
                <div className="mt-5">
                  <label>
                    After your properties will sale , you can find your lattest
                    sale properties here...
                  </label>
                </div>
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
              {/* below design is for found lattest sale properties  only display lattst 5 properties ( filter using sale by date )*/}
              {/* <div className="col-12 d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex align-items-center">
                  <div
                    style={{ width: "40px", height: "40px" }}
                    className="d-flex me-3"
                  >
                    <img
                      src="/assets/images/ds1.jpeg"
                      style={{ objectFit: "contain", width: "100%" }}
                    />
                  </div>
                  <div>
                    <div>
                      <label className="fw-bold">New Apartment</label>
                    </div>
                    <div>North East UK</div>
                  </div>
                </div>
                <div>
                  <Tag color="green">$5000</Tag>
                </div>
              </div>
              <div
                className="col-12 my-3"
                style={{ borderBottom: "1px dashed lightgrey" }}
              ></div>
              <div className="col-12 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    style={{ width: "40px", height: "40px" }}
                    className="d-flex me-3"
                  >
                    <img
                      src="/assets/images/ds5.jpg"
                      style={{ objectFit: "contain", width: "100%" }}
                    />
                  </div>
                  <div>
                    <div>
                      <label className="fw-bold">New Apartment</label>
                    </div>
                    <div>North East UK</div>
                  </div>
                </div>
                <div>
                  <Tag color="green">$5000</Tag>
                </div>
              </div>{" "}
              <div
                className="col-12 my-3"
                style={{ borderBottom: "1px dashed lightgrey" }}
              ></div>
              <div className="col-12 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    style={{ width: "40px", height: "40px" }}
                    className="d-flex me-3"
                  >
                    <img
                      src="/assets/images/ds3.jpg"
                      style={{ objectFit: "contain", width: "100%" }}
                    />
                  </div>
                  <div>
                    <div>
                      <label className="fw-bold">New Apartment</label>
                    </div>
                    <div>North East UK</div>
                  </div>
                </div>
                <div>
                  <Tag color="green">$5000</Tag>
                </div>
              </div>{" "}
              <div
                className="col-12 my-3"
                style={{ borderBottom: "1px dashed lightgrey" }}
              ></div>
              <div className="col-12 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div
                    style={{ width: "40px", height: "40px" }}
                    className="d-flex me-3"
                  >
                    <img
                      src="/assets/images/bath1.jpg"
                      style={{ objectFit: "contain", width: "100%" }}
                    />
                  </div>
                  <div>
                    <div>
                      <label className="fw-bold">New Apartment</label>
                    </div>
                    <div>North East UK</div>
                  </div>
                </div>
                <div>
                  <Tag color="green">$5000</Tag>
                </div>
              </div>
              <div
                className="col-12 my-3"
                style={{ borderBottom: "1px dashed lightgrey" }}
              ></div> */}
            </div>
          </div>
        </div>

        <div className="fw-bold" style={{ marginTop: "50px" }}>
          Review List
        </div>
        <div className="row">
          <div className="col-12">
            <Table columns={reviewColumns} dataSource={review_list} />
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
