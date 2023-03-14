import { Typography, Button } from "@mui/material";
import React, { useState } from "react";
import "./UpdatePassword.css";

import { useDispatch } from "react-redux";
import { updatePassword } from "../../Actions/User";
const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword));
  };
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={updatePasswordHandler}>
        <Typography variant="h3">Social App</Typography>
        <input
          type="text"
          name=""
          className="updatePasswordInputs"
          placeholder="Old Password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          name=""
          id="password"
          className="updatePasswordInputs"
          placeholder="Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button type="submit">Update Password</Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
