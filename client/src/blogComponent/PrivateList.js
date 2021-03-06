import React, { useEffect } from "react";

import {
    Link
  } from "react-router-dom";

export const PrivateList = (props) => {

  if(props.login.isLoggin){
    console.log('loggin')
    return (
      <div>
           <Link to ='/blog/add'>
  
          <button type="button">Create</button>
           </Link>
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
  }

  return(
    <div>
      please loggin first
      <Link to='/user/login'>
      <button>login</button>
      </Link>
    </div>
  )
};
