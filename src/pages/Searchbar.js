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

const SearchBarForm = () => {
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
