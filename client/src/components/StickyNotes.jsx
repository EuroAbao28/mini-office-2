import React from "react";
import "./StickyNotes.css";
import { LuPlusSquare } from "react-icons/lu";

function StickyNotes() {
  return (
    <div className="stickynotes-container">
      <div className="header">
        <h1>Sticky Notes</h1>
        <div className="add-container">
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
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">Lorem ipsu</p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              laboriosam nulla dicta pariatur ducimus voluptate nostrum, id
              earum perspiciatis iusto, unde ex repudiandae eligendi officiis
              maxime accusamus accusantium esse, autem mollitia tenetur nam
              quae. Dolores voluptas eaque aut esse quibusdam.
            </p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
              quibusdam aperiam odio ipsa!
            </p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos
            </p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">Lorem ipsu</p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">Lorem ipsu</p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est atque
              itaque eveniet? Autem necessitatibus adipisci facere totam ut
              fugit, dolorem voluptatum.
            </p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="note-container">
            <p className="title">Card Title</p>
            <p className="body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              ipsam quidem nemo corrupti. Tenetur, debitis!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyNotes;
