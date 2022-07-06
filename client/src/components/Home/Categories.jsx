import React from "react";
import { Link } from "react-router-dom";
// MUI
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { categories } from "../../constants/data";

// mui componets
const SytledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
  display: flex;
  margin: auto;
  background: #23a8f2;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Categories = () => {
  return (
    <>
      <Link to={"create-blog"} style={{textDecoration : "none"}}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </Link>
      <SytledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">All Categories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell align="center">{category.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </SytledTable>
    </>
  );
};

export default Categories;
