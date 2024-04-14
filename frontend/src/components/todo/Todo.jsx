import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [todos, setTodos] = useState([]);
  const userId = sessionStorage.getItem("id");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v2/getTasks/${userId}`
        );
        setTodos(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks. Please try again later.");
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const showTextarea = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v2/addTask?userId=${userId}`,
        { title: inputs.title, body: inputs.body }
      );

      setTodos([...todos, response.data.task]);
      setInputs({ title: "", body: "" });
      toast.success("Task Added Successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again later.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v2/deleteTask/${id}`);

      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
      toast.success("Task Deleted Successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again later.");
    }
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={showTextarea}
              name="title"
              value={inputs.title}
              onChange={handleChange}
            />
            <textarea
              id="textarea"
              style={{ display: "none" }}
              placeholder="BODY"
              className="p-2 todo-inputs"
              name="body"
              value={inputs.body}
              onChange={handleChange}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row justify-content-center">
              {todos.map((todo, index) => (
                <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                  <TodoCards
                    title={todo.title}
                    body={todo.body}
                    id={todo._id}
                    delid={deleteTask}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update" style={{ display: "none" }}>
        <div className="container update">
          <Update />
        </div>
      </div>
    </>
  );
};

export default Todo;
