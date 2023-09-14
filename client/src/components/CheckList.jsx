import React, { useEffect, useState } from "react";
import { LuPlus, LuPencil, LuX, LuCheck, LuUndo2 } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import "./CheckList.css";

function CheckList({ isNavOpen, toggleNav }) {
  const [todoList, setTodoList] = useState([]);
  const [donelist, setDoneList] = useState([]);
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitile] = useState("");
  const [indexToEdit, setIndexToEdit] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList((prevState) => [...prevState, title]);
    setTitle("");
  };

  const handleSetToDone = (itemIndex) => {
    setDoneList((prevState) => [...prevState, todoList[itemIndex]]);
    setTodoList((prevState) =>
      prevState.filter((item, index) => index !== itemIndex)
    );
  };

  const handleSaveEdit = (itemIndex) => {
    // Create a new copy of the todoList array
    const updatedTodoList = [...todoList];

    // Update the title of the item at the specified index
    updatedTodoList[itemIndex] = editTitle;

    // Update the state with the modified todoList
    setTodoList(updatedTodoList);

    // Clear the editTitle and reset indexToEdit to null
    setEditTitile("");
    setIndexToEdit(null);
  };

  // TULOY MO SA DONE

  const handleDeletTodo = (itemIndex) => {
    setTodoList((prevState) =>
      prevState.filter((item, index) => index !== itemIndex)
    );
  };

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add new list"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className={`add ${title ? "" : "hidden"}`}>
              Add item
            </button>
          </form>
        </div>
        <div className="grandparent-lists-container">
          <div className="parent-lists-container">
            <h1>Todo</h1>
            <div className="scrollable-container">
              <div className="lists-container">
                {todoList.map((item, index) => (
                  <div className="item-container" key={index}>
                    <p className="index">{index + 1}</p>
                    {indexToEdit == index ? (
                      <form onSubmit={() => handleSaveEdit(index)}>
                        <input
                          type="text"
                          placeholder={item}
                          value={editTitle}
                          onChange={(e) => setEditTitile(e.target.value)}
                        />
                      </form>
                    ) : (
                      <p className="title">{item}</p>
                    )}
                    <div className="actions">
                      <LuCheck onClick={() => handleSetToDone(index)} />
                      <LuPencil onClick={() => setIndexToEdit(index)} />
                      <LuX onClick={() => handleDeletTodo(index)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="parent-lists-container">
            <h1>Done</h1>
            <div className="scrollable-container">
              <div className="lists-container">
                {donelist.map((item, index) => (
                  <div className="item-container" key={index}>
                    <p className="index">{index + 1}</p>
                    <p className="title">{item}</p>
                    <div className="actions">
                      <LuCheck />
                      <LuPencil />
                      <LuX />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckList;
