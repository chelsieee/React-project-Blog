import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "./List";
import { AddBlog } from "./AddBlog";
import { EditBlog } from "./EditBlog";
import {PrivateList} from "./PrivateList"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

const userId = window.localStorage.getItem('userId')


export const BlogContainer = () => {
  const [blogList, setBlogList] = useState([]);
  const [personalBlogList, setPersonalBlogList] = useState([]);

  const [editblog, setEditBlog] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);

  let history = useHistory();

  const handleBlogFormSubmit = (blog) => {
     axios
      .post("http://localhost:3000/api/blogs/new-blog", blog, {
        "Access-Control-Allow-Credentials": true,
      })
      .then((res) => {
        console.log("post response:", res);
        history.push('/blog/public')
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
      if(userId){
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
  }, []);

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

  

  return (
  
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to ='/blog/public'>Home Page</Link>
                    </li>
                    <li>
                        <Link to='/blog/private'>Personal Page</Link>
                    </li>
                    <li>
                        <Link to ='/blog/add'>Add blog</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path ='/blog/public'>
                <List blogs={blogList}/>
                </Route>
                <Route path ='/blog/private'>
                    <PrivateList blogs={personalBlogList} handleClick={handleBlogClick} handleDelete={handleDeleteBlog}/>
                </Route>
                <Route path ='/blog/add'>
                <AddBlog submit={handleBlogFormSubmit} categories={categories}/>
                </Route>
                <Route path='/blog/edit'>
                <EditBlog submit={handleEditBlog} blog={editblog} categories={categories}/>
                </Route>
            </Switch>
        </div>
    </Router>
  );
};


