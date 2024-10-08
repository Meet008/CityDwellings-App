import React, { useEffect } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import Navigation from "../components/Navigation";
import HeaderCarousel from "../components/HeaderCarousel";
import AboutUsSection from "../components/AboutUsSection";
import reviewImg from "../assets/images/review-img.jpg";
import KeyContactSection from "../components/KeyContactSection";
import WhyChooseUs from "../components/WhyChooseUsComponents/WhyChooseUs";
import ReviewsSection from "../components/ReviewsComponents/ReviewsSection";
import ContactCardsSection from "../components/ContactPageComponents/ContactCardsSection";
import Footer from "../components/Footer";
import { grey } from "@mui/material/colors";
import DiscoverSection from "../components/DiscoverSection";
import MultiItemsCarousel from "../components/MultiItemsCarousel/MultiItemsCarousel";
import Searchbar from "./Searchbar";

function Home() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div>
      <Navigation />

      {/* Uncomment to use HeaderCarousel */}
      {/* <Box sx={{ backgroundColor: grey[100] }}>
        <HeaderCarousel />
      </Box> */}

      <Box>
        <Searchbar />
      </Box>

      <Box
        sx={{
          backgroundColor: grey[100],
          paddingY: "3rem",
        }}
      >
        <AboutUsSection />
        <KeyContactSection />
      </Box>

      <MultiItemsCarousel />

      <DiscoverSection />

      <WhyChooseUs />

      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${reviewImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <ReviewsSection />
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: grey[100],
          paddingY: "3rem",
        }}
      >
        <ContactCardsSection />
      </Box>

      <Footer />
    </div>
  );
}

export default Home;
