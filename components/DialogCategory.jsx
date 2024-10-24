import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import { useMutation } from "react-query";
import { Axios } from "@/libs/axios";
import LoadingCircle from "./LoadingCircle";

const validationSchema = Yup.object({
  name: Yup.string().required("Category Name is required"),
  description: Yup.string().required("Category Description is required"),
  image: Yup.mixed().required("Category Image is required"),
});

const DialogCategory = ({ open, onClose, categoryId = null }) => {
  const [imagePreview, setImagePreview] = React.useState(null);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = categoryId
        ? await Axios.put(`/categories/${categoryId}`, formData)
        : await Axios.post("/categories", formData);
      return response.data;
    },
    onSuccess: () => {
      console.log(
        categoryId
          ? "Category updated successfully"
          : "Category created successfully"
      );
      onClose();
    },
    onError: (error) => {
      console.error("Error processing category:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image);

      mutation.mutate(formData);
    },
  });

  React.useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        const response = await Axios.get(`/categories/${categoryId}`);
        const { name, description } = response.data;
        formik.setValues({ name, description, image: null });
      };

      fetchCategory();
    } else {
      formik.resetForm();
      setImagePreview(null);
    }
  }, [categoryId, open]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center" sx={{ color: "#06b6d4" }}>
        {categoryId ? "Update Category" : "Create a New Category"}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1 } }}
          onSubmit={formik.handleSubmit}
        >
          <InputField label="Category Name" id="name" formik={formik} />
          <InputField
            label="Category Description"
            id="description"
            formik={formik}
          />
          <InputField
            label="Category Image"
            id="image"
            type="file"
            formik={formik}
            onChange={handleFileChange}
          />
          {imagePreview && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">Image Preview:</Typography>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  marginTop: "8px",
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          color="primary"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <LoadingCircle />
          ) : categoryId ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCategory;
