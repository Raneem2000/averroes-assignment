"use client";

import { Axios } from "@/libs/axios";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";

const ImageCard = ({ open, onClose, imageId }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => Axios.get(`/images/${imageId}`),
    queryKey: ["get-image", imageId],
    enabled: !!imageId,
  });

  if (isLoading) {
    return <Typography>Loading image details...</Typography>;
  }

  const image = data?.data || {};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Image Details</DialogTitle>
      <DialogContent>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={image.url}
            alt={image.name}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {image.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Size: {image.metadata.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Resolution: {image.metadata.resolution}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </Dialog>
  );
};
export default ImageCard;
