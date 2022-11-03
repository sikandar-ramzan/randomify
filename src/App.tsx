import React, { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./userCard";
import { InfinitySpin } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

var fetchIcon = require("./assets/fetch-icon-sm.png");

// https://randomuser.me/api/

export interface userType {
  userImageURL: string;
  name: string;
  gender: "male" | "female";
  email: string;
  city: string;
  state: string;
  country: string;
  contact: string;
}

function App() {
  const [users, setUsers] = useState<userType[]>();
  const [isLoading, setisLoading] = useState(false);

  const fetchUser = async () => {
    setisLoading(true);
    const response = await fetch("https://randomuser.me/api/?results=100");
    const userData = await response.json();

    const userList = userData.results;

    const customUserList: userType[] = [];
    userList.forEach((user: any) => {
      customUserList.push({
        userImageURL: user.picture.large,
        name: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        email: user.email,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        contact: user.cell,
      });
    });

    setUsers([...customUserList]);
  };
  console.log(users);

  useEffect(() => {
    setisLoading(false);
  }, [users]);

  return (
    <div>
      <div className="header">
        <div className="header-title">Fetch Random Users!</div>
        <img
          className="fetch-button"
          role={"button"}
          src={fetchIcon}
          onClick={fetchUser}
          alt=""
        />
      </div>

      {isLoading ? (
        <InfinitySpin width="200" color="#8a15fff7" />
      ) : (
        users?.map((user, idx) => {
          return (
            <div key={idx}>
              <UserCard user={user} />
              <br></br>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
