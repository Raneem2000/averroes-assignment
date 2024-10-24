"use client";

import { Axios } from "@/libs/axios";
import {
  Typography,
  Box,
  Card,
  IconButton,
  Skeleton,
  CardMedia,
  Button,
} from "@mui/material";
import { FaEdit, FaTrash, FaEye, FaFilter } from "react-icons/fa";
import React from "react";
import { useQuery } from "react-query";
import DeleteDialog from "@/components/DialogDelete";
import ImageCard from "@/components/ImageCard";
import FilterFields from "@/components/FilterdField";

const Page = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [openCard, setOpenCard] = React.useState(false);
  const [imageId, setImageId] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [newImageUrls, setNewImageUrls] = React.useState({});
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");
  const [selectedResolution, setSelectedResolution] = React.useState("");
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setDeleteId(null);
    setOpenCard(false);
    setImageId(null);
  };

  const handleView = (id) => {
    setImageId(id);
    setOpenCard(true);
  };

  const handleFileChange = async (event, image) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        await Axios.put(`/images/${image.id}`, formData, {});
        const newUrl = URL.createObjectURL(file);
        setNewImageUrls((prev) => ({ ...prev, [image.id]: newUrl }));
      } catch (error) {
        console.error("Error updating image:", error);
      }
    }
  };

  const { isLoading } = useQuery({
    queryFn: () => Axios.get(`/images`),
    queryKey: ["get-images"],
    onSuccess: (data) => {
      setImages(data.data);
    },
  });

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          sx={{
            marginLeft: "4%",
            color: "#34d399",
            fontWeight: "bold",
            fontSize: "1.4rem",
            letterSpacing: "0.05rem",
            textTransform: "uppercase",
            display: "inline-block",
          }}
        >
          All Images
        </Typography>
        <Button
          variant="contained"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <FaFilter /> Filter
        </Button>
      </Box>
      {showFilters && (
        <FilterFields
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedResolution={selectedResolution}
          setSelectedResolution={setSelectedResolution}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={250}
                height={200}
                sx={{ m: 2 }}
              />
            ))
          : images.map((image) => (
              <Card
                key={image.id}
                sx={{
                  position: "relative",
                  maxWidth: 300,
                  m: 2,
                  "&:hover .overlay": {
                    opacity: 1,
                  },
                  "&:hover img": {
                    opacity: 0.5,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={newImageUrls[image.id] || image.url}
                  alt={image.name}
                  sx={{
                    objectFit: "cover",
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <IconButton
                    sx={{ color: "white", mx: 1 }}
                    onClick={() =>
                      document.getElementById(`file-input-${image.id}`).click()
                    }
                  >
                    <FaEdit size={20} />
                  </IconButton>
                  <input
                    id={`file-input-${image.id}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) => handleFileChange(event, image)}
                  />
                  <IconButton
                    sx={{ color: "white", mx: 1 }}
                    onClick={() => handleView(image.id)}
                  >
                    <FaEye size={20} />
                  </IconButton>
                  <IconButton
                    sx={{ color: "white", mx: 1 }}
                    onClick={() => handleDeleteClick(image.id)}
                  >
                    <FaTrash size={20} />
                  </IconButton>
                </Box>
              </Card>
            ))}
      </Box>
      <DeleteDialog
        open={openDialog}
        onClose={handleClose}
        deleteId={deleteId}
      />
      {imageId && (
        <ImageCard open={openCard} onClose={handleClose} imageId={imageId} />
      )}
    </div>
  );
};

export default Page;
