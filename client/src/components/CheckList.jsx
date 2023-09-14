import React, { useEffect, useState } from "react";
import { LuPlus, LuPencil, LuX, LuCheck, LuUndo2 } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import "./CheckList.css";
import axios from "axios";
import { toast } from "react-toastify";

function CheckList({ isNavOpen, toggleNav }) {
  const [todolist, setTodoList] = useState([]);
  const [donelist, setDoneList] = useState([]);
  const [title, setTitle] = useState("");
  const [isDone, setIsDone] = useState("");
  const [editTitle, setEditTitile] = useState("");
  const [idToEdit, setIdToEdit] = useState(null);

  const getTodos = () => {
    const getChecklistURL = "http://localhost:5000/api/checklist/";
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      axios
        .get(getChecklistURL)
        .then((response) => {
          setTodoList(response.data.filter((item) => item.isDone === false));
          setDoneList(response.data.filter((item) => item.isDone === true));
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      console.log("No token");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title) {
      const createChecklistURL = "http://localhost:5000/api/checklist/";
      const userToken = localStorage.getItem("user_token");

      if (userToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        axios
          .post(createChecklistURL, { title })
          .then((response) => {
            toast.success(response.data.message, {
              className: "toast-container",
              autoClose: 2000,
            });
            // clear the title
            setTitle("");
            // refresh list
            getTodos();
          })
          .catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message, {
              className: "toast-container",
              autoClose: 2000,
            });
          });
      } else {
        console.log("No token");
      }
    } else {
      console.log("All fields are required");
    }
  };

  const handleSetToDone = (id) => {
    const userToken = localStorage.getItem("user_token");
    const axiosInstance = axios.create({
      baseURL: "http://localhost:5000/api/checklist",
      headers: { Authorization: `Bearer ${userToken}` },
    });

    axiosInstance
      .patch(`/${id}`, { isDone: true })
      .then((response) => {
        getTodos();
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
      });
  };

  const handleUnSetToDone = (id) => {
    const userToken = localStorage.getItem("user_token");
    const axiosInstance = axios.create({
      baseURL: "http://localhost:5000/api/checklist",
      headers: { Authorization: `Bearer ${userToken}` },
    });

    axiosInstance
      .patch(`/${id}`, { isDone: false })
      .then((response) => {
        getTodos();
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
      });
  };

  const handleSaveEdit = (e, id) => {
    e.preventDefault();

    const userToken = localStorage.getItem("user_token");
    const axiosInstance = axios.create({
      baseURL: "http://localhost:5000/api/checklist",
      headers: { Authorization: `Bearer ${userToken}` },
    });

    axiosInstance
      .patch(`/${id}`, { title: editTitle })
      .then((response) => {
        toast.success(response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
        if (response) {
          getTodos();
          setIdToEdit(null);
          setEditTitile("");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
      });
  };

  const handleDelete = (id) => {
    const userToken = localStorage.getItem("user_token");
    const axiosInstance = axios.create({
      baseURL: "http://localhost:5000/api/checklist",
      headers: { Authorization: `Bearer ${userToken}` },
    });

    axiosInstance
      .delete(`/${id}`)
      .then((response) => {
        toast.success(response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
        getTodos();
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message, {
          className: "toast-container",
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

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
                {todolist.map((item, index) => (
                  <div className="item-container" key={item._id}>
                    <p className="index">{index + 1}</p>
                    {idToEdit == item._id ? (
                      <form onSubmit={(e) => handleSaveEdit(e, item._id)}>
                        <input
                          type="text"
                          placeholder={item.title}
                          value={editTitle}
                          onChange={(e) => setEditTitile(e.target.value)}
                        />
                      </form>
                    ) : (
                      <p className="title">{item.title}</p>
                    )}
                    <div className="actions">
                      <LuCheck onClick={() => handleSetToDone(item._id)} />
                      <LuPencil onClick={() => setIdToEdit(item._id)} />
                      <LuX onClick={() => handleDelete(item._id)} />
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
                  <div className="item-container" key={item._id}>
                    <p className="index">{index + 1}</p>
                    {idToEdit == item._id ? (
                      <form onSubmit={(e) => handleSaveEdit(e, item._id)}>
                        <input
                          type="text"
                          placeholder={item.title}
                          value={editTitle}
                          onChange={(e) => setEditTitile(e.target.value)}
                        />
                      </form>
                    ) : (
                      <p className="title">{item.title}</p>
                    )}
                    <div className="actions">
                      <LuUndo2 onClick={() => handleUnSetToDone(item._id)} />
                      <LuPencil onClick={() => setIdToEdit(item._id)} />
                      <LuX onClick={() => handleDelete(item._id)} />
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
