import React, { useEffect, useState } from "react";
import copy from "clipboard-copy";
import "./StickyNotes.css";
import { LuPlusSquare, LuEdit, LuTrash2, LuCopy } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import ModalAddStickyNotes from "./ModalAddStickyNotes";
import axios from "axios";
import { toast } from "react-toastify";
import ModalEditStickyNote from "./ModalEditStickyNote";

function StickyNotes({ isNavOpen, toggleNav }) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isEditModalShow, setIsEditModalShow] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState({});
  const [notes, setNotes] = useState([]);

  //for showing options in the clicked note
  const [clickedNote, setClickedCard] = useState("");

  // for text copy notifier. For note id
  const [copied, setCopied] = useState("");

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

  const handleCopyNote = async (note) => {
    try {
      await copy(note.body);
      setCopied(note._id);
      console.log("Copied note: ", note.body);
    } catch (error) {
      console.error("Copy failed: ", error);
    }
  };

  const getStickyNotes = () => {
    const getStickyNotesURL =
      "https://mini-office-2.onrender.com/api/stickynote/";
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      // Set the authorization header with the token
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      axios
        .get(getStickyNotesURL)
        .then((response) => {
          // console.log(response);
          setNotes(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      console.log("No token");
    }
  };

  const handleEditNote = (noteData) => {
    setIsEditModalShow(true);
    setNoteToEdit(noteData);
  };

  const handleDeleteNote = (noteID) => {
    const userToken = localStorage.getItem("user_token");

    const axiosInstance = axios.create({
      baseURL: "https://mini-office-2.onrender.com/api/stickynote",
      headers: { Authorization: `Bearer ${userToken}` },
    });

    axiosInstance
      .delete(`/${noteID}`)
      .then((response) => {
        toast.success(response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
        getStickyNotes();
      })
      .catch((error) => {
        // console.log(error.response.data);
        toast.error(error.response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
      });
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
      {isEditModalShow && (
        <ModalEditStickyNote
          modalState={(state) => setIsEditModalShow(state)}
          noteToEdit={noteToEdit}
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
                    className="copy"
                    onClick={() => handleCopyNote(note)}
                  />
                  <LuEdit
                    className="edit"
                    onClick={() => handleEditNote(note)}
                  />
                  <LuTrash2
                    className="delete"
                    onClick={() => handleDeleteNote(note._id)}
                  />
                </div>
                {/* copied notifier */}
                {/* <p className={`copied-notif ${copied && "show"}`}>copied</p> */}
                {copied == note._id && <p className="copied-notif">copied</p>}
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
