import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { fetchUsers } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import Header from "../Components/Header";
import { fetchPosts } from "../features/posts/postsSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.users.status)
  const postStatus = useSelector((state) => state.posts.status);

  // useEffect(() => {
  //  if(userStatus === 'idle') {
  //   dispatch(fetchUsers());
  //  }

  //  if(postStatus === 'idle') {
  //   dispatch(fetchPosts());
  //  }
  // }, []);
  return (
    <Div>
      <nav>
        <Header />
      </nav>
      <div>
        <Outlet  />
      </div>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;

  nav {
    max-height: 8vh;
    width: 100%;
    //
    /* background-color: yellow; */
  }



  //
  /* background-color: pink; */
`;

export default RootLayout;
