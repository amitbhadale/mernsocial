import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducers,
  followsPostReducer,
  userReducer,
} from "./Reducers/User";

import { likeDislikeReducer } from "./Reducers/Post";
const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: followsPostReducer,
    allUsers: allUsersReducers,
    likeDislike: likeDislikeReducer,
  },
});

export default store;
