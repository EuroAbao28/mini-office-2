import React, { useEffect, useState } from "react";
import "./Home.css";
import SideNav from "../components/SideNav";
import TodoList from "../components/TodoList";
import StickyNotes from "../components/StickyNotes";
import Calendar from "../components/Calendar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [selectedLink, setSelectedLink] = useState("todolist");

  const clickedLink = (link) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    const isUserValid = () => {
      const checkUserTokenURL =
        "http://localhost:5000/api/users/checkusertoken";

      const userToken = localStorage.getItem("user_token");

      axios
        .post(checkUserTokenURL, { userToken })
        .then((response) => {
          console.log(response.data);
          setUserData(response.data.userDetails);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          navigate("/login");
        });
    };
    isUserValid();
  }, []);

  return (
    <div className="home-container">
      <SideNav clickedLink={clickedLink} username={userData.username} />
      <div className="home-child-container">
        {selectedLink == "todolist" ? <TodoList /> : ""}
        {selectedLink == "stickynotes" ? <StickyNotes /> : ""}
        {selectedLink == "calendar" ? <Calendar /> : ""}
      </div>
    </div>
  );
}

export default Home;
