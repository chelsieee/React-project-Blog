import React, {useEffect, useState} from "react";
import axios from 'axios'
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

 axios.get('http://localhost:8000/blogs/new-blog',{
    withCredentials: true,
    credentials: 'include',
 }).then((res)=>{
    console.log("post response:", res);
 })
}

const handleBlogClick =(blog)=>{
    setEditBlog(blog);
}

const handleEditBlog =(blog) =>{
console.log('handle edited blog:', blog)
 axios.patch(`api/blogs/update/${blog._id}`,
{title: blog.title, 
content:blog.content, 
categoryId: blog.categoryId_id},
 {'Access-Control-Allow-Credentials':true})
 .then((res)=>{
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
    axios.get('/api/blogs/all', {
        'Access-Control-Allow-Credentials':true
        })
        .then((res)=>{
        console.log('blog Data:', res);
        setBlogList(res.data)
    })
},[])


useEffect(()=>{
    axios.get('/api/categories/all', {
        'Access-Control-Allow-Credentials':true
    })
    .then((res)=>{
        console.log('categories Data:', res);
        setCategories(res.data)
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