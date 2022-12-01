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
