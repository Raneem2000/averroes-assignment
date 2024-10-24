import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { Axios } from "@/libs/axios";
import LoadingCircle from "./LoadingCircle";

const DeleteDialog = ({ open, onClose, deleteId, isCat }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (id) => {
      if (isCat) {
        return await Axios.delete(`/categories/${id}`);
      } else {
        return await Axios.delete(`/images/${id}`);
      }
    },
    onSuccess: () => {
      if (isCat) {
        queryClient.invalidateQueries(["get-cat"]);
      } else {
        queryClient.invalidateQueries(["get-images"]);
      }
      onClose();
    },
    onError: (error) => {
      console.error("Error during deletion:", error);
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync(deleteId);
      onClose();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this {isCat ? "category" : "image"}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" disabled={isLoading}>
          {isLoading ? <LoadingCircle /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
