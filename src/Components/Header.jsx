import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { getCount, increaseCount } from "../features/posts/postsSlice";
import { increaseUCount } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  const uCount = useSelector((state) => state.users.uCount);

  const handleCount = () => {
    dispatch(increaseCount())
  }

  const handleUCount = () => {
    dispatch(increaseUCount())
  }

  return (
    <HeaderC>
      <Menu>
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/addpost">Add Blog</Link>
        </span>
        <span>
          <Link to='/user'>
            Users
          </Link>
        </span>
        <span>
          <button onClick={handleCount} >{count}</button>
        </span>
        <span>
          <button onClick={handleUCount} >{uCount}</button>
        </span>
      </Menu>
    </HeaderC>
  );
};

const HeaderC = styled.div`
  width: 100%;
  min-height: 8vh;
  background-color: #0d0a0b;
  background-image: linear-gradient(315deg, #0d0a0b 0%, #009fc2 74%);
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-left: auto;
  margin-right: 4vw;
  align-items: center;
  span > a {
    text-decoration: none;
    font-size: 22px;
    
    color: #f9f9f9;
    font-weight: 700;
    cursor: pointer;
  }

  span {
    margin-left: 1.5vw;
    padding: 1vh 0.9vw;
    border-radius: 7%;
    &:hover {
      background-color: rgba(249, 249, 249, 0.5);
    }
  }
`;
export default Header;
