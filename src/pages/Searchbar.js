import React from "react";
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
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const SearchBarForm = () => {
  const navigate = useNavigate();
  return (
    <div
      className="row mx-20"
      style={{
        paddingTop: "150px",
        backgroundImage: `url("/assets/images/chicagoskyline-.jpg")`,
        height: "300px",
        objectFit: "contain",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="d-flex justify-content-center">
        <Select
          options={[{ label: "Ahmedabad", value: "ahmedabad" }]}
          style={{ width: "50%" }}
          size="large"
          placeholder="Select City"
          showSearch
          onChange={(e) => {
            navigate("/profile/dashboard");
          }}
        />
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
