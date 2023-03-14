import { Avatar, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../Actions/User";
import Loader from "../Loader/Loader";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [userName, setUserName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState();
  const [avtrPrev, setAvtrPrev] = useState(user.avatar.url);
  const avatarChange = (e) => {
    const file = e.target.files[0];
    const Avtr = new FileReader();
    Avtr.onload = () => {
      if (Avtr.readyState === 2) {
        setAvtrPrev(Avtr.result);
        setAvatar(Avtr.result);
      }
    };
    Avtr.readAsDataURL(file);
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(userName, email, avatar));
    await dispatch(loadUser());
  };
  return (
    <div className="updateProfile">
      {loading ? (
        <Loader />
      ) : (
        <form className="updateProfileForm" onSubmit={updateProfileHandler}>
          <Typography variant="h3">Social App</Typography>
          <Avatar src={avtrPrev} sx={{ height: "10vmax", width: "10vmax" }} />
          <input
            type="file"
            name=""
            id=""
            accept="image/*"
            onChange={(e) => avatarChange(e)}
          />
          <input
            className="updateProfileInputs"
            type="text"
            name=""
            id="username"
            placeholder="Username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="updateProfileInputs"
            type="email"
            name=""
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">Update</Button>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
