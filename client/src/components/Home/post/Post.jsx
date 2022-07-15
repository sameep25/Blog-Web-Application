import React from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { addElipsis } from "../../../utils/common-utils.js";

// Mui Styled components
const Container = styled(Box)`
  border: 1px solid #d3cede;
  margin: 1rem;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    padding: 0 5px 5px 5px;
  }
`;
const Image = styled("img")({
  width: "100%",
  height: "150px",
  objectFit: "cover",
});
const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;
const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  word-break: break-word;
`;
const Description = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;

const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;

  return (
    <Container>
      <Image src={url} alt="blog" />
      <Text> {post.categories !== "null" ? post.categories : "All" } </Text>
      <Heading>{addElipsis(post.title, 20)} </Heading>
      <Text>Author : {post.username} </Text>
      <Description> {addElipsis(post.description, 180)} </Description>
    </Container>
  );
};

export default Post;
