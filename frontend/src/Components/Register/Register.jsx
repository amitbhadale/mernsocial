import { Avatar, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../Actions/User";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const avatarChange = (e) => {
    const file = e.target.files[0];
    const Avtr = new FileReader();
    Avtr.onload = () => {
      if (Avtr.readyState === 2) {
        setAvatar(Avtr.result);
      }
    };
    Avtr.readAsDataURL(file);
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    await dispatch(register(userName, email, password, avatar));
  };
  return (
    <div className="register">
      <form className="registerForm" onSubmit={registerHandler}>
        <Typography variant="h3">Social App</Typography>
        <Avatar src={avatar} sx={{ height: "10vmax", width: "10vmax" }} />
        <input
          type="file"
          required
          name=""
          id=""
          accept="image/*"
          onChange={(e) => avatarChange(e)}
        />
        <input
          className="registerInputs"
          type="text"
          name=""
          id="username"
          placeholder="Username"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="registerInputs"
          type="email"
          name=""
          id="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registerInputs"
          type="password"
          name=""
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default Register;
