import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "../features/posts/postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactions from "./PostReactions";
import "./PostsList.css";
import { Link, useNavigate } from "react-router-dom";
import SinglePost from "./SinglePost";


const PostsList = (props) => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  const navigate = useNavigate();

  useEffect(() => {
    if (postsStatus === "idle") {
      
      console.log("dispatching......................");
      dispatch(fetchPosts());
      
    }
  }, [postsStatus, dispatch]);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleView = (id) => {
    
    navigate(`/viewpost/${id}`)
  };

  return (
    <PostC>
      <h1>Posts</h1>
      {postsStatus === "loading" ? (
        <p>loading....</p>
      ) : postsStatus === "failed" ? (
        <p>Unable to fetch data</p>
      ) : (
        <div>
          {posts &&
            orderedPosts.map((post, key) => (
              <SinglePost post={post} key={post.id} />
            ))}
        </div>
      )}
    </PostC>
  );
};

const PostC = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 4vh 0%;
  width: 100%;

  h1 {
    font-size: 40px;
  }

  & > div {
    margin-top: 5vh;
    max-width: 90%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    place-items: center;
    grid-column-gap: 2vw;
    grid-row-gap: 3vh;
    /* div {
      border: 1px solid ;
      width: 70%;
      padding: 1vh 2vw;
      border-radius: 8px;
    }
    div  > h3 {
      font-size: 30px;
    }

    aritcle > p {
      font-size: 24px;
    } */
  }

  /* background-color: pink; */
`;

export default PostsList;
