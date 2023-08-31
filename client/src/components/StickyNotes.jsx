import React, { useState } from "react";
import "./StickyNotes.css";
import { LuPlusSquare } from "react-icons/lu";
import ModalAddStickyNotes from "./ModalAddStickyNotes";

function StickyNotes() {
  const [isModalShow, setIsModalShow] = useState(false);
  const [notes, setNotes] = useState([
    { title: "Sample Title", body: "This is my body...", color: "BLUE" },
  ]);

  const addNote = () => {
    setIsModalShow(!isModalShow);
  };

  return (
    <>
      {isModalShow ? (
        <ModalAddStickyNotes
          modalState={(state) => setIsModalShow(state)}
          newNote={(note) => setNotes([...notes, note])}
        />
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
            {notes.map((note, index) => (
              <div key={index} className="note-container">
                <p className="title">{note.title}</p>
                <p className="body">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StickyNotes;
