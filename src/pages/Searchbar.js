import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterOptionsRequest } from "../components/RentSaleComponents/RentSaleSlice";

const toUpperCase = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const SearchBarForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, filterOptions } = useSelector((state) => state.rentsale);

  useEffect(() => {
    dispatch(fetchFilterOptionsRequest());
  }, [dispatch]);

  const initialState = {
    city: "",
    priceMax: "",
    beds: "",
    listingType: "",
  };

  const [filters, setFilters] = useState(initialState);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    navigate("/sale", { state: filters });
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url("/assets/images/review-img.jpg")`,
        height: "500px",
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Light black overlay
          display: "flex", // Add flexbox to the overlay
          justifyContent: "center", // Center content horizontally
          alignItems: "center", // Center content vertically
        }}
      />
      <Box
        sx={{
          background: "#00000082",
          padding: "16px 22px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel
                sx={{
                  color: "orange",
                  fontWeight: "bold",
                  "&.Mui-focused": { color: "orange", fontWeight: "bold" },
                  fontSize: "0.9rem",
                  lineHeight: "1.1rem",
                }}
              >
                Select City
              </InputLabel>
              <Select
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                label="Select City"
                sx={{
                  backgroundColor: "white",
                  height: "40px",
                  fontSize: "0.9rem",
                  lineHeight: "1.1rem",
                }}
              >
                {filterOptions.cities?.map((city) => (
                  <MenuItem
                    key={city}
                    value={city}
                    sx={{
                      fontSize: "0.9rem",
                      padding: "6px 12px",
                    }}
                  >
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" gap={2}>
              <FormControl variant="outlined" sx={{ flex: 1 }}>
                <InputLabel
                  sx={{
                    color: "orange",
                    fontWeight: "bold",
                    "&.Mui-focused": { color: "orange", fontWeight: "bold" },
                    fontSize: "0.9rem",
                    lineHeight: "1.1rem",
                  }}
                >
                  Select Type
                </InputLabel>
                <Select
                  value={filters.listingType}
                  onChange={(e) =>
                    handleFilterChange("listingType", e.target.value)
                  }
                  label="Select Type"
                  sx={{
                    backgroundColor: "white",
                    height: "40px",
                    fontSize: "0.9rem",
                    lineHeight: "1.1rem",
                  }}
                >
                  {filterOptions.listingTypes?.map((type) => (
                    <MenuItem
                      key={type}
                      value={type}
                      sx={{
                        fontSize: "0.9rem",
                        padding: "6px 12px",
                      }}
                    >
                      {toUpperCase(type)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ flex: 1 }}>
                <InputLabel
                  sx={{
                    color: "orange",
                    fontWeight: "bold",
                    "&.Mui-focused": { color: "orange", fontWeight: "bold" },
                    fontSize: "0.9rem",
                    lineHeight: "1.1rem",
                  }}
                >
                  Max Price
                </InputLabel>
                <Select
                  value={filters.priceMax}
                  onChange={(e) =>
                    handleFilterChange("priceMax", e.target.value)
                  }
                  label="Max Price"
                  sx={{
                    backgroundColor: "white",
                    height: "40px",
                    fontSize: "0.9rem",
                    lineHeight: "1.1rem",
                  }}
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
              <FormControl variant="outlined" sx={{ flex: 1 }}>
                <InputLabel
                  sx={{
                    color: "orange",
                    fontWeight: "bold",
                    "&.Mui-focused": { color: "orange", fontWeight: "bold" },
                    fontSize: "0.9rem",
                    lineHeight: "1.1rem",
                  }}
                >
                  Beds
                </InputLabel>
                <Select
                  value={filters.beds}
                  onChange={(e) => handleFilterChange("beds", e.target.value)}
                  label="Beds"
                  sx={{
                    backgroundColor: "white",
                    height: "40px",
                    fontSize: "0.9rem",
                    lineHeight: "1.1rem",
                  }}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
              </FormControl>
              <Tooltip title="Search" arrow>
                <Button
                  variant="text"
                  sx={{ alignSelf: "center", padding: 0, minWidth: 0 }}
                  onClick={handleSearch}
                >
                  <img
                    src="/assets/images/search.png"
                    style={{ width: "42px" }}
                    alt="Search"
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Reset Filters" arrow>
                <Button
                  variant="text"
                  sx={{ alignSelf: "center", padding: 0, minWidth: 0 }}
                  onClick={() => setFilters(initialState)}
                >
                  <img
                    src="/assets/images/undo.png"
                    style={{
                      width: "42px",
                      transform: "rotate(0deg)",
                    }}
                    alt="Reset"
                  />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchBarForm;
