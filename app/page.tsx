"use client";

import { useState } from "react";
import TodoItem from "./todoItem";
import { data } from "./data";

function Home() {
  const [todolist, setTodolist] = useState(data);

  const [text, setText] = useState("");

  const handleAddTodo = () => {
    if (text.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodolist([...todolist, newTodo]);
    setText("");
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="flex justify-center items-center gap-2">
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          placeholder="Add a todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={text.trim() === ""}
        >
          Add
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          {todolist.length === 0 && <h1>pas de tache</h1>}
        </div>
        {/* si la liste n'est pas vide afficher les taches non terminées */}
        {todolist.filter((todo) => todo.completed === false).length > 0 && <p>les taches non terminées</p>}

        {todolist.filter((todo) => todo.completed === false).map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodolist={setTodolist} todolist={todolist} />
        ))}

        {/* si la liste n'est pas vide afficher les taches terminées */}
        {todolist.filter((todo) => todo.completed === true).length > 0 && <p>les taches terminées</p>}

        {todolist.filter((todo) => todo.completed === true).map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodolist={setTodolist} todolist={todolist} />
        ))}
      </div>
    </div>
  );
}

export default Home;