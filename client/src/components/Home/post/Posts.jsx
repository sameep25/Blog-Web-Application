import { React, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getAllPosts } from "../../../service/api";
import Post from "./Post";

import { Box, Grid } from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  // console.log(category);

  // fetching post from db
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPosts({ category: category || "" });
      if (response.status === 200) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={12} key={post._id}>
            <Post  post={post} />
          </Grid>
        ))
      ) : (
        <Box>No Data available to display</Box>
      )}
    </>
  );
};

export default Posts;
