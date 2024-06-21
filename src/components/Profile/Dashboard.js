import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DatePicker, Select, Spin, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardDataStart } from "./userSlice";

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    series,
    totalCommercial,
    totalResidential,
    pieSeries,
    propertiesList,
  } = useSelector((state) => state.user.dashboardData);

  // const series = [
  //   {
  //     name: "Total Profit",
  //     // data: [],
  //     data: [50, 20, 2, 15, 67, 24, 90],
  //   },
  //   {
  //     name: "Sold Properties",
  //     // data: [],
  //     data: [10, 4, 2, 16, 32, 78, 21],
  //   },
  // ];

  // // const pieSeries = []; // Example data
  // const pieSeries = [44, 55, 13]; // Example data

  const { isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(series);
  }, [series]);

  const [city, setCity] = useState("ahmedabad");

  useEffect(() => {
    dispatch(fetchDashboardDataStart());
  }, [dispatch]);

  // Example options for ApexCharts
  const optionsAreaChart = {
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

  const optionsPieChart = {
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

  return (
    <>
      <div style={{ border: "1px solid transparent" }}>
        <div
          className="row px-0 mx-0"
          style={{
            borderBottom: "1px dashed grey",
            display: "flex",
            padding: "9px",
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
              onChange={(value) => {
                setCity(value);
                dispatch(fetchDashboardDataStart(value));
              }}
              options={[
                { label: "Ahmedabad", value: "ahmedabad" },
                { label: "Surat", value: "surat" },
                { label: "Baroda", value: "baroda" },
              ]}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="text-center mt-5">
            <Spin size="large" />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {/* Example of area chart */}
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
                      alt="Residential"
                    />
                  </div>
                  <div>
                    <div>
                      <label style={{ fontWeight: "bold" }}>
                        Total Commercial
                      </label>
                    </div>
                    <div>{totalCommercial || 0}</div>
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
                    <img
                      src="/assets/images/house.png"
                      style={{ width: "30px" }}
                      alt="House"
                    />
                  </div>
                  <div>
                    <div>
                      <label style={{ fontWeight: "bold" }}>
                        Total Residential
                      </label>
                    </div>
                    <div>{totalResidential || 0}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Area Chart */}
            {series.length > 0 ? (
              <div className="row px-0 mx-0 mt-4">
                <div
                  className="col-12 "
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
                      <label style={{ fontWeight: "bold" }}>
                        Booking Status
                      </label>
                    </div>
                    <div className="col-12">
                      <Chart
                        options={{ ...optionsAreaChart }}
                        series={[...series]} // Ensure series is a new array to avoid mutation
                        type="area"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-3">
                <p>No data available for area chart</p>
              </div>
            )}

            {/* Pie Chart */}
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
                    {pieSeries.length > 0 ? (
                      <Chart
                        options={{ ...optionsPieChart }}
                        series={[...pieSeries]} // Ensure pieSeries is a new array to avoid mutation
                        type="pie"
                        height={350}
                      />
                    ) : (
                      <div className="text-center mt-3">
                        <p>No data available for pie chart</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Latest Sales */}
              <div className="col-12 col-lg-6">
                <div className="row mx-0 px-0">
                  <div
                    className="col-12 p-3"
                    style={{ borderBottom: "1px dashed grey" }}
                  >
                    <label style={{ fontWeight: "bold" }}>Latest Sales</label>
                  </div>
                  {propertiesList?.length > 0 ? (
                    propertiesList.slice(0, 5).map((property, index) => (
                      <div key={index} className="col-12">
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <div>
                            <div>
                              <label className="fw-bold">
                                {property.title}
                              </label>
                            </div>
                            <div>{property.location}</div>
                          </div>
                          <div>
                            <Tag color="green">${property.price}</Tag>
                          </div>
                        </div>
                        {index < propertiesList.length - 1 && (
                          <div
                            className="col-12 my-3"
                            style={{ borderBottom: "1px dashed lightgrey" }}
                          ></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center mt-3">
                      <p>No latest sales data available</p>
                      <img
                        src="/assets/images/no-data.png"
                        style={{ width: "200px" }}
                        alt="No Data"
                      />
                      <div className="mt-3">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate("/profile/add-property")}
                        >
                          Add Properties
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
