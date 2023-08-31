import React, { useState } from "react";
import "./Home.css";
import SideNav from "../components/SideNav";
import TodoList from "../components/TodoList";
import StickyNotes from "../components/StickyNotes";
import Calendar from "../components/Calendar";

function Home() {
  const [selectedLink, setSelectedLink] = useState("todolist");

  const clickedLink = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="home-container">
      <SideNav clickedLink={clickedLink} />
      <div className="home-child-container">
        {selectedLink == "todolist" ? <TodoList /> : ""}
        {selectedLink == "stickynotes" ? <StickyNotes /> : ""}
        {selectedLink == "calendar" ? <Calendar /> : ""}
      </div>
    </div>
  );
}

export default Home;
