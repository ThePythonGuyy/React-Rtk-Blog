import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../features/user/userSlice'

const PostAuthor = (props) => {
    const users = useSelector(selectAllUsers);

    const author = users.find(user => user.id === props.userId)
  return (
    <span>
      {author ? author.name : 'Unknown author'}
    </span>
  )
}

export default PostAuthor
