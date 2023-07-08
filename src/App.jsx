import { useDispatch } from "react-redux";
import PostsList from "./Components/PostsList";
import UpdatePosts from "./Components/UpdatePosts";
import { useEffect } from "react";
import { fetchUsers } from "./features/user/userSlice";
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import RootLayout from "./Layouts/RootLayout";
import EditPost from "./Components/EditPost";
import ViewPost from "./Components/ViewPost";
import UsersList from "./Components/UsersList";
import UserBlogs from "./Components/UserBlogs";
 


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />} >
        <Route index element={<PostsList />} />
        <Route path="/addpost" element={<UpdatePosts />} />
        <Route path='editpost/:id' element={<EditPost />} />
        <Route path="/viewpost" > 
          <Route path=":id" element={<ViewPost />}  />

        </Route> 
        <Route path="user" >
          <Route index element={<UsersList />} />
          <Route path=":id" element={<UserBlogs />} />
        </Route>
      </Route>
    )
  )
  
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   console.log('fetching users')
  //   dispatch(fetchUsers())
  // },[])

  return (
    <div>
      <RouterProvider router={router} />
      {/* <PostsList /> */}
      
    </div>
  );
}

export default App;
