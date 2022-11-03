import React, { memo } from "react";
import { userType } from "./App";
import "./App.css";

interface usersType {
  user: userType;
}

const UserCard = memo(function UserCard(props: usersType) {
  return (
    <div className="user-card">
      <div className="user-image-container">
        <img
          src={props.user.userImageURL}
          className="user-image"
          alt="user avatar"
        />
      </div>
      <div className="user-details-container">
        <div className="user-name">{`Name: ${props.user.name}`}</div>
        <div className="user-gender">{`Gender: ${props.user.gender}`}</div>
        <div className="user-contact">{`Contact: ${props.user.contact}`}</div>
        <div className="user-email">{`Email: ${props.user.email}`}</div>
        <div className="user-address">
          Address:
          <span className="user-city">{` ${props.user.city}, `}</span>
          <span className="user-state">{`${props.user.state},`}</span>
          <span className="user-country"> {`${props.user.country}`}</span>
        </div>
      </div>
    </div>
  );
});

export default UserCard;
