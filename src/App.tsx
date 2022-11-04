import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import "./App.css";
import UserCard from "./userCard";

var fetchIcon = require("./assets/fetch-icon-sm.png");

interface genderTypes {
  male: string;
  female: string;
}

interface countryTypes {
  fr: string;
  in: string;
}

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
  const [usersToFetch, setusersToFetch] = useState<number>(10);
  const [gender, setGender] = useState<genderTypes | undefined>(undefined);
  const [country, setCountry] = useState<countryTypes | undefined>(undefined);

  //Hides the loader after the api call is finished i.e users are set in the state
  useEffect(() => {
    setisLoading(false);
  }, [users]);

  // Fetches 10 users on component mount
  useEffect(() => {
    console.log("fetching 10 users on mount");
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

  useEffect(() => {
    console.log("gender:", gender);
  }, [gender]);
  return (
    <div className="container">
      <div className="header">
        <div className="header-title">Randomify</div>
        <div className="header-subtitle">Fetch Random Users!</div>
        <div className="user-filters-container">
          <UsersToFetchDropdown
            usersToFetch={usersToFetch}
            setusersToFetch={setusersToFetch}
          />
          <FetchUserFilters
            gender={gender}
            setGender={setGender}
            country={country}
            setCountry={setCountry}
          />
        </div>
        <div className="fetch-button-container">
          <FetchButton
            setisLoading={setisLoading}
            usersToFetch={usersToFetch}
            setUsers={setUsers}
            gender={gender}
            country={country}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loader-animation">
          <InfinitySpin width="200" color="#8a15fff7" />
        </div>
      ) : (
        <div className="cards-container">
          {users?.map((user, idx) => {
            return (
              <div key={idx}>
                <UserCard user={user} id={idx} />
                <br></br>
              </div>
            );
          })}
        </div>
      )}

      <footer>
        <div className="footer">&copy; Sikandar Ramzan</div>
      </footer>
    </div>
  );
}

interface fetchButtonProps {
  setisLoading: (bool: boolean) => void;
  usersToFetch: number;
  setUsers: (users: userType[]) => void;
  gender: genderTypes | undefined;
  country: countryTypes | undefined;
}

// Fetch users on button click
const FetchButton = (props: fetchButtonProps) => {
  const API_ENDPOINT = "https://randomuser.me/api/";

  const getGender = (gender: genderTypes | undefined) =>
    gender ? `&gender=${gender}` : "";

  const getCountry = (country: countryTypes | undefined) =>
    country ? `&nat=${country}` : "";

  const fetchUser = async () => {
    props.setisLoading(true);
    console.log(`fetching ${props.usersToFetch} users on click`);

    const response = await fetch(
      `${API_ENDPOINT}?results=${props.usersToFetch}${getGender(
        props.gender
      )}${getCountry(props.country)}`
    );
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

    props.setUsers([...customUserList]);
  };
  return (
    <img
      className="fetch-button"
      role={"button"}
      src={fetchIcon}
      onClick={fetchUser}
      alt=""
    />
  );
};
interface usersToFetchDropdownTypes {
  usersToFetch: number;
  setusersToFetch: (users: number) => void;
}
const UsersToFetchDropdown = (props: usersToFetchDropdownTypes) => {
  const handleUsersToFetch = (e: any) => {
    e.preventDefault();
    props.setusersToFetch(e.target.value);
  };

  return (
    <div>
      <label
        className={"select-label"}
        htmlFor="fetch-dropdown"
      >{`Select number of users: `}</label>
      <select
        value={props.usersToFetch}
        name="fetch"
        id="fetch-dropdown"
        onChange={handleUsersToFetch}
        className="select-box"
      >
        <option value={1}>1</option>
        <option value={10}>10</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={200}>200</option>
      </select>
    </div>
  );
};

interface fetchUserFilterTypes {
  gender: genderTypes | undefined;
  setGender: (gender: genderTypes | undefined) => void;
  country: countryTypes | undefined;
  setCountry: (country: countryTypes | undefined) => void;
}
const FetchUserFilters = (props: fetchUserFilterTypes) => {
  const handleGenderSelection = (e: any) => {
    if (e.target.value === "All") props.setGender(undefined);
    else props.setGender(e.target.value);
    console.log(e.target.value);
  };

  const handleCountrySelection = (e: any) => {
    if (e.target.value === "All") props.setCountry(undefined);
    else props.setCountry(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div>
        <label
          className="select-label"
          htmlFor="gender-dropdown"
        >{`Gender: `}</label>
        <select
          value={undefined}
          name="gender"
          id="gender-dropdown"
          onChange={handleGenderSelection}
          className="select-box"
        >
          <option value={undefined}>All</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
      </div>
      <div>
        <label
          className="select-label"
          htmlFor="nationality-dropdown"
        >{`Country: `}</label>
        <select
          value={undefined}
          name="nationality"
          id="nationality-dropdown"
          onChange={handleCountrySelection}
          className="select-box"
        >
          <option value={undefined}>All</option>
          <option value={"fr"}>France</option>
          <option value={"in"}>India</option>
        </select>
      </div>
    </>
  );
};

export default App;
