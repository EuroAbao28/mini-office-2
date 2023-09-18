import React from "react";
import { LuPlusSquare } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import "./Calendar.css";
import constructionPNG from "../assets/construction.png";

function Calendar({ isNavOpen, toggleNav }) {
  return (
    <div className="calendar-container">
      <div className="header">
        {isNavOpen == false && (
          <HiMenuAlt2 className="icon" onClick={() => toggleNav()}></HiMenuAlt2>
        )}
        <h1>Calendar</h1>
      </div>
      <div className="body">
        <img src={constructionPNG} />
        <h1>Under Construction</h1>
      </div>
    </div>
  );
}

export default Calendar;
