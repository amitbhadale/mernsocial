import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "LoginSuccess", paylaod: data.user });
  } catch (e) {
    dispatch({ type: "LoginFailure", paylaod: e.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const { data } = await axios.get("/api/v1/me", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("user", data);
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (e) {
    dispatch({ type: "LoadUserFailure", payload: e.message });
  }
};

export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({ type: "fpRequest" });
    const { data } = await axios.get("/api/v1/posts");
    dispatch({ type: "fpSuccess", payload: data.posts });
  } catch (e) {
    dispatch({ type: "fpFailure", payload: e.message });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "allUserRequest" });
    const { data } = await axios.get("/api/v1/users");
    dispatch({ type: "allUserSuccess", payload: data.users });
  } catch (e) {
    dispatch({ type: "allUserFailure", payload: e.message });
  }
};
