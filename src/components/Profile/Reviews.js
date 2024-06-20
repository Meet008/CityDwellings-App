import React, { useState } from "react";

import { DatePicker, Popover, Select, Table, Tag, Tooltip } from "antd";

import Chart from "react-apexcharts";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

function Reviews() {
  const [review_list, set_review_list] = useState([
    {
      id: 29,
      user_id: 194,

      review: "Excellent",
      suggestion: null,
      created_at: 1717156983,
      updated_at: 1717156983,
      user_name: "excellent ",
    },
    {
      id: 28,
      user_id: 186,

      review: "Average",
      suggestion: null,
      created_at: 1713049550,
      updated_at: 1713049550,
      user_name: "fikkobemli@gufum.com",
    },
    {
      id: 27,
      user_id: 182,

      review: "Poor",
      suggestion: null,
      created_at: 1710666750,
      updated_at: 1710666750,
      user_name: "Dieter",
    },
    {
      id: 26,
      user_id: 84,

      review: "Poor",
      suggestion: "absolutely nothing was working after spending £30",
      created_at: 1706906292,
      updated_at: 1706906292,
      user_name: "Ben Jones",
    },
    {
      id: 25,
      user_id: 92,

      review: "Poor",
      suggestion: "the profit  is massively wrong for this asin\nB0CH3SRR3L",
      created_at: 1699264519,
      updated_at: 1699264519,
      user_name: "Eamonn",
    },
    {
      id: 24,
      user_id: 81,

      review: "Poor",
      suggestion: null,
      created_at: 1697890859,
      updated_at: 1697890859,
      user_name: "amit",
    },
    {
      id: 23,
      user_id: 63,

      review: "Poor",
      suggestion: null,
      created_at: 1694847697,
      updated_at: 1694847697,
      user_name: "vraj",
    },
    {
      id: 22,
      user_id: 21,
      title: "My List",
      review: "Excellent",
      suggestion: null,
      created_at: 1692458930,
      updated_at: 1692458930,
      user_name: "Shashi Patel",
    },
    {
      id: 21,
      user_id: 43,

      review: "Poor",
      suggestion: null,
      created_at: 1689875225,
      updated_at: 1689875225,
      user_name: "Esat",
    },
    {
      id: 20,
      user_id: 39,

      review: null,
      suggestion:
        "Hi,\nI have still facing 404 issue in this module. Can you please update this issue ASAP.",
      created_at: 1689597210,
      updated_at: 1689597210,
      user_name: "Aaqib",
    },
  ]);

  const reviewListColorIcon = {
    Excellent: "#52c41a",
    Good: "#1677ff",
    Average: "#faad14",
    Poor: "#ff4d4f",
  };

  const reviewColumns = [
    {
      title: "Sr.No.",
      width: 80,
      ellipsis: true,
      render: (_, __, i) => {
        return <span>{1 + i}</span>;
      },
    },
    {
      title: "Date",
      width: 220,
      // ellipsis: true,
      render: (text) => {
        return (
          <div>
            <span>
              {moment(new Date(text.updated_at * 1000)).format(
                "MMM DD, YYYY hh:mm A"
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: "User Name",
      width: 200,
      // ellipsis: true,
      render: (text) => {
        return <b>{text?.user_name || "N/A"}</b>;
      },
    },
    {
      title: "Feedback",
      width: 130,
      // ellipsis: false,
      render: (text) => {
        if (!text?.review) {
          return "-";
        }
        return <Tag color={reviewListColor[text?.review]}>{text?.review}</Tag>;
      },
    },

    {
      title: "User Comment",
      width: 600,
      // ellipsis: false,
      render: (text) => {
        if (!text.suggestion) {
          return "-";
        }
        return (
          <Popover
            placement="right"
            title=""
            getPopupContainer={(triger) => triger.parentNode}
            content={
              <div
                style={{
                  maxWidth: "400px",
                  wordBreak: "break-word",
                  minHeight: "20px",
                  maxHeight: "100px",
                  overflow: "auto",
                }}
              >
                {text?.suggestion}
              </div>
            }
            trigger="click"
          >
            <div className="actionIcon">{text?.suggestion}</div>
          </Popover>
        );
      },
    },
  ];

  const reviewListColor = {
    Excellent: "success",
    Good: "processing",
    Average: "warning",
    Poor: "error",
  };

  return (
    <div>
      <div className="fw-bold" style={{ marginTop: "10px" }}>
        Review List
      </div>
      <div className="row">
        <div className="col-12">
          <Table columns={reviewColumns} dataSource={review_list} />
        </div>
      </div>
    </div>
  );
}

export default Reviews;
