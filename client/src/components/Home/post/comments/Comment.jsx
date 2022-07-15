import { React, useContext } from "react";

import { DataContext } from "../../../../context/DataProvider";
import { deleteCommentApi } from "../../../../service/api";

import { Box, Typography, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Component = styled(Box)`
  margin-top: 10px;
  background: #f9f9f9;
  padding: 10px;
`;
const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;
const Name = styled(Typography)`
  font-size: 14px;
  margin-right: 20px;
`;
const StyledDate = styled(Typography)`
  color: #878787;
  font-size: 10px;
  margin-top: 4px;
`;
const Delete = styled(DeleteIcon)`
  margin-left: auto;
`;
const CommentText = styled(Typography)`
  font-size: 12px;
  word-break: break-word;
`;

const Comment = ({ comment, setToogle }) => {
  const { account } = useContext(DataContext);

  const deleteComment = async () => {
    console.log(comment._id);
    let response = await deleteCommentApi(comment._id);
    if (response.status === 200) {
      console.log("comment deleted");
    }
    setToogle((prevState) => !prevState);
  };

  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.name && (
          <Delete color="error" onClick={() => deleteComment()} />
        )}
      </Container>
      <Box>
        <CommentText>{comment.commentText}</CommentText>
      </Box>
    </Component>
  );
};

export default Comment;
