import { React, useState  ,useEffect} from "react";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import AddCircleIcon from "@mui/icons-material/AddCircle";

// styled components____________________________________________________________________________
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});
const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
const StyledInputBase = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
const StyledTextAreaAutosize = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
// ______________________________________________________________________________________________

// default values for new blog
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreateBlog = () => {
  const url = `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;

  const [post, setPost] = useState(initialPost);

  const onValueChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          lg={11}
          sm={12}
          xs={12}
          style={{ marginRight: "10px", marginLeft: "10px" }}
        >
          <Image src={url} alt="banner" />

          <StyledFormControl>
            <label htmlFor="fileInput">
              <AddCircleIcon fontSize="large" color="action" />
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />

            <StyledInputBase
              placeholder="Title"
              name="title"
              onChange={(e) => onValueChange(e)}
            />
            <Button variant="contained">Publish</Button>
          </StyledFormControl>

          {/* description  */}
          <StyledTextAreaAutosize
            minRows={5}
            placeholder="Tell your story..."
            name="description"
            onChange={(e) => onValueChange(e)}
          />

        </Grid>
      </Grid>
    </>
  );
};

export default CreateBlog;