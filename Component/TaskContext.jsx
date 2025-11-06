import { createContext, useEffect, useState } from "react";
import { getTasks } from "./Api";


export const TaskContext = createContext();


export const TaskProvider = ({children}) => {
    const [tasks, setTasks] =  useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchTasks();
    }, []);

 const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };//

const addTask = async (taskText) => {
    const newTask = await createTask({ title: taskText, completed: false });
    setTasks((prev) => [...prev, newTask]);
  };

const editTask = async (id, updatedText) => {
    const updated = await updateTask(id, { title: updatedText });
    setTasks((prev) => prev.map(t => t.id === id ? updated : t));
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    const updated = await updateTask(id, { completed: !task.completed });
    setTasks((prev) => prev.map(t => t.id === id ? updated : t));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => 
    filter === "all" ? true :
    filter === "completed" ? task.completed :
    !task.completed
  );

  return (
    <TaskContext.Provider value={{ tasks: filteredTasks, addTask, editTask, toggleTask, removeTask, setFilter }}>
      {children}
    </TaskContext.Provider>
  );
};

