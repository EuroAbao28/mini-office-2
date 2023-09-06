import React from "react";
import { LuPlusSquare } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import "./Calendar.css";

function Calendar({ isNavOpen, toggleNav }) {
  return (
    <div className="calendar-container">
      <div className="header">
        <div className="left">
          {isNavOpen == false && (
            <HiMenuAlt2
              className="icon"
              onClick={() => toggleNav()}></HiMenuAlt2>
          )}
          <h1>Calendar</h1>
        </div>
        <div className="add-container">
          <LuPlusSquare />
          Add List
        </div>
      </div>
    </div>
  );
}

export default Calendar;
