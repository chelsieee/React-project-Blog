import React from "react";

export const List = (props) => {
  return (
    <ul>
      {props.blogs.map((el, index) => (
        <li key={index} onClick={()=>(props.handleClick(el))} >
          {el.title} {el.content} {el.category} <button type="button" key={index} onClick={()=>props.handleDelete(el)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

