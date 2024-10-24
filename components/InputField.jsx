import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ label, id, type = "text", formik }) => {
  const isFileInput = type === "file";

  return (
    <TextField
      fullWidth
      margin="normal"
      required
      id={id}
      name={id}
      label={label}
      type={type}
      onChange={
        isFileInput
          ? (event) => formik.setFieldValue(id, event.target.files[0])
          : formik.handleChange
      }
      onBlur={formik.handleBlur}
      value={!isFileInput ? formik.values[id] || "" : undefined}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
      InputLabelProps={type === "file" ? { shrink: true } : {}}
      inputProps={type === "file" ? { accept: "image/*" } : {}}
    />
  );
};

export default InputField;
