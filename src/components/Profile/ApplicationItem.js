import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const ApplicationItem = ({ application, onEdit, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Application ID: {application._id}</Typography>
        <Typography>Status: {application.status}</Typography>
        {/* Add more fields as needed */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={onEdit}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={onDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicationItem;
