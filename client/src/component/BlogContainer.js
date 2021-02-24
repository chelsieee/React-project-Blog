import React, {useEffect, useState} from "react";
import {List} from './List';


const BlogContainer = () => {

const [blogList, setBlogList] =useState([{title:1}, {title:2}])



return (
    <div>
    <h1>Blogs</h1>
    <List blogs={blogList}/>


    </div>
)
}

export {BlogContainer};