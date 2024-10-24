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
  //   name: Yup.string().required("Category Name is required"),
  image: Yup.mixed().required(" Image is required"),
});

const CreateImages = ({ open, onClose }) => {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await Axios.post("/images", formData);
      return response.data;
    },
    onSuccess: () => {
      console.log("Images created successfully");
      onClose();
    },
    onError: (error) => {
      console.error("Error processing Image:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      //   name: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      //   formData.append("name", values.name);
      formData.append("image", values.image);

      mutation.mutate(formData);
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center" sx={{ color: "#06b6d4" }}>
        Add Images
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1 } }}
          onSubmit={formik.handleSubmit}
        >
          {/* <InputField label="Category Name" id="name" formik={formik} /> */}

          <input
            multiple
            label="Image"
            id="image"
            type="file"
            formik={formik}
            onChange={handleFileChange}
          />
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
          {mutation.isLoading ? <LoadingCircle /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateImages;
