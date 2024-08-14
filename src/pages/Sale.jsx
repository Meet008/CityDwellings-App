import React, { useEffect, useState } from "react";
import {
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPropertiesRequest,
  fetchFilterOptionsRequest,
} from "../components/RentSaleComponents/RentSaleSlice";
import SaleItem from "../components/SaleItem";
import Navigation from "../components/Navigation";
import SecondHeader from "../components/SecondHeader";
import SaleHeaderImg from "../assets/images/sale-header-img.jpg";
import Footer from "../components/Footer";
import saleItems from "../assets/saleItems";
import { Skeleton } from "antd";

const toUpperCase = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function Sale() {
  const location = useLocation();
  const { city, listingType, priceMax, beds } = location.state || {};

  const dispatch = useDispatch();
  const { properties, isLoading, filterOptions } = useSelector(
    (state) => state.rentsale
  );

  const initialState = {
    category: "sale",
    city: city || "",
    state: "",
    listingType: listingType || "",
    priceMin: "", // New state for minimum price
    priceMax: priceMax || "", // New state for maximum price
    bedrooms: beds || "",
    bathrooms: "",
    furnished: "",
    parking: "",
    yearBuilt: "",
  };

  const initialStateReset = {
    category: "sale",
    city: "",
    state: "",
    listingType: "",
    priceMin: "", // New state for minimum price
    priceMax: "", // New state for maximum price
    bedrooms: "",
    bathrooms: "",
    furnished: "",
    parking: "",
    yearBuilt: "",
  };

  const [filters, setFilters] = useState(initialState);
  const [isOpenOtherFilter, setIsOpenOtherFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchFilterOptionsRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPropertiesRequest({ filters }));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  const [numOfRowsForSkeleton, setNumOfRowsForSkeleton] = useState([
    1, 2, 3, 4,
  ]);

  return (
    <div>
      <Navigation />
      <SecondHeader
        title="Properties for sale"
        img={SaleHeaderImg}
        imgPosition="bottom"
      />

      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        <div
          className="row mb-4 mx-0 px-0"
          style={{
            padding: "18px",
            // background: "#00000014",
            borderRadius: "7px",
            border: "1px dashed #f07917",
            boxShadow: "0px 0px 20px -10px #ed6c02",
          }}
        >
          <div className="col-12  my-2">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select City</InputLabel>
              <Select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                label="Select City"
              >
                {filterOptions.cities?.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6 col-md-3 col-lg-2 my-2">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Transaction</InputLabel>
              <Select
                name="listingType"
                value={filters.listingType}
                onChange={handleFilterChange}
                label="Transaction"
              >
                {filterOptions.listingTypes?.map((type) => (
                  <MenuItem key={type} value={type}>
                    {toUpperCase(type)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-6 col-md-3 col-lg-2 my-2">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Bedrooms</InputLabel>
              <Select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                label="Bedrooms"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="1+">1+</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="2+">2+</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="3+">3+</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="4+">4+</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-6 col-md-3 col-lg-2 my-2">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Bathrooms</InputLabel>
              <Select
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
                label="Bathrooms"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="1+">1+</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="2+">2+</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="3+">3+</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="4+">4+</MenuItem>
              </Select>
            </FormControl>
          </div>

          {isOpenOtherFilter && (
            <>
              {" "}
              <div className="col-6 col-md-2 col-lg-2 my-2 fadeContentDiv">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Furnished?</InputLabel>
                  <Select
                    name="furnished"
                    value={filters.furnished}
                    onChange={handleFilterChange}
                    label="Furnished?"
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-6 col-md-3 col-lg-2 my-2 fadeContentDiv">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Parking?</InputLabel>
                  <Select
                    name="parking"
                    value={filters.parking}
                    onChange={handleFilterChange}
                    label="Parking?"
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-6 col-md-3 col-lg-2 my-2 fadeContentDiv">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Year Built</InputLabel>
                  <Select
                    name="yearBuilt"
                    value={filters.yearBuilt}
                    onChange={handleFilterChange}
                    label="Year Built"
                  >
                    {filterOptions.yearsBuilt?.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-6 col-md-3 col-lg-2 my-2 fadeContentDiv">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Min Price</InputLabel>
                  <Select
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    label="Min Price"
                  >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="25000">25,000</MenuItem>
                    <MenuItem value="50000">50,000</MenuItem>
                    <MenuItem value="75000">75,000</MenuItem>
                    <MenuItem value="100000">100,000</MenuItem>
                    <MenuItem value="125000">125,000</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-6 col-md-3 col-lg-2 my-2 fadeContentDiv">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Max Price</InputLabel>
                  <Select
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    label="Max Price"
                  >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="25000">25,000</MenuItem>
                    <MenuItem value="50000">50,000</MenuItem>
                    <MenuItem value="75000">75,000</MenuItem>
                    <MenuItem value="100000">100,000</MenuItem>
                    <MenuItem value="125000">125,000</MenuItem>
                    <MenuItem value="9999999">Above 125,000</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </>
          )}

          <div className="col-12 col-md-5 col-lg-4 my-2 d-flex align-items-center">
            <div className="d-flex">
              {" "}
              <div
                className="me-2"
                onClick={() => setIsOpenOtherFilter(!isOpenOtherFilter)}
              >
                {" "}
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setFilters(initialState)}
                >
                  {/* <img
                    src="/assets/images/down-arrow.png"
                    style={{
                      width: "30px",
                      transform: isOpenOtherFilter ? "rotate(179deg)" : "",
                    }}
                    className="me-2"
                  />{" "} */}
                  {!isOpenOtherFilter ? "More Filters" : "Less Filters"}
                </Button>
              </div>
              <div>
                <Tooltip title="Search" arrow>
                  <img
                    src="/assets/images/search.png"
                    style={{ width: "42px" }}
                    className="me-2"
                    onClick={() => {
                      setFilters({ ...filters });
                    }}
                  />
                </Tooltip>
              </div>
              <div
                className="text-center"
                onClick={() => setFilters(initialStateReset)}
              >
                <Tooltip title="Reset Filters" arrow>
                  <img
                    src="/assets/images/refreshing.png"
                    style={{ width: "42px", transform: "rotate(253deg)" }}
                    className="me-2"
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ borderBottom: "1px dashed #bdbdbd" }}
          className="my-3"
        ></div>
        {/* <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            Refine Your Search
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select City</InputLabel>
                <Select
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  label="Select City"
                >
                  {filterOptions.cities?.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  name="listingType"
                  value={filters.listingType}
                  onChange={handleFilterChange}
                  label="Transaction Type"
                >
                  {filterOptions.listingTypes?.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Bedrooms</InputLabel>
                <Select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  label="Select Bedrooms"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="1+">1+</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="2+">2+</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="3+">3+</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="4+">4+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Bathrooms</InputLabel>
                <Select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  label="Select Bathrooms"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="1+">1+</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="2+">2+</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="3+">3+</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="4+">4+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Furnished?</InputLabel>
                <Select
                  name="furnished"
                  value={filters.furnished}
                  onChange={handleFilterChange}
                  label="Furnished?"
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Parking?</InputLabel>
                <Select
                  name="parking"
                  value={filters.parking}
                  onChange={handleFilterChange}
                  label="Parking?"
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Year Built</InputLabel>
                <Select
                  name="yearBuilt"
                  value={filters.yearBuilt}
                  onChange={handleFilterChange}
                  label="Select Year Built"
                >
                  {filterOptions.yearsBuilt?.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Min Price</InputLabel>
                    <Select
                      name="priceMin"
                      value={filters.priceMin}
                      onChange={handleFilterChange}
                      label="Min Price"
                    >
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="0">0</MenuItem>
                      <MenuItem value="25000">25,000</MenuItem>
                      <MenuItem value="50000">50,000</MenuItem>
                      <MenuItem value="75000">75,000</MenuItem>
                      <MenuItem value="100000">100,000</MenuItem>
                      <MenuItem value="125000">125,000</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Max Price</InputLabel>
                    <Select
                      name="priceMax"
                      value={filters.priceMax}
                      onChange={handleFilterChange}
                      label="Max Price"
                    >
                      <MenuItem value="">Any</MenuItem>
                      <MenuItem value="25000">25,000</MenuItem>
                      <MenuItem value="50000">50,000</MenuItem>
                      <MenuItem value="75000">75,000</MenuItem>
                      <MenuItem value="100000">100,000</MenuItem>
                      <MenuItem value="125000">125,000</MenuItem>
                      <MenuItem value="9999999">Above 125,000</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Type</InputLabel>
                <Select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  label="Select Type"
                >
                  <MenuItem key="residential" value="residential">
                    Residential
                  </MenuItem>
                  <MenuItem key="residential" value="residential">
                    Commercial
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFilters(initialState)}
              >
                Reset Filters
              </Button>
              <img src="/assets/images/search.png" style={{ width: "42px" }} />
            </Grid>
          </Grid>
        </Paper> */}
        <div className="row d-flex align-items-center justify-content-center mb-3">
          <label
            className="fw-bold"
            style={{ fontSize: "22px", color: "#ff700d" }}
          >
            Property List
          </label>
        </div>
        {isLoading ? (
          <>
            {numOfRowsForSkeleton?.map((d) => {
              return (
                <>
                  {" "}
                  <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-12 my-1">
                          <Skeleton.Button active />
                        </div>
                        <div className="col-12 my-1">
                          <Skeleton.Button block active />
                        </div>
                        <div className="col-12 my-1">
                          <Skeleton.Button block active />
                        </div>
                        <div className="col-12 my-1">
                          <Skeleton.Button block active />
                        </div>
                        <div className="col-6 my-1">
                          <Skeleton.Button block active />
                        </div>
                        <div className="col-6 my-1 text-end">
                          <Skeleton.Button active />
                        </div>
                      </div>
                    </div>
                    <div className="col-4 d-flex align-items-center justify-content-center">
                      <Skeleton.Image block active />
                    </div>
                  </div>{" "}
                  <div
                    style={{ borderBottom: "1px dashed #bdbdbd" }}
                    className="my-3"
                  ></div>
                </>
              );
            })}
          </>
        ) : properties?.length > 0 ? (
          properties?.map((property) => (
            <SaleItem
              key={property._id}
              id={property._id}
              title={property.title}
              address={property.address}
              price={property.price}
              shortDescription={truncateText(property.description, 100)}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              livingrooms={property.livingrooms || 1}
              img={
                property.images && property.images.length > 0
                  ? property.images[0]
                  : null
              }
            />
          ))
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="text-center mt-3">
                <label className="fw-bold" style={{ fontSize: "20px" }}>
                  Properties not available
                </label>
                <div className="mt-5">
                  <img
                    src="/assets/images/no-data.png"
                    style={{ width: "300px" }}
                    alt="No Data"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {saleItems.map((item) => (
          <SaleItem
            key={item.id}
            id={item.id}
            title={item.title}
            address={item.address}
            price={item.price}
            shortDescription={item.shortDescription}
            bedrooms={item.bedrooms}
            bathrooms={item.bathrooms}
            livingrooms={item.livingrooms}
            img={item.image1}
          />
        ))} */}
      </Container>
      <Footer />
    </div>
  );
}

export default Sale;
