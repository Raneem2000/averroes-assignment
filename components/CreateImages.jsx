import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { Axios } from "@/libs/axios";
import LoadingCircle from "./LoadingCircle";

const CreateImages = ({ open, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isLoading } = useQuery({
    queryFn: () => Axios.get(`/categories`),
    queryKey: ["get-cat"],
  });
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await Axios.post("/images", formData);
      return response.data;
    },
    onSuccess: () => {
      console.log("Images created successfully");
      onClose();
      setSelectedFiles([]);
    },
    onError: (error) => {
      console.error("Error processing Image:", error);
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("image", file));

    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center" sx={{ color: "#06b6d4" }}>
        Add Images
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ "& .MuiTextField-root": { m: 1 } }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {!isLoading &&
                data?.data?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <input
            multiple
            id="image"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />

          <Box sx={{ mt: 2 }}>
            {selectedFiles.length > 0 && (
              <Typography variant="body2">Selected Images:</Typography>
            )}
            <Box display="flex" flexWrap="wrap" gap={2}>
              {selectedFiles.map((file, index) => (
                <Card key={index} sx={{ maxWidth: 150 }}>
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(file)}
                    alt={`Selected ${index + 1}`}
                    sx={{ height: 100, objectFit: "cover" }}
                  />
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="">
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          color="primary"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? <LoadingCircle /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateImages;
