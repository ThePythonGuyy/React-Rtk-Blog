import React, { useState } from "react";
import { styled } from "styled-components";
import "./UpdatePosts.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, selectAllPosts, updatetPost } from "../features/posts/postsSlice";

const EditPost = () => {
  const { id } = useParams();
  const posts = useSelector(selectAllPosts);
const dispatch = useDispatch()
const navigate = useNavigate()
  const currentPost = posts.find((post) => post.id == id);

  const [title, setTitle] = useState(currentPost.title);
  const [content, setContent] = useState(currentPost.body);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const canSave = Boolean(title) && Boolean(content);

  const handleForm = () => {

   dispatch(updatetPost({
    title,
    body: content,
    id,
    reactions: currentPost.reactions,
    userId: currentPost.userId,
   })).unwrap()
    navigate(`/viewpost/${id}`);
  };

  const handleDelete = () => {
    
    dispatch(deletePost({id}));
    navigate('/');
  }

  return (
    <EditC className="form-container">
      <form className="form">
        <div className="form-group">
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitle}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="postAuthor">Autor : </label>
          <select name="postAuthor" value={userId} onChange={handleUserId}>
            <option value=""></option>
            {userOptions}
          </select>
        </div> */}
        <div className="form-group">
          <label htmlFor="content">Content : </label>
          <textarea
            name="content"
            value={content}
            onChange={handleContent}
            rows={10}
            cols={50}
          />
        </div>
        <div className="btn">
          <button
            type="submit"
            className="form-submit-btn"
            onClick={handleForm}
            disabled={!canSave}
          >
            Update
          </button>
          <button onClick={handleDelete}  className="form-delete">Delete Post</button>
        </div>
      </form>
    </EditC>
  );
};

const EditC = styled.div`
  min-width: 40vw;
  margin: 10vh auto;

  .form .btn {
    display: flex;
  }
`;

export default EditPost;
