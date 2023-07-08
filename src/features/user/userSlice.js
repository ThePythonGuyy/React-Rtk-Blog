import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = {
  users: [
    // { id: '0', name: "Logan Ski" },
    // { id: '1', name: "Chris Hemsworth" },
    // { id: '2', name: "Robert" },
  ],
  status: "idle",
  error: null,
  uCount: 0,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    console.log(response.data);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increaseUCount : (state, action) => {
      state.uCount += 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = state.users.concat(action.payload);
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllUsers = (state) => state.users.users;

export const selectUserBlogs = (state, id) => {
  const posts = state.posts.posts;
  const usrBlgs = posts.filter((post) => post.userId === id);

  return usrBlgs;
};

export const { increaseUCount } = userSlice.actions;

export default userSlice.reducer;
