import React from 'react'
import './PostsList.css'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import PostReactions from './PostReactions'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { currentPost } from '../features/posts/postsSlice'

const SinglePost = ({postId}) => {
  const post = useSelector((state) => currentPost(state, postId));
  return (
    <div className="card" key={post.id}>
                <div className="content">
                  <h3 className="title">{post.title}</h3>
                  <p className="description" id="body">
                    {post.body}
                  </p>
                  <p className="description" id="author">
                    <PostAuthor userId={post.userId} />
                  </p>
                  <p className="description">
                    <TimeAgo timeStamp={post.date} />
                  </p>

                  <PostReactions postId={post.id} />
                  <div
                    className="Edit"
                    // onClick={() => {
                    //   handleView(post.id);
                    // }}
                  >
                    <Link to={`/viewpost/${post.id}`} >View Post</Link>
                  </div>
                </div>
              </div>
  )
}

export default  React.memo(SinglePost)
