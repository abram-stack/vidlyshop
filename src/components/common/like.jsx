import React, { Component } from 'react';

// input : 'Liked' property boolean
// output: raised event onClick, toggling 'like' property, change property in DB
// stateless functional components

const Like = (props) => {
  let classes = 'fa fa-heart';
  if(!props.liked)
    classes += '-o'
  return (
      <i 
        style={ {cursor: 'pointer'} }
        onClick= {props.onClick}
        className= {classes} aria-hidden="true">
      </i>
  );
}
 
export default Like;

