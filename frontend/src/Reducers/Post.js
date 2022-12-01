import { createReducer } from "@reduxjs/toolkit";
const intialState = {};

export const likeDislikeReducer = createReducer(intialState, {
  likeDislikeRequest: (state) => {
    state.loading = true;
  },
  likeDislikeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  likeDislikeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export const commentReducer = createReducer(intialState, {
  commentRequest: (state) => {
    state.loading = true;
  },
  commentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  commentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export const commentDeleteReducer = createReducer(intialState, {
  commentDeleteRequest: (state) => {
    state.loading = true;
  },
  commentDeleteSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  commentDeleteFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});
