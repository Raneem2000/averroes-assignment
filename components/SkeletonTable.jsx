
import React from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";
import { Skeleton } from "@mui/material";

const SkeletonTable = ({ rows = 5 }) => {
  return (
    <TableBody>
      {[...Array(rows)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton variant="text" width="150" />
          </TableCell>
          <TableCell align="center">
            <Skeleton variant="text" width="150" />
          </TableCell>
          <TableCell align="center">
            <Skeleton variant="text" width="150" />
          </TableCell>
          <TableCell align="center">
            <Skeleton variant="rectangular" width={50} height={50} />
          </TableCell>
          <TableCell align="center">
            <Skeleton variant="rectangular" width="100" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SkeletonTable;
