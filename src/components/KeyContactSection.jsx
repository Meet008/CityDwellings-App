import { Box, Container } from "@mui/material";
import React from "react";
import KeyContactCard from "./KeyContactCard";
import Person1Img from "../assets/images/Meet_headshot.png";
import Person2Img from "../assets/images/Umangi_headshot.jpeg";

function KeyContactSection() {
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "space-around", lg: "space-between" },
          alignItems: "center",
        }}
      >
        <KeyContactCard
          img={Person1Img}
          name="Meet Chothani"
          title="General Manager"
          tel="4375568415"
        />
        <KeyContactCard
          img={Person2Img}
          name="Umangi Chothani"
          title="Branch Manager"
          tel="8000370933"
        />
      </Container>
    </Box>
  );
}

export default KeyContactSection;
