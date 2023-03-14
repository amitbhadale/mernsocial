import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducers,
  followsPostReducer,
  myPostReducer,
  userReducer,
} from "./Reducers/User";

import { likeDislikeReducer, newPostReducer } from "./Reducers/Post";
const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: followsPostReducer,
    allUsers: allUsersReducers,
    likeDislike: likeDislikeReducer,
    myPosts: myPostReducer,
    newPost: newPostReducer,
  },
});

export default store;
