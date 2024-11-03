
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Menu({ addTodo, currTime, menuStatus }) {

  const formik = useFormik({
    initialValues: {
      task: "",
      time: currTime,
    },
    onSubmit: (values) => {
      // if (errors.task || errors.time)
      addTodo(values.task, values.time);
    },
    validationSchema: Yup.object({
      task: Yup
        .string()
        .required("No todo task given"),
      time: Yup
        .string()
        .required("No todo time given")
        .length(5)
        .matches(/^(([0-1][0-9])|([2][0-3])):[0-5][0-9]$/),
    }),
  });

  return !menuStatus ? null : (
    <div className="menu">
      <label htmlFor="form">Create New Todo</label>
      <form id="form" onSubmit={formik.handleSubmit}>
        <label htmlFor="todo-task">Task</label>
        <input
          name="task"
          type="text"
          id="todo-task"
          value={formik.values.task}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="todo-time">Time</label>
        <input
          name="time"
          type="time"
          id="todo-time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        <button className="add-btn" type="submit">Add</button>
      </form>
    </div>
  );
}
