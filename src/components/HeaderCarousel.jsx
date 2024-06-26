import React from "react";
import Carousel from "react-material-ui-carousel";
import { TextField, Box } from "@mui/material";
import items from "../assets/items";
import Item from "../components/Item";
import Searchbar from "../pages/Searchbar";

const HeaderCarousel = () => {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Searchbar />
      <Carousel
        next={(next, active) => `${active}, ${next}`}
        prev={(prev, active) => `${active}, ${prev}`}
        interval={2000}
        sx={{ marginTop: "60px" }} // Adjust margin if needed
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};

export default HeaderCarousel;
