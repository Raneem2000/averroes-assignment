"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { Axios } from "@/libs/axios";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteDialog from "@/components/DialogDelete";
import TableSkeleton from "@/components/SkeletonTable";
import DialogCategory from "@/components/DialogCategory";

export default function Categories() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const { data, isLoading } = useQuery({
    queryFn: () => Axios.get(`/categories`),
    queryKey: ["get-cat"],
  });

  const handleEdit = (id) => {
    setDialogOpen(true);
    setCategoryId(id);
  };

  return (
    <>
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
        All Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: 4,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1200,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 400 }} aria-label="styled table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Description
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Image
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableSkeleton rows={5} />
            ) : (
              <TableBody>
                {data?.data?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": {
                        backgroundColor: "#eff7fa",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      <Image
                        src={row.image}
                        alt="logo"
                        width={50}
                        height={50}
                        style={{ objectFit: "contain", borderRadius: "8px" }} // Image styling
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(row.id)}
                        sx={{ color: "#4caf50", mr: 1 }}
                      >
                        <FaEdit size={20} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(row.id)}
                        sx={{ color: "red" }}
                      >
                        <FaTrash size={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>

      <DeleteDialog
        open={openDialog}
        onClose={handleClose}
        deleteId={deleteId}
        isCat={true}
      />
      <DialogCategory
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        categoryId={categoryId}
      />
    </>
  );
}
