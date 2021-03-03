import React from "react";

import {
    Link
  } from "react-router-dom";

export const PrivateList = (props) => {
  return (
    <div>
        <button type="button">Create</button>
    <ul>
      {props.blogs.map((el, index) => (
        <li key={index}>
         {el.title} {el.content} {el.categoryId.tag} {el.createdAt}  <button type="button" key={index} onClick={()=>props.handleDelete(el)}>Delete</button>
         <Link to ='/blog/edit'>
            <button type="button" onClick={()=>(props.handleClick(el))}>
                Edit
            </button>
         </Link>
        </li>
      ))}
    </ul>
    </div>
  );
};
