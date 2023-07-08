import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { currentPost } from "../features/posts/postsSlice";
import "./PostsList.css";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const selector = useSelector();
  const currentPostX = useSelector((state) => currentPost(state, id));

  if (!currentPostX) {
    return (
      <h3>Page Not Found</h3>
    )
  }

  const handleEdit = () => {
    navigate(`/editpost/${id}`);
  };

  
  return (
    <ViewC>
      <div className="card">
        <div className="content">
          <h3 className="title">{currentPostX.title}</h3>
          <p className="description" id="body">
            {currentPostX.body}
          </p>
          <p className="description" id="author">
            <PostAuthor userId={currentPostX.userId} />
          </p>
          <p className="description">
            <TimeAgo timeStamp={currentPostX.date} />
          </p>

          <PostReactions postId={currentPostX.id} />
          <div
            className="Edit"
            // onClick={() => {
            //   handleEdit(currentPostX.id);
            // }}
          >
            <a onClick={handleEdit}>Edit Post</a>
          </div>
        </div>
      </div>
    </ViewC>
  );
};

const ViewC = styled.div`
  width: 48%;
  height: 50vh;
  margin: 10vh auto;

  .card {
    min-height: 50vh;
  }

  /* background-color: pink; */
`;

export default ViewPost;
