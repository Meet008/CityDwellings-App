import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPropertyByIdRequest } from "../components/RentSaleComponents/RentSaleSlice";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import RentSaleProperty from "../components/RentSaleComponents/RentSaleProperty";
import { Box } from "@mui/material";

function RentProperty() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { property, isLoading } = useSelector((state) => state.rentsale);

  useEffect(() => {
    dispatch(fetchPropertyByIdRequest({ id, type: "rent" })); // Ensure to pass type as 'rent'
  }, [dispatch, id]);

  return (
    <Box>
      <Navigation />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        property && (
          <RentSaleProperty
            propertyAddress={property.address}
            propertyImage={property.images[0]} // Assuming the first image is the main image
            propertyImages={property.images}
            propertyPrice={property.price}
            propertyLongDescription={property.description}
            propertyBedrooms={property.bedrooms}
            propertyBathrooms={property.bathrooms}
            propertyLivingrooms={property.livingrooms || 1}
          />
        )
      )}

      <Footer />
    </Box>
  );
}

export default RentProperty;
