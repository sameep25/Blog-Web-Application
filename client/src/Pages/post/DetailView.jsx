import { React, useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getPostById, deletePostApi } from "../../service/api";

import Comments from "../../components/Home/post/comments/Comments";

// styled components
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});
const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 400;
  text-align: center;
  word-break: break-word;
`;
const Edit = styled(EditIcon)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 100%;
`;
const Delete = styled(DeleteIcon)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 100%;
`;
const AutherBox = styled(Box)`
  color: #878787;
  margin: 10px 0;
  display: flex;
`;
const Description = styled(Typography)`
  word-break: break-word;
`;

const DetailView = () => {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { account } = useContext(DataContext);

  const { id } = useParams();
  const url = post.picture
    ? post.picture
    : `https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`;

  // fetchiong Post or blog from db
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPostById(id);
      if (response.status === 200) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    const response = await deletePostApi(id);
    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        lg={11}
        sm={12}
        xs={12}
        style={{ marginRight: "10px", marginLeft: "10px" }}
      >
        <Image src={url} alt="blog" />
        <Box style={{ padding: "10px", }}>
          <Box style={{ float: "right" }}>
            
            {account.googleId === post.googleId && (
              <>
                <Link to={`/update/${post._id}`}>
                  <Edit color="primary" />
                </Link>
                <Delete style={{cursor:"pointer"}} color="error" onClick={() => deleteBlog()} />
              </>
            )}
          </Box>

          <Heading>{post.title}</Heading>
          <AutherBox>
            <Typography>
              Author:{" "}
              <Box component="span" style={{ fontWeight: 300 }}>
                {post.name ? post.name : post.username}
              </Box>
            </Typography>
            <Typography style={{ marginLeft: "auto" }}>
              {new Date(post.createdDate).toDateString()}{" "}
            </Typography>
          </AutherBox>
          <Description>{post.description} </Description>
        </Box>
        <Comments post={post} />
      </Grid>

      

    </Grid>
  );
};

export default DetailView;
