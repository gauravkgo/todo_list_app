
export default function List({ todos, setTodos, deleteTodo }) {

  function toggleCrossTodo(id) {
    setTodos(currTodos => {
      return currTodos.map(todo => {
        return todo.id === id ? { ...todo, crossed: !todo.crossed } : todo;
      });
    });
  }

  return (
    <ul className="list">
      {todos.length < 1 && "No Todos yet"}
      {todos.map(todo => {
        return (
          <Item key={todo.id} todo={todo} toggleCrossTodo={toggleCrossTodo} deleteTodo={deleteTodo}/>
        );
      })}
    </ul>
  );
}

function Item({ todo, toggleCrossTodo, deleteTodo }) {
  
  return (
    <li className={todo.crossed ? "todo-cross" : todo.late ? "todo-late" : "todo"}>
      <button
        className={todo.crossed ? "todo-btn-cross" : "todo-btn"}
        onClick={() => toggleCrossTodo(todo.id)}
        style={{textDecoration: todo.crossed ? "line-through" : "none"}}
      >
        {todo.task}
        <br />
        {todo.time}
      </button>
      <button className={todo.crossed ? "dlt-btn-cross" : "dlt-btn"} onClick={() => deleteTodo(todo.id)}>X</button>
    </li>
  );
}
