import axios from "axios";

export const logout = () => {
  localStorage.removeItem("auth");

};
export const loginUser = async (cred) => {
  try {
    const res = await axios.post("http://localhost:5001/user/login", cred);
    localStorage.setItem("auth", res.data.token);
    return res.data;
  } catch (error) {
    throw error.message;
  }
}

export const registerUser = async (data) => {
  try {
    const res = await axios.post("http://localhost:5001/user/register", data);
    localStorage.setItem("auth", res.data.token)
    return res.data;
  } catch (error) {
    throw error.message;
  }
}