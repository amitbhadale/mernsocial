import { Typography, Button } from "@mui/material";
import React, { useState } from "react";
import "./Search.css";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
const Search = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { loading: userLoading, users } = useSelector(
    (state) => state.allUsers
  );
  const loginHandler = async (e) => {
    e.preventDefault();
    await dispatch(getAllUsers(name));
  };
  return (
    <div className="search">
      <form className="searchForm" onSubmit={loginHandler}>
        <Typography variant="h3">Social App</Typography>
        <input
          type="text"
          name=""
          id="name"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit">Search</Button>

        <div className="searchResults">
          {users && users.length > 0 ? (
            users.map((user) => {
              return (
                <User
                  key={user._id}
                  userID={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              );
            })
          ) : (
            <Typography varient="h6">No Users found</Typography>
          )}
        </div>
      </form>
    </div>
  );
};
export default Search;
