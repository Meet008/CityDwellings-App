import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const PropertyCard = ({ property, onDelete }) => {
  const handleDelete = () => {
    onDelete(property._id);
  };

  return (
    <Card variant="outlined" sx={{ my: 2 }}>
      <CardHeader title={property.title} />
      <CardContent>
        <Typography variant="body1">{property.description}</Typography>
        <Typography variant="body2">Price: ${property.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
