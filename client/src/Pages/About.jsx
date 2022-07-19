import { Box, Typography, styled } from "@mui/material";
import React from "react";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled(Typography)`
  font-size: 3rem;
  margin: 20px;
`;

const Description = styled(Typography)`
  font-size: 20px;
  margin : 0 20px 0 20px ;
  font-family: unset;
`;

const About = () => {
  return (
    <Container>
      <Heading>About Us</Heading>
      <Description>
        Hey there stranger! Welcome at Blog Website. This website is made
        for writers / bloggers who want to make simple yet effective blogs online.
        <br /><br />
        Make Blogs in wide categories of your choice and publish them for free. 
        <br /><br />
        Categories : 
        <br /><br />
        1. Music<br />
        2. Education<br />
        3. Tech<br />
        4. Sports<br />
        5. Movies
      </Description>
    </Container>
  );
};

export default About;
