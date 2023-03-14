import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../../Actions/Posts";
import "./NewPost.css";

const NewPost = () => {
  const [image, setImage] = useState(undefined);
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.newPost);

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(newPost(caption, image));

    setCaption("");
    setImage(undefined);
  };
  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={formSubmitHandler}>
        <Typography variant="h6">New Post</Typography>
        {image && <img src={image} alt="post" />}

        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={imageChangeHandler}
        />
        <input
          type="text"
          placeholder="Caption"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
