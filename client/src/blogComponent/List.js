import React from "react";

export const List = (props) => {
  return (
    <ul>
      {props.blogs.map((el, index) => (
        <li key={index} >
          {el.title} {el.authorId.username} {el.content} {el.categoryId.tag} {el.createdAt} 
        </li>
      ))}
    </ul>
  );
};

