import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "./List";
import { AddBlog } from "./AddBlog";
import { EditBlog } from "./EditBlog";
import {PrivateList} from "./PrivateList"

import {
  Route,
  Link,
 
} from "react-router-dom";




export const BlogContainer = () => {
  const [blogList, setBlogList] = useState([]);
  const [personalBlogList, setPersonalBlogList] = useState([]);

  const [editblog, setEditBlog] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [users,setUsers] =useState({isLoggin:false})
  

  const handleBlogFormSubmit = (blog) => {
     axios
      .post("http://localhost:3000/api/blogs/new-blog", blog, {
        "Access-Control-Allow-Credentials": true,
      })
      .then((res) => {
        console.log("post response:", res);
  
      });
  };

  const handleBlogClick = (blog) => {
    setEditBlog(blog);
    

  };

  const handleEditBlog = (blog) => {
    console.log("handle edited blog:", blog);
    axios
      .patch(
        `http://localhost:3000/api/blogs/update/${blog._id}`,
        {
          title: blog.title,
          content: blog.content,
          categoryId: blog.categoryId_id,
        },
        { "Access-Control-Allow-Credentials": true }
      )
      .then((res) => {
        console.log("PUT res:", res.data);
        window.alert(res.data);
        axios
          .get("http://localhost:3000/api/blogs/all", {
            "Access-Control-Allow-Credentials": true,
          })
          .then((res) => {
            console.log("blog Data:", res);
            setBlogList(res.data);
          });
          })
      .catch((err) => {
        console.log(err.response);
        window.alert(err.response.data);
      });
  };


  const handleDeleteBlog = (blog) => {
    console.log("blog to be deleted:", blog._id);
    axios
      .delete(`http://localhost:3000/api/blogs/delete/${blog._id}`, blog, {
        "Access-Control-Allow-Credentials": true,
      })
      .then((deletedBlog) => {
        console.log(deletedBlog);
        window.alert(deletedBlog.data);
        axios
          .get("http://localhost:3000/api/blogs/myblog", {
            "Access-Control-Allow-Credentials": true,
          })
          .then((res) => {
            console.log("Personal blog Data:", res);
            setPersonalBlogList(res.data);
          });
      })
      .catch((err) => {
        console.log(err.response);
        window.alert(err.response.data);
      });
  };

 

  useEffect(() => {
          axios
            .get("http://localhost:3000/api/blogs/all", {
              "Access-Control-Allow-Credentials": true,
            })
            .then((res) => {
              console.log("blog Data:", res);
              setBlogList(res.data);
            });
  }, []);


  useEffect(() => {
      if(users.isLoggin){
          axios
            .get("http://localhost:3000/api/blogs/myblog", {
              "Access-Control-Allow-Credentials": true,
            })
            .then((res) => {
              console.log("blog Data:", res);
              setPersonalBlogList(res.data);
            });
      }else{
          console.log('not login yet cant check personal blog')
      }
  }, [users.isLoggin]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categories/all", {
        "Access-Control-Allow-Credentials": true,
      })
      .then((res) => {
        console.log("categories Data:", res);
        setCategories(res.data);
      });
  }, []);

useEffect(()=>{
const loggedInId = window.localStorage.getItem('userId')
if(loggedInId){
  setUsers({isLoggin:true})
  }
},[])

  // logout the user
const handleLogout = () => {
  axios.get('/api/users/logout', { 'Access-Control-Allow-Credentials':true} ).then(
      (res)=>{
          window.localStorage.clear();
          window.alert(res.data)
          setUsers({isLoggin:false})

      }
  )
};
  
return ( 
    <div>
         <nav>
             <ul>
                 <li>
                     <Link to ='/blog/public'>Home Page</Link>
                 </li>
                 <li>
                     <Link to='/blog/private'>Personal Page</Link>
                 </li>
                 <li>  <button onClick={handleLogout}>logout</button></li>
             </ul>
         </nav>
             <Route path ='/blog/public'>
             <List blogs={blogList}/>
             </Route>
             <Route path ='/blog/private'>
                 <PrivateList blogs={personalBlogList} handleClick={handleBlogClick} handleDelete={handleDeleteBlog} login={users}/>
             </Route>
             <Route path ='/blog/add'>
             <AddBlog submit={handleBlogFormSubmit} categories={categories}/>
             </Route>
             <Route path='/blog/edit'>
             <EditBlog submit={handleEditBlog} blog={editblog} categories={categories}/>
             </Route>
     </div>
)
}
