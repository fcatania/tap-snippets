import React from 'react';
import './login.css';
let UserInfo = (props) => (
  <div className="user-info">
    <button className="logout btn btn-default" onClick={props.signOut}>Log Out</button>
    <span>{props.username}</span>
    <img src={props.photo} className="profile img-circle"/>
  </div>
);

export default UserInfo;