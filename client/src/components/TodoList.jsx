import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import "./TodoList.css";

function TodoList() {
  return (
    <div className="todolist-container">
      <div className="header">
        <h1>Todo List</h1>
        <HiMenuAlt3 />
      </div>
    </div>
  );
}

export default TodoList;
