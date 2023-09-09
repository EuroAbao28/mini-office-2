import React, { useState } from "react";
import "./ModalAddStickyNotes.css";
import { LuXSquare } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";

function ModalEditStickyNote({ modalState, refreshData, noteToEdit }) {
  const [title, setTitle] = useState(noteToEdit.title);
  const [body, setBody] = useState(noteToEdit.body);
  const [color, setColor] = useState(noteToEdit.color);

  const handleCheckbox = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setColor(value);
    }
  };

  const closeModal = (state) => {
    modalState(state);
  };

  const handleSaveChanges = () => {
    if (title && body && color) {
      const userToken = localStorage.getItem("user_token");

      const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/api/stickynote",
        headers: { Authorization: `Bearer ${userToken}` },
      });

      axiosInstance
        .patch(`/${noteToEdit._id}`, { title, body, color })
        .then((response) => {
          toast.success(response.data.message, {
            className: "toast-container",
            autoClose: 2000,
          });
          refreshData();
          closeModal(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message, {
            className: "toast-container",
            autoClose: 2000,
          });
        });
    } else {
      console.log("All fields are required");
    }
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
          <h1> Edit note</h1>
          <LuXSquare className="icon" onClick={() => closeModal(false)} />
        </div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder={noteToEdit.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          rows={4}
          placeholder={noteToEdit.body}
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
          <button
            className={!title || !body || !color ? "disabled" : ""}
            disabled={!title || !body || !color ? true : false}
            onClick={handleSaveChanges}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditStickyNote;
