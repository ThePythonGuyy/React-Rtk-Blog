import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { selectAllUsers, selectUserBlogs } from '../features/user/userSlice';
import { selectPostByUser } from '../features/posts/postsSlice';

const UserBlogs = () => {
    const {id} = useParams();
    // const userBlogs = useSelector((state) => selectUserBlogs(state, Number(id)));
    const userBlogs = useSelector((state) => selectPostByUser(state, Number(id)))
    const users  = useSelector(selectAllUsers);
    const user = users.find((usr) => usr.id === Number(id));

    console.log(1)
    if(!(user && userBlogs)) {
        console.log(2)
        return (
            <h1>Page not found</h1>
        )
    }
  return (
<UserBlogsC>
    <h1>{user.name}</h1>
    <ol>
        {
            userBlogs.map((blog) => (
                <li key={blog.id}>
                    <Link to={`/viewpost/${blog.id}`} >
                        {blog.title}
                    </Link>
                </li>
            ))
        }
    </ol>
</UserBlogsC>
  )
}

const UserBlogsC = styled.div`

width: 100%;
    display: flex;
    padding: 10vh 0;
    flex-flow: column nowrap;
    /* margin-left: 20px; */
    align-items: center;
    /* justify-content: center; */
    ol{
        /* list-style-type: none; */
        margin: 3vh auto;
        font-size: 22px;
        
        li {
            a {
            color: #f9f9f9
            }
            margin: 1vh  0;
        }
    }
`;

export default UserBlogs
