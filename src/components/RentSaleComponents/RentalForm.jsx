import { Button } from "@mui/material";
import { Input, Select } from "antd";
import React, { useState } from "react";

const RentalForm = () => {
  const [forn_data, set_form_data] = useState({ full_name: "" });

  const handleChangeFormData = (key, value) => {
    set_form_data({ ...forn_data, [key]: value });
  };
  return (
    <>
      <div className="row d-flex align-items-center justify-content-center mb-3">
        <label className="" style={{ fontSize: "22px", color: "#ff700d" }}>
          Rental Application
        </label>
      </div>
      <div className="row d-flex justify-content-center mt-5 mb-10">
        <div className="col-8">
          <label
            className=""
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
            }}
          >
            Personal Information
          </label>
        </div>

        <div className="col-8 mt-2">
          <label className="">Full Name</label>
          <Input
            size="large"
            onChange={(e) => {
              handleChangeFormData("full_name", e.target.value);
            }}
            value={forn_data?.full_name}
          />
        </div>
        <div className="col-8 mt-2">
          <div className="row">
            <div className="col-6">
              <label className="">Phone Number </label>
              <Input
                size="large"
                onChange={(e) => {
                  handleChangeFormData("phone_number", e.target.value);
                }}
                value={forn_data?.phone_number}
              />
            </div>
            <div className="col-6">
              <label className="">Email </label>
              <Input
                size="large"
                onChange={(e) => {
                  handleChangeFormData("email", e.target.value);
                }}
                value={forn_data?.email}
              />
            </div>
          </div>
        </div>
        <div className="col-8 mt-3">
          <label
            className=""
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
            }}
          >
            Residential History
          </label>
        </div>
        <div className="col-8 mt-1">
          <div className="row">
            <div className="col-12">
              <label className="">Current Address </label>
              <Input
                size="large"
                onChange={(e) => {
                  handleChangeFormData("curerent_address", e.target.value);
                }}
                value={forn_data?.curerent_address}
              />
            </div>
            <div className="col-12">
              <label className="">Previous Addresses </label>
              <Input
                size="large"
                onChange={(e) => {
                  handleChangeFormData("previous_addresses", e.target.value);
                }}
                value={forn_data?.previous_addresses}
              />
            </div>
          </div>
        </div>
        <div className="col-8 mt-3">
          <label
            className=""
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
            }}
          >
            Financial Information
          </label>
        </div>
        <div className="col-8 mt-1">
          <div className="row">
            <div className="col-12">
              <label className="">Bank Account Name</label>
              <Input
                size="large"
                onChange={(e) => {
                  handleChangeFormData("bank_account_name", e.target.value);
                }}
                value={forn_data?.bank_account_name}
              />
            </div>
          </div>
        </div>
        <div className="col-8 mt-2">
          <div className="row">
            <div className="col-6">
              <label className="">Account Type </label>
              <Select
                size="large"
                style={{ width: "100%" }}
                onChange={(e) => {
                  handleChangeFormData("account_type", e);
                }}
                placeholder="Select account Type"
                value={forn_data?.account_type || null}
                options={[
                  { label: "Current", value: "current" },
                  { label: "Saving", value: "saving" },
                ]}
              />
            </div>{" "}
            <div className="col-6">
              <label className="">IFSC Code </label>
              <Input
                size="large"
                onChange={(e) => {
                  handleChangeFormData("ifcs_code", e.target.value);
                }}
                value={forn_data?.ifcs_code}
              />
            </div>
          </div>
        </div>

        <div className="col-8 mt-3">
          <label
            className=""
            style={{
              fontSize: "18px",
              color: "#ff700d",
              borderBottom: "1px dashed #f07917",
            }}
          >
            Optional Information
          </label>
        </div>

        <div className="col-8 mt-1">
          <label className="">Reson For Moving</label>
          <Input.TextArea
            size="large"
            onChange={(e) => {
              handleChangeFormData("reason_for_moving", e.target.value);
            }}
            value={forn_data?.reason_for_moving}
          />
        </div>

        <div className="col-8 mt-2 text-end mt-3">
          <Button
            variant="contained"
            color="error"
            size="large"
            className="me-2"
          >
            Cancel
          </Button>
          <Button variant="contained" color="warning" size="large">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default RentalForm;
