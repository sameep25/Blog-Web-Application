import React from "react";
import { Link, useSearchParams } from "react-router-dom";
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

  const [searchParams] = useSearchParams() ;
  const category = searchParams.get('category') ;

  return (
    <>
      <Link
        to={`/create-blog?category=${category}`}
        style={{ textDecoration: "none" }}
      >
        <StyledButton variant="contained">Create Blog</StyledButton>
      </Link>

      <SytledTable>

        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Link style={{textDecoration:"none",color: "#000" }} to="/">All Categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell align="center">
                <Link style={{textDecoration:"none" ,color: "#000" }} to={`/?category=${category.type}`} >{category.type}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </SytledTable>
    </>
  );
};

export default Categories;
