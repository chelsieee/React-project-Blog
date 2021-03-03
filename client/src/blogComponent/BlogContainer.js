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
  Link
} from "react-router-dom";

export const BlogContainer = () => {
  const [blogList, setBlogList] = useState([]);
  const [editblog, setEditBlog] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);

  const handleBlogFormSubmit = (blog) => {
    console.log("created blog:", blog);
    const newList = [...blogList];
    newList.push(blog);
    console.log(newList);
    setBlogList(newList);

    axios
      .post("api/blogs/new-blog", blog, {
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
        `api/blogs/update/${blog._id}`,
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
          .get("/api/blogs/all", {
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
      .delete(`api/blogs/delete/${blog._id}`, blog, {
        "Access-Control-Allow-Credentials": true,
      })
      .then((deletedBlog) => {
        console.log(deletedBlog);
        window.alert(deletedBlog.data);
        axios
          .get("/api/blogs/all", {
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

 

  useEffect(() => {
    axios
      .get("/api/blogs/all", {
        "Access-Control-Allow-Credentials": true,
      })
      .then((res) => {
        console.log("blog Data:", res);
        setBlogList(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/categories/all", {
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
                    <PrivateList blogs={blogList} handleClick={handleBlogClick} handleDelete={handleDeleteBlog}/>
                </Route>
                <Router path ='/blog/add'>
                <AddBlog submit={handleBlogFormSubmit} categories={categories}/>
                </Router>
                <Router path='/blog/edit'>
                <EditBlog submit={handleEditBlog} blog={editblog} categories={categories}/>
                </Router>
            </Switch>
        </div>
    </Router>
  );
};


