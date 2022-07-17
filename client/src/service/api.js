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

// google Login User
export const googleLoginApi = async (userData) => {
  try {
    return await axios.post(`${URL}/google/login`, userData);
  } catch (error) {
    console.log("Error whiile calling googleLoginApi", error);
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

// update post
export const updatePostApi = async (postData) => {
  try {
    return await axios.put(`${URL}/update/${postData._id}`, postData);
  } catch (error) {
    console.log("Error while calling savePostApi", error);
  }
};

// getPosts api
export const getAllPosts = async (categories) => {
  try {
    let category = categories.category;
    return await axios.get(`${URL}/posts`, { params: { category } });
  } catch (error) {
    console.log("Error while calling getAllPost Api", error);
  }
};

// get singlePost api
export const getPostById = async (id) => {
  try {
    return await axios.get(`${URL}/post`, { params: { id } });
  } catch (error) {
    console.log("Error while calling getPostById Api", error);
  }
};

// save Comments api
export const postCommentApi = async (commentData) => {
  try {
    return await axios.post(`${URL}/comment/new`, commentData);
  } catch (error) {
    console.log("Error while calling postCommentApi ", error);
  }
};

// get comments api
export const getCommentsApi = async (id) => {
  try {
    return await axios.get(`${URL}/comments/${id}`);
  } catch (error) {
    console.log("Error while calling getCommentsApi", error);
  }
};

export const deleteCommentApi = async (id) => {
  try {
    return await axios.delete(`${URL}/comment/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deletePostApi", error);
  }
};

// delet post
export const deletePostApi = async (id) => {
  try {
    return await axios.delete(`${URL}/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deletePostApi", error);
  }
};
