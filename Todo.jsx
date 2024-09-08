import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();
  const [inputLength, setInputLength] = useState(0);

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      done: false,
    };
    setTodoList((prev) => {
      return [...prev, newTodo];
    });
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
  };

  const editTodo = (id) => {
    const todoToEdit = todoList.find((todo) => todo.id === id);
    if (!todoToEdit) return;

    const newTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodos);
    inputRef.current.value = todoToEdit.text;
    inputRef.current.focus();
  };

  const toggle = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleInputChange = () => {
    setInputLength(inputRef.current.value.length);
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md sm:max-w-sm flex flex-col p-7 h-fit rounded-xl">
      {/*--------- title ---------*/}

      <div className="flex items-center mt-7">
        <img className="w-8 ml-6" src={todo_icon} alt="" />
        <h1 className="text-2xl pl-4 font-semibold">
          Todo-List : Get things Done!
        </h1>
      </div>

      {/*--------- input box ---------*/}

      <div className="flex items-center my-7 bg-stone-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 w-2/3 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your tasks"
          onChange={handleInputChange}
        />
        <button
          onClick={add}
          disabled={inputLength <= 2}
          className="border-none rounded-full bg-rose-400 disabled:bg-rose-300 hover:bg-rose-500 h-14 w-1/3 text-white text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      {/*--------- todo list ---------*/}

      <div>
        {todoList.length === 0 && (
          <div className="m-5 text-slate-700">
            No Tasks scheduled for the day.
          </div>
        )}
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              done={item.done}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
