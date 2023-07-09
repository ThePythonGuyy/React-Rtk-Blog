import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { addNewPost } from "../features/posts/postsSlice";
import { selectAllUsers } from "../features/user/userSlice";
import './UpdatePosts.css'
import { useNavigate } from "react-router-dom";

const UpdatePosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();

  console.log('AddPOst........')

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  const handleForm = (e) => {
    if (canSave) {
      try{
        setAddRequestStatus('pending');
        dispatch(addNewPost({title, body: content, userId}))
        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle');
      }
      navigate('/')
    }
  };

  return (
    <UpdateC className="form-container">
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
        <div className="form-group">
          <label htmlFor="postAuthor">Autor : </label>
          <select name="postAuthor" value={userId} onChange={handleUserId}>
            <option value=""></option>
            {userOptions}
          </select>
        </div>
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
        <div>
          <button type="submit" className="form-submit-btn" onClick={handleForm} disabled={!canSave}>
            Submit
          </button>
        </div>
      </form>
    </UpdateC>
  );
};

const UpdateC = styled.div`
  min-width: 40vw;
  margin: 10vh auto;

 form > div {
  label {
    font-size: 200px;
  }
  select{
    background-color: #212121;
    width: 85%;
    border-radius: 8px;
    padding: 1vh 0;
    font-size: 15px;
    color: white;
  }
 }
  /* padding-top: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;

  form {
    display: flex;
    flex-flow: column nowrap;
    gap: 4vh;
    div {
      display: flex;
      align-items: center;
      input {
        margin-left: 2vw;
        padding: 7px;
        font-size: 15px;
      }

      textarea {
        margin-left: 0.5vw;
        padding: 4px 7px;
        font-size: 13px;
      }
    }
  } */
`;

export default UpdatePosts;
