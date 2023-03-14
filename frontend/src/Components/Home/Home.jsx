import React, { useEffect, useState } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPost } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(getFollowingPost());
    await dispatch(getAllUsers());
  }, []);

  const { loading, posts } = useSelector((state) => state.postOfFollowing);
  const { loading: userLoading, users } = useSelector(
    (state) => state.allUsers
  );

  return !loading && !userLoading ? (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Post
                key={post._id}
                id={post._id}
                ownerName={post.owner.name}
                caption={post.caption}
                postImage={post.image.url}
                ownerImage={post.owner.avatar.url}
                ownerId={post.owner._id}
                isDelete={false}
                isAccount={false}
                likes={post.likes}
                comments={post.comments}
              />
            );
          })
        ) : (
          <Typography varient="h6">No Posts yet</Typography>
        )}
      </div>
      <div className="homeright">
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
    </div>
  ) : (
    <Loader />
  );
};

export default Home;
