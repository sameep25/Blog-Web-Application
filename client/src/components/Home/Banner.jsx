import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ImagedBox = styled(Box)`
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
    center/55% repeat-x #000;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction : column ;
`;
const Heading = styled(Typography)`
    font-size : 4rem ;
    color : #ffffff ;
    line-height : 1 ;
    backdrop-filter: blur(2px);
`
const SubHeading = styled(Typography)`
    font-size :2rem ;
    color : #ffffff ;
    backdrop-filter: blur(2px);
`

const Banner = () => {
  return (
    <ImagedBox>
      <Heading>BLOG</Heading>
      <SubHeading>Create Blogs ;) </SubHeading>
    </ImagedBox>
  );
};

export default Banner;
