import React, { useEffect, useState } from "react";
import "./Account.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPosts,
  loadUser,
  logOut,
  deleteProfile,
} from "../../Actions/User";
import {
  Avatar,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  Divider,
} from "@mui/material";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import User from "../User/User";

const Account = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(getMyPosts(page));
    await dispatch(loadUser());
  }, [dispatch]);

  const [flwrBox, setFlwrBox] = useState(false);
  const [flwingBox, setFlwingBox] = useState(false);

  const { loading, posts } = useSelector((state) => state.myPosts);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const loadPrevious = async () => {
    setPage(page - 1);
    await dispatch(getMyPosts(page));
  };
  const loadNext = async () => {
    setPage(page + 1);
    await dispatch(getMyPosts(page));
  };
  const logoutHandler = () => {
    if (window.confirm("Do you want to Logout!") === true) {
      dispatch(logOut());
    }
  };
  const deleteProfileHandler = async () => {
    console.log("delete account");
    await dispatch(deleteProfile());
  };
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          <>
            {posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  id={post._id}
                  ownerName={post.owner.name}
                  caption={post.caption}
                  postImage={post.image.url}
                  ownerImage={post.owner.avatar.url}
                  ownerId={post.owner._id}
                  isDelete={true}
                  isAccount={true}
                  likes={post.likes}
                  comments={post.comments}
                />
              );
            })}
            <Button varient="contained" onClick={loadPrevious}>
              Previous
            </Button>
            <Button varient="contained" onClick={loadNext}>
              Next
            </Button>
          </>
        ) : (
          <Typography varient="h6">No Posts yet</Typography>
        )}
      </div>
      <Dialog open={flwrBox} onClose={() => setFlwrBox(false)}>
        <DialogTitle>My Followers</DialogTitle>
        <Divider />
        {user && user.followers && user.followers.length > 0 ? (
          user.followers.map((flwr) => {
            return (
              <User
                key={flwr._id}
                userID={flwr._id}
                name={flwr.name}
                avatar={flwr.avatar.url}
              />
            );
          })
        ) : (
          <Typography variant="h6">No Followers yet</Typography>
        )}
      </Dialog>

      <Dialog open={flwingBox} onClose={() => setFlwingBox(false)}>
        <DialogTitle>Following to</DialogTitle>
        <Divider />
        {user && user.following && user.following.length > 0 ? (
          user.following.map((flwr) => {
            return (
              <User
                key={flwr._id}
                userID={flwr._id}
                name={flwr.name}
                avatar={flwr.avatar.url}
              />
            );
          })
        ) : (
          <Typography varient="h6">You are not following anyone</Typography>
        )}
      </Dialog>

      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            ></Avatar>
            <Typography varient="h5">{user.name}</Typography>
            <div>
              <button onClick={() => setFlwrBox(true)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>
            <div>
              <button onClick={() => setFlwingBox(true)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>
          </>
        )}

        <Button varient="contained" onClick={() => logoutHandler()}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          varient="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Account;
