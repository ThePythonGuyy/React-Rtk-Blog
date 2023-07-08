import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectAllPosts, updateReaction } from "../features/posts/postsSlice";

const PostReactions = ({ postId }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const currentPost = posts.find((post) => post.id === postId);

  const [thumpsUp, setThumpsUp] = useState();
  const [thumpDown, setThumpsDown] = useState();
  const [rocket, setRocket] = useState();

  useEffect(() => {
    setThumpsDown(currentPost.reactions.thumpsDown);
    setThumpsUp(currentPost.reactions.thumpsUp);
    setRocket(currentPost.reactions.rocket);
  }, [currentPost.reactions]);

  const handleROCKET = (e) => {
    dispatch(
      updateReaction({
        postId,
        reactionType: "rocket",
      })
    );
  };

  const handleThumpsUP = (e) => {
    dispatch(
      updateReaction({
        postId,
        reactionType: "thumpsUp",
      })
    );
  };

  const handleThumpsDOWN = (e) => {
    dispatch(
      updateReaction({
        postId,
        reactionType: "thumpsDown",
      })
    );
  };
  return (
    <Div>
      <button onClick={handleThumpsUP}>👍🏻{thumpsUp}</button>
      <button onClick={handleThumpsDOWN}>👎🏻{thumpDown}</button>
      <button onClick={handleROCKET}>🚀{rocket}</button>
    </Div>
  );
};

const Div = styled.div`
  /* display: flex;
    flex-flow: row nowrap; */
`;

export default PostReactions;
