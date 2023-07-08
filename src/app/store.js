import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/user/userSlice'

const Logger = createLogger()

const  store = configureStore({
    reducer:{
        posts: postsReducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(Logger),
})


export default store