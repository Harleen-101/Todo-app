import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

const TodoItems = ({ text, id, done, deleteTodo, editTodo, toggle }) => {
  return (
    <div
      onClick={() => {
        toggle(id);
      }}
      className="flex items-center my-3 gap-2"
    >
      <div className="flex flex-1 items-center cursor-pointer">
        <img className="w-7" src={done ? tick : not_tick} alt="" />
        <p
          className={`text-slate-700 ml-4 text-[17px] ${
            done ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>

      <button
        onClick={() => {
          editTodo(id);
        }}
        className="text-xl pr-3 text-rose-400 hover:text-rose-500 cursor-pointer"
      >
        <MdEditSquare />
      </button>
      <button
        onClick={() => {
          deleteTodo(id);
        }}
        className="text-xl pr-8 text-rose-400 hover:text-rose-500 cursor-pointer"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default TodoItems;
