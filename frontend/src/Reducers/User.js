import { createReducer } from "@reduxjs/toolkit";
const intialState = {};
export const userReducer = createReducer(intialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogOutRequest: (state) => {
    state.loading = true;
  },
  LogOutSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogOutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  deleteProfileRequest: (state) => {
    state.loading = true;
  },
  deleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updatePasswordRequest: (state) => {
    state.loading = true;
  },
  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.paylaod;
    state.isAuthenticated = false;
  },

  followUnfollowRequest: (state) => {
    state.loading = true;
  },
  followUnfollowSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  followUnfollowFailure: (state, action) => {
    state.loading = false;
    state.error = action.paylaod;
  },

  clearError: (state, action) => {
    state.error = null;
  },
});

export const followsPostReducer = createReducer(intialState, {
  fpRequest: (state) => {
    state.loading = true;
  },
  fpSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  fpFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },

  userPostsRequest: (state) => {
    state.loading = true;
  },
  userPostsSuccess: (state, action) => {
    state.loading = false;
    state.userPosts = action.payload;
  },
  userPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  userInfoRequest: (state) => {
    state.loading = true;
  },
  userInfoSuccess: (state, action) => {
    state.loading = false;
    state.userInfo = action.payload;
  },
  userInfoFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const myPostReducer = createReducer(intialState, {
  mpRequest: (state) => {
    state.loading = true;
  },
  mpSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  mpFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export const allUsersReducers = createReducer(intialState, {
  allUserRequest: (state) => {
    state.loading = true;
  },
  allUserSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});
