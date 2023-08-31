import React, { useState } from "react";
import "./StickyNotes.css";
import { LuPlusSquare } from "react-icons/lu";
import ModalAddStickyNotes from "./ModalAddStickyNotes";

function StickyNotes() {
  const [isModalShow, setIsModalShow] = useState(false);

  const addNote = () => {
    setIsModalShow(!isModalShow);
  };

  return (
    <>
      {isModalShow ? (
        <ModalAddStickyNotes modalState={(state) => setIsModalShow(state)} />
      ) : (
        ""
      )}
      <div className="stickynotes-container">
        <div className="header">
          <h1>Sticky Notes</h1>
          <div className="add-container" onClick={addNote}>
            <LuPlusSquare />
            Add note
          </div>
        </div>
        <div className="stickynotes-content-container">
          <div className="child-container">
            <div className="note-container">
              <p className="title">Card Title</p>
              <p className="body">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium, ullam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StickyNotes;
