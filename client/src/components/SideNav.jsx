import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  LuCalendarDays,
  LuStickyNote,
  LuListChecks,
  LuUser,
  LuLogOut,
} from "react-icons/lu";
import "./SideNav.css";
import { useNavigate } from "react-router-dom";

function SideNav({ clickedLink, username }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const linkSetter = (passedLink) => {
    clickedLink(passedLink);
  };

  const handleSignout = () => {
    localStorage.removeItem("user_token");
    navigate("/login");
  };

  return (
    <div className={`sideNav-container ${isOpen ? "" : "hidden"}`}>
      <div className="header">
        <h1>Mini Office</h1>
        <HiMenuAlt3 className="icon" onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className="content">
        <h3>MENU</h3>
        <div className="buttons-container">
          <div className="top">
            <div
              className="tab-container"
              onClick={() => linkSetter("todolist")}>
              <LuListChecks className="icon" />
              Todo list
            </div>
            <div
              className="tab-container"
              onClick={() => linkSetter("stickynotes")}>
              <LuStickyNote className="icon" />
              Sticky notes
            </div>
            <div
              className="tab-container"
              onClick={() => linkSetter("calendar")}>
              <LuCalendarDays className="icon" />
              Calendar
            </div>
          </div>
          <div className="bottom">
            <div className="tab-container">
              <LuUser className="icon" />
              {username && username}
            </div>
            <div className="tab-container" onClick={handleSignout}>
              <LuLogOut className="icon" />
              Sign out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
