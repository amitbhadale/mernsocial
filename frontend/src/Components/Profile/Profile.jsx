import React, { useEffect, useState } from "react";
import "../Account/Account.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts, getUserInfo, followUnfollow } from "../../Actions/User";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import Loader from "../Loader/Loader";
import User from "../User/User";
import { useParams } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {
    userPosts: posts,
    loading,
    userInfo: user,
  } = useSelector((state) => state.postOfFollowing);
  const { loading: userLoading, user: me } = useSelector((state) => state.user);

  useEffect(async () => {
    await dispatch(getUserPosts(params.id));
    await dispatch(getUserInfo(params.id));
  }, [dispatch]);

  useEffect(() => {
    if (me) {
      if (me._id === params.id) {
        setMyaccount(true);
      }
    }
  }, [user, me]);

  useEffect(() => {
    if (user && me) {
      setFollowed(user.followers.map((item) => item._id).includes(me._id));
    }
  }, [user, me]);

  const [flwrBox, setFlwrBox] = useState(false);
  const [flwingBox, setFlwingBox] = useState(false);

  const [myaccount, setMyaccount] = useState(false);
  const [followed, setFollowed] = useState(false);

  const followHandler = async () => {
    // setFollowed(!followed);
    await dispatch(followUnfollow(params.id));
    await dispatch(getUserInfo(params.id));
  };

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
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
                isProfile={params.id}
                likes={post.likes}
                comments={post.comments}
              />
            );
          })
        ) : (
          <Typography varient="h6">User has not made any post yet</Typography>
        )}
      </div>

      <Dialog open={flwrBox} onClose={() => setFlwrBox(false)}>
        <Typography varient="h3">My Followers</Typography>
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
          <Typography varient="h6">No Followers yet</Typography>
        )}
      </Dialog>

      <Dialog open={flwingBox} onClose={() => setFlwingBox(false)}>
        <Typography varient="h3">Following to</Typography>
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

        {myaccount ? null : (
          <Button varient="contained" onClick={() => followHandler()}>
            {followed ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
