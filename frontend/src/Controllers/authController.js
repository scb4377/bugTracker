import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// login asyncThunk
export const loginFunc = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    let response = await axios.post("/auth/", data);
    let user = await response.data;

    if (user) {
      localStorage.setItem('user', JSON.stringify(response.data.token))
  }
    
    return user;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      return thunkAPI.rejectWithValue(message)
  }
});


// Logout user
export const logout = () => {
  localStorage.removeItem('user')
}
