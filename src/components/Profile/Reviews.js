import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Tooltip,
  TablePagination,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import moment from "moment";

function Reviews() {
  const [reviewList, setReviewList] = useState([
    {
      id: 29,
      user_id: 194,
      review: "Excellent",
      suggestion: null,
      created_at: 1717156983,
      updated_at: 1717156983,
      user_name: "excellent",
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
      suggestion: "the profit is massively wrong for this asin\nB0CH3SRR3L",
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const reviewListColor = {
    Excellent: "success",
    Good: "primary",
    Average: "warning",
    Poor: "error",
  };

  const renderReviewTag = (review) => {
    if (!review) return "-";
    return <Chip label={review} color={reviewListColor[review]} />;
  };

  const renderSuggestion = (suggestion) => {
    if (!suggestion) return "-";
    if (suggestion.length > 50) {
      return (
        <Tooltip title={suggestion} placement="top">
          <span>{`${suggestion.substring(0, 50)}...`}</span>
        </Tooltip>
      );
    }
    return suggestion;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Review List
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: isMobile ? 300 : isTablet ? 500 : 650,
          }}
          aria-label="review table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Sr.No.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Feedback</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>User Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {moment(new Date(row.updated_at * 1000)).format(
                      "MMM DD, YYYY hh:mm A"
                    )}
                  </TableCell>
                  <TableCell>{row.user_name || "N/A"}</TableCell>
                  <TableCell>{renderReviewTag(row.review)}</TableCell>
                  <TableCell>
                    {isMobile ? (
                      <Tooltip title={row.suggestion} placement="top">
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      renderSuggestion(row.suggestion)
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={reviewList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default Reviews;
