
import { useEffect, useState } from "react";
import "./styles.css"
import Menu from "./Menu";
import List from "./List";
//import logo from './logo.svg';
//import './App.css';

export default function App() {

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) return [];
    else return JSON.parse(localValue);
  });
  const [time, setTime] = useState(getCurrTime());
  const [menuStatus, setMenuStatus] = useState(false);
  // const [dayEndTurnover, setDayEndTurnover] = useState(false);
  const dayEnd = "00:00";

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      clearLateTodosUponDayEnd();
      updateTimeAndLateTodos();
    }, 1000);
    return () => clearInterval(interval);
  });



  function addTodo(task, time) {
    setTodos(currTodos => {
      let tempTodos = [
        ...currTodos,
        { id: crypto.randomUUID(), task, time, late: false, crossed: false, },
      ];
      tempTodos.sort(compareTodos);
      return tempTodos;
    });
  }

  function deleteTodo(id) {
    setTodos(currTodos => {
      return currTodos.filter(todo => todo.id !==id);
    });
  }

  function compareTodos(a, b) {
    return a.time > b.time ? 1 : a.time < b.time ? -1 : 0;
  }

  function getCurrTime() {
    let date = new Date();
    return date.getHours().toString().padStart(2, '0')
      + ":" + date.getMinutes().toString().padStart(2, '0');
  }

  function isTimePastDayEnd(prevTime, currTime) {
    let res = false;
    if (dayEnd === "00:00" || dayEnd === "24:00")
      res = prevTime > currTime && prevTime < "24:00" && currTime >= "00:00";
    else
      res = (prevTime < dayEnd && currTime >= dayEnd)
        || (prevTime > currTime);
    // setDayEndTurnover(res);
    return res;
  }

  function clearLateTodosUponDayEnd() {
    let currTime = getCurrTime();
    let prevTime = time;
    if (!isTimePastDayEnd(prevTime, currTime)) return;
    setTodos(currTodos => {
      return currTodos.map(todo => {
        return { ...todo, late: false, crossed: false };
      });
    });
  }

  function updateTimeAndLateTodos() {
    let currTime = getCurrTime();
    let prevTime = time;
    if (currTime === prevTime) return;
    setTodos(currTodos => {
      return currTodos.map(todo => {
        return { ...todo, late: currTime >= todo.time };
      });
    });
    setTime(currTime);
  }
  
  function toggleMenu() {
    setMenuStatus(currMenuStatus => {
      return !currMenuStatus;
    });
  }



  document.body.style = "background: #100800;";

  return (
    <div className="main">
      <Menu addTodo={addTodo} currTime={time} menuStatus={menuStatus} />
      <div className="divider">
        <button className="div-btn" onClick={toggleMenu}>{menuStatus ? "<" : ">"}</button>
      </div>
      <List todos={todos} setTodos={setTodos} deleteTodo={deleteTodo} />
    </div>
  );
}
