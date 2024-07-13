import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addReviewRequest } from "../Profile/userSlice";
import moment from "moment";

function Reviews({ open, handleClose, newReview, setNewReview }) {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addReviewRequest(newReview));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Review</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Your Name"
            value={newReview.user_name}
            onChange={(e) =>
              setNewReview({ ...newReview, user_name: e.target.value })
            }
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Feedback</InputLabel>
          <Select
            value={newReview.review}
            onChange={(e) =>
              setNewReview({ ...newReview, review: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="Excellent">Excellent</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Average">Average</MenuItem>
            <MenuItem value="Poor">Poor</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Comment"
            value={newReview.suggestion}
            onChange={(e) =>
              setNewReview({ ...newReview, suggestion: e.target.value })
            }
            multiline
            rows={4}
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Reviews;
