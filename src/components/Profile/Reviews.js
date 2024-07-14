import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { fetchReviewsRequest } from "./userSlice"; // Adjust path as needed
import { Skeleton } from "antd";

function Reviews() {
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.user.reviewList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    dispatch(fetchReviewsRequest());
  }, [dispatch]);

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
  const isLoading = true;
  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8];
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
              <TableCell sx={{ fontWeight: "bold" }}>Property Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? skeletonCount?.map((d) => {
                  return (
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        <Skeleton.Button active block />
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        <Skeleton.Button active block />
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        <Skeleton.Button active block />
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        <Skeleton.Button active block />
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        <Skeleton.Button active block />
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        <Skeleton.Button active block />
                      </TableCell>
                    </TableRow>
                  );
                })
              : ""}
            {reviewList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {moment(new Date(row.updatedAt)).format(
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
                  <TableCell>{row.property.title || "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!isLoading && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={reviewList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </Box>
  );
}

export default Reviews;
