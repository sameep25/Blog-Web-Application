import axios from "axios";

const URL = "http://localhost:8000";

export const signupUserApi = async (userData) => {
  try {
    return await axios.post(`${URL}/signup`, userData);
  } catch (error) {
    console.log("error while calling signupUser API ", error);
  }
};

export const loginUserApi = async (userData) => {
  try {
    return await axios.post(`${URL}/login`, userData);
  } catch (error) {
    console.log("Error while calling loginUesrAPI ", error);
  }
};
