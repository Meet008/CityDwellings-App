import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  Badge,
} from "@mui/material";
import {
  LocationOnOutlined,
  Close,
  ArrowDropDown,
  HomeRounded,
  LocalOffer,
  Checklist,
  Tune,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Select, Input } from "antd";
import { useNavigate } from "react-router-dom";

const SearchBarForm = () => {
  const navigate = useNavigate();
  const [all_filter, set_all_filter] = useState({
    city: null,
    type: "Residential",
    priceMax: "",
    beds: null,
  });
  return (
    <div
      className="row mx-20 px-0"
      style={{
        backgroundImage: `url("/assets/images/review-img.jpg")`,
        height: "500px",
        objectFit: "contain",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="col-12 d-flex justify-content-center"
        style={{ paddingTop: "200px", background: "#00000082" }}
      >
        <div className="searchBarCustom">
          <div style={{ background: "#00000082", padding: "16px 22px" }}>
            <div>
              <Select
                options={[
                  { label: "Ahmedabad", value: "ahmedabad" },
                  { label: "Surat", value: "surat" },
                  { label: "Rajkot", value: "rajkot" },
                  { label: "Baroda", value: "baroda" },
                ]}
                style={{ width: "100%" }}
                size="large"
                value={all_filter?.city}
                placeholder="Select City"
                showSearch
                allowClear
                onChange={(e) => {
                  set_all_filter({ ...all_filter, city: e });
                }}
              />
            </div>
            <div className="d-flex mt-3">
              <Select
                options={[
                  { label: "Residential", value: "residential" },
                  { label: "Commercial", value: "commercial" },
                ]}
                className="me-3"
                style={{ width: "30%" }}
                size="large"
                placeholder="Select Type"
                showSearch
                allowClear
                value={all_filter?.type}
                onChange={(e) => {
                  set_all_filter({ ...all_filter, type: e });
                }}
              />
              <Select
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                ]}
                className="me-3"
                style={{ width: "30%" }}
                size="large"
                placeholder="Select Beds"
                showSearch
                allowClear
                value={all_filter?.beds}
                onChange={(e) => {
                  set_all_filter({ ...all_filter, beds: e });
                }}
              />{" "}
              <Input
                className="me-3"
                style={{ width: "30%" }}
                size="large"
                placeholder="Enter priceMax"
                value={all_filter?.priceMax}
                onChange={(e) => {
                  set_all_filter({ ...all_filter, priceMax: e.target.value });
                }}
              />
              <div>
                <img
                  src="/assets/images/search.png"
                  style={{ width: "42px" }}
                  onClick={() => {
                    navigate("/sale", {
                      state: {
                        city: all_filter?.city,
                        type: all_filter?.type,
                        priceMax: all_filter?.priceMax,
                        beds: all_filter?.beds,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <form
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search Location"
          defaultValue="Toronto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton aria-label="Clear" title="Clear">
                  <Close />
                </IconButton>
                <IconButton aria-label="Open" title="Open">
                  <ArrowDropDown />
                </IconButton>
              </Box>
            ),
          }}
        />
        <Button
          variant="text"
          startIcon={<HomeRounded />}
          endIcon={<ArrowDropDown />}
          sx={{ ml: 2, textTransform: "none" }}
        >
          Residential
        </Button>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Button
          variant="text"
          startIcon={<LocalOffer />}
          endIcon={<ArrowDropDown />}
          sx={{ textTransform: "none" }}
        >
          Price
        </Button>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Button
          variant="text"
          startIcon={<Checklist />}
          endIcon={<ArrowDropDown />}
          sx={{ textTransform: "none" }}
        >
          Features
        </Button>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton aria-label="search filters button">
            <Badge badgeContent={0} color="primary">
              <Tune />
            </Badge>
          </IconButton>
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
    </form>
  );
};

export default SearchBarForm;
