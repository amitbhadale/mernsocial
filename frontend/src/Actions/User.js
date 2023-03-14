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

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });
      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "updatePasswordSuccess", paylaod: data.message });
    } catch (e) {
      dispatch({ type: "updatePasswordFailure", paylaod: e.message });
    }
  };

export const register = (name, email, password, avtr) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterRequest" });
    const { data } = await axios.post(
      "/api/v1/register",
      { name, email, password, avtr },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "RegisterSuccess", paylaod: data.user });
  } catch (e) {
    dispatch({ type: "RegisterFailure", paylaod: e.message });
  }
};

export const updateProfile = (name, email, avtr) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });
    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avtr },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "updateProfileSuccess", paylaod: data.user });
  } catch (e) {
    dispatch({ type: "updateProfileFailure", paylaod: e.message });
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

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: "LogOutRequest" });
    await axios.get("/api/v1/logout");
    dispatch({ type: "LogOutSuccess" });
  } catch (e) {
    dispatch({ type: "LogOutFailure", payload: e.message });
  }
};

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "deleteProfileRequest" });
    const { data } = await axios.delete("/api/v1/delete/profile");
    dispatch({ type: "deleteProfileSuccess", payload: data.message });
  } catch (e) {
    dispatch({ type: "deleteProfileFailure", payload: e.message });
  }
};

export const getMyPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: "mpRequest" });
    const { data } = await axios.get(`/api/v1/myposts?page=${page}`);
    dispatch({ type: "mpSuccess", payload: data.posts });
  } catch (e) {
    dispatch({ type: "mpFailure", payload: e.message });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userPostsRequest" });
    const { data } = await axios.get(`/api/v1/user/posts/${id}`);
    dispatch({ type: "userPostsSuccess", payload: data.posts });
  } catch (e) {
    dispatch({ type: "userPostsFailure", payload: e.message });
  }
};

export const followUnfollow = (id) => async (dispatch) => {
  try {
    dispatch({ type: "followUnfollowRequest" });
    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({ type: "followUnfollowSuccess", payload: data.message });
  } catch (e) {
    dispatch({ type: "followUnfollowFailure", payload: e.message });
  }
};

export const getUserInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userInfoRequest" });
    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({ type: "userInfoSuccess", payload: data.user });
  } catch (e) {
    dispatch({ type: "userInfoFailure", payload: e.message });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allUserRequest" });
      const { data } = await axios.get(`/api/v1/users?name=${name}`);
      dispatch({ type: "allUserSuccess", payload: data.users });
    } catch (e) {
      dispatch({ type: "allUserFailure", payload: e.message });
    }
  };
