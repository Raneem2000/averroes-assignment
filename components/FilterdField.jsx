import React from "react";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import { useQuery } from "react-query";
import { Axios } from "@/libs/axios";

const FilterFields = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSize,
  setSelectedSize,
  selectedResolution,
  setSelectedResolution,
}) => {
  const { data, isLoading } = useQuery({
    queryFn: () => Axios.get(`/categories`),
    queryKey: ["get-cat"],
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <TextField
        label="Filter by Name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
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
      <Select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">
          <em>All Sizes</em>
        </MenuItem>
        <MenuItem value="2MB">2MB</MenuItem>
        <MenuItem value="1MB">1MB</MenuItem>
      </Select>
      <Select
        value={selectedResolution}
        onChange={(e) => setSelectedResolution(e.target.value)}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">
          <em>All Resolutions</em>
        </MenuItem>
        <MenuItem value="1024x768">1024x768</MenuItem>
        <MenuItem value="800x600">800x600</MenuItem>
      </Select>
    </Box>
  );
};

export default FilterFields;
