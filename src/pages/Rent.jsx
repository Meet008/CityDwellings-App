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
import RentHeaderImg from "../assets/images/rent-header-img.jpg";

function Rent() {
  const location = useLocation();
  const { city } = location.state || {};

  const dispatch = useDispatch();
  const { properties, isLoading, filterOptions } = useSelector(
    (state) => state.rentsale
  );

  const initialState = {
    category: "rent",
    city: city || "",
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

  return (
    <div>
      <Navigation />
      <SecondHeader
        title="Rent a property"
        img={RentHeaderImg}
        imgPosition="bottom"
        direction="row-reverse"
      />
      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFilters(initialState)}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          properties.map((property) => (
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

export default Rent;
