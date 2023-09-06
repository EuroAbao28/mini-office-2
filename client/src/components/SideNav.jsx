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

function SideNav({ clickedLink, username, isNavOpen, toggleNav }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const linkSetter = (passedLink) => {
    clickedLink(passedLink);
  };

  const handleSignout = () => {
    localStorage.removeItem("user_token");
    navigate("/login");
  };

  const handleToggleButton = () => {
    setIsOpen(false);
    toggleNav();
  };

  return (
    <div className={`sideNav-container ${isNavOpen ? "" : "hidden"}`}>
      <div className="header">
        <h1>Mini Office</h1>
        <HiMenuAlt3
          className="icon toggleButton"
          onClick={handleToggleButton}
        />
      </div>
      <div className="content">
        <h3>MENU</h3>
        <div className="buttons-container">
          <div className="top">
            <div
              className="tab-container"
              onClick={() => linkSetter("todolist")}>
              <LuListChecks className="icon" />
              <p>Todo list</p>
            </div>
            <div
              className="tab-container"
              onClick={() => linkSetter("stickynotes")}>
              <LuStickyNote className="icon" />
              <p>Sticky notes</p>
            </div>
            <div
              className="tab-container"
              onClick={() => linkSetter("calendar")}>
              <LuCalendarDays className="icon" />
              <p>Calendar</p>
            </div>
          </div>
          <div className="bottom">
            <div className="tab-container">
              <LuUser className="icon" />
              {username && <p>{username}</p>}
            </div>
            <div className="tab-container" onClick={handleSignout}>
              <LuLogOut className="icon" />
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
