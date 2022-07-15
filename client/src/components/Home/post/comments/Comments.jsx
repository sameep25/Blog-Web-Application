import { React, useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../../context/DataProvider";

import { postCommentApi, getCommentsApi } from "../../../../service/api";
import Comment from "./Comment";

import { Box, Button, styled, TextareaAutosize } from "@mui/material";

//Mui Styled components
const Image = styled("img")({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
});
const Container = styled(Box)`
  margin-top: 30px;
  display: flex;
`;
const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
  &:focus-visible {
    outline: none;
  }
  border: none;
  border-bottom: 1px solid grey;
  padding: 5px;
`;

// inital comment object
const initialComment = {
  name: "",
  postId: "",
  commentText: "",
  date: new Date(),
};

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";

  const { account } = useContext(DataContext);
  const [comment, setComment] = useState(initialComment);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  // fetching comments db
  useEffect(() => {
    const getComments = async () => {
      let response = await getCommentsApi(id);
      if (response.status === 200) {
        setComments(response.data);
      }
    };
    getComments();
  }, []);

  // handling comment text change and setComment value
  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.name,
      postId: post._id,
      commentText: e.target.value,
    });
  };

  // calling postCommentApi
  const addComment = async () => {
    // console.log(comment);
    let response = await postCommentApi(comment);
    if (response.status === 200) {
      setComment(initialComment);
    }
  };

  return (
    <Box style={{ borderTop: "1px solid grey" }}>
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextArea
          minRows={1}
          placeholder="Add a comment..."
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          style={{ height: "35px", background: "#23a8f2", borderRadius: "2px" }}
          onClick={() => addComment()}
        >
          Comment
        </Button>
      </Container>

      <Box></Box>
    </Box>
  );
};

export default Comments;
