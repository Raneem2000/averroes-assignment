"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import DialogCategory from "./DialogCategory";
import CreateImages from "./CreateImages";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [openAddImages, setOpenAddImages] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenAddImages = () => {
    setOpenAddImages(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenAddImages(false);
  };
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 4,
        pt: 2,
      }}
    >
      <Link href="/" passHref style={{ textDecoration: " none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Image
            src="/assets/images/favicon.jpeg"
            alt="logo"
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
          />
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "#06b6d4",
            }}
          >
            Averroes.ai
          </Typography>
        </Box>
      </Link>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="outlined"
          onClick={handleOpenAddImages}
          sx={{ marginRight: 2, color: "#34d399" }}
        >
          Add Images
        </Button>
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{ color: "#06b6d4" }}
        >
          Add Category
        </Button>
      </Box>

      <DialogCategory open={open} onClose={handleClose} />
      <CreateImages open={openAddImages} onClose={handleClose} />
    </Box>
  );
};

export default Nav;
