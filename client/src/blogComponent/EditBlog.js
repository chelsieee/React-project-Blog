import React, { useEffect, useState } from  "react"
import {
  } from "react-router-dom";

export const EditBlog =(props)=>{

    const [blog, setBlog]=useState({
        title:'',
        content:'',
        categoryId:''
    })

    const handleChange =(e)=>{
        console.log('e.target:', e.target);
        const newBlog ={...blog}
        newBlog[e.target.name] =e.target.value
        setBlog(newBlog)
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log('Edited blog:', blog)
        props.submit(blog)
    }

    useEffect(()=>{
        console.log('blog useEffect')
        console.log(props.blog)
        const blogEdit = {...props.blog}
        blogEdit.categoryId =props.blog.categoryId._id
        setBlog(blogEdit)
    },[props.blog])

    return (
        <div>
           <h2>change your mind for today?</h2> 
           <form onSubmit={handleSubmit}>
           <div>
            <input name ="title" type ="text" value={blog.title} placeholder="Update title here" onChange={handleChange}></input>
           </div>
           <div>
           <input name ="content" type ="text" value={blog.content} placeholder="Update content here" onChange={handleChange}></input>
           </div>
           <div>
               <label htmlFor="blogType">Blog categories</label>
               <select name="categoryId" id="categories" onChange={handleChange} value={blog.categoryId}>
               {props.categories.map((el, index)=>(<option key ={index} value ={el._id}>{el.tag}</option>))}
               </select>
           </div>
           <div>
               <button type="submit" id ="updateblog">submit</button>             
           </div>
           </form>
       </div>
    )
}