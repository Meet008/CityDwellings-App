import { Box, Container } from "@mui/material";
import React from "react";
import KeyContactCard from "./KeyContactCard";
import Person1Img from "../assets/images/Meet.jpeg";
import Person2Img from "../assets/images/person2.jpg";

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
          name="Kulwinder Kaur"
          title="Branch Manager"
          tel="0500400300"
        />
      </Container>
    </Box>
  );
}

export default KeyContactSection;
