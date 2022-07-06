import React from "react";

// COMPONENTS
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
// MUI
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <>
      <Banner />

      <Grid container >
        <Grid item lg={2} sm={3} xs={12}>
          <Categories />
        </Grid>

        <Grid item lg={10} sm={9} xs={12}>
          Posts
        </Grid>

      </Grid>
    </>
  );
};

export default Home;
