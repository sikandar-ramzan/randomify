import React, { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./userCard";
import { InfinitySpin } from "react-loader-spinner";

var fetchIcon = require("./assets/fetch-icon-sm.png");

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

  // Fetch users on button click
  const fetchUser = async () => {
    setisLoading(true);
    const response = await fetch("https://randomuser.me/api/?results=100");
    const userData = await response.json();

    const userList = userData.results;

    //Map the response data to what's needed
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

  //Hides the loader after the api call is finished i.e users are set in the state
  useEffect(() => {
    setisLoading(false);
  }, [users]);

  // Fetches 10 users on component mount
  useEffect(() => {
    setisLoading(true);

    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((result) => {
        const userList = result.results;

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
      });
  }, []);

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
        <div className="loader-animation">
          <InfinitySpin width="200" color="#8a15fff7" />
        </div>
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
