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
