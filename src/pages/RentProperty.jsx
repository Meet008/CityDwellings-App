import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPropertyByIdRequest } from "../components/RentSaleComponents/RentSaleSlice";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import RentSaleProperty from "../components/RentSaleComponents/RentSaleProperty";
import { Box, Container } from "@mui/material";
import { Skeleton } from "antd";

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
        <Box>
          <Container>
            <div>
              <div className="row ">
                <div className="col-6 mt-2 d-flex justify-content-center">
                  <Skeleton.Image size="large" active block />
                </div>{" "}
                <div className="col-6">
                  <div className="mt-2">
                    <Skeleton.Button size="large" active block />
                  </div>{" "}
                  <div className="mt-2">
                    <Skeleton.Button size="large" active block />
                  </div>{" "}
                  <div className="mt-2">
                    <Skeleton size="large" active block />
                  </div>
                </div>
              </div>{" "}
              <div className="row mt-5">
                <div className="col-6 mt-2 d-flex justify-content-center">
                  <Skeleton.Image size="large" active block />
                </div>{" "}
                <div className="col-6">
                  <div className="mt-2">
                    <Skeleton.Button size="large" active block />
                  </div>{" "}
                  <div className="mt-2">
                    <Skeleton.Button size="large" active block />
                  </div>{" "}
                  <div className="mt-2">
                    <Skeleton size="large" active block />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Box>
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
            tourId={property.tourId}
            propertyId={property._id}
            category={"rent"}
          />
        )
      )}

      <Footer />
    </Box>
  );
}

export default RentProperty;
