import React from "react";
import { LuPlusSquare } from "react-icons/lu";
import "./TodoList.css";

function TodoList() {
  return (
    <div className="todolist-container">
      <div className="header">
        <h1>Todo List</h1>
        <div className="add-container">
          <LuPlusSquare />
          Add List
        </div>
      </div>
    </div>
  );
}

export default TodoList;
