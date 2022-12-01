import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const User = ({ userID, name, avatar, comments }) => {
  return (
    <Link to={`/user/${userID}`} className="homeUser">
      <img src={avatar} alt={name} />
      <Typography>{comments ? <b>{name}</b> : name}</Typography>
      <Typography varient="h6">&nbsp; {comments}</Typography>
    </Link>
  );
};

export default User;
