import { React, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate ,useParams} from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

import { uploadImageApi, updatePostApi, getPostById } from "../../service/api";

import {
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
  name:"",
  googleId:"",
  categories: "",
  createdDate: new Date(),
};

const UpdateBlog = () => {
  const [post, setPost] = useState(initialPost);
  const [imageFile, setImageFile] = useState("");

  const { account } = useContext(DataContext);

  const location = useLocation();
  const navigate = useNavigate();
  const {id} = useParams() ;

  const url = post.picture
    ? post.picture
    : `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;

  // handle value change
  const onValueChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

//   fetching initial post-data
  useEffect(() =>{
    const fetchData = async() =>{
        const response = await getPostById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
    }
    fetchData() ;
  },[])

  // saving image in db
  useEffect(() => {
    const getImage = async () => {
      if (imageFile) {
        const data = new FormData();
        data.append("name", imageFile.name);
        data.append("file", imageFile);

        // API call to save image in db
        const response = await uploadImageApi(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;
    post.name = account.name ;
  }, [imageFile]);

  const updateBlogPost = async () => {
    const response = await updatePostApi(post);
    if (response.status === 200) {
      navigate(`/details/${id}`);
    }
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
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <StyledInputBase
              placeholder="Title"
              name="title"
              onChange={(e) => onValueChange(e)}
              value={post.title}
            />

            <Button variant="contained" onClick={() => updateBlogPost()}>
              Update
            </Button>
          </StyledFormControl>

          {/* description  */}
          <StyledTextAreaAutosize
            minRows={5}
            placeholder="Tell your story..."
            name="description"
            onChange={(e) => onValueChange(e)}
            value={post.description}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateBlog;
