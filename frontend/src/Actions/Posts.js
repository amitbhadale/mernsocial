import axios from "axios";

export const likeDislike = (id) => async (dispatch) => {
  try {
    dispatch({ type: "likeDislikeRequest" });
    const { data } = await axios.get(`/api/v1/post/${id}`);

    dispatch({ type: "likeDislikeSuccess", payload: data.message });
    console.log("Messgae", data);
  } catch (e) {
    dispatch({ type: "likeDislikeFailure", payload: e.message });
  }
};

export const commentAdd = (id, commentText) => async (dispatch) => {
  try {
    dispatch({ type: "commentRequest" });
    const { data } = await axios.post(`/api/v1/post/comment/${id}`, {
      comment: commentText,
    });
    dispatch({ type: "commentSuccess", payload: data.message });
  } catch (e) {
    dispatch({ type: "commentFailure", payload: e.message });
  }
};

export const commentDelete = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({ type: "commentDeleteRequest" });
    const { data } = await axios.delete(`/api/v1/post/comment/${postId}`, {
      headers: {},
      data: {
        commentId: commentId,
      },
    });
    console.log("data after comment delete", data);
    dispatch({ type: "commentDeleteRequestSuccess", payload: data.message });
  } catch (e) {
    dispatch({ type: "commentDeleteRequestFailure", payload: e.message });
  }
};

export const newPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({ type: "newPostRequest" });
    const { data } = await axios.post(
      `/api/v1/post/upload`,
      {
        caption,
        image,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    dispatch({ type: "newPostSuccess", payload: data.message });
  } catch (e) {
    dispatch({ type: "newPostFailure", payload: e.message });
  }
};

export const updateCapt = (id, newCaption) => async (dispatch) => {
  try {
    dispatch({ type: "updateCaptionRequest" });
    const { data } = await axios.put(`/api/v1/post/${id}`, {
      caption: newCaption,
    });
    dispatch({ type: "updateCaptionSuccess", payload: data.message });
  } catch (e) {
    dispatch({ type: "updateCaptionFailure", payload: e.message });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deletePostRequest" });
    const { data } = await axios.delete(`/api/v1/post/${id}`);
    console.log("data after post delete", data);
    dispatch({ type: "deletePostSuccess", payload: data.message });
  } catch (e) {
    dispatch({ type: "deletePostFailure", payload: e.message });
  }
};
