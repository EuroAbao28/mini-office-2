import React, { useEffect, useState } from "react";
import copy from "clipboard-copy";
import "./StickyNotes.css";
import { LuPlusSquare, LuEdit, LuTrash2, LuCopy } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import ModalAddStickyNotes from "./ModalAddStickyNotes";
import axios from "axios";
import { toast } from "react-toastify";

function StickyNotes({ isNavOpen, toggleNav }) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [notes, setNotes] = useState([]);

  //for showing options in the clicked note
  const [clickedNote, setClickedCard] = useState("");

  // accent colors darkened
  const yellow_dark = "#ff6675";
  const green_dark = " #ffb866";
  const blue_dark = "#ffff66";
  const orange_dark = " #66ff87";
  const red_dark = "#66bdff";
  const purple_dark = " #f066ff";

  const addNote = () => {
    setIsModalShow(!isModalShow);
  };

  const handleClickedNote = (index) => {
    if (index === clickedNote) {
      // kapag clinick ulit yung note naka open and option, icoclose nya na
      setClickedCard("");
    } else {
      setClickedCard(index);
    }
  };

  const handleCopyNote = async (textBody) => {
    try {
      await copy(textBody);
      toast.success("Sticky note copied", {
        className: "toast-container",
        position: "top-center",
        autoClose: 1000,
      });
      console.log("Copied note: ", textBody);
    } catch (error) {
      console.error("Copy failed: ", error);
    }
  };

  const getStickyNotes = () => {
    const getStickyNotesURL = "http://localhost:5000/api/stickynote/";
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      // Set the authorization header with the token
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      axios
        .get(getStickyNotesURL)
        .then((response) => {
          console.log(response);
          setNotes(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      console.log("No token");
    }
  };

  useEffect(() => {
    getStickyNotes();
  }, []);

  return (
    <>
      {isModalShow && (
        <ModalAddStickyNotes
          modalState={(state) => setIsModalShow(state)}
          refreshData={getStickyNotes}
        />
      )}
      <div className="stickynotes-container">
        <div className="header">
          <div className="left">
            {isNavOpen == false && (
              <HiMenuAlt2
                className="icon"
                onClick={() => toggleNav()}></HiMenuAlt2>
            )}
            <h1>Sticky Notes</h1>
          </div>
          <div className="add-container" onClick={addNote}>
            <LuPlusSquare />
            Add new
          </div>
        </div>
        <div className="stickynotes-content-container">
          <div className="child-container">
            {notes.map((note, index) => (
              <div
                key={index}
                className="note-container"
                style={{ backgroundColor: note.color }}
                onClick={() => handleClickedNote(index)}>
                {/* add the extra classname for if the note index is matched */}
                <div
                  className={`note-option-container ${
                    clickedNote === index ? "visible" : "hidden"
                  }`}
                  style={{ backgroundColor: note.color }}>
                  <LuCopy
                    onClick={() => handleCopyNote(note.body)}
                    className="copy"
                  />
                  <LuEdit className="edit" />
                  <LuTrash2 className="delete" />
                </div>

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
