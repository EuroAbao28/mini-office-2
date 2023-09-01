import React, { useState } from "react";
import "./ModalAddStickyNotes.css";
import { LuXSquare } from "react-icons/lu";

function ModalAddStickyNotes({ modalState, newNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("");

  const handleCheckbox = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setColor(value);
    }
  };

  const handleCreateNote = () => {
    if (title && body && color) {
      console.log(`Title: ${title}`);
      console.log(`Body: ${body}`);
      console.log(`Color: ${color}`);

      newNote({
        title: title,
        body: body,
        color: color,
      });

      // then close the modal
      modalState(false);
    } else {
      console.log("All fields are required");
    }
  };

  const closeModal = (state) => {
    modalState(state);
  };

  // Note Colors
  const yellow = "#ffffb8";
  const green = "#b8ffc7";
  const blue = "#b8e0ff";
  const orange = "#ffdeb8";
  const red = "#ffb8bf";
  const purple = "#f8b8ff";

  return (
    <div className="modal-addStickyNotes-container">
      <div className="modal-form-container">
        <div className="header">
          <h1> Create new note</h1>
          <LuXSquare className="icon" onClick={() => closeModal(false)} />
        </div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          rows={4}
          placeholder="Write something here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label>Choose note color</label>
        <div className="colors-container">
          <div className="item yellow">
            <input
              type="checkbox"
              id="yellow"
              value={yellow}
              checked={color === yellow}
              onChange={handleCheckbox}
            />
            <label htmlFor="yellow">Yellow</label>
          </div>
          <div className="item green">
            <input
              type="checkbox"
              id="green"
              value={green}
              checked={color === green}
              onChange={handleCheckbox}
            />
            <label htmlFor="green">Green</label>
          </div>
          <div className="item blue">
            <input
              type="checkbox"
              id="blue"
              value={blue}
              checked={color === blue}
              onChange={handleCheckbox}
            />
            <label htmlFor="blue">Blue</label>
          </div>
          <div className="item orange">
            <input
              type="checkbox"
              id="orange"
              value={orange}
              checked={color === orange}
              onChange={handleCheckbox}
            />
            <label htmlFor="orange">Orange</label>
          </div>
          <div className="item red">
            <input
              type="checkbox"
              id="red"
              value={red}
              checked={color === red}
              onChange={handleCheckbox}
            />
            <label htmlFor="red">Red</label>
          </div>
          <div className="item purple">
            <input
              type="checkbox"
              id="purple"
              value={purple}
              checked={color === purple}
              onChange={handleCheckbox}
            />
            <label htmlFor="purple">Purple</label>
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleCreateNote}>Create note</button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddStickyNotes;
