
import { useState } from "react";

export default function Menu({ addTodo, currTime, menuStatus }) {

  const [task, setTask] = useState("");
  const [time, setTime] = useState(currTime);

  function submitTodo(e) {
    e.preventDefault();
    if (task === "") return;
    if (time === "" || time === undefined) return;
    console.log(typeof time);
    addTodo(task, time);
    setTask("");
    setTime(currTime);
  }

  return !menuStatus ? null : (
    <div className="menu">
      <label htmlFor="form">Create New Todo</label>
      <form id="form" onSubmit={submitTodo}>
        <label htmlFor="todo-task">Task</label>
        <input type="text" id="todo-task" value={task} onChange={e => setTask(e.target.value)}></input>
        <label htmlFor="todo-time">Time</label>
        <input type="time" id="todo-time" value={time} onChange={e => setTime(e.target.value)}></input>
        <br />
        <button className="add-btn">Add</button>
      </form>
    </div>
  );
}
