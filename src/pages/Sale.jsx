import React, { useEffect } from "react";
import SaleItem from "../components/SaleItem";
import Navigation from "../components/Navigation";
import { Container } from "@mui/material";
import SecondHeader from "../components/SecondHeader";
import SaleHeaderImg from "../assets/images/sale-header-img.jpg";
import saleItems from "../assets/saleItems";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { Input, Select } from "antd";
import { useState } from "react";

function Sale() {
  const location = useLocation();
  const { city } = location.state || {};
  const [all_filter, set_all_filter] = useState({ city: null });
  useEffect(() => {
    if (city) {
      set_all_filter({
        ...all_filter,
        city: city,
        transaction_type: null,
        beds: null,
      });
    }
  }, [city]);

  useEffect(() => {
    // filter api call
  }, [all_filter]);

  return (
    <div>
      <Navigation />
      <SecondHeader
        title="Properties for sale"
        img={SaleHeaderImg}
        imgPosition="bottom"
      />
      <Container>
        <div style={{ marginTop: "50px" }}>
          <div className="row">
            <div className="col-3">
              <Select
                options={[
                  { label: "Ahmedabad", value: "ahmedabad" },
                  { label: "Surat", value: "surat" },
                  { label: "Rajkot", value: "rajkot" },
                  { label: "Baroda", value: "baroda" },
                ]}
                style={{ width: "100%" }}
                size="large"
                placeholder="Select City"
                showSearch
                value={all_filter?.city}
                onChange={(e) => {
                  set_all_filter({ ...all_filter, city: e });
                }}
              />
            </div>
            <div className="col-2">
              <Select
                options={[
                  {
                    label: "For Sale",
                    value: "for_sale",
                  },
                  { label: "For Rent", value: "for_rent" },
                  { label: "Sold", value: "sold" },
                ]}
                style={{ width: "100%" }}
                size="large"
                placeholder="Transaction Type"
                showSearch
                value={all_filter?.transaction_type}
                onChange={(e) => {
                  set_all_filter({ ...all_filter, transaction_type: e });
                }}
              />
            </div>{" "}
            <div className="col-2">
              <Select
                options={[
                  {
                    label: "Any",
                    value: "any",
                  },

                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                ]}
                style={{ width: "100%" }}
                size="large"
                placeholder="Select Beds"
                showSearch
                value={all_filter?.beds}
                onChange={(e) => {
                  set_all_filter({ ...all_filter, beds: e });
                }}
              />
            </div>
          </div>
        </div>
        {saleItems.map((item) => (
          <SaleItem
            key={item.id}
            id={item.id}
            title={item.title}
            address={item.address}
            price={item.price}
            shortDescription={item.shortDescription}
            bedrooms={item.bedrooms}
            bathrooms={item.bathrooms}
            livingrooms={item.livingrooms}
            img={item.image1}
          />
        ))}
      </Container>
      <Footer />
    </div>
  );
}

export default Sale;
