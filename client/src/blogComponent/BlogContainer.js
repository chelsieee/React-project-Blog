import React, {useEffect, useState} from "react";
import {List} from './List';
import {AddBlog} from './AddBlog'
import { EditBlog } from "./EditBlog";


const BlogContainer = () => {

const [blogList, setBlogList] =useState([])
const [editblog, setEditBlog] =useState({ 
title:' blog container',
content:'',
categoryId:''
})
const [categories, setCategories] =useState([])

const handleBlogFormSubmit =(blog) =>{
console.log('created blog:', blog)
 const newList =[...blogList]
 newList.push(blog)
 console.log(newList)
 setBlogList(newList)

 fetch('http://localhost:8000/blogs/new-blog',{
    method:"POST",
    headers: {
        "Content-Type": "application/json",
      },
    body:JSON.stringify(blog)
 }).then((res)=>{
    console.log("post response:", res);
 })
}

const handleBlogClick =(blog)=>{
    setEditBlog(blog);
}

const handleEditBlog =(blog) =>{
console.log('handle edited blog:', blog)
 fetch(`http://localhost:8000/blogs/new-blog/update/${blog._id}`,{
     method:'PUT',
    headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify(blog)
 }).then((res)=>{
     console.log('PUT res:', res)
 })
} 

const handleDelteBlog =(blog) =>{
    console.log('blog to be deleted:', blog)
    const newList =[...blogList]
    newList.splice(blog.id,1)
    setBlogList(newList)
}

useEffect(()=>{
    fetch('http://localhost:8000/blogs/all', {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
        credentials: 'same-origin',
    }).then((res)=>{
        return res.json()
    }).then((BlogData)=>{
        console.log('blog Data:', BlogData);
        setBlogList(BlogData)
    })
},[])


useEffect(()=>{
    fetch('http://localhost:8000/categories/all', {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    }).then((res)=>{
        return res.json()
    }).then((categories)=>{
        console.log('categories Data:', categories);
        setCategories(categories)
    })
},[])


return (
    <div>
    <h1>Blogs</h1>
    <List blogs={blogList} handleClick={handleBlogClick} handleDelte={handleDelteBlog}/>
    <AddBlog submit={handleBlogFormSubmit} categories={categories}/>
    <EditBlog submit={handleEditBlog} blog={editblog} categories={categories}/>
    </div>
)
}

export {BlogContainer};