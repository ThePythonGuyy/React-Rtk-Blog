import { createAsyncThunk, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const initialState = {
  posts: [
    // {
    //   id: "1",
    //   title: "Learning Redux Toolkit",
    //   content: "I've heard good things",
    //   date: sub(new Date(), {minutes: 10}).toISOString(),
    //   reactions: {
    //     thumpsUp:0,
    //     rocket: 0,
    //     thumpsDown:0,
    //   }
    // },
    // {
    //   id: "2",
    //   title: "Slices",
    //   content: "I want pizza",
    //   date: sub(new Date(), {minutes: 5}).toISOString(),
    //   reactions: {
    //     thumpsUp:0,
    //     rocket: 0,
    //     thumpsDown:0,
    //   }
    // },
  ],

  status: "idle",
  error: null,
  count: 0,
};

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

export const updatetPost = createAsyncThunk(
  "posts/updatetPost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      return initialPost;
      // return err.message;
    }
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (initialPost) =>{
    const {id} = initialPost
    try {
      const response  = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
)

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateDoc: (state, action) => {
      state.posts = [
        ...state.posts,
        {
          id: nanoid(),
          title: action.payload.title,
          body: action.payload.content,
          userId: action.payload.userId,
          date: new Date().toISOString(),
          reactions: {
            thumpsUp: 0,
            rocket: 0,
            thumpsDown: 0,
          },
        },
      ];
    },
    updateReaction: (state, action) => {
      state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          post.reactions[action.payload.reactionType]++;
        }
      });
    },
    increaseCount: (state, action) => {
      state.count += 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      let min = 1;
      const loadedPost = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumpsUp: 0,
          rocket: 0,
          thumpsDown: 0,
        };
        return post;
      });
      state.posts = state.posts.concat(loadedPost);
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumpsUp: 0,
        rocket: 0,
        thumpsDown: 0,
      };
      console.log(action.payload);
      state.posts.push(action.payload);
    });

    builder.addCase(updatetPost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log('Update could not complete');
        console.log(action.payload);
        return;
      }
      const {id} = action.payload;
      action.payload.id = 120;
      action.payload.date = new Date().toISOString();
      const posts = state.posts.filter(post => post.id != id);
      state.posts = [...posts, action.payload]
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      if(!action.payload?.id) {
        console.log('Unable to delete post');
        console.log(action.payload);
      }

      const {id} = action.payload;
      const posts = state.posts.filter((post) => post.id!== Number(id))
      state.posts = posts;
    })
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

export const currentPost = (state, id) =>
  state.posts.posts.find((post) => post.id == id);

export const selectPostByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
)

export const { updateDoc, updateReaction, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
