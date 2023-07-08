import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/user/userSlice";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllUsers);
  return (
    <UsersC>
      <ol>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`${user.id}`} >{user.name}</Link>
          </li>
        ))}
      </ol>
    </UsersC>
  );
};

const UsersC = styled.div`
    width: 100%;
    display: flex;
    padding: 10vh 0;
    /* justify-content: center; */
    ol{
        margin: 0 auto;
        font-size: 22px;
        
        li {
            a {
            color: #f9f9f9
            }
            margin: 1vh  0;
        }
    }

    /* background-color: pink; */
`;

export default UsersList;
