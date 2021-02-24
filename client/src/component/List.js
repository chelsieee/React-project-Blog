import React from "react";

const List = (props) => {
  return (
    <ul>
      {props.blogs.map((el, index) => (
        <li key={index}>{el.title}</li>
      ))}
    </ul>
  );
};

export { List };
