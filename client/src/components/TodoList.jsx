import React from "react";
import { LuPlusSquare } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import "./TodoList.css";

function TodoList({ isNavOpen, toggleNav }) {
  return (
    <div className="todolist-container">
      <div className="header">
        <div className="left">
          {isNavOpen == false && (
            <HiMenuAlt2
              className="icon"
              onClick={() => toggleNav()}></HiMenuAlt2>
          )}
          <h1>Todo List</h1>
        </div>
        <div className="add-container">
          <LuPlusSquare />
          Add new
        </div>
      </div>
    </div>
  );
}

export default TodoList;
