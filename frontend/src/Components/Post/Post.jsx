import { Avatar, Typography, Button, Dialog, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import User from "../User/User";
import "./Post.css";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { commentAdd, commentDelete, likeDislike } from "../../Actions/Posts";
import { getFollowingPost } from "../../Actions/User";
const Post = ({
  postImage = "https://dummyimage.com/600x400/000/fff",
  ownerImage,
  ownerId,
  caption,
  ownerName,
  isDelete,
  isAccount,
  id,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likeBoxOpen, setLikeBoxOpen] = useState(false);
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { user } = useSelector((state) => state.user);
  console.log("comments", comments, user);
  const handleLike = async (id) => {
    setLiked(!liked);
    await dispatch(likeDislike(id));
    dispatch(getFollowingPost());
  };
  useEffect(() => {
    likes.forEach((item) => {
      setLiked(item._id === user._id);
    });
  }, [likes, user._id]);
  const commentSubmit = async (e) => {
    e.preventDefault();
    await dispatch(commentAdd(id, commentText));
    setCommentText("");
    dispatch(getFollowingPost());
  };

  const deleteComment = async (postId, commentId) => {
    await dispatch(commentDelete(postId, commentId));
    dispatch(getFollowingPost());
  };

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img
        src={postImage || "https://dummyimage.com/600x400/000/fff"}
        alt="post"
      />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="user"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alighSelf: "Center" }}
        >
          {caption}
        </Typography>
      </div>
      <button>
        <Typography fontWeight={100} onClick={() => setLikeBoxOpen(true)}>
          {likes.length} Likes
        </Typography>
      </button>
      <div className="postFooter">
        <Button onClick={() => handleLike(id)}>
          {liked ? <Favorite /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentBoxOpen(true)}>
          <ChatBubbleOutline />
        </Button>
        {isDelete ? (
          <Button>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>
      <Dialog open={likeBoxOpen} onClose={() => setLikeBoxOpen(false)}>
        {likes && likes.length > 0 ? (
          likes.map((likes) => {
            return (
              <User
                key={likes._id}
                userID={likes._id}
                name={likes.name}
                avatar={likes.avatar.url}
              />
            );
          })
        ) : (
          <Typography varient="h6">No Likes yet</Typography>
        )}
      </Dialog>

      <Dialog open={commentBoxOpen} onClose={() => setCommentBoxOpen(false)}>
        <form onSubmit={(e) => commentSubmit(e)}>
          <TextField
            id="outlined-basic"
            label="Comment here..."
            variant="outlined"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button variant="text" type="submit">
            Submit
          </Button>

          {comments && comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <User
                    userID={comment.user._id}
                    name={comment.user.name}
                    avatar={comment.user.avatar.url}
                    comments={comment.comment}
                  />
                  {comment.user._id === user._id ? (
                    <Button>
                      <DeleteOutline
                        onClick={() => deleteComment(id, comment._id)}
                      />
                    </Button>
                  ) : null}
                </div>
              );
            })
          ) : (
            <Typography varient="h6">No comments yet</Typography>
          )}
        </form>
      </Dialog>
    </div>
  );
};

export default Post;
