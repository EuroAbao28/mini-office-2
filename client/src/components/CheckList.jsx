import React from "react";
import { LuPlus, LuPencil, LuX, LuCheck, LuUndo2 } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import "./CheckList.css";

function CheckList({ isNavOpen, toggleNav }) {
  return (
    <div className="checklist-container">
      <div className="header">
        {isNavOpen == false && (
          <HiMenuAlt2 className="icon" onClick={() => toggleNav()}></HiMenuAlt2>
        )}
        <h1>Checklist</h1>
      </div>
      <div className="checklist-content-container">
        <div className="addlist-container">
          <LuPlus className="icon" />
          <form>
            <input type="text" placeholder="Add new list" />
            <button type="submit">Add item</button>
          </form>
        </div>
        <div className="grandparent-lists-container">
          <div className="parent-lists-container">
            <h1>Todo</h1>
            <div className="scrollable-container">
              <div className="lists-container">
                <div className="item-container">
                  <p className="index">1</p>
                  <p className="title">Sample Task</p>
                  <div className="actions">
                    <LuCheck />
                    <LuPencil />
                    <LuX />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="parent-lists-container">
            <h1>Done</h1>
            <div className="scrollable-container">
              <div className="lists-container">
                <div className="item-container">
                  <p className="index">1</p>
                  <p className="title">Sample Task</p>
                  <div className="actions">
                    <LuCheck />
                    <LuPencil />
                    <LuX />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckList;
