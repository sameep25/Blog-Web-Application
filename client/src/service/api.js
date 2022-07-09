import axios from "axios";

const URL = "http://localhost:8000";

// signup api
export const signupUserApi = async (userData) => {
  try {
    return await axios.post(`${URL}/signup`, userData);
  } catch (error) {
    console.log("error while calling signupUser API ", error);
  }
};

// login api
export const loginUserApi = async (userData) => {
  try {
    return await axios.post(`${URL}/login`, userData);
  } catch (error) {
    console.log("Error while calling loginUesrAPI ", error);
  }
};

// upload image api
export const uploadImageApi = async (imageData) => {
  try {
    // console.log(imageData.name);
    return await axios.post(`${URL}/file/upload`, imageData);
  } catch (error) {
    console.log("Error while calling uploadImageApi ", error);
  }
};

// savePost api
export const savePostApi = async (postData) => {
  try {
    return await axios.post(`${URL}/create`, postData);
  } catch (error) {
    console.log("Error while calling savePostApi", error);
  }
};

// getPost api
export const getAllPosts = async (categories) => {
  try {
    console.log(categories);
    let category = categories.category ;
    console.log(category);
    return await axios.get(`${URL}/posts`,{ params: { category } });
  } catch (error) {
    console.log("Error while calling getAllPost Api", error);
  }
};
