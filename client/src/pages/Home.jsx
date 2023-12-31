import React, { useEffect, useState } from "react";
import "./Home.css";
import SideNav from "../components/SideNav";
import CheckList from "../components/CheckList";
import StickyNotes from "../components/StickyNotes";
import Calendar from "../components/Calendar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [selectedLink, setSelectedLink] = useState("checklist");

  const clickedLink = (link) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    const isUserValid = () => {
      const userToken = localStorage.getItem("user_token");

      if (userToken) {
        const checkUserTokenURL =
          "https://mini-office-2.onrender.com/api/users/checkusertoken";

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
      } else {
        navigate("/login");
      }
    };
    isUserValid();
  }, []);

  const handleSideNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="home-container">
      <SideNav
        clickedLink={clickedLink}
        username={userData.username}
        isNavOpen={isNavOpen}
        toggleNav={handleSideNav}
      />
      <div className="home-child-container">
        {selectedLink == "checklist" && (
          <CheckList isNavOpen={isNavOpen} toggleNav={handleSideNav} />
        )}
        {selectedLink == "stickynotes" && (
          <StickyNotes isNavOpen={isNavOpen} toggleNav={handleSideNav} />
        )}
        {selectedLink == "calendar" && (
          <Calendar isNavOpen={isNavOpen} toggleNav={handleSideNav} />
        )}
      </div>
    </div>
  );
}

export default Home;
